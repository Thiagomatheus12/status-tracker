import { Component } from '@angular/core';
import { FormComponent } from '../../shared/components/form/form.component';
import { FacadeService } from '../../shared/services/facade.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-form',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './view-form.component.html',
  styleUrl: './view-form.component.scss'
})
export class ViewFormComponent {
  data: any;

  constructor(
    private readonly facadeService: FacadeService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.facadeService.get(this.id).subscribe((res) => {
      this.data = res;
    });
  }

  get id(): string {
    return this.route.snapshot.paramMap.get('id')!;
  }
}
