import { Component, OnInit } from '@angular/core';
import { NotificacaoService } from '../services/notificacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoeslista.page.html',
  styleUrls: ['./notificacoeslista.page.scss'],
})
export class NotificacoeslistaPage implements OnInit {
  notificacoes: any[] = [];

  constructor(private notificacaoService: NotificacaoService, private router: Router) { }

  // Método chamado ao inicializar o componente
  ngOnInit() {
    this.loadNotificacoes();
  }

  // Método chamado sempre que a página está prestes a ser exibida
  ionViewWillEnter() {
    this.loadNotificacoes();
  }

  // Carrega a lista de notificações chamando o serviço
  async loadNotificacoes() {
    this.notificacoes = await this.notificacaoService.getNotificacoes();
  }

  // Formata o tempo restante para exibição
  formatTempoRestante(tempoRestante: number): string {
    const seconds = Math.floor((tempoRestante / 1000) % 60);
    const minutes = Math.floor((tempoRestante / (1000 * 60)) % 60);
    const hours = Math.floor((tempoRestante / (1000 * 60 * 60)) % 24);
    const days = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // Cancela uma notificação específica e recarrega a lista
  async cancelarNotificacao(id: number) {
    const cancelado = await this.notificacaoService.cancelarNotificacao(id);
    if (cancelado) {
      // Recarregar a lista de notificações após cancelamento bem-sucedido
      this.loadNotificacoes();
    } else {
      console.error('Erro ao cancelar notificação.');
    }
  }

  // Cancela todas as notificações e recarrega a lista
  async cancelarTodasNotificacoes() {
    const cancelado = await this.notificacaoService.cancelarTodasNotificacoes();
    if (cancelado) {
      // Recarregar a lista de notificações após cancelamento bem-sucedido
      this.loadNotificacoes();
    } else {
      console.error('Erro ao cancelar todas as notificações.');
    }
  }

  // Navega para a página anterior
  public voltar() {
    this.router.navigateByUrl(`/tabs/tab2`);
  }

  
}