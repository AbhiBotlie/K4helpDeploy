import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectotpComponent } from './incorrectotp.component';

describe('IncorrectotpComponent', () => {
  let component: IncorrectotpComponent;
  let fixture: ComponentFixture<IncorrectotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncorrectotpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncorrectotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
