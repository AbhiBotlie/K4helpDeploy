import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansPopUpComponent } from './plans-pop-up.component';

describe('PlansPopUpComponent', () => {
  let component: PlansPopUpComponent;
  let fixture: ComponentFixture<PlansPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
