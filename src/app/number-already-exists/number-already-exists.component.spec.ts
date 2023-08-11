import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberAlreadyExistsComponent } from './number-already-exists.component';

describe('NumberAlreadyExistsComponent', () => {
  let component: NumberAlreadyExistsComponent;
  let fixture: ComponentFixture<NumberAlreadyExistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberAlreadyExistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberAlreadyExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
