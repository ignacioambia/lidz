import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

export const loginGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const token = await Preferences.get({ key: 'auth_token' });
  if (token.value) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
