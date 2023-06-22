import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySubtypeFormComponent } from './delivery-subtype-form.component';

describe('DeliverySubtypeFormComponent', () => {
  let component: DeliverySubtypeFormComponent;
  let fixture: ComponentFixture<DeliverySubtypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverySubtypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverySubtypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
