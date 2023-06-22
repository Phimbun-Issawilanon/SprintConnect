import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningNumberFormComponent } from './running-number-form.component';

describe('RunningNumberFormComponent', () => {
  let component: RunningNumberFormComponent;
  let fixture: ComponentFixture<RunningNumberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningNumberFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningNumberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
