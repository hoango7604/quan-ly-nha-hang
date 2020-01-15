import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { VisitorEditComponent } from './visitor-edit/visitor-edit.component';
import { VisitorCreateComponent } from './visitor-create/visitor-create.component';
import { VisitorTableComponent } from './visitor-table/visitor-table.component';

const routes: Routes = [
	{
		path: 'list',
		component: VisitorTableComponent,
	},
	{
		path: ':id',
		component: VisitorListComponent,
		children: [
			{
				path: 'create/:idPhieuChon',
				component: VisitorCreateComponent,
			},
			{
				path: ':idPhieuChon/:idMon',
				component: VisitorEditComponent,
			},
		],
	},
	{
		path: '',
		redirectTo: 'list',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class VisitorRoutingModule { }
