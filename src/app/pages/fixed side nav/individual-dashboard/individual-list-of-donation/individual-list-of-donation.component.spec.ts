import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualListOfDonationComponent } from './individual-list-of-donation.component';

describe('IndividualListOfDonationComponent', () => {
  let component: IndividualListOfDonationComponent;
  let fixture: ComponentFixture<IndividualListOfDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualListOfDonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualListOfDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
