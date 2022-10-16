import { NgModule } from '@angular/core';

import { ShellComponent } from './shell.component';
import { ShellRoutingModule } from './shell-routing.module';
import { AccountsComponent } from './modules/krn/accounts/accounts.component';
import { KrnicpComponent } from './modules/krn/krnicp/krnicp.component';
import { OperationsComponent } from './modules/krn/operations/operations.component';
import { KrnComponent } from './modules/krn/krn.component';

@NgModule({
  declarations: [ShellComponent, AccountsComponent, KrnicpComponent, OperationsComponent, KrnComponent],
  imports: [ShellRoutingModule],
})
export class ShellModule {}
