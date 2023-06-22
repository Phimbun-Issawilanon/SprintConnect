import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDesignComponent } from './master-design.component';

describe('MasterDesignComponent', () => {
  let component: MasterDesignComponent;
  let fixture: ComponentFixture<MasterDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDesignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
