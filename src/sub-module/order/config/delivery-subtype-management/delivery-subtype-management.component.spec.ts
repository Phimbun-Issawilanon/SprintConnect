import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySubtypeManagementComponent } from './delivery-subtype-management.component';

describe('DeliverySubtypeManagementComponent', () => {
  let component: DeliverySubtypeManagementComponent;
  let fixture: ComponentFixture<DeliverySubtypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverySubtypeManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverySubtypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
