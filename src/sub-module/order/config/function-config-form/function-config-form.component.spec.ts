import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionConfigFormComponent } from './function-config-form.component';

describe('FunctionConfigFormComponent', () => {
  let component: FunctionConfigFormComponent;
  let fixture: ComponentFixture<FunctionConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionConfigFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
