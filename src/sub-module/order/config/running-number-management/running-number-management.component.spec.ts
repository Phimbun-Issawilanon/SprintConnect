import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningNumberManagementComponent } from './running-number-management.component';

describe('RunningNumberManagementComponent', () => {
  let component: RunningNumberManagementComponent;
  let fixture: ComponentFixture<RunningNumberManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningNumberManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningNumberManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
