import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPatientDetailsComponent } from './individual-patient-details.component';

describe('IndividualPatientDetailsComponent', () => {
  let component: IndividualPatientDetailsComponent;
  let fixture: ComponentFixture<IndividualPatientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualPatientDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualPatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
