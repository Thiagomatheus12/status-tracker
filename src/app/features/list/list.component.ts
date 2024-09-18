
import { Router, RouterModule } from '@angular/router';

import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTable } from '@taiga-ui/addon-table';
import {
  TuiAutoColorPipe,
  TuiButton,
  TuiDropdown,
  TuiIcon,
  TuiInitialsPipe,
  TuiLink,
  TuiTitle,
  TuiAlertService,
  TuiDialogService
} from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiCheckbox,
  TuiChip,
  TuiItemsWithMore,
  TuiProgressBar,
  TuiRadioList,
  TuiStatus,
  TuiConfirmData

} from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';
import { FacadeService } from '../../shared/services/facade.service';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { TuiAsideItemDirective } from '@taiga-ui/layout';
import { switchMap } from 'rxjs';
import { ICreateListApiInterface } from '../../shared/interfaces/create-list-api.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    NgForOf,
    NgIf,
    TuiAutoColorPipe,
    TuiAvatar,
    TuiBadge,
    TuiButton,
    TuiCell,
    TuiCheckbox,
    TuiChip,
    TuiDropdown,
    TuiIcon,
    TuiInitialsPipe,
    TuiItemsWithMore,
    TuiLink,
    TuiProgressBar,
    TuiRadioList,
    TuiStatus,
    TuiTable,
    TuiTitle,
    TuiAsideItemDirective,
    TuiButton
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {

  data!: Array<ICreateListApiInterface>

  constructor(
    private router: Router,
    private readonly facade: FacadeService
  ) { }

  private readonly dialogs = inject(TuiDialogService);
  private readonly alerts = inject(TuiAlertService);

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.facade.getList().subscribe((res) => {
      console.log(res);
      this.data = res;
    });
  }

  edit(id: number): void {
    this.router.navigate([`edit/${id}`]);
  }

  exclude(id: number): void {
    this.facade.delete(id).subscribe(() => {
    })
  }


  protected onClick(id: number): void {
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
            this.exclude(id);
            return this.alerts.open('API excluída com sucesso!');
          } else {
            return this.alerts.open('Ação cancelada!');
          }
        })
      )
      .subscribe();
  }

  mockApiResponse: ICreateListApiInterface[] = [
    {
      id: 1,
      alias: 'GetUser',
      url: '/api/users/1',
      corpo: undefined,
      metodo: 'GET',
      cabecalho: [
        {
          propriedade: 'Content-Type',
          valor: 'application/json'
        }
      ]
    },
    {
      id: 2,
      alias: 'CreateUser',
      url: '/api/users',
      corpo: '{"name": "John Doe", "email": "john.doe@example.com"}',
      metodo: 'POST',
      cabecalho: [
        {
          propriedade: 'Content-Type',
          valor: 'application/json'
        },
        {
          propriedade: 'Authorization',
          valor: 'Bearer token'
        }
      ]
    },
    {
      id: 3,
      alias: 'UpdateUser',
      url: '/api/users/1',
      corpo: '{"name": "Jane Doe"}',
      metodo: 'PUT',
      cabecalho: [
        {
          propriedade: 'Content-Type',
          valor: 'application/json'
        }
      ]
    },
    {
      id: 4,
      alias: 'DeleteUser',
      url: '/api/users/1',
      metodo: 'DELETE',
      cabecalho: [
        {
          propriedade: 'Authorization',
          valor: 'Bearer token'
        }
      ]
    }
  ];
}
