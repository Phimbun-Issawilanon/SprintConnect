import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTypeManagementComponent } from './delivery-type-management.component';

describe('DeliveryTypeManagementComponent', () => {
  let component: DeliveryTypeManagementComponent;
  let fixture: ComponentFixture<DeliveryTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryTypeManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
