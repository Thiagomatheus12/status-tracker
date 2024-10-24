
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTable, TuiTablePagination, TuiTablePaginationEvent, tuiTablePaginationOptionsProvider } from '@taiga-ui/addon-table';
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { TuiStatus, TuiChevron, TuiSkeleton } from '@taiga-ui/kit';
import { FacadeService } from '../../shared/services/facade.service';
import { BehaviorSubject } from 'rxjs';
import { ICreateListApiInterface } from '../../shared/interfaces/create-list-api.interface';
import { ListShimmerComponent } from "./list-shimmer/list-shimmer.component";
import { ModalService } from '../../shared/services/modal.service';
import { ListMobileComponent } from "../list-mobile/list-mobile.component";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; // Importar o serviço

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
    ListShimmerComponent,
    ListMobileComponent,
    TuiTablePagination,

  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [tuiLoaderOptionsProvider({ size: 'xl' }),
  tuiTablePaginationOptionsProvider({showPages: false})],
})
export class ListComponent {

  /**
   * Data da lista.
   */
  private dataSubject: any = new BehaviorSubject<ICreateListApiInterface[]>([]);
  data$ = this.dataSubject.asObservable();

  /**]
   * Pagina atual
   */
  page = 0;

  /**
   * Tamanho da lista.
   */
  size = 10;

  /**
   * Itens total da lista.
   */
  total!: number;

  /**
   * Verifica se esta em loading.
   */
  isLoading = true;

  /**
   * Títulos da tabela.
   */
  headers = ['Nome API', 'URL', 'Tipo', 'Ações'];

  /**
   * Propriedades da tabela.
   */
  properties = ['alias', 'url', 'metodo'];

  /**
   * Contrutor da classe.
   * @param router Serviço de rotas
   * @param facadeService Serviço de lista.
   * @param modalService Serviço de modal.
   * @param breakpointObserver Serviço de breakpoint
   */
  constructor(
    private router: Router,
    private readonly facadeService: FacadeService,
    private readonly modalService: ModalService,
    private breakpointObserver: BreakpointObserver // Injete o BreakpointObserver
  ) { }

  /**
   * Inicializa o componente.
   */
  ngOnInit(): void {
    this.getList();
    this.isMobile()
  }

  /**
   * Verifica se é mobile ou desktop.
   */
  isMobile(): void {
    this.breakpointObserver.observe(['(max-width: 768px)'])
      .subscribe(result => {
        if (result.matches) this.size = 5;
        else this.size = 10;
        this.getList();
      });
  }

  /**
   * Indica o tamanho da lista e o tamanho.
   * @param param parametros da lista tamanho e página atual.
   */
  onPagination({ page, size }: TuiTablePaginationEvent): void {
    this.page = page;
    this.size = size;
    this.getList();
  }

  /**
   * Busca os dados da lista e faz a paginação.
   */
  getList(): void {
    this.isLoading = true;
    this.facadeService.getList().subscribe((response: ICreateListApiInterface[]) => {
      this.total = response.length;
      const startIndex = this.page * this.size;
      const paginatedData = response.slice(startIndex, startIndex + this.size);
      this.dataSubject.next(paginatedData);

      this.isLoading = false;
    });
  }

  /**
   * Exclui um item da lista através do ID.
   * @param id ID do item da lista.
   */
  exclude(id: string): void {
    let novoArray = this.dataSubject.value;
    this.facadeService.delete(id).subscribe().add(() => {
      novoArray = novoArray.filter((api: any) => api._id !== id);
      this.dataSubject.next(novoArray);
      this.modalService.showAlert('API excluída com sucesso!');
    });
  }

  /**
   * Navega para a página de edição.
   * @param id ID do item da lista.
   */
  edit(id: string): void {
    this.router.navigate([`edit/${id}`]);
  }

  /**
   * Navega para a página de visualização.
   * @param id ID do item da lista.
   */
  viewForm(id: string): void {
    this.router.navigate([`view/${id}`]);
  }
}
