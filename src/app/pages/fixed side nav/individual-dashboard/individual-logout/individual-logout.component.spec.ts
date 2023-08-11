import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualLogoutComponent } from './individual-logout.component';

describe('IndividualLogoutComponent', () => {
  let component: IndividualLogoutComponent;
  let fixture: ComponentFixture<IndividualLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualLogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
