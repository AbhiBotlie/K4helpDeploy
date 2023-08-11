import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyHelpComponent } from './monthly-help.component';

describe('MonthlyHelpComponent', () => {
  let component: MonthlyHelpComponent;
  let fixture: ComponentFixture<MonthlyHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
