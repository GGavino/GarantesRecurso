import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { GarantiasService } from '../services/garantias.service';
import { ConfigService } from '../services/config-service.service';


@Component({
  selector: 'app-menu-entrada',
  templateUrl: './menu-entrada.page.html',
  styleUrls: ['./menu-entrada.page.scss'],
})
export class MenuEntradaPage implements OnInit {

  email: string = '';
  password: string = '';
  codigoAtivacao: string = '';
  menuLogo: string = '';

  constructor(private authService: AuthService, private appStorage: Storage,
    private router: Router, private alertController: AlertController,
    private garantiasService: GarantiasService,
    private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getConfig().subscribe((data: any) => {
      this.menuLogo = data.menuLogo;
    });
    this.clearFields();
  }


  //Método login para entrar na conta
  async login() {
    const isLoggedIn = await this.authService.login(this.email, this.password);

    if (isLoggedIn) {
      await this.appStorage.set('currentUserEmail', this.email);
      this.garantiasService.setCurrentUserEmail(this.email);  // Define o email do usuário no GarantiasService
      await this.garantiasService.getGarantias();  // Carrega as garantias associadas ao usuário logado
      this.clearFields();
      this.router.navigateByUrl('/tabs');
    } else {
      console.error('Login failed: Invalid email or password');
      await this.mostrarAlertaErro('Credenciais inválidas', 'Por favor, verifique o seu e-mail e a sua palavra-passe e tente novamente.');
    }
  }

  async ativarConta() {
    // Verificar se o código de ativação inserido está correto
    const codigoCorreto = 'garantes2024';

    if (this.codigoAtivacao === codigoCorreto) {
      // Código correto, redirecionar para a página de registro
      this.router.navigateByUrl('/menu-registo');
      this.clearFields();
    } else {
      // Código incorreto, exibir mensagem de erro
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Código de ativação incorreto.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  //Limpeza dos campos
  clearFields() {
    // Limpa os valores das variáveis
    this.email = '';
    this.password = '';
    this.codigoAtivacao = '';
  }

  // Mostrar popup de erro
  async mostrarAlertaErro(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

}


