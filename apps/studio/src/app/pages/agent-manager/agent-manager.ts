import { Component, computed, effect, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ChatSandbox } from './chat-sandbox/chat-sandbox';
import { FormsModule } from '@angular/forms';
import { AgentAction, AgentActionStatus } from '@lidz/shared';
import { ActivatedRoute } from '@angular/router';
import { AgentsService } from '../../services/agents-service';
import { ActionCard } from './action-card/action-card';
import { Button } from '../../button/button';

@Component({
  selector: 'app-agent-manager',
  imports: [ChatSandbox, FormsModule, ActionCard, Button],
  templateUrl: './agent-manager.html',
  styleUrl: './agent-manager.scss',
})
export class AgentManager {
  public instructions = signal<string>('');
  private actions = signal<AgentAction[]>([]);

  public displayedActions = computed(() =>
    this.showRejected()
      ? this.actions()
      : this.actions().filter((action) => action.status !== 'rejected')
  );
  private location = inject(Location);
  private agentsService = inject(AgentsService);
  private route = inject(ActivatedRoute);

  public agentId = signal<string>('');
  public showRejected = signal<boolean>(false);

  private agentIdEffect = effect(() => {
    const agentId = this.agentId();
    if (agentId) {
      // Fetch agent details using the agentId

      this.agentsService.getById(agentId).subscribe({
        next: (response) => {
          this.instructions.set(response.instructions);
          this.actions.set(response.actions);
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

  public saveInstructions(): void {
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
        next: (response) => {
          this.actions.set(response.actions);
        },
        error: (err) => {
          console.error('Error updating instructions ', err);
        },
      });
  }

  public onShowRejectedChange(event: Event) {
    this.showRejected.set((event.target as HTMLInputElement).checked);
  }

  public updateActionStatus(actionId: string, status: AgentActionStatus) {
    this.agentsService.updateActionStatus(this.agentId(), actionId, status).subscribe({
      next: () => {
        this.actions.set(
          this.actions().map((action) =>
            action._id === actionId ? { ...action, status } : action
          )
        );
      },
      error: (err) => {
        console.error('Error updating action status', err);
      },
    });
  }
}
