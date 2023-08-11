import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidemailComponent } from './invalidemail.component';

describe('InvalidemailComponent', () => {
  let component: InvalidemailComponent;
  let fixture: ComponentFixture<InvalidemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidemailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
