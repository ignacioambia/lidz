import { Component, computed, input, output } from '@angular/core';
import { AgentAction } from '@lidz/shared';

@Component({
  selector: 'ld-action-card',
  imports: [],
  templateUrl: './action-card.html',
  styleUrl: './action-card.scss'
})
export class ActionCard {
  action = input<AgentAction>();

  properties = computed(() => {
    return Object.keys(this.action()?.parameters || {}).map(
      (e) => ({
        name: e.replace(/_/g, ' '),
        description:
          this.action()?.parameters[e],
      })
    );
  });

  title = computed(() => {
    return this.action()?.name.replace(/_/g, ' ');
  });

}
