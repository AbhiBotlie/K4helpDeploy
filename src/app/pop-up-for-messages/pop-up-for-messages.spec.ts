import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAlradyExistsComponent } from './pop-up-for-messages';

describe('EmailAlradyExistsComponent', () => {
  let component: EmailAlradyExistsComponent;
  let fixture: ComponentFixture<EmailAlradyExistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailAlradyExistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailAlradyExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
