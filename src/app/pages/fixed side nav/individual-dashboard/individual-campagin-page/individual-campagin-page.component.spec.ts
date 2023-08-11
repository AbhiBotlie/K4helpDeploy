import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCampaginPageComponent } from './individual-campagin-page.component';

describe('IndividualCampaginPageComponent', () => {
  let component: IndividualCampaginPageComponent;
  let fixture: ComponentFixture<IndividualCampaginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualCampaginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualCampaginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
