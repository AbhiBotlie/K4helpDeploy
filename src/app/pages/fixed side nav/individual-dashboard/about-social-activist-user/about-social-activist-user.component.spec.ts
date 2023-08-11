import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSocialActivistUserComponent } from './about-social-activist-user.component';

describe('AboutSocialActivistUserComponent', () => {
  let component: AboutSocialActivistUserComponent;
  let fixture: ComponentFixture<AboutSocialActivistUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutSocialActivistUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSocialActivistUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
