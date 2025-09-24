import {
  Component,
  effect,
  inject,
  signal,
  ViewChild,
  ElementRef,
  AfterViewInit,
  input,
} from '@angular/core';
import { ChatInput } from '../chat-input/chat-input';
import { HttpClient } from '@angular/common/http';

interface Message {
  content: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'chat-sandbox',
  imports: [ChatInput],
  templateUrl: './chat-sandbox.html',
  styleUrl: './chat-sandbox.scss',
})
export class ChatSandbox implements AfterViewInit {
  @ViewChild('conversationContainer') conversationContainer!: ElementRef;

  public messageHistory = signal<Message[]>([]);
  public http = inject(HttpClient);

  public agentId = input<string>('');
  //TODO: This is just to mock a sender ID, replace with real user ID when auth is implemented
  private senderId = signal<string>(new Date().getTime().toString()); // Mock sender ID

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  // Watch for changes in messageHistory and scroll to bottom
  messageEffect = effect(() => {
    this.messageHistory(); // Subscribe to signal
    setTimeout(() => this.scrollToBottom(), 0); // Use setTimeout to ensure DOM is updated
  });

  private scrollToBottom(): void {
    if (this.conversationContainer) {
      const container = this.conversationContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  private extractMessageFromXML(xmlResponse: string): string {
    const regex = /<Message>(.*?)<\/Message>/s;
    const match = xmlResponse.match(regex);
    return match ? match[1] : xmlResponse; // Return original if no match
  }

  onMessageSubmitted(message: string): void {
    console.log('Message submitted:', message);
    this.messageHistory.update((history) => [
      ...history,
      { content: message, sender: 'user' },
    ]);
    this.http
      .post(
        '/wa-message',
        { Body: message, From: this.senderId(), To: this.agentId() },
        { responseType: 'text' }
      )
      .subscribe((response: any) => {
        const extractedMessage = this.extractMessageFromXML(response);
        this.messageHistory.update((history) => [
          ...history,
          { content: extractedMessage, sender: 'bot' },
        ]);
      });
  }
}
