import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualMyCampaginComponent } from './individual-my-campagin.component';

describe('IndividualMyCampaginComponent', () => {
  let component: IndividualMyCampaginComponent;
  let fixture: ComponentFixture<IndividualMyCampaginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualMyCampaginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualMyCampaginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
