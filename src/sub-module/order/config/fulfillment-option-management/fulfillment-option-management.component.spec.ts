import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillmentOptionManagementComponent } from './fulfillment-option-management.component';

describe('FulfillmentOptionManagementComponent', () => {
  let component: FulfillmentOptionManagementComponent;
  let fixture: ComponentFixture<FulfillmentOptionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FulfillmentOptionManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FulfillmentOptionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
