import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { ColumnTable } from '../../../data-types/column-table';
import { VMTable } from '../../../view-models/vm-table';
import { ScheduleService } from '../../schedule.service';

@Component({
	selector: 'ggm-event-invitee-list',
	templateUrl: './event-invitee-list.component.html',
	styleUrls: ['./event-invitee-list.component.scss'],
})
export class EventInviteeListComponent extends VMTable implements OnInit {

	public maCa: string;

	public cols: ColumnTable[] = [
		{ field: 'maNhanVien', header: '', display: 'none' },
		{ field: 'tenNhanVien', header: 'Tên nhân viên', display: 'table-cell', hasLink: true },
		{ field: 'tenDangNhap', header: 'Tên đăng nhập', display: 'table-cell', hasLink: false },
	];
	public idField: string = 'maNhanVien';

	constructor(
		private _scheduleService: ScheduleService,
		private _confirmService: ConfirmationService,
		private _route: ActivatedRoute,
		private _router: Router,
	) {
		super(_scheduleService, _confirmService);

		this.maCa = this._router.url.split('/')[3];
	}

	public ngOnInit() {
		this._route.paramMap.subscribe(params => {
			this.loading = true;

			this._scheduleService.get(this.maCa).subscribe(res => {
				if (res) {
					this.loading = false;
					this.dataTable = <any> res[0].nhanVien;
					this.totalRecords = <any> res[0].nhanVien.length;

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

	/**
	 * @override VMTable
	 */
	public delete(id?: string): void {
		let idArr: string[] = [];

		if (id === undefined) {
			const selected: any[] = this.selectedItems;

			selected.forEach(acc => {
				idArr.push(acc.maNhanVien);
			});
		}
		else idArr.push(id);

		this._scheduleService.deleteEmployees(this.maCa, idArr).subscribe(res => {
			if (res) {
				if (this.confirmDelete) {
					this.confirmDelete.hide();
				}
				this.showDeleteBtn = false;
				this.selectedItems = [];
				this.resetList();
			}
		});
	}

	private fetchData(): void {
		this._scheduleService.get(this.maCa).subscribe(res => {
			if (res) {
				this.loading = false;
				this.dataTable = <any> res[0].nhanVien;
				this.totalRecords = <any> res[0].nhanVien.length;
			}
		});
	}

	protected resetList(): void {
		this.loading = true;
		this.fetchData();
	}

	protected confirmDeleteSingle(id: string) {
		this._confirmService.confirm({
			message: 'Are you sure you want to delete?',
			accept: () => {
				this.delete(id);
			},
		});
	}
}
