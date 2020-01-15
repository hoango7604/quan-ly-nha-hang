import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

import { ControlsConfig } from '../../data-types/controls-config';
import { VisitorService } from '../visitor.service';
import { editVisitorFormFieldsValidator } from '@@shared/directives/form-validation.directive';
import { StorageService } from '@@core/services/storage.service';

@Component({
	selector: 'ggm-visitor-edit',
	templateUrl: './visitor-edit.component.html',
	styleUrls: ['./visitor-edit.component.scss'],
})
export class VisitorEditComponent implements OnInit, AfterViewInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	private _visitor: any;

	private controlsConfig: ControlsConfig = {
		['fullname']: new FormControl('', Validators.required),
		['email']: new FormControl('', Validators.required),
		['phoneNumber']: new FormControl(''),
		['company']: new FormControl(''),
	};
	public visitorForm: FormGroup;
	public id: string;
	public maMonAn: number;
	public gia: number;
	public index: number;
	public maPhieuChon: number;

	get fullname() { return this.visitorForm.get('fullname'); }
	get email() { return this.visitorForm.get('email'); }
	get phoneNumber() { return this.visitorForm.get('phoneNumber'); }
	get company() { return this.visitorForm.get('company'); }

	constructor(
		private _messageService: MessageService,
		private _formBuilder: FormBuilder,
		private _visitorService: VisitorService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _storageService: StorageService,
	) {
		this.visitorForm = this._formBuilder.group(this.controlsConfig);
		this.visitorForm.setValidators(editVisitorFormFieldsValidator(this.visitorForm));
	}

	public ngOnInit() {
		this._route.paramMap.subscribe(params => {
			this.id = window.location.hash.split('/')[2].split(';')[0];
			this.index = Number.parseInt(params.get('idMon'));
			this.maPhieuChon = Number.parseInt(params.get('idPhieuChon'));
			this._visitorService.get(this.id).subscribe((res: any) => {
				this.maMonAn = res.chiTietPhieuChonMon[this.index].monAn.maMonAn;
				this.gia = res.chiTietPhieuChonMon[this.index].gia;

				this.fullname.setValue(res.chiTietPhieuChonMon[this.index].monAn.tenMonAn);
				this.email.setValue(res.chiTietPhieuChonMon[this.index].soLuong);
				this.company.setValue(res.chiTietPhieuChonMon[this.index].ghiChu);
			});
		});
	}

	public ngAfterViewInit() {
		scrollBy({
			top: 10000,
			left: 0,
			behavior: 'smooth',
		});

		setTimeout(() => {
			this.firstField.nativeElement.focus();
		}, 1000);
	}

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public updateVisitor() {
		this.visitorForm.markAsDirty();
		if (this.visitorForm.valid) {
			let data: any = {};
			data['maPhieuChon'] = this.maPhieuChon;
			data['maMonAn'] = this.maMonAn;
			data['maNhanVien'] = this._storageService.getCurrentUser().maNhanVien;
			data['soLuong'] = this.email.value;
			data['gia'] = this.gia;
			if (data['soLuong'] == 0) {
				data['huyMon'] = true;
			}
			else {
				data['huyMon'] = false;
			}
			if (this.company.value) {
				data['ghiChu'] = this.company.value;
			}

			this._visitorService.update(data).subscribe(res => {
				if (res) {
					console.log(res);
					const msg: Message = {
						severity: 'success',
						summary: 'Cập nhật thành công',
					};
					this.showMessage(msg);
					this.visitorForm.reset();
					this.firstField.nativeElement.focus();
					this._router.navigate(['../../', { updateTime: new Date().getTime() }], { relativeTo: this._route });
				}
			});
		}
	}

}
