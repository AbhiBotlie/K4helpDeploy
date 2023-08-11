import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualFundTargetComponent } from './individual-fund-target.component';

describe('IndividualFundTargetComponent', () => {
  let component: IndividualFundTargetComponent;
  let fixture: ComponentFixture<IndividualFundTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualFundTargetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualFundTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
