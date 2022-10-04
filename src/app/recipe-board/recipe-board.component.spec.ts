import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeBoardComponent } from './recipe-board.component';

describe('RecipeBoardComponent', () => {
  let component: RecipeBoardComponent;
  let fixture: ComponentFixture<RecipeBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
