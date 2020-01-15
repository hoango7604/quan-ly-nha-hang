import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailsResolver } from './helpers/details.resolver';
import { EventDetailFormComponent } from './event-detail-form/event-detail-form.component';
import { EventKioskListComponent } from './event-kisosk/event-kiosk-list/event-kiosk-list.component';
import { EventInviteeListComponent } from './event-invitee/event-invitee-list/event-invitee-list.component';
import { EventInviteeCreateComponent } from './event-invitee/event-invitee-create/event-invitee-create.component';
import { EventInviteeAddComponent } from './event-invitee/event-invitee-add/event-invitee-add.component';
import { EventInviteeImportComponent } from './event-invitee/event-invitee-import/event-invitee-import.component';

const routes: Routes = [
	{
		path: 'list',
		component: EventListComponent,
	},
	{
		path: 'details/:id',
		component: EventDetailComponent,
		children: [
			{
				path: 'edit',
				component: EventDetailFormComponent,
				resolve: [EventDetailsResolver],
			},
			{
				path: 'invitees',
				component: EventInviteeListComponent,
				children: [
					{
						path: 'add',
						component: EventInviteeAddComponent,
					},
					{
						path: 'create',
						component: EventInviteeCreateComponent,
					},
					{
						path: 'import',
						component: EventInviteeImportComponent,
					},
				],
			},
			{
				path: 'kiosks',
				component: EventKioskListComponent,
			},
			{
				path: '',
				redirectTo: 'edit',
				pathMatch: 'full',
			},
		],
	},
	{
		path: 'create',
		component: EventCreateComponent,
	},
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EventRoutingModule { }
