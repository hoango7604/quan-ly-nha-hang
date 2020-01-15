import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { ColumnTable } from '../../../data-types/column-table';
import { VMTable } from '../../../view-models/vm-table';
import { EventKioskService } from '../event-kiosk.service';

@Component({
	selector: 'ggm-event-kiosk-list',
	templateUrl: './event-kiosk-list.component.html',
	styleUrls: ['./event-kiosk-list.component.scss'],
})
export class EventKioskListComponent extends VMTable implements OnInit {

	public cols: ColumnTable[] = [
		{ field: 'id', header: '', display: 'none' },
		{ field: 'kioskName', header: 'Name', display: 'table-cell', hasLink: true },
		{ field: 'kioskDescription', header: 'Description', display: 'table-cell' },
		// { field: '', header: '', display: 'table-cell' },

	];
	protected idField: string = 'id';

	constructor(
		private _confirmService: ConfirmationService,

		private _eventKioskService: EventKioskService,
	) {
		super(_eventKioskService, _confirmService);
	}

	public ngOnInit() { }
}
