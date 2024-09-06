import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListApiComponent } from './create-list-api.component';

describe('CreateListApiComponent', () => {
  let component: CreateListApiComponent;
  let fixture: ComponentFixture<CreateListApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateListApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateListApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
