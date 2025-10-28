import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

export const loginGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const token = await localStorage.getItem('auth_token');
  if (token) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
