import { inject, Injectable } from '@angular/core';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { TUI_CONFIRM, TuiConfirmData } from '@taiga-ui/kit';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  /**
 * Serviço de alertas para notificações.
 */
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);

  /**
 * Função que exibe uma notificação para o usuário.
 * @param message Mensagem a ser exibida.
 */
  showAlert(message: string): void {
    this.alerts
      .open(`<strong>${message}</strong>`, { appearance: 'success' })
      .subscribe();
  }

  onClick(id: string): void {

    const data: TuiConfirmData = {
      content:'',
      yes: 'Sim',
      no: 'Não',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Deseja realmente excluir?',
        size: 's',
        data,
      })
      .pipe(
        switchMap((response) => {
          if (response) {
            true
            return this.alerts.open('API excluída com sucesso!', { appearance: 'success' });
          } else {
            false
            return this.alerts.open('Ação cancelada!');
          }
        })
      )
      .subscribe();
    }

}
