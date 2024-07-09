import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject } from 'rxjs';
import { GarantiasService } from './garantias.service';


// Interface para representar os dados de um utilizador
export interface User {
  email: string;
  nome: string;
  apelido: string;
  password: string;
}

// Interface para representar os dados de uma categoria
export interface Categoria {
  nome: string;
}

@Injectable({
  providedIn: 'root'
})

export class CategoriasService {

  private _storage: Storage | null = null;
  private readonly STORAGE_KEY = "Categorias";
  private _CategoriasSubject: BehaviorSubject<Categoria[]> = new BehaviorSubject<Categoria[]>([]);

  // Propriedades adicionadas para controle do utilizador atual
  private currentUserEmail: string | null = null;
  private readonly USERS_KEY = 'users';

  constructor(private storage: Storage,
              private garantiaService: GarantiasService) 
  {
    this.init();
  }

  // Inicialização do serviço de armazenamento e carregamento de Categorias
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.currentUserEmail = await this.getCurrentUserEmail();
    await this.loadCategorias();
  }

  // Carrega as Categorias do utilizador atual
  private async loadCategorias() {
    if (this.currentUserEmail) {
      const categorias = await this.getCategorias();
      this._CategoriasSubject.next(categorias);
    }
  }

  // Obtém o email do utilizador atual
  async getCurrentUserEmail(): Promise<string | null> {
    return await this._storage?.get('currentUserEmail') || null;
  }

  // Obtém informações do utilizador a partir do email
  async getUserByEmail(email: string): Promise<User | null> {
    const users: User[] = await this.storage.get(this.USERS_KEY) || [];
    return users.find(user => user.email === email) || null;
  }

  // Define o email do utilizador atual
  setCurrentUserEmail(email: string) {
    this.currentUserEmail = email;
  }

  //Método para adicionar Categoria tendo o email como chave primária
  async addCategoria(categoria: Categoria){
    if (!this.currentUserEmail) {
      throw new Error('Usuário não logado');
    }

    const categorias = await this.getCategorias();
    categorias.forEach(c => {
      if(c.nome == categoria.nome){
        throw new Error("Essa categora já existe")
      }
    })
    categorias.push(categoria);
    await this._storage?.set(`${this.STORAGE_KEY}_${this.currentUserEmail}`, categorias);
    this._CategoriasSubject.next(categorias); // Notifica os assinantes que uma nova Categoria foi adicionada
  }

  //Método para retornar Categoria
  async getCategorias(): Promise<Categoria[]> {
    if (!this.currentUserEmail) {
      return [];
    }

    const Categorias = await this._storage?.get(`${this.STORAGE_KEY}_${this.currentUserEmail}`) || [];
    this._CategoriasSubject.next(Categorias); // Atualiza o subject com as Categorias carregadas
    return Categorias;
  }

  getCategoriasObservable(): BehaviorSubject<Categoria[]> {
    return this._CategoriasSubject;
  }

  //Método para remover Categoria
  async removeCategoria(categoria: Categoria) {
    if (!this.currentUserEmail) {
      throw new Error('Usuário não logado');
    }

    const categorias = await this.getCategorias();
    const index = categorias.findIndex(c => c.nome == categoria.nome);
    if (index > -1) {
      categorias.splice(index, 1);
      await this._storage?.set(`${this.STORAGE_KEY}_${this.currentUserEmail}`, categorias);
      this._CategoriasSubject.next(categorias); // Atualiza o subject após a remoção
      const garantias = await this.garantiaService.getGarantias();
      garantias.forEach(garantia => {
        if(garantia.categoria == categoria.nome){
          garantia.categoria = 'Outros'
        }
      })
    }
  }

  //Método para atualizar uma categoria
  async updateCategoria(oldcategoria: Categoria,newcategoria: Categoria) {
    if (!this.currentUserEmail) {
      throw new Error('Usuário não logado');
    }

    const categorias = await this.getCategorias();
    for (let c of categorias){
      if(c.nome == oldcategoria.nome){
        c.nome=newcategoria.nome;
        break; 
      }
    }
    await this._storage?.set(`${this.STORAGE_KEY}_${this.currentUserEmail}`, categorias);
    this._CategoriasSubject.next(categorias); // Atualiza o subject após o update
    const garantias = await this.garantiaService.getGarantias();
    garantias.forEach(garantia => {
      if(garantia.categoria == oldcategoria.nome){
        garantia.categoria = newcategoria.nome
        this.garantiaService.updateGarantia(garantia)
      }
    })
  }  
  
  //Método para remover Categorias
  async removeCategorias(categorias: Categoria[]) {
    const categoriasAtuais = await this.getCategorias();
    const garantias = await this.garantiaService.getGarantias();
    categorias.forEach(categoria => {
      const index = categoriasAtuais.findIndex(c => c.nome == categoria.nome);
      if (index > -1) {
        categoriasAtuais.splice(index, 1);
      }
      garantias.forEach(garantia => {
        if(garantia.categoria == categoria.nome){
          garantia.categoria = 'Outros'
          this.garantiaService.updateGarantia(garantia)
        }
      })
    });
    await this._storage?.set(`${this.STORAGE_KEY}_${this.currentUserEmail}`, categoriasAtuais);
    this._CategoriasSubject.next(categoriasAtuais); // Notifica os assinantes que as Categorias foram removidas
  }
}