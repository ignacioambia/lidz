import { Component, computed, effect, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ChatSandbox } from './chat-sandbox/chat-sandbox';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AgentAction, AgentsAPI } from '@lidz/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentsService } from '../../services/agents-service';
import { ActionCard } from './action-card/action-card';
import { Button } from '../../button/button';
import { LucideAngularModule, ZapOffIcon } from 'lucide-angular';

@Component({
  selector: 'app-agent-manager',
  imports: [ChatSandbox, FormsModule, ActionCard, Button, LucideAngularModule],
  templateUrl: './agent-manager.html',
  styleUrl: './agent-manager.scss',
})
export class AgentManager {
  readonly ZapOffIcon = ZapOffIcon
  public instructions = signal<string>('');
  private actions = signal<AgentAction[]>([
    {
      type: 'NOTIFICATION',
      status: 'rejected',
      tool: {
        name: 'notificar_seleccion_de_fruta',
        description:
          'Notifica cuando el usuario haya seleccionado una fruta de la lista proporcionada.',
        parameters: {
          primer_tiempo: 'Nombre de la fruta seleccionada por el usuario.',
          segundo_tiempo:
            'Nombre de la otra fruta seleccionada por el usuario.',
          tercer_tiempo: 'Nombre de la otra fruta seleccionada por el usuario.',
        },
      },
    },
    // {
    // type: "NOTIFICATION",
    // status: "confirmed",
    // tool: {
    //   name: "notificar_seleccion_de_fruta",
    //   description: "Notifica cuando el usuario haya seleccionado una fruta de la lista proporcionada.",
    //   parameters: {
    //       fruta_seleccionada: "Nombre de la fruta seleccionada por el usuario."
    //     }
    //   }
    // },
    // {
    // type: "NOTIFICATION",
    // status: "rejected",
    // tool: {
    //   name: "notificar_seleccion_de_fruta",
    //   description: "Notifica cuando el usuario haya seleccionado una fruta de la lista proporcionada.",
    //   parameters: {
    //       fruta_seleccionada: "Nombre de la fruta seleccionada por el usuario."
    //     }
    //   }
    // }
  ]);

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
          console.log('Just received instructions', this.instructions());
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
        error: (err) => {
          console.error('Error updating instructions ', err);
        },
      });
  }

  public onShowRejectedChange(event: Event) {
    console.log('Calling setting rejected');
    this.showRejected.set((event.target as HTMLInputElement).checked);
  }
}
