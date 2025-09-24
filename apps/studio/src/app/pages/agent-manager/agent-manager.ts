import { Component, effect, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ChatSandbox } from './chat-sandbox/chat-sandbox';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AgentsAPI } from '@lidz/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentsService } from '../../services/agents-service';
import { retry } from 'rxjs';

@Component({
  selector: 'app-agent-manager',
  imports: [ChatSandbox, FormsModule],
  templateUrl: './agent-manager.html',
  styleUrl: './agent-manager.scss',
})
export class AgentManager {
  public instructions = signal<string>('');
  private location = inject(Location);
  private agentsService = inject(AgentsService);
  private route = inject(ActivatedRoute);

  public agentId = signal<string>('');

  private agentIdEffect = effect(() => {
    const agentId = this.agentId();
    if (agentId) {
      // Fetch agent details using the agentId

        this.agentsService.getById(agentId).subscribe({
          next: (response) => {
            this.instructions.set(response.instructions);
            console.log('Just received instructions', this.instructions() );
          },
          error: (err) => {
            console.error('Error fetching agent details', err);
          },
        });
    } else {    
      this.instructions.set(''); // Reset instructions if no agentId
    }
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.agentId.set(params['agentId']); // Access the agentId parameter
    });
  }

  public manageInstructions(): void {
    const agentExists = !!this.agentId();
    if (!agentExists) {
      this.agentsService.createAgent(this.instructions()).subscribe({
        next: ({ agentId }) => {
          this.agentId.set(agentId);
          this.location.replaceState(`/agentes/${agentId}`);
        },
      });
      return;
    }

    this.agentsService
      .updateInstructions(this.agentId(), this.instructions())
      .subscribe({
        error: (err) => {
          console.error('Error updating instructions ', err);
        },
      });
  }
}
