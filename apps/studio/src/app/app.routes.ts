import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'agentes/nuevo',
        pathMatch: 'full'
    },
    {
        path: 'agentes/nuevo',
        loadComponent: () => import('./pages/agent-manager/agent-manager').then(m => m.AgentManager),
    },
];
