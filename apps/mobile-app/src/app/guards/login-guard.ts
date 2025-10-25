import { CanActivateFn } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

export const loginGuard: CanActivateFn = async (route, state) => {
  const token = await Preferences.get({ key: 'auth_token' });
  return !token.value;
};
