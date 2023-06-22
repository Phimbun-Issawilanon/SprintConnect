import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillmentTypeManagementComponent } from './fulfillment-type-management.component';

describe('FulfillmentTypeManagementComponent', () => {
  let component: FulfillmentTypeManagementComponent;
  let fixture: ComponentFixture<FulfillmentTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FulfillmentTypeManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FulfillmentTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
