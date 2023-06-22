import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeManagementComponent } from './order-type-management.component';

describe('OrderTypeManagementComponent', () => {
  let component: OrderTypeManagementComponent;
  let fixture: ComponentFixture<OrderTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTypeManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
