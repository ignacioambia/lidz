import { Component } from '@angular/core';
import { ChatSandbox } from './chat-sandbox/chat-sandbox';

@Component({
  selector: 'app-agent-manager',
  imports: [ChatSandbox],
  templateUrl: './agent-manager.html',
  styleUrl: './agent-manager.scss'
})
export class AgentManager {

}
