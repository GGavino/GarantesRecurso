import { Component, OnInit } from '@angular/core';
import { Garantia } from '../services/garantias.service';
import { GarantiasService } from '../services/garantias.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Categoria, CategoriasService } from '../services/categorias.service';


@Component({
  selector: 'app-add-garantia',
  templateUrl: './add-garantia.page.html',
  styleUrls: ['./add-garantia.page.scss'],
})

export class AddGarantiaPage implements OnInit {

  categorias: Categoria[] = [];
  novaCategoria: Categoria = {nome: 'teste'}
  fotoSelecionada: boolean = false;
  TAMANHO_MAXIMO_IMAGEM: number = 1024 * 1024;

  // Inicialização de uma nova garantia com valores padrão
  novaGarantia: Garantia = {
    nome: '',
    modelo: '',
    categoria: '',
    dataCompra: new Date().toISOString(),
    dataExpiracao: new Date().toISOString(),
    observacoes: '',
    foto: ''
  };

  constructor(private garantiasService: GarantiasService, 
    private router: Router, 
    private toastController: ToastController,
    private categoriasService: CategoriasService) { }

  ngOnInit() {
    this.categoriasService.getCategoriasObservable().subscribe(categorias => {
      this.categorias = categorias;
      });
  }


  // Método para adicionar uma nova garantia
  public adicionarGarantia() {
    if (this.validarCampos()) {
      this.garantiasService.addGarantia(this.novaGarantia);
      // Feedback ao utilizador de que a garantia foi adicionada com sucesso
      this.mostrarMensagem("Garantia adicionada com sucessoaa!");
      // Navegar de volta para a página de lista de garantias
      this.limparCampos();
      this.router.navigateByUrl(`/tabs/tab1`);
    }
  }
  
  public abrirCategoria() {

    this.router.navigateByUrl(`categorias`);     
    
  }

  // Método para limpar os campos do formulário após adicionar uma garantia
  private limparCampos() {
    this.novaGarantia = {
      nome: '',
      modelo: '',
      categoria: '',
      dataCompra: new Date().toISOString(),
      dataExpiracao: new Date().toISOString(),
      observacoes: '',
      foto: ''
    };
  }

  // Método para validar os campos do formulário
  private validarCampos(): boolean {
    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!this.novaGarantia.nome || this.novaGarantia.nome.trim() === '') {
      this.mostrarMensagem("Por favor, preencha o nome da garantia.");
      return false;
    }
    if (!this.novaGarantia.modelo || this.novaGarantia.modelo.trim() === '') {
      this.mostrarMensagem("Por favor, preencha o modelo da garantia.");
      return false;
    }
    if (!this.novaGarantia.dataCompra) {
      this.mostrarMensagem("Por favor, selecione a data de compra da garantia.");
      return false;
    }
    if (!this.novaGarantia.dataExpiracao) {
      this.mostrarMensagem("Por favor, selecione a data de expiração da garantia.");
      return false;
    }

    // Verificar se a data de compra não é no futuro
    const data_Compra = new Date(this.novaGarantia.dataCompra);
    const today = new Date();
    if (data_Compra > today) {
      this.mostrarMensagem("A data de compra não pode ser no futuro.");
      return false;
    }

    // Verificar se a data de expiração é posterior à data de compra
    const dataCompra = new Date(this.novaGarantia.dataCompra);
    const dataExpiracao = new Date(this.novaGarantia.dataExpiracao);
    if (dataExpiracao <= dataCompra) {
      this.mostrarMensagem("A data de expiração deve ser posterior à data de compra.");
      return false;
    }
    
    return true; // Todos os campos obrigatórios estão preenchidos e válidos
  }

  // Método para mostrar uma mensagem de feedback ao utilizador
  private async mostrarMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000, // Duração da mensagem em milissegundos (opcional)
      position: 'bottom' // Posição da mensagem
    });
    toast.present();
  }

  // Método para escolher uma foto da galeria
  async escolherFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64Image = await this.convertFileToBase64(file);
        this.novaGarantia.foto = base64Image;
      } catch (error) {
        console.error('Erro ao converter imagem para base64', error);
      }
    }
  }

  // Método para voltar para a página anterior
  public voltar() {
    this.router.navigateByUrl(`/tabs/tab1`);
    this.limparFoto();
  }

  // Método para converter um arquivo em base64
  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  // Métodos para lidar com a alteração das datas de compra e expiração
  public handleDataDeCompraChange(event: any) {
    this.novaGarantia.dataCompra = event.detail.value;
  }

  public handleDataDeExpiracaoChange(event: any) {
    this.novaGarantia.dataExpiracao = event.detail.value;
  }

  // Método para limpar a foto selecionada
  private limparFoto() {
    this.novaGarantia.foto = ''; // Defina como vazio para limpar a foto
  }
}