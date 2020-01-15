import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { VMTable } from '../../view-models/vm-table';
import { ColumnTable } from '../../data-types/column-table';
import { ConfirmationService } from 'primeng/api';
import { StorageService } from '@@core/services/storage.service';

@Component({
	selector: 'ggm-invoice-list',
	templateUrl: './invoice-list.component.html',
	styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent extends VMTable implements OnInit, AfterViewInit {

	public cols: ColumnTable[] = [
		{ field: 'maPhieuChon', header: '', display: 'none' },
		{ field: 'tenBan', header: 'Tên bàn', display: 'table-cell', hasLink: false },
		{ field: 'tongTien', header: 'Tổng tiền', display: 'table-cell', hasLink: false },
		{ field: 'ngayTao', header: 'Ngày tạo', display: 'table-cell', isDate: true },
	];
	public idField: string = 'maPhieuChon';

	constructor(
		private _invoiceService: InvoiceService,
		private _confirmService: ConfirmationService,
		private _route: ActivatedRoute,
		private _storageService: StorageService,
		private _router: Router,
	) {
		super(_invoiceService, _confirmService);
	}

	public ngOnInit() {  }

	public navigateEditAccount(id: number): void {
		this._router.navigate([`./${id}`], { relativeTo: this._route });
	}

	public ngAfterViewInit() {
		this._route.paramMap.subscribe(params => {
			this.loading = true;

			this._invoiceService.fetchData().subscribe(res => {
				this.loading = false;
				if (res && res.data.length > 0) {
					let data = res.data.map((pcm: any) => {
						return {
							maPhieuChon: pcm.maPhieuChon,
							tenBan: pcm.banAn.tenBan,
							tongTien: pcm.tongTien,
							ngayTao: new Date(pcm.ngayTao),
						};
					});
					this.dataTable = data;
					this.totalRecords = res['total'];
				}
				else {
					this.dataTable = [],
					this.totalRecords = 0;
				}
			});
		});
	}
}
