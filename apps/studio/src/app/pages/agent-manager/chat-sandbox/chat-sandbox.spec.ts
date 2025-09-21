import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSandbox } from './chat-sandbox';

describe('ChatSandbox', () => {
  let component: ChatSandbox;
  let fixture: ComponentFixture<ChatSandbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSandbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSandbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
