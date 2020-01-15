import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { ControlsConfig } from '../../data-types/controls-config';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { VisitorService } from '../visitor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { editVisitorFormFieldsValidator } from '@@shared/directives/form-validation.directive';
import { StorageService } from '@@core/services/storage.service';

@Component({
	selector: 'ggm-visitor-create',
	templateUrl: './visitor-create.component.html',
	styleUrls: ['./visitor-create.component.scss'],
})
export class VisitorCreateComponent implements OnInit, AfterViewInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	private controlsConfig: ControlsConfig = {
		['fullname']: new FormControl('', Validators.required),
		['email']: new FormControl('', Validators.required),
		['phoneNumber']: new FormControl(''),
		['company']: new FormControl(''),
	};
	public visitorForm: FormGroup;
	public maPhieuChon: string;
	public monan: any[];
	public cars: SelectItem[];

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
		this.maPhieuChon = window.location.hash.split('/')[4];
		this.visitorForm = this._formBuilder.group(this.controlsConfig);
		this.visitorForm.setValidators(editVisitorFormFieldsValidator(this.visitorForm));
	}

	public ngOnInit() {
		this._visitorService.getMenu().subscribe((res: any) => {
			if (res && res.data && res.data.length > 0) {
				let monan = res.data.map((m: any, index: number) => {
					return {
						label: m.tenMonAn,
						value: index.toString(),
					};
				});
				this.monan = res.data;
				this.cars = monan;
				this.fullname.setValue(0);
			}
		});
	}

	public ngAfterViewInit() {
		scrollBy({
			top: 10000,
			left: 0,
			behavior: 'smooth',
		});
	}

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public createVisitor() {
		this.visitorForm.markAsDirty();
		if (this.visitorForm.valid) {
			let data: any = {};
			let index = Number.parseInt(this.fullname.value);
			data['maPhieuChon'] = this.maPhieuChon;
			data['maMonAn'] = this.monan[index].maMonAn;
			data['maNhanVien'] = this._storageService.getCurrentUser().maNhanVien;
			data['soLuong'] = this.email.value;
			data['gia'] = this.monan[index].gia;
			if (this.company.value) {
				data['ghiChu'] = this.company.value;
			}

			this._visitorService.create(data).subscribe(res => {
				if (res) {
					const msg: Message = {
						severity: 'success',
						summary: 'Thêm món thành công',
					};
					this.showMessage(msg);
					this._router.navigate(['../../', { updateTime: new Date().getTime() }], { relativeTo: this._route });
				}
			});
		}
	}

}
