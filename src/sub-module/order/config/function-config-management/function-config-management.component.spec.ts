import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionConfigManagementComponent } from './function-config-management.component';

describe('FunctionConfigManagementComponent', () => {
  let component: FunctionConfigManagementComponent;
  let fixture: ComponentFixture<FunctionConfigManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionConfigManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionConfigManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
