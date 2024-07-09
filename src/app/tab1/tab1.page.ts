import { Component, OnInit } from '@angular/core';
import { Garantia, GarantiasService } from '../services/garantias.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { NotificacaoService } from '../services/notificacao.service';
import { ToastController } from '@ionic/angular';
import { Categoria, CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  garantias: Garantia[] = []; // Lista de garantias
  filteredGarantias: Garantia[] = []; // Lista de garantias filtradas
  garantiasSelecionadas: Garantia[] = []; // Lista de garantias selecionadas
  novaGarantia: Garantia = { nome: '', modelo: '', categoria: '', dataCompra: '', dataExpiracao: '', observacoes: '', foto: '' }; // Nova garantia a ser adicionada
  selectedFilter: number | null = null; // Filtro selecionado
  selectedFilterCategoria: string | null = null;
  selectedNotificationPeriod: number | null = null; // Período de notificação selecionado
  showFilterOptions = false; // Variável para controlar se as opções de filtro devem ser mostradas
  showFilterCategorias = false; // Variável para controlar se as opções de filtro devem ser mostradas
  searchTerm: string = ''; // Termo de pesquisa
  categorias: Categoria[] = [];

  constructor(private router: Router, private garantiasService: GarantiasService,
    private categoriasService: CategoriasService,
    private modalController: ModalController,
    private notificacaoService: NotificacaoService,
    private toastController: ToastController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.garantiasService.getGarantiasObservable().subscribe(garantias => {
      this.garantias = garantias;
      this.filteredGarantias = garantias;
    });
    this.categoriasService.getCategoriasObservable().subscribe(categorias => {
      this.categorias = categorias;
    });
    
  }

  ionViewWillEnter() {
    this.loadGarantias(); // Recarrega a lista de garantias quando a página for exibida
  }

  ionViewWillLeave() {
    // Limpar as garantias selecionadas ao sair da página
    this.garantiasSelecionadas = [];
  }

  async loadGarantias() {
    this.garantias = await this.garantiasService.getGarantias();
    this.applyFilter();
  }

  // Método para remover uma garantia
  async removeGarantia(garantia: Garantia) {
    const confirmHandler = async () => {
      await this.garantiasService.removeGarantia(garantia);
      this.loadGarantias();
    };

    await this.presentAlertConfirm('Tem a certeza de que deseja remover esta garantia?', confirmHandler);
  }

  // Método para remover várias garantias
  async removeGarantias() {
    const confirmHandler = async () => {
      await this.garantiasService.removeGarantias(this.garantiasSelecionadas);
      this.loadGarantias();
      this.garantiasSelecionadas = [];
    };

    await this.presentAlertConfirm('Tem a certeza de que deseja remover todas as garantias selecionadas?', confirmHandler);
  }

  // Adiciona uma nova garantia
  async addGarantia() {
    if (this.novaGarantia) {
      await this.garantiasService.addGarantia(this.novaGarantia);
      this.novaGarantia = { nome: '', modelo: '', categoria: '', dataCompra: '', dataExpiracao: '', observacoes: '', foto: '' };
      this.loadGarantias();
    }
  }


  // Realiza uma pesquisa sobre garantias
  public onSearch(event: CustomEvent) {
    this.searchTerm = event.detail.value.toLowerCase();
    this.applyFilter();
  }

  // Seleciona ou deseleciona uma garantia
  toggleSelection(garantia: Garantia) {
    const index = this.garantiasSelecionadas.indexOf(garantia);
    if (index > -1) {
      this.garantiasSelecionadas.splice(index, 1);
    } else {
      this.garantiasSelecionadas.push(garantia);
    }
  }

  // Seleciona todas as garantias
  selectAll() {
    this.garantiasSelecionadas.length === this.filteredGarantias.length ? this.garantiasSelecionadas = [] : this.garantiasSelecionadas = [...this.filteredGarantias];
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

  // Define o filtro de meses
  public setFilter(months: number) {
    this.selectedFilter = months;
    this.applyFilter();
  }

    // Define o filtro de meses
  public setFilterCategoria(nome: string) {
    this.selectedFilterCategoria = nome;
    this.applyFilter();
  }

  // Limpa o filtro
  async clearFilter() {
    this.selectedFilter = null;
    this.selectedFilterCategoria = null;
    await this.loadGarantias();
  }

  // Aplica o filtro às garantias ou procurar pela garantia na Search Bar
  private applyFilter() {
    let filteredGarantias = [...this.garantias];

    if (this.selectedFilter !== null) {
      //Calculo para obter o prazo de validade da garantia e filtrar de acordo
      const today = new Date();
      filteredGarantias = filteredGarantias.filter(garantia => {
        const dataExpiracao = new Date(garantia.dataExpiracao);
        const diffTime = Math.abs(dataExpiracao.getTime() - today.getTime());
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
        return diffMonths <= (this.selectedFilter ?? 0);
      });
    }
    if(this.selectedFilterCategoria !== null){
      filteredGarantias = filteredGarantias.filter(garantia =>{
        return garantia.categoria == this.selectedFilterCategoria;
      })
    }
    //Procurar usando a Search Bar
    if (this.searchTerm) {
      filteredGarantias = filteredGarantias.filter(garantia =>
        garantia.nome.toLowerCase().includes(this.searchTerm)
      );
    }

    this.filteredGarantias = filteredGarantias;
  }

  async setNotificationPeriod(days: number) {
    // Define o período de notificação selecionado pelo utilizador
    this.selectedNotificationPeriod = days;

    // Verifica se o período de dias foi definido e se há garantias selecionadas
    if (days && this.garantiasSelecionadas.length > 0) {
      const today = new Date(); // Obtém a data de hoje

      // Filtra as garantias selecionadas que estão dentro do período de notificação
      const garantiasParaNotificar = this.garantiasSelecionadas.filter(garantia => {
        const dataExpiracao = new Date(garantia.dataExpiracao);
        const diffTime = Math.abs(dataExpiracao.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);

        // Retorna verdadeiro se a garantia expirar dentro do período de notificação
        return diffDays >= days && diffDays > 0;
      });

      // Para cada garantia selecionada dentro do período de notificação
      garantiasParaNotificar.forEach(async garantia => {

        const dataExpiracao = new Date(garantia.dataExpiracao); // calcular dataExpiracao dentro do loop

        // Calcula a data da notificação subtraindo os dias do período de notificação da data de expiração
        const notificationDate = new Date(dataExpiracao.getTime() - days * 24 * 60 * 60 * 1000);

        // Agenda uma notificação para a garantia expirando em breve
        const success = await this.notificacaoService.sendNotificacao(
          `Garantia Expirando: ${garantia.nome}`,
          `A garantia do produto ${garantia.nome} está expirando em breve. Verifique os detalhes.`,
          notificationDate // Passa a data de notificação
        );

        // Exibe um toast indicando o sucesso ou falha ao agendar a notificação
        if (success) {
          // Exibe um toast de sucesso
          this.presentToast(`Notificação agendada para: ${garantia.nome}`, 'success');
        } else {
          // Exibe um toast de erro
          this.presentToast(`Falha ao agendar notificação para: ${garantia.nome}`, 'danger');
        }
      });
    }
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

  // Método para navegar para a página de adicionar garantia
  public goAddGarantiaPage() {
    this.router.navigateByUrl(`/add-garantia`);
  }

  //Método para ver garantia tendo com chave o seu nome
  public verGarantia(garantiaNome: string) {
    const encodedGarantiaNome = encodeURIComponent(garantiaNome);
    this.router.navigateByUrl(`/ver-garantia/${encodedGarantiaNome}`);
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
}
