import { Component, computed, effect, input } from '@angular/core';
import { AgentAction } from '@lidz/shared';
import { Button } from '../../../button/button';

@Component({
  selector: 'action-card',
  imports: [Button],
  templateUrl: './action-card.html',
  styleUrl: './action-card.scss',
})
export class ActionCard {
  action = input<AgentAction>({
    type: 'NOTIFICATION',
    status: 'pending',
    tool: { name: '', description: '', parameters: {} },
  });
  properties = computed(() => {
    return Object.keys(this.action().tool.parameters).map((e) => ({
      name: e.replace(/_/g, ' '),
      description: this.action().tool.parameters[e],
    }));
  });

  title = computed(() => {
    return this.action().tool.name.replace(/_/g, ' ');
  });

  constructor() {
    effect(() => {
      console.log(this.properties());
    });
  }
}
