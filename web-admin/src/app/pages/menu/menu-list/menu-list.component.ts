import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../menu.service';
import { VMTable } from '../../view-models/vm-table';
import { ColumnTable } from '../../data-types/column-table';
import { ConfirmationService } from 'primeng/api';
import { StorageService } from '@@core/services/storage.service';

@Component({
	selector: 'ggm-menu-list',
	templateUrl: './menu-list.component.html',
	styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent extends VMTable implements OnInit, AfterViewInit {

	public cols: ColumnTable[] = [
		{ field: 'maMonAn', header: '', display: 'none' },
		{ field: 'tenMonAn', header: 'Tên món', display: 'table-cell', hasLink: true },
		{ field: 'tenDanhMuc', header: 'Danh mục', display: 'table-cell', hasLink: false },
		{ field: 'gia', header: 'Giá', display: 'table-cell', hasLink: false },
		{ field: 'khoaMon', header: 'Tình trạng', display: 'table-cell', isBoolean: true },
	];
	public idField: string = 'maMonAn';

	constructor(
		private _menuService: MenuService,
		private _confirmService: ConfirmationService,
		private _route: ActivatedRoute,
		private _storageService: StorageService,
		private _router: Router,
	) {
		super(_menuService, _confirmService);
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

			this._menuService.fetchData().subscribe((res: any) => {
				this.loading = false;
				if (res && res.data.length > 0) {
					let data = res.data.map((m: any) => {
						return {
							maMonAn: m.maMonAn,
							tenMonAn: m.tenMonAn,
							tenDanhMuc: m.danhMucMon.tenDanhMuc,
							gia: m.gia,
							khoaMon: m.khoaMon,
						};
					});
					this.dataTable = data;
					this.totalRecords = res['total'];
				}
				else {
					this.dataTable = [];
					this.totalRecords = 0;
				}
			});
		});
	}
}
