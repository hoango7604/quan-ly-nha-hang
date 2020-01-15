import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem, MessageService, Message } from 'primeng/api';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Location } from '@angular/common';
import { ControlsConfig } from '../../data-types/controls-config';
import { basicUserFormFieldsValidator } from '@@shared/directives/form-validation.directive';

@Component({
	selector: 'ggm-account-create',
	templateUrl: './account-create.component.html',
	styleUrls: ['./account-create.component.scss'],
	providers: [MessageService],
})
export class AccountCreateComponent implements OnInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	public shouldCreateAnother: boolean = false;
	public roleItems: SelectItem[] = [];
	public eventItems: SelectItem[] = [];
	public msgs: Message[] = [];
	public isRequireDependEvent: boolean = false;

	private controlsConfig: ControlsConfig = {
		['username']: new FormControl('', Validators.required),
		['fullname']: new FormControl('', Validators.required),
		['role']: new FormControl('', Validators.required),
		['password']: new FormControl('', Validators.required),
		['confirmPassword']: new FormControl('', Validators.required),
	};
	public userform: FormGroup;
	// private account: Account;

	constructor(
		private _messageService: MessageService,
		private _location: Location,
		private _formBuilder: FormBuilder,
		private _accountService: AccountService,
		private _router: Router,
	) {

		this.userform = this._formBuilder.group(this.controlsConfig);
		this.userform.setValidators(basicUserFormFieldsValidator(this.userform));
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
			});
		});

		this.firstField.nativeElement.focus();
	}

	get username() { return this.userform.get('username'); }
	get password() { return this.userform.get('password'); }
	get fullname() { return this.userform.get('fullname'); }
	get role() { return this.userform.get('role'); }

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public createAccount() {
		this.userform.markAsDirty();
		if (this.userform.valid) {
			let account: any = {};
			account['tenNhanVien'] = this.fullname.value;
			account['tenDangNhap'] = this.username.value;
			account['maViTri'] = this.role.value;
			account['matKhau'] = this.password.value;

			this._accountService.add(account).subscribe(res => {
				if (res) {
					const msg: Message = {
						severity: 'success',
						summary: 'Tạo nhân viên mới thành công',
					};
					this.showMessage(msg);
					this.userform.reset();
					this.firstField.nativeElement.focus();
					this._router.navigate(['/accounts/list']);
				}
			});
		}
	}

}
