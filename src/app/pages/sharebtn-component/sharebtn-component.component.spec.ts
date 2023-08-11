import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharebtnComponentComponent } from './sharebtn-component.component';

describe('SharebtnComponentComponent', () => {
  let component: SharebtnComponentComponent;
  let fixture: ComponentFixture<SharebtnComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharebtnComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharebtnComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
