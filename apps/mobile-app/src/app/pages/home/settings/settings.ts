import { Component, inject, ViewContainerRef } from '@angular/core';
import { heroPhoneSolid } from '@ng-icons/heroicons/solid'
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Button, DialogService } from '@lidz/ui';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer';

@Component({
  selector: 'app-settings',
  imports: [NgIcon, Button],
  providers: [provideIcons({ heroPhoneSolid }), DialogService],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  phoneNumber = '-';
  private dialog = inject(DialogService);
  private router = inject(Router);
  private customerService = inject(CustomerService);  

  constructor() {
    this.customerService.getProfile().subscribe({
      next: (profile) => {
        this.phoneNumber = profile.phoneNumber;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }

  logout() {
    this.dialog.open({
      title: 'Cerrar sesión',
      content: '¿Estás seguro de que deseas cerrar sesión?',
      handleAction: (action) => {
        if (action === 'confirm') {
          localStorage.removeItem('auth_token');
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
