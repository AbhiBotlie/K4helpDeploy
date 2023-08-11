import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestWithdrawlPopupComponent } from './request-withdrawl-popup.component';

describe('RequestWithdrawlPopupComponent', () => {
  let component: RequestWithdrawlPopupComponent;
  let fixture: ComponentFixture<RequestWithdrawlPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestWithdrawlPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestWithdrawlPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
