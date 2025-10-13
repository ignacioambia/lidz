import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBar } from './navigation-bar/navigation-bar';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, NavigationBar],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
