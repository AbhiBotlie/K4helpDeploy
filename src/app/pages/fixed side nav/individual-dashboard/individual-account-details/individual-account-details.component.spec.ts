import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualAccountDetailsComponent } from './individual-account-details.component';

describe('IndividualAccountDetailsComponent', () => {
  let component: IndividualAccountDetailsComponent;
  let fixture: ComponentFixture<IndividualAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualAccountDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
