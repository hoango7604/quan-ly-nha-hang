import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem, MessageService, Message } from 'primeng/api';
import { Router } from '@angular/router';
import { MenuService } from '../menu.service';
import { Location } from '@angular/common';
import { ControlsConfig } from '../../data-types/controls-config';
import { basicUserFormFieldsValidator } from '@@shared/directives/form-validation.directive';

@Component({
	selector: 'ggm-menu-create',
	templateUrl: './menu-create.component.html',
	styleUrls: ['./menu-create.component.scss'],
	providers: [MessageService],
})
export class MenuCreateComponent implements OnInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	public shouldCreateAnother: boolean = false;
	public roleItems: SelectItem[] = [];
	public eventItems: SelectItem[] = [];
	public msgs: Message[] = [];
	public isRequireDependEvent: boolean = false;

	private controlsConfig: ControlsConfig = {
		['tenMonAn']: new FormControl('', Validators.required),
		['maDanhMuc']: new FormControl('', Validators.required),
		['gia']: new FormControl('', Validators.required),
		['moTa']: new FormControl(''),
		['ghiChu']: new FormControl(''),
	};
	public userform: FormGroup;
	// private account: Account;

	constructor(
		private _messageService: MessageService,
		private _location: Location,
		private _formBuilder: FormBuilder,
		private _menuService: MenuService,
		private _router: Router,
	) {

		this.userform = this._formBuilder.group(this.controlsConfig);
		this.userform.setValidators(basicUserFormFieldsValidator(this.userform));
	}

	public ngOnInit() {
		let categories: Array<any>;
		this._menuService.getCategory().subscribe((res: any) => {
			categories = res.data;
			categories.forEach((ct: any) => {
				let selectItem: SelectItem = {label: '', value: ''};
				selectItem.label = ct.tenDanhMuc;
				selectItem.value = ct.maDanhMuc;
				this.roleItems.push(selectItem);
			});
		});

		this.firstField.nativeElement.focus();
	}

	get tenMonAn() { return this.userform.get('tenMonAn'); }
	get maDanhMuc() { return this.userform.get('maDanhMuc'); }
	get gia() { return this.userform.get('gia'); }
	get moTa() { return this.userform.get('moTa'); }
	get ghiChu() { return this.userform.get('ghiChu'); }

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public createAccount() {
		this.userform.markAsDirty();
		if (this.userform.valid) {
			let data: any = {};
			data['tenMonAn'] = this.tenMonAn.value;
			data['maDanhMuc'] = this.maDanhMuc.value;
			data['gia'] = this.gia.value;
			if (this.moTa.value != '') {
				data['moTa'] = this.moTa.value;
			}
			if (this.ghiChu.value != '') {
				data['ghiChu'] = this.ghiChu.value;
			}

			this._menuService.add(data).subscribe(res => {
				if (res) {
					const msg: Message = {
						severity: 'success',
						summary: 'Thêm món ăn mới thành công',
					};
					this.showMessage(msg);
					this.userform.reset();
					this.firstField.nativeElement.focus();
					this._router.navigate(['/menu/list']);
				}
			});
		}
	}

}
