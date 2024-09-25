
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, TuiAlertService, TuiDialogService, TuiDataList, TuiDropdown, TuiIcon, TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { TuiStatus, TuiConfirmData, TuiChevron } from '@taiga-ui/kit';
import { FacadeService } from '../../shared/services/facade.service';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { BehaviorSubject, finalize, switchMap } from 'rxjs';
import { ICreateListApiInterface } from '../../shared/interfaces/create-list-api.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    TuiStatus,
    TuiTable,
    TuiButton,
    TuiChevron,
    TuiDataList,
    TuiDropdown,
    TuiIcon,
    TuiLoader
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [tuiLoaderOptionsProvider({size: 'xl'})],

})
export class ListComponent {

  private dataSubject: any = new BehaviorSubject<ICreateListApiInterface[]>([]);
  data$ = this.dataSubject.asObservable();

  isLoading = true;

  headers = ['Nome API', 'URL', 'Tipo', 'Ações'];

  properties = ['alias', 'url', 'metodo'];

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
    this.facade.getList().subscribe((res) => this.dataSubject.next(res)).add(() => this.isLoading = false);
  }

  edit(id: string): void {
    this.router.navigate([`edit/${id}`]);
  }

  exclude(id: string): void {
    this.facade.delete(id).subscribe().add(() => this.getList());
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
            this.exclude(id);
            return this.alerts.open('API excluída com sucesso!', { appearance: 'success' });
          } else {
            return this.alerts.open('Ação cancelada!');
          }
        })
      )
      .subscribe();
    }

}
