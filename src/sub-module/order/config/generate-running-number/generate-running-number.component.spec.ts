import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateRunningNumberComponent } from './generate-running-number.component';

describe('GenerateRunningNumberComponent', () => {
  let component: GenerateRunningNumberComponent;
  let fixture: ComponentFixture<GenerateRunningNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateRunningNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateRunningNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
