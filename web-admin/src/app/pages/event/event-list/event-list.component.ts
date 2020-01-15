import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { EventService } from '../event.service';
import { ColumnTable } from '../../data-types/column-table';
import { VMTable } from '../../view-models/vm-table';

@Component({
	selector: 'ggm-event-list',
	templateUrl: './event-list.component.html',
	styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent extends VMTable implements OnInit {

	public cols: ColumnTable[] = [
		{ field: 'id', header: '', display: 'none' },
		{ field: 'name', header: 'Name', display: 'table-cell', hasLink: true },
		{ field: 'place', header: 'Place', display: 'table-cell' },
		{ field: 'startTime', header: 'Start Time', display: 'table-cell', isDate: true },
		{ field: 'endTime', header: 'End Time', display: 'table-cell', isDate: true },
		{ field: 'requireCheckout', header: 'Require Checkout', display: 'table-cell', isBoolean: true },
		{ field: 'useKiosk', header: 'Uses Kiosk', display: 'table-cell', isBoolean: true },
		{ field: 'state', header: 'State', display: 'table-cell' },
	];
	protected idField: string = 'id';

	constructor(
		private _confirmService: ConfirmationService,

		private _eventService: EventService,
	) {
		super(_eventService, _confirmService);
	}

	public ngOnInit() { }

	public openEvent(id: string): void {
		this._eventService.openEvent(id).subscribe(res => {
			if (res) this.resetList() ;
		});
	}

	public closeEvent(id: string): void {
		this._eventService.closeEvent(id).subscribe(res => {
			if (res) this.resetList() ;
		});
	}
}
