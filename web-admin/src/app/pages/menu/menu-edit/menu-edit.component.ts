import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem, MessageService, Message } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { MenuService } from '../menu.service';
import { Location } from '@angular/common';
import { ControlsConfig } from '../../data-types/controls-config';
import { editUserFormFieldsValidator } from '@@shared/directives/form-validation.directive';

@Component({
	selector: 'ggm-menu-edit',
	templateUrl: './menu-edit.component.html',
	styleUrls: ['./menu-edit.component.scss'],
})
export class MenuEditComponent implements OnInit {

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
		['username']: new FormControl('', Validators.required),
		['fullname']: new FormControl('', Validators.required),
		['role']: new FormControl('', Validators.required),
		['password']: new FormControl(''),
		['confirmPassword']: new FormControl(''),
	};
	public userform: FormGroup;
	// private account: Account;

	get username() { return this.userform.get('username'); }
	get password() { return this.userform.get('password'); }
	get fullname() { return this.userform.get('fullname'); }
	get role() { return this.userform.get('role'); }

	constructor(
		private _messageService: MessageService,
		private _location: Location,
		private _formBuilder: FormBuilder,
		private _menuService: MenuService,
		private _accountService: AccountService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {
		this.userform = this._formBuilder.group(this.controlsConfig);
		this.userform.setValidators(editUserFormFieldsValidator(this.userform));
	}

	public ngOnInit() {
		let roles: Array<any>;
		this._accountService.getRoles().subscribe(res => {
			roles = res;
			roles.forEach((role: any) => {
				let selectItem: SelectItem = {label: '', value: ''};
				selectItem.label = role.tenViTri;
				selectItem.value = role.maViTri;
				this.roleItems.push(selectItem);

				if (role.tenViTri.toUpperCase() == 'QUẢN LÝ') {
					this.QUANLY_INDEX = role.maViTri;
				}
			});
		});

		this._route.paramMap.subscribe(params => {
			let id = params.get('id');
			this._menuService.get(id).subscribe(account => {
				this._account = account;

				this.username.setValue(account.tenDangNhap);
				this.fullname.setValue(account.tenNhanVien);
				this.selectedRole = account.viTri.maViTri;

				if (this.selectedRole != this.QUANLY_INDEX) {
					this.isAbleToChangePassword = true;
				}
				else {
					this.isAbleToChangePassword = false;
				}
			});
		});

		this.firstField.nativeElement.focus();
	}

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public updateAccount() {
		this.userform.markAsDirty();
		if (this.userform.valid) {
			let account: any = {};
			account['maNhanVien'] = this._account.maNhanVien;
			account['tenNhanVien'] = this.fullname.value;
			account['tenDangNhap'] = this.username.value;
			let role = this.role.value;
			if (role != this.QUANLY_INDEX && this.password.value != '') {
				account['matKhau'] = this.password.value;
			}

			this._menuService.update(account).subscribe(res => {
				if (res) {
					const msg: Message = {
						severity: 'success',
						summary: 'Cập nhật thông tin nhân viên thành công',
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
