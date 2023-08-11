import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualWithdrawlRequestComponent } from './individual-withdrawl-request.component';

describe('IndividualWithdrawlRequestComponent', () => {
  let component: IndividualWithdrawlRequestComponent;
  let fixture: ComponentFixture<IndividualWithdrawlRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualWithdrawlRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualWithdrawlRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
