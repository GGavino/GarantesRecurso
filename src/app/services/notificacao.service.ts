import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  private ultimaNotificacaoId: number=0;
  notificacoesAtivadas: boolean = true;


  constructor() {
    this.init();
  }

  // Inicialização do serviço de notificações
  async init() {
    try {
      // Solicitar permissão para notificações
      const permission = await LocalNotifications.requestPermissions();
      if (permission.display === 'granted') {
        console.log('Permissão concedida para notificações locais');
        // Obtém notificações pendentes
        const pending = await LocalNotifications.getPending();
        if (pending.notifications.length > 0) {
          // Atualiza o ID da última notificação
          const maxId = Math.max(...pending.notifications.map(notification => notification.id));
          this.ultimaNotificacaoId = maxId;
        }
      } else {
        console.error('Permissão negada para notificações locais');
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão para notificações locais: ', error);
    }
  }

  // Método para enviar uma nova notificação
  async sendNotificacao(title: string, body: string, notificationDate: Date): Promise<boolean> {

    if (!this.notificacoesAtivadas) {
      return false; // Não executa se as notificações estiverem desativadas
    }

      // Incrementa o ID da notificação
      this.ultimaNotificacaoId += 1;
      const notificationId = this.ultimaNotificacaoId;
  
      // Opções de agendamento da notificação
      let options:ScheduleOptions={
        notifications: [
          {
            id: notificationId,
            title: title,
            body: body,
            schedule: { at: notificationDate }
          }
        ]
      }

      try{
        await LocalNotifications.schedule(options);
        console.log(`Nova notificação: ${title} - ${body}`);
        return true;
      }
      catch(error){
        console.error('Erro ao agendar notificação local: ', error);
        return false;
      }
  }


  // Método para obter todas as notificações pendentes
  async getNotificacoes() {

    if (!this.notificacoesAtivadas) {
      return []; // Retorna uma lista vazia se as notificações estiverem desativadas
    }

    try {
      const pending = await LocalNotifications.getPending();
      console.log('Notificações agendadas:', pending);
    return pending.notifications.map(notification => {
      const tempoRestante = notification.schedule && notification.schedule.at ? this.calcularTempoRestante(notification.schedule.at) : 0;
      return {
        ...notification,
        tempoRestante
      };
    });
    } catch (error) {
      console.error('Erro ao verificar as notificações agendadas:', error);
      return [];
    }
  }

  // Método para calcular o tempo restante até a notificação
  private calcularTempoRestante(dataNotificacao: Date): number {
    const agora = new Date().getTime();
    const dataNotificacaoTime = new Date(dataNotificacao).getTime();
    return dataNotificacaoTime - agora;
  }

  // Método para cancelar uma notificação
  async cancelarNotificacao(id: number): Promise<boolean> {

    if (!this.notificacoesAtivadas) {
      return false; // Não executa se as notificações estiverem desativadas
    }

    try {
      await LocalNotifications.cancel({ notifications: [{ id: id }] });
      console.log(`Notificação cancelada com sucesso: ID ${id}`);
      return true;
    } catch (error) {
      console.error('Erro ao cancelar notificação: ', error);
      return false;
    }
  }

  // Método para cancelar todas as notificações pendentes
  async cancelarTodasNotificacoes(): Promise<boolean> {
  
    try {
      const pending = await LocalNotifications.getPending();
      const ids = pending.notifications.map(notification => notification.id);
      await LocalNotifications.cancel({ notifications: ids.map(id => ({ id })) });
      console.log('Todas as notificações canceladas com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao cancelar todas as notificações: ', error);
      return false;
    }
  }

  // Método para alterar o estado das notificações
  alterarEstadoNotificacoes(ativado: boolean) {
    this.notificacoesAtivadas = ativado;
    if (!ativado) {
      this.cancelarTodasNotificacoes(); // Cancela todas as notificações se as notificações estiverem desativadas
    }
  }
}
