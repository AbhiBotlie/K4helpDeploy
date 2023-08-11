import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualAddAccountformComponent } from './individual-add-accountform.component';

describe('IndividualAddAccountformComponent', () => {
  let component: IndividualAddAccountformComponent;
  let fixture: ComponentFixture<IndividualAddAccountformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualAddAccountformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualAddAccountformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
