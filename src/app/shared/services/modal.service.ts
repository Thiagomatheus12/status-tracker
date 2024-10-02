import { inject, Injectable } from '@angular/core';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { FacadeService } from './facade.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  /**
 * Serviço de alertas para notificações.
 */
  private readonly alerts = inject(TuiAlertService);

  /**
 * Função que exibe uma notificação para o usuário.
 * @param message Mensagem a ser exibida.
 */
  showAlert(message: string): void {
    this.alerts
      .open(`<strong>${message}</strong>`, { appearance: 'success' })
      .subscribe();
  }

}
