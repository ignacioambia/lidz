import { Component, computed, input, output } from '@angular/core';
import { AgentAction, AgentActionStatus } from '@lidz/shared';
import { Button } from '../../../button/button';

@Component({
  selector: 'action-card',
  imports: [Button],
  templateUrl: './action-card.html',
  styleUrl: './action-card.scss',
})
export class ActionCard {
  action = input<AgentAction>();

  actionStatusChanged = output<AgentActionStatus>();
  properties = computed(() => {
    return Object.keys(this.action()?.tool.parameters.properties || {}).map(
      (e) => ({
        name: e.replace(/_/g, ' '),
        description:
          this.action()?.tool.parameters.properties[e].description || '',
      })
    );
  });

  title = computed(() => {
    return this.action()?.tool.name.replace(/_/g, ' ');
  });

  updateActionStatus(status: AgentActionStatus) {
    this.actionStatusChanged.emit(status);
  }
}
