import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'
import { GarantiasService } from '../services/garantias.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  nome: string = ''; // Nome do utilizador
  apelido: string = ''; // Apelido do utilizador
  email: string = ''; // Email do utilizador

  constructor(private router: Router, private alertController: AlertController, private storage: Storage, private garantiasService: GarantiasService) { }

  // Método executado ao iniciar a página
  async ngOnInit() {
    const currentUserEmail = await this.garantiasService.getCurrentUserEmail(); // Obtenha o email do usuário logado do serviço de garantias

    if (currentUserEmail) {
      const user = await this.garantiasService.getUserByEmail(currentUserEmail); // Obtenha as informações do usuário do serviço de garantias

      if (user) {
        this.nome = user.nome;
        this.apelido = user.apelido;
        this.email = user.email;
      }
    }
  }

  // Método para fazer logout
  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Tem a certeza de que deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Operação de logout cancelada');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            console.log('Exiting...');
            document.body.classList.add('logout-animation');
            setTimeout(() => {
              // Redirecionar após a animação
              this.router.navigateByUrl('/menu-entrada');

            }, 300); // Duração da animação em milissegundos
          }
        }
      ]
    });

    await alert.present();
  }
}