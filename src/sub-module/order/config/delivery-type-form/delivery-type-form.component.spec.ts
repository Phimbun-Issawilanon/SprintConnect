import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTypeFormComponent } from './delivery-type-form.component';

describe('DeliveryTypeFormComponent', () => {
  let component: DeliveryTypeFormComponent;
  let fixture: ComponentFixture<DeliveryTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
