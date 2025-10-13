import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroBoltSolid,
} from '@ng-icons/heroicons/solid';
@Component({
  selector: 'app-actions',
  imports: [NgIcon],
  providers: [provideIcons({ heroBoltSolid })],
  templateUrl: './actions.html',
  styleUrl: './actions.scss'
})
export class Actions {

}
