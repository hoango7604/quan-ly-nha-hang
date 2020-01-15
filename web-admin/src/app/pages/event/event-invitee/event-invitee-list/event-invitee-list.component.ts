import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { ColumnTable } from '../../../data-types/column-table';
import { VMTable } from '../../../view-models/vm-table';
import { EventInviteeService } from '../event-invitee.service';

@Component({
	selector: 'ggm-event-invitee-list',
	templateUrl: './event-invitee-list.component.html',
	styleUrls: ['./event-invitee-list.component.scss'],
})
export class EventInviteeListComponent extends VMTable implements OnInit {

	public cols: ColumnTable[] = [
		{ field: 'id', header: '', display: 'none' },
		{ field: 'fullname', header: 'Full Name', display: 'table-cell', hasLink: true },
		{ field: 'email', header: 'Email', display: 'table-cell', hasLink: false },
		{ field: 'phoneNumber', header: 'Phone Number', display: 'table-cell', hasLink: false },
		{ field: 'company', header: 'Company', display: 'table-cell', hasLink: false },
		{ field: 'sentInvitation', header: 'Sent Invitation', display: 'table-cell', hasLink: false, isBoolean: true },
		{ field: 'presentInEvent', header: 'In Event', display: 'table-cell', hasLink: false, isBoolean: true },
	];
	public idField: string = 'id';

	constructor(
		private _eventInviteeService: EventInviteeService,
		private _confirmService: ConfirmationService,
		private _route: ActivatedRoute,
		private _router: Router,
	) {
		super(_eventInviteeService, _confirmService);

		this._eventInviteeService.eventId = this._router.url.split('/')[3];
	}

	public ngOnInit() {
		this._route.paramMap.subscribe(params => {
			this.loading = true;

			this._eventInviteeService.fetchData(this.pageIndex, this.pageSize, this.sortField, this.sortOrder).subscribe(res => {
				if (res) {
					this.loading = false;
					this.dataTable = res['data'];
					this.totalRecords = res['total'];

					this.scrollToTop();
				}
			});
		});
	}

	private scrollToTop() {
		scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}

}
