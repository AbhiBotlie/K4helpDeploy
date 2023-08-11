import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongUsertypePopupComponent } from './wrong-usertype-popup.component';

describe('WrongUsertypePopupComponent', () => {
  let component: WrongUsertypePopupComponent;
  let fixture: ComponentFixture<WrongUsertypePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongUsertypePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrongUsertypePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
