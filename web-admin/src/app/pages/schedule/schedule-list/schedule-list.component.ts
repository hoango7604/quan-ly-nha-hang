import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConfirmationService } from 'primeng/api';

import { ScheduleService } from '../schedule.service';
import { ColumnTable } from '../../data-types/column-table';
import { VMTable } from '../../view-models/vm-table';

@Component({
	selector: 'ggm-schedule-list',
	templateUrl: './schedule-list.component.html',
	styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent extends VMTable implements OnInit, AfterViewInit {

	public tenCa: string = '';

	public cols: ColumnTable[] = [
		{ field: 'maCa', header: '', display: 'none' },
		{ field: 'tenCa', header: 'Tên ca', display: 'table-cell', hasLink: true },
		{ field: 'thoiGianBatDau', header: 'Thời gian bắt đầu', display: 'table-cell', isDate: true },
		{ field: 'thoiGianKetThuc', header: 'Thời gian kết thúc', display: 'table-cell', isDate: true },
	];
	protected idField: string = 'maCa';

	constructor(
		private _confirmService: ConfirmationService,
		private _scheduleService: ScheduleService,
		private _route: ActivatedRoute,
	) {
		super(_scheduleService, _confirmService);
	}

	public ngOnInit() { }

	public ngAfterViewInit() {
		this._route.paramMap.subscribe(params => {
			this.loading = true;

			this._scheduleService.fetchData().subscribe(res => {
				if (res) {
					this.loading = false;
					this.dataTable = res['data'];
					this.totalRecords = res['total'];
				}
			});
		});
	}
}
