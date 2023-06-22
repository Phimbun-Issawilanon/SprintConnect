import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillmentPriorityFormComponent } from './fulfillment-priority-form.component';

describe('FulfillmentPriorityFormComponent', () => {
  let component: FulfillmentPriorityFormComponent;
  let fixture: ComponentFixture<FulfillmentPriorityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FulfillmentPriorityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FulfillmentPriorityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
