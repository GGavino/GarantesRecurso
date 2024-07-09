import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria, CategoriasService } from '../services/categorias.service';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  isModalOpen: Boolean = false;
  isModalEditOpen: Boolean = false;
  filteredCategorias: Categoria[] = []; // Lista de categorias filtradas
  categoriasSelecionadas: Categoria[] = []; // Lista de categorias selecionadas
  novaCategoria: Categoria = { nome: ''}; // Nova categoria a ser adicionada
  velhaCategoria: Categoria = { nome: ''};
  showFilterOptions = false; // Variável para controlar se as opções de filtro devem ser mostradas
  searchTerm: string = ''; // Termo de pesquisa
  categorias: Categoria[] = [];

  constructor( private categoriaService: CategoriasService,
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController)
    { }

  ngOnInit() {
    this.categoriaService.getCategoriasObservable().subscribe(categorias =>{
      this.categorias = categorias;
      this.filteredCategorias = categorias;
    })
  }

  
  OpenClose() {
    this.isModalOpen = !this.isModalOpen;
  }

  
  ionViewWillEnter() {
    this.loadCategorias(); // Recarrega a lista de categorias quando a página for exibida
  }

  ionViewWillLeave() {
    // Limpar as categorias selecionadas ao sair da página
    this.categoriasSelecionadas = [];
  }

  async loadCategorias() {
    this.categorias = await this.categoriaService.getCategorias();
    this.applyFilter();
  }

  // Método para remover uma categoria
  async removeCategoria(categoria: Categoria) {
    const confirmHandler = async () => {
      await this.categoriaService.removeCategoria(categoria);
      this.loadCategorias();
    };

    await this.presentAlertConfirm('Tem a certeza de que deseja remover esta categoria?', confirmHandler);
  }

  // Método para remover várias categorias
  async removeCategorias() {
    const confirmHandler = async () => {
      await this.categoriaService.removeCategorias(this.categoriasSelecionadas);
      this.loadCategorias();
      this.categoriasSelecionadas = [];
    };

    await this.presentAlertConfirm('Tem a certeza de que deseja remover todas as categorias selecionadas?', confirmHandler);
  }

  // Adiciona uma nova categoria
  async addCategoria() {
    if (this.novaCategoria) {
      await this.categoriaService.addCategoria(this.novaCategoria);
      this.novaCategoria = { nome: ''};
      this.loadCategorias();
    }
  }


  // Realiza uma pesquisa sobre categorias
  public onSearch(event: CustomEvent) {
    this.searchTerm = event.detail.value.toLowerCase();
    this.applyFilter();
  }

  // Seleciona ou deseleciona uma categoria
  toggleSelection(categoria: Categoria) {
    const index = this.categoriasSelecionadas.indexOf(categoria);
    if (index > -1) {
      this.categoriasSelecionadas.splice(index, 1);
    } else {
      this.categoriasSelecionadas.push(categoria);
    }
  }

  // Seleciona todas as categorias
  selectAll() {
    this.categoriasSelecionadas.length === this.filteredCategorias.length ? this.categoriasSelecionadas = [] : this.categoriasSelecionadas = [...this.filteredCategorias];
  }

  // Alterna a exibição das opções de filtro
  toggleFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }

  // Abre as opções de filtro
  public openFilterOptions() {
    this.showFilterOptions = true;
  }

  // Fecha as opções de filtro
  public closeFilterOptions() {
    this.showFilterOptions = false;
  }



  // Aplica o filtro às categorias ou procurar pela categoria na Search Bar
  private applyFilter() {
    let filteredCategorias = [...this.categorias];

    //Procurar usando a Search Bar
    if (this.searchTerm) {
      filteredCategorias = filteredCategorias.filter(categoria =>
        categoria.nome.toLowerCase().includes(this.searchTerm)
      );
    }

    this.filteredCategorias = filteredCategorias;
  }

  // Método para exibir um toast com uma mensagem
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  // Método para navegar para a página de adicionar categoria
  public AddCategoria() {
    this.categoriaService.addCategoria(this.novaCategoria);
    this.novaCategoria = { nome: ''};
    this.OpenClose();
  }

  //Método para ver categoria tendo com chave o seu nome
  public editCategoria(categoriaNome: string) {
    if(this.isModalEditOpen){
      this.novaCategoria = {nome: ''};
      this.velhaCategoria= {nome: ''};
    }else{
      this.novaCategoria = {nome: categoriaNome};
      this.velhaCategoria= {nome: categoriaNome};      
    }
    this.isModalEditOpen = !this.isModalEditOpen;
  }

  public UpdateCategoria(){
    this.categoriaService.updateCategoria(this.velhaCategoria,this.novaCategoria);
    this.editCategoria('');
  }

  // Método para alertar em caso de eliminação
  async presentAlertConfirm(message: string, confirmHandler: () => void) {
    const alert = await this.alertController.create({
      header: 'Confirmar Remoção',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Remoção cancelada');
          }
        },
        {
          text: 'Remover',
          handler: confirmHandler
        }
      ]
    });

    await alert.present();
  }
  
  // Método para voltar para a página anterior
  public voltar() {
    this.router.navigateByUrl(`/add-garantia`);
  }
  public cancel(){
    this.novaCategoria = { nome: ''};
    this.OpenClose()
  }
}


