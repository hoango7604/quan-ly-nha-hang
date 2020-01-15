import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VMTable } from '../../view-models/vm-table';
import { ColumnTable } from '../../data-types/column-table';
import { VisitorService } from '../visitor.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'ggm-visitor-list',
	templateUrl: './visitor-list.component.html',
	styleUrls: ['./visitor-list.component.scss'],
})
export class VisitorListComponent extends VMTable implements OnInit, AfterViewInit {

	protected _id: string;
	public phieuchonmon: any;
	public shoudOpenTable: boolean;
	public isMakingPayRequest: boolean = false;

	public cols: ColumnTable[] = [
		{ field: 'id', header: '', display: 'none' },
		{ field: 'tenMonAn', header: 'Tên món ăn', display: 'table-cell', hasLink: false },
		{ field: 'soLuong', header: 'Số lượng', display: 'table-cell', hasLink: false },
		{ field: 'thanhTien', header: 'Thành tiền', display: 'table-cell', hasLink: false },
		{ field: 'tenNhanVien', header: 'Nhân viên đặt món', display: 'table-cell', hasLink: false },
	];
	public idField: string = 'id';

	constructor(
		private _visitorService: VisitorService,
		private _messageService: MessageService,
		private _confirmService: ConfirmationService,
		private _route: ActivatedRoute,
	) {
		super(_visitorService, _confirmService);
		this._id = window.location.hash.split('/')[2];
	}

	public ngOnInit() {
		this._route.paramMap.subscribe(params => {
			this.loading = true;

			this._visitorService.get(this._id).subscribe(res => {
				this.loading = false;
				if (res) {
					this.shoudOpenTable = false;
					this.phieuchonmon = res;
					if (res.banAn.trangThai == 'DANGTHANHTOAN') {
						this.isMakingPayRequest = true;
					}

					if (res.chiTietPhieuChonMon.length > 0) {
						const dataToTableView = (res.chiTietPhieuChonMon as Array<any>).map((ctp: any, index: number) => {
							return {
								id: index,
								tenMonAn: ctp.monAn.tenMonAn,
								soLuong: ctp.soLuong,
								thanhTien: ctp.thanhTien,
								tenNhanVien: ctp.nhanVien.tenNhanVien,
							};
						});
						this.dataTable = dataToTableView;
						this.totalRecords = dataToTableView.length;

						this.scrollToTop();
					}
					else {
						this.dataTable = [];
						this.totalRecords = 0;
					}
				}
				else {
					this.shoudOpenTable = true;
				}
			});
		});
	}

	public ngAfterViewInit() {
		// this._route.paramMap.subscribe(params => {
		// 	this.loading = true;

		// 	this._visitorService.get(this._id).subscribe(res => {
		// 		this.loading = false;
		// 		if (res) {
		// 			this.shoudOpenTable = false;
		// 			if (res.chiTietPhieuChonMon.length > 0) {
		// 				this.phieuchonmon = res;
		// 				const dataToTableView = (res.chiTietPhieuChonMon as Array<any>).map((ctp: any, index: number) => {
		// 					return {
		// 						id: index,
		// 						tenMonAn: ctp.monAn.tenMonAn,
		// 						soLuong: ctp.soLuong,
		// 						thanhTien: ctp.thanhTien,
		// 						tenNhanVien: ctp.nhanVien.tenNhanVien
		// 					};
		// 				});
		// 				this.dataTable = dataToTableView;
		// 				this.totalRecords = dataToTableView.length;

		// 				this.scrollToTop();
		// 			}
		// 		}
		// 		else {
		// 			this.shoudOpenTable = true;
		// 		}
		// 	});
		// });
	}

	private scrollToTop() {
		scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public openTable() {
		this._visitorService.add(this._id).subscribe((res: any) => {
			if (res) {
				const msg: Message = {
					severity: 'success',
					summary: 'Mở bàn thành công',
				};
				this.showMessage(msg);
				this.phieuchonmon = res.data;
				this.shoudOpenTable = false;
			}
		});
	}

	public makePaymentRequest() {
		this._visitorService.paymentRequest(this._id).subscribe((res: any) => {
			if (res) {
				this.isMakingPayRequest = true;
				const msg: Message = {
					severity: 'success',
					summary: 'Đã yêu cầu thanh toán',
				};
				this._messageService.add(msg);
			}
		});
	}
}
