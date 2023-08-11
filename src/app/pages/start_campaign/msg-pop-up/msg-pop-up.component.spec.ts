import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgPopUpComponent } from './msg-pop-up.component';

describe('MsgPopUpComponent', () => {
  let component: MsgPopUpComponent;
  let fixture: ComponentFixture<MsgPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
