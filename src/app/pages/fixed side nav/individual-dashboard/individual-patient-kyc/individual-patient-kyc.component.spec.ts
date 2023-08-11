import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPatientKYCComponent } from './individual-patient-kyc.component';

describe('IndividualPatientKYCComponent', () => {
  let component: IndividualPatientKYCComponent;
  let fixture: ComponentFixture<IndividualPatientKYCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualPatientKYCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualPatientKYCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
