import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentManager } from './agent-manager';

describe('AgentManager', () => {
  let component: AgentManager;
  let fixture: ComponentFixture<AgentManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
