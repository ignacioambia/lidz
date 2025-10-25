import { Routes } from '@angular/router';
import { Chats } from './pages/home/chats/chats';
import { Actions } from './pages/home/actions/actions';
import { Settings } from './pages/home/settings/settings';
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
        children: [
          { path: '', redirectTo: 'actions', pathMatch: 'full' },
          {
            path: 'chats',
            component: Chats,
          },
          {
            path: 'actions',
            component: Actions,
          },
          {
            path: 'settings',
            component: Settings,
          },
        ],
      },
      {
        path: 'conversation/:conversationId',
        loadComponent: () =>
          import('./pages/conversation/conversation').then(
            (m) => m.Conversation
          ),
      },
    ],
  },
];
