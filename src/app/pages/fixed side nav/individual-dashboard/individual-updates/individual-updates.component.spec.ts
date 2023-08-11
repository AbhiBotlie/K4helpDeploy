import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualUpdatesComponent } from './individual-updates.component';

describe('IndividualUpdatesComponent', () => {
  let component: IndividualUpdatesComponent;
  let fixture: ComponentFixture<IndividualUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualUpdatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
