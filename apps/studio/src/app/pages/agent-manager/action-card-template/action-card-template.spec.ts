import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCard } from './action-card-template';

describe('ActionCard', () => {
  let component: ActionCard;
  let fixture: ComponentFixture<ActionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
