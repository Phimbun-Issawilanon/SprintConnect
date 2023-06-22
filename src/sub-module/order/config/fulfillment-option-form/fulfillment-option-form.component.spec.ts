import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillmentOptionFormComponent } from './fulfillment-option-form.component';

describe('FulfillmentOptionFormComponent', () => {
  let component: FulfillmentOptionFormComponent;
  let fixture: ComponentFixture<FulfillmentOptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FulfillmentOptionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FulfillmentOptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
