import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';
import {ShellSidebarComponent} from './shell-sidebar/shell-sidebar.component';
import {ShellHeaderComponent} from './shell-header/shell-header.component';
import {KrnComponent} from './modules/krn/krn.component';
import {KrnicpComponent} from './modules/krn/krnicp/krnicp.component';
import {AccountsComponent} from './modules/krn/accounts/accounts.component';
import {OperationsComponent} from './modules/krn/operations/operations.component';
import {ClientHeaderComponent} from './client-header/client-header.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'bpm',
        loadChildren: () => import('./modules/bpm/bpm.module').then((m) => m.BpmModule),
        data: { preload: true },
      },
      {
        path: '',
        redirectTo: 'bpm',
        pathMatch: 'full',
      },
      {
        path: 'krn',
        component: KrnComponent,
        children: [
          {
            path: 'krnicp',
            component: KrnicpComponent
          },
          {
            path: 'accounts',
            component: AccountsComponent
          },
          {
            path: 'operations',
            component: OperationsComponent
          },
          {
            path: '',
            redirectTo: 'krnicp',
            pathMatch: 'full'
          }
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule, ShellSidebarComponent, ShellHeaderComponent, ClientHeaderComponent],
  declarations: [
    ShellSidebarComponent,
    ShellHeaderComponent,
    ClientHeaderComponent
  ]
})
export class ShellRoutingModule {}
