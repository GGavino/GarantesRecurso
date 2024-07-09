import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotificacaoService } from '../services/notificacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  notificacoesAtivadas: boolean = true; // Variável para controlar o estado das notificações

  constructor(private alertController: AlertController, private notificacaoService: NotificacaoService, private router: Router) { }


  // Método para alternar o estado das notificações
  async toggleNotificacoes() {
    if (!this.notificacoesAtivadas) {
      const alert = await this.alertController.create({
        header: 'Desativar Notificações',
        message: 'Tem a certeza de que deseja desativar as notificações? Não irá receber notificações sobre prazos de garantia próximos da data de vencimento',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              // Reverter o estado do toggle para true se o usuário cancelar
              this.notificacoesAtivadas = true;
            }
          }, {
            text: 'Confirmar',
            handler: () => {
              // Desativar as notificações apenas quando o usuário confirmar
              console.log('Notificações desativadas');
              this.notificacoesAtivadas = false;
              // Chama o método para alterar o estado das notificações no serviço
              this.notificacaoService.alterarEstadoNotificacoes(this.notificacoesAtivadas);
            }
          }
        ]
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Ativar Notificações',
        message: 'Tem a certeza de que deseja ativar as notificações? Irá receber notificações sobre prazos de garantia próximos da data de vencimento',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              // Reverter o estado do toggle para false se o usuário cancelar
              this.notificacoesAtivadas = false;
            }
          }, {
            text: 'Confirmar',
            handler: () => {
              // Ativar as notificações apenas quando o usuário confirmar
              console.log('Notificações ativadas');
              this.notificacoesAtivadas = true;
              // Chama o método para alterar o estado das notificações no serviço
              this.notificacaoService.alterarEstadoNotificacoes(this.notificacoesAtivadas);
            }
          }
        ]
      });

      await alert.present();
    }
  }
  
  // Método para redirecionar para a página de visualização de notificações
  public verNotificacoes() {
    this.router.navigateByUrl('/notificacoeslista');
  }


}
