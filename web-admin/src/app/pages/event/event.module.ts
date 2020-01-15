import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { SharedModule } from '@@shared/shared.module';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailFormComponent } from './event-detail-form/event-detail-form.component';
import { EventKioskListComponent } from './event-kisosk/event-kiosk-list/event-kiosk-list.component';
import { EventInviteeListComponent } from './event-invitee/event-invitee-list/event-invitee-list.component';
import { EventInviteeCreateComponent } from './event-invitee/event-invitee-create/event-invitee-create.component';
import { EventInviteeDetailsResolver, EventDetailsResolver } from './helpers/details.resolver';
import { EventInviteeService } from './event-invitee/event-invitee.service';
import { VisitorService } from '../visitor/visitor.service';
import { EventService } from './event.service';
import { EventKioskService } from './event-kisosk/event-kiosk.service';
import { EventInviteeAddComponent } from './event-invitee/event-invitee-add/event-invitee-add.component';
import { EventInviteeImportComponent } from './event-invitee/event-invitee-import/event-invitee-import.component';

@NgModule({
	imports: [
		CommonModule,
		EventRoutingModule,
		SharedModule,
	],
	declarations: [
		EventCreateComponent,
		EventDetailComponent,
		EventDetailFormComponent,
		EventListComponent,

		EventInviteeListComponent,
		EventInviteeCreateComponent,

		EventKioskListComponent,

		EventInviteeAddComponent,

		EventInviteeImportComponent,
	],
	providers: [
		VisitorService,
		EventInviteeService,
		EventService,
		EventKioskService,

		EventInviteeDetailsResolver,
		EventDetailsResolver,
	],
})
export class EventModule { }
