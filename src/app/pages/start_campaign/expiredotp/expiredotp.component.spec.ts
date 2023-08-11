import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredotpComponent } from './expiredotp.component';

describe('ExpiredotpComponent', () => {
  let component: ExpiredotpComponent;
  let fixture: ComponentFixture<ExpiredotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredotpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
