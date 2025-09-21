import { Component, EventEmitter, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'chat-input',
  imports: [FormsModule],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.scss'
})
export class ChatInput {
  messageSubmitted = output<string>();
  message: string = '';

  onEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (!keyboardEvent.shiftKey) {
      event.preventDefault();
      this.submitMessage();
    }
  }

  private submitMessage(): void {
    if (this.message.trim()) {
      this.messageSubmitted.emit(this.message.trim());
      this.message = '';
    }
  }
}
