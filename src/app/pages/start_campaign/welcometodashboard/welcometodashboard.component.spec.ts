import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcometodashboardComponent } from './welcometodashboard.component';

describe('WelcometodashboardComponent', () => {
  let component: WelcometodashboardComponent;
  let fixture: ComponentFixture<WelcometodashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcometodashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcometodashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
