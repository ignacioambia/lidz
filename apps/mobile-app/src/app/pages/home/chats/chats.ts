import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChatBubbleLeftSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-chats',
  imports: [NgIcon],
  providers: [provideIcons({ heroChatBubbleLeftSolid })],
  templateUrl: './chats.html',
  styleUrl: './chats.scss'
})
export class Chats {

}
