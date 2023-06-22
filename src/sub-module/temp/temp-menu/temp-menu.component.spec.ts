import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempMenuComponent } from './temp-menu.component';

describe('TempMenuComponent', () => {
  let component: TempMenuComponent;
  let fixture: ComponentFixture<TempMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
