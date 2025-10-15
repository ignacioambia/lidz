import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBoltSolid } from '@ng-icons/heroicons/solid';
import { ActionCard } from '@lidz/ui';
import { AgentAction } from '@lidz/shared';
@Component({
  selector: 'app-actions',
  imports: [NgIcon, ActionCard],
  providers: [provideIcons({ heroBoltSolid })],
  templateUrl: './actions.html',
  styleUrl: './actions.scss',
})
export class Actions {
  public actions = signal<AgentAction[]>([]);
}
