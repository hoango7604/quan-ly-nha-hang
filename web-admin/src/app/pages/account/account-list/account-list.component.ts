import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { VMTable } from '../../view-models/vm-table';
import { ColumnTable } from '../../data-types/column-table';
import { ConfirmationService } from 'primeng/api';
import { StorageService } from '@@core/services/storage.service';

@Component({
	selector: 'ggm-account-list',
	templateUrl: './account-list.component.html',
	styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent extends VMTable implements OnInit, AfterViewInit {

	public cols: ColumnTable[] = [
		{ field: 'maNhanVien', header: '', display: 'none' },
		{ field: 'tenNhanVien', header: 'Tên nhân viên', display: 'table-cell', hasLink: true },
		{ field: 'tenViTri', header: 'Vị trí', display: 'table-cell', hasLink: false },
		{ field: 'tenDangNhap', header: 'Tên đăng nhập', display: 'table-cell', hasLink: false },
	];
	public idField: string = 'maNhanVien';

	constructor(
		private _accService: AccountService,
		private _confirmService: ConfirmationService,
		private _route: ActivatedRoute,
		private _storageService: StorageService,
		private _router: Router,
	) {
		super(_accService, _confirmService);
	}

	public ngOnInit() {  }

	public isDisableButton(id: number): boolean {
		const user = this._storageService.getCurrentUser();
		return (user ? user.id === id : false);
	}

	public navigateEditAccount(id: number): void {
		this._router.navigate([`./${id}`], { relativeTo: this._route });
	}

	public ngAfterViewInit() {
		this._route.paramMap.subscribe(params => {
			this.loading = true;

			this._accService.fetchData(this.pageIndex, this.pageSize, this.sortField, this.sortOrder).subscribe(res => {
				if (res) {
					this.loading = false;
					this.dataTable = res['data'];
					this.totalRecords = res['total'];
				}
			});
		});
	}
}
