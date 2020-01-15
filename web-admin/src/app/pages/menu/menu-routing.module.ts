import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuCreateComponent } from './menu-create/menu-create.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';

const routes: Routes = [
	{
		path: 'list',
		component: MenuListComponent,
		children: [
			{
				path: ':id',
				component: MenuEditComponent,
			},
		],
	},
	{
		path: 'create',
		component: MenuCreateComponent,
	},
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MenuRoutingModule { }
