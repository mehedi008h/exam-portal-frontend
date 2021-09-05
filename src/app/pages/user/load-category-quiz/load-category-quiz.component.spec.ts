import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCategoryQuizComponent } from './load-category-quiz.component';

describe('LoadCategoryQuizComponent', () => {
  let component: LoadCategoryQuizComponent;
  let fixture: ComponentFixture<LoadCategoryQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCategoryQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCategoryQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
