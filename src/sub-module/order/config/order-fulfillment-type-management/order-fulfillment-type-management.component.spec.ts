import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFulfillmentTypeManagementComponent } from './order-fulfillment-type-management.component';

describe('OrderFulfillmentTypeManagementComponent', () => {
  let component: OrderFulfillmentTypeManagementComponent;
  let fixture: ComponentFixture<OrderFulfillmentTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFulfillmentTypeManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFulfillmentTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
