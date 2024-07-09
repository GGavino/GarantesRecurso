import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Garantia } from '../services/garantias.service';
import { GarantiasService } from '../services/garantias.service';

@Component({
  selector: 'app-ver-garantia',
  templateUrl: './ver-garantia.page.html',
  styleUrls: ['./ver-garantia.page.scss'],
})

export class VerGarantiaPage implements OnInit {
  garantia: Garantia | undefined;

  constructor(private router: Router, private rotaAtiva: ActivatedRoute, private garantiasService: GarantiasService) { }

  async ngOnInit() {
    const garantiaName = this.rotaAtiva.snapshot.paramMap.get('garantiaNome'); // Obtém o nome da garantia da rota ativa
    const garantias = await this.garantiasService.getGarantias(); // Obtém todas as garantias do serviço GarantiasService
    this.garantia = garantias.find(garantia => garantia.nome === garantiaName); // Encontra a garantia com o nome correspondente
  }

  // Método para voltar para a página anterior
  public voltar() {
    this.router.navigateByUrl(`/tabs/tab1`);
  }

  // Método para calcular o prazo restante da garantia
  public calcularPrazo(): string {
    if (this.garantia) {
      const today: any = new Date();
      const dataExpiracao: any = new Date(this.garantia.dataExpiracao);

      const diffTime = dataExpiracao - today;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Usando Math.floor para arredondar para baixo
      const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculando as horas restantes

      // Verificar se é apenas um dia para mostrar "dia" em vez de "dias" 
      if (diffDays === 1) {
        return `${diffDays} dia`;
      } else if (diffDays > 1) {
        return `${diffDays} dias`;
      } else if (diffDays === 0 && diffHours === 1) {
        return `${diffHours} hora`;
      } else if (diffDays === 0 && diffHours > 1) {
        return `${diffHours} horas`;
      } else {
        return 'Garantia expirada';
      }
    }
    return 'Garantia não encontrada';
  }




  // Método para formatar a data
  formatDate(dateString: string | undefined): string {
    if (!dateString) {
      return 'Data não disponível';
    }

    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

}
