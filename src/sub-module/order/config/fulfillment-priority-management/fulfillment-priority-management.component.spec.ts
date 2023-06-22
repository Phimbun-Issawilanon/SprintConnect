import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillmentPriorityManagementComponent } from './fulfillment-priority-management.component';

describe('FulfillmentPriorityManagementComponent', () => {
  let component: FulfillmentPriorityManagementComponent;
  let fixture: ComponentFixture<FulfillmentPriorityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FulfillmentPriorityManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FulfillmentPriorityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
