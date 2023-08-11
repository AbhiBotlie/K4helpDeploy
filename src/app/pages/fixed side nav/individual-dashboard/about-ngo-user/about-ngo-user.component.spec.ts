import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutNGOUserComponent } from './about-ngo-user.component';

describe('AboutNGOUserComponent', () => {
  let component: AboutNGOUserComponent;
  let fixture: ComponentFixture<AboutNGOUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutNGOUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutNGOUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
