import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualListOfDonorComponent } from './individual-list-of-donor.component';

describe('IndividualListOfDonorComponent', () => {
  let component: IndividualListOfDonorComponent;
  let fixture: ComponentFixture<IndividualListOfDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualListOfDonorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualListOfDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
