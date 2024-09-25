import { Component } from '@angular/core';
import { FacadeService } from '../../shared/services/facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateComponent } from "../create/create.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CreateComponent, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  data: any;

  constructor(
    private readonly facade: FacadeService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.facade.get(this.id).subscribe((res) => {
      this.data = res;
    });
  }

  get id(): string {
    return this.route.snapshot.paramMap.get('id')!;
  }

}
