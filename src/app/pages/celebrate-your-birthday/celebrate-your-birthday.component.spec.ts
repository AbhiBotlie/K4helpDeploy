import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebrateYourBirthdayComponent } from './celebrate-your-birthday.component';

describe('CelebrateYourBirthdayComponent', () => {
  let component: CelebrateYourBirthdayComponent;
  let fixture: ComponentFixture<CelebrateYourBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CelebrateYourBirthdayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelebrateYourBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
