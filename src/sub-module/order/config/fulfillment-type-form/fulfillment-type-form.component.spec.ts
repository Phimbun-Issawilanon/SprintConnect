import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillmentTypeFormComponent } from './fulfillment-type-form.component';

describe('FulfillmentTypeFormComponent', () => {
  let component: FulfillmentTypeFormComponent;
  let fixture: ComponentFixture<FulfillmentTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FulfillmentTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FulfillmentTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
