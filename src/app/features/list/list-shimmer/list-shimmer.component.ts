import { Component } from '@angular/core';
import { TuiSkeleton } from '@taiga-ui/kit';
import { TuiTable } from '@taiga-ui/addon-table';

@Component({
  selector: 'app-list-shimmer',
  standalone: true,
  imports: [TuiSkeleton, TuiTable],
  templateUrl: './list-shimmer.component.html',
  styleUrl: './list-shimmer.component.scss'
})
export class ListShimmerComponent {

  headers = ['Nome API', 'URL', 'Tipo', 'Ações'];
}
