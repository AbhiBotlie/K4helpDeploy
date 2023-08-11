import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualStoryComponent } from './individual-story.component';

describe('IndividualStoryComponent', () => {
  let component: IndividualStoryComponent;
  let fixture: ComponentFixture<IndividualStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualStoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
