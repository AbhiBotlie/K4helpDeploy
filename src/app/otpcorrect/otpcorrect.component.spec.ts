import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTPCorrectComponent } from './otpcorrect.component';

describe('OTPCorrectComponent', () => {
  let component: OTPCorrectComponent;
  let fixture: ComponentFixture<OTPCorrectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OTPCorrectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OTPCorrectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
