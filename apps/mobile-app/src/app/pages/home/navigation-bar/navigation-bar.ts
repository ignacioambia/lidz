import { Component } from '@angular/core';
import { heroBolt, heroChatBubbleLeft, heroCog } from '@ng-icons/heroicons/outline';
import {
  heroBoltSolid,
  heroChatBubbleLeftSolid,
  heroCogSolid,
} from '@ng-icons/heroicons/solid';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'navigation-bar',
  imports: [NgIcon, RouterLink, RouterLinkActive],
  providers: [
    provideIcons({
      heroBolt,
      heroChatBubbleLeft,
      heroBoltSolid,
      heroChatBubbleLeftSolid,
      heroCogSolid,
      heroCog,
    }),
    provideNgIconsConfig({ size: '1.7rem' }),
  ],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.scss',
})
export class NavigationBar {
  // faMessages = faComments;
  // faBolt = faBolt;
}
