import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningNumberTypeFormComponent } from './running-number-type-form.component';

describe('RunningNumberTypeFormComponent', () => {
  let component: RunningNumberTypeFormComponent;
  let fixture: ComponentFixture<RunningNumberTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningNumberTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningNumberTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
