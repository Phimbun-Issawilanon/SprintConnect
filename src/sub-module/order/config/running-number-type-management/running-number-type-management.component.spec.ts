import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningNumberTypeManagementComponent } from './running-number-type-management.component';

describe('RunningNumberTypeManagementComponent', () => {
  let component: RunningNumberTypeManagementComponent;
  let fixture: ComponentFixture<RunningNumberTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningNumberTypeManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningNumberTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
