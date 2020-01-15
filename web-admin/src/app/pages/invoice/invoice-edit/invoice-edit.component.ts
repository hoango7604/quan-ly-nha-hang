import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem, MessageService, Message } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { Location } from '@angular/common';
import { ControlsConfig } from '../../data-types/controls-config';

@Component({
	selector: 'ggm-invoice-edit',
	templateUrl: './invoice-edit.component.html',
	styleUrls: ['./invoice-edit.component.scss'],
})
export class InvoiceEditComponent implements OnInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	public eventItems: SelectItem[] = [];
	public roleItems: SelectItem[] = [];
	public msgs: Message[] = [];
	public selectedRole: number;
	public isRequireDependEvent: boolean = false;
	public isAbleToChangePassword: boolean = false;
	private _account: any;
	private QUANLY_INDEX: number = 0;

	private controlsConfig: ControlsConfig = {
		['maPhieuChon']: new FormControl(''),
		['giamGia']: new FormControl(''),
		['ghiChu']: new FormControl(''),
	};
	public userform: FormGroup;
	// private account: Account;

	get maPhieuChon() { return this.userform.get('maPhieuChon'); }
	get giamGia() { return this.userform.get('giamGia'); }
	get ghiChu() { return this.userform.get('ghiChu'); }

	constructor(
		private _messageService: MessageService,
		private _location: Location,
		private _formBuilder: FormBuilder,
		private _invoiceService: InvoiceService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {
		this.userform = this._formBuilder.group(this.controlsConfig);
	}

	public ngOnInit() {
		this._route.paramMap.subscribe(params => {
			let id = params.get('idPhieuChon');
			this.maPhieuChon.setValue(id);
		});

		this.firstField.nativeElement.focus();
	}

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public updateAccount() {
		this.userform.markAsDirty();
		if (this.userform.valid) {
			let invoice: any = {};
			invoice['maPhieuChon'] = this.maPhieuChon.value;
			if (this.giamGia.value != '') {
				invoice['giamGia'] = this.giamGia.value;
			}
			if (this.ghiChu.value != '') {
				invoice['ghiChu'] = this.ghiChu.value;
			}

			this._invoiceService.add(invoice).subscribe(res => {
				if (res) {
					const msg: Message = {
						severity: 'success',
						summary: 'Đã thanh toán thành công',
					};
					this.showMessage(msg);
					this.userform.reset();
					this.firstField.nativeElement.focus();
					this._router.navigate(['../', { updateTime: new Date().getTime() }], { relativeTo: this._route });
				}
			});
		}
	}

}
