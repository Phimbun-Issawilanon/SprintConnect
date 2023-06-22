import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFulfillmentTypeFormComponent } from './order-fulfillment-type-form.component';

describe('OrderFulfillmentTypeFormComponent', () => {
  let component: OrderFulfillmentTypeFormComponent;
  let fixture: ComponentFixture<OrderFulfillmentTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFulfillmentTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFulfillmentTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
