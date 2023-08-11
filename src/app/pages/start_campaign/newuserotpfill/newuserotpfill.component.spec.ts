import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuserotpfillComponent } from './newuserotpfill.component';

describe('NewuserotpfillComponent', () => {
  let component: NewuserotpfillComponent;
  let fixture: ComponentFixture<NewuserotpfillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewuserotpfillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewuserotpfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
