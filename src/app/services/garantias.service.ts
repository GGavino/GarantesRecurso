import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject } from 'rxjs';

// Interface para representar os dados de uma garantia
export interface Garantia {
  nome: string;
  modelo: string;
  categoria: string
  dataCompra: string;
  dataExpiracao: string;
  observacoes: string;
  foto?: string;
}

// Interface para representar os dados de um utilizador
export interface User {
  email: string;
  nome: string;
  apelido: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})

export class GarantiasService {

  private _storage: Storage | null = null;
  private readonly STORAGE_KEY = "garantias";
  private _garantiasSubject: BehaviorSubject<Garantia[]> = new BehaviorSubject<Garantia[]>([]);

  // Propriedades adicionadas para controle do utilizador atual
  private currentUserEmail: string | null = null;
  private readonly USERS_KEY = 'users';

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicialização do serviço de armazenamento e carregamento de garantias
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.currentUserEmail = await this.getCurrentUserEmail();
    await this.loadGarantias();
  }

  // Carrega as garantias do utilizador atual
  private async loadGarantias() {
    if (this.currentUserEmail) {
      const garantias = await this.getGarantias();
      this._garantiasSubject.next(garantias);
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

  //Método para adicionar garantia tendo o email como chave primária
  async addGarantia(garantia: Garantia) {
    if (!this.currentUserEmail) {
      throw new Error('Usuário não logado');
    }

    const garantias = await this.getGarantias();
    garantias.push(garantia);
    await this._storage?.set(`${this.STORAGE_KEY}_${this.currentUserEmail}`, garantias);
    this._garantiasSubject.next(garantias); // Notifica os assinantes que uma nova garantia foi adicionada
  }

  //Método para retornar garantia
  async getGarantias(): Promise<Garantia[]> {
    if (!this.currentUserEmail) {
      return [];
    }

    const garantias = await this._storage?.get(`${this.STORAGE_KEY}_${this.currentUserEmail}`) || [];
    this._garantiasSubject.next(garantias); // Atualiza o subject com as garantias carregadas
    return garantias;
  }

  getGarantiasObservable(): BehaviorSubject<Garantia[]> {
    return this._garantiasSubject;
  }

  //Método para remover garantia
  async removeGarantia(garantia: Garantia) {
    if (!this.currentUserEmail) {
      throw new Error('Usuário não logado');
    }

    const garantias = await this.getGarantias();
    const index = garantias.findIndex(g => g.nome === garantia.nome);
    if (index > -1) {
      garantias.splice(index, 1);
      await this._storage?.set(`${this.STORAGE_KEY}_${this.currentUserEmail}`, garantias);
      this._garantiasSubject.next(garantias); // Atualiza o subject após a remoção
    }
  }
  async updateGarantia(garantia: Garantia){
    if (!this.currentUserEmail) {
      throw new Error('Usuário não logado');
    }
    const garantias = await this.getGarantias();
    for (let g of garantias){
      if(g.nome == garantia.nome){
        g.categoria = garantia.categoria;
        g.dataCompra = garantia.dataCompra;
        g.dataExpiracao = garantia.dataExpiracao;
        g.foto = garantia.foto;
        g.modelo = garantia.modelo;
        g.observacoes = garantia.observacoes;
        break; 
      }
    }
    await this._storage?.set(`${this.STORAGE_KEY}_${this.currentUserEmail}`, garantias);
    this._garantiasSubject.next(garantias); // Atualiza o subject após a remoção
    
    
  }

  
  //Método para remover garantias
  async removeGarantias(garantias: Garantia[]) {
    const garantiasAtuais = await this.getGarantias();
    garantias.forEach(garantia => {
      const index = garantiasAtuais.findIndex(g => g.nome === garantia.nome);
      if (index > -1) {
        garantiasAtuais.splice(index, 1);
      }
    });
    await this._storage?.set(`${this.STORAGE_KEY}_${this.currentUserEmail}`, garantiasAtuais);
    this._garantiasSubject.next(garantiasAtuais); // Notifica os assinantes que as garantias foram removidas
  }
}