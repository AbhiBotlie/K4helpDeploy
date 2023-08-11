import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualManageimagesComponent } from './individual-manageimages.component';

describe('IndividualManageimagesComponent', () => {
  let component: IndividualManageimagesComponent;
  let fixture: ComponentFixture<IndividualManageimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualManageimagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualManageimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
