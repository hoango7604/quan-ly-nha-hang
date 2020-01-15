import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleDetailFormComponent } from './schedule-detail-form/schedule-detail-form.component';
import { EventInviteeListComponent } from './event-invitee/event-invitee-list/event-invitee-list.component';
import { EventInviteeAddComponent } from './event-invitee/event-invitee-add/event-invitee-add.component';

const routes: Routes = [
	{
		path: 'list',
		component: ScheduleListComponent,
	},
	{
		path: 'details/:id',
		component: ScheduleDetailComponent,
		children: [
			{
				path: 'edit',
				component: ScheduleDetailFormComponent,
			},
			{
				path: 'employees',
				component: EventInviteeListComponent,
				children: [
					{
						path: 'add',
						component: EventInviteeAddComponent,
					},
				],
			},
			{
				path: '',
				redirectTo: 'employees',
				pathMatch: 'full',
			},
		],
	},
	{
		path: 'create',
		component: ScheduleCreateComponent,
	},
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ScheduleRoutingModule { }
