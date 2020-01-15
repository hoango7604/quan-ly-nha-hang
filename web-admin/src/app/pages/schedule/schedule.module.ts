import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from '@@shared/shared.module';
import { ScheduleService } from './schedule.service';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleDetailFormComponent } from './schedule-detail-form/schedule-detail-form.component';
import { EventInviteeListComponent } from './event-invitee/event-invitee-list/event-invitee-list.component';
import { EventInviteeAddComponent } from './event-invitee/event-invitee-add/event-invitee-add.component';

@NgModule({
	imports: [
		CommonModule,
		ScheduleRoutingModule,
		SharedModule,
	],
	declarations: [
		ScheduleListComponent,
		ScheduleCreateComponent,
		ScheduleDetailComponent,
		ScheduleDetailFormComponent,
		EventInviteeListComponent,
		EventInviteeAddComponent,
	],
	providers: [
		ScheduleService,
	],
})
export class ScheduleModule { }
