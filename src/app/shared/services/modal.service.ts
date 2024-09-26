import { inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

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
