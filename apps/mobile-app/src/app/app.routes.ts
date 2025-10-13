import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.Home),
        children: [
            { path: '', redirectTo: 'actions', pathMatch: 'full' },
            {
                path: 'chats',
                loadComponent: () => import('./pages/home/chats/chats').then(m => m.Chats)
            },
            {
                path: 'actions',
                loadComponent: () => import('./pages/home/actions/actions').then(m => m.Actions)
            },
            {
                path: 'settings',
                loadComponent: () => import('./pages/home/settings/settings').then(m => m.Settings)
            },
        ]
    },
    {
        path: 'conversation/:conversationId',
        loadComponent: () => import('./pages/conversation/conversation').then(m => m.Conversation)
    }
];
