import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Preferences } from '@capacitor/preferences';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
