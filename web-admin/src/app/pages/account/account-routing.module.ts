import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { RoleDetailsResolver } from './helpers/details.resolver';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesDetailComponent } from './roles-detail/roles-detail.component';
import { RolesCreateComponent } from './roles-create/roles-create.component';
import { AccountEditComponent } from './account-edit/account-edit.component';

const routes: Routes = [
	{
		path: 'list',
		component: AccountListComponent,
		children: [
			{
				path: ':id',
				component: AccountEditComponent,
			},
		],
	},
	{
		path: 'create',
		component: AccountCreateComponent,
	},
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
	{
		path: 'roles/list',
		component: RolesListComponent,
	},
	{
		path: 'roles/details/:id',
		component: RolesDetailComponent,
		resolve: [RoleDetailsResolver],
	},
	{
		path: 'roles/create',
		component: RolesCreateComponent,
	},
	{ path: 'roles', redirectTo: 'roles/list', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AccountRoutingModule { }
