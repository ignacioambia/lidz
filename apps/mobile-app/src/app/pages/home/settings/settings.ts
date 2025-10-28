import { Component, inject, ViewContainerRef } from '@angular/core';
import { heroPhoneSolid } from '@ng-icons/heroicons/solid'
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Button, DialogService } from '@lidz/ui';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [NgIcon, Button],
  providers: [provideIcons({ heroPhoneSolid }), DialogService],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  phoneNumber: string;
  private dialog = inject(DialogService);
  private router = inject(Router);

  constructor() {
    // Aquí deberías obtener el número de teléfono del usuario autenticado
    this.phoneNumber = '+1234567890'; // Ejemplo estático
  }

  logout() {
    this.dialog.open({
      title: 'Cerrar sesión',
      content: '¿Estás seguro de que deseas cerrar sesión?',
      handleAction: async (action) => {
        if (action === 'confirm') {
          await Preferences.remove({ key: 'auth_token' });
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
