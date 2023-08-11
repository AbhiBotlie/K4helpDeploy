import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualManagebannerComponent } from './individual-managebanner.component';

describe('IndividualManagebannerComponent', () => {
  let component: IndividualManagebannerComponent;
  let fixture: ComponentFixture<IndividualManagebannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualManagebannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualManagebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
