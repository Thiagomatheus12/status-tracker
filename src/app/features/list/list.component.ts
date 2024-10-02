
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { TuiStatus, TuiChevron, TuiSkeleton } from '@taiga-ui/kit';
import { FacadeService } from '../../shared/services/facade.service';
import { BehaviorSubject } from 'rxjs';
import { ICreateListApiInterface } from '../../shared/interfaces/create-list-api.interface';
import { ListShimmerComponent } from "./list-shimmer/list-shimmer.component";
import { ModalService } from '../../shared/services/modal.service';

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
    TuiSkeleton,
    ListShimmerComponent
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
    private readonly facade: FacadeService,
    private readonly modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.facade.getList().subscribe((res) => this.dataSubject.next(res)).add(() => this.isLoading = false);
  }

  exclude(id: string): void {
    this.facade.delete(id).subscribe().add(() =>{
      this.modalService.showAlert('API excluída com sucesso!');
      this.getList()
    });
  }

  edit(id: string): void {
    this.router.navigate([`edit/${id}`]);
  }

  viewForm(id: string): void {
    this.router.navigate([`view/${id}`]);
  }
}
