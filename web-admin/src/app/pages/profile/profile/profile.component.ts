import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SelectItem, Message, MessageService } from 'primeng/api';

import { updateProfileAFormFieldsValidator } from '@@shared/directives/form-validation.directive';
import { ControlsConfig } from '../../data-types/controls-config';
import { StorageService } from '@@core/services/storage.service';
import { ProfileService } from '../profile.service';

@Component({
	selector: 'ggm-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	public userform: FormGroup;
	private roleItems: SelectItem[] = [];
	public msgs: Message[] = [];
	public selectedRole: string;
	private _id: string;
	private _account: any;

	private controlsConfig: ControlsConfig = {
		['username']: new FormControl('', Validators.required),
		['fullname']: new FormControl('', Validators.required),
		['role']: new FormControl('', Validators.required),
		['oldpassword']: new FormControl(''),
		['newpassword']: new FormControl(''),
		['confirmPassword']: new FormControl(''),
		['email']: new FormControl('', Validators.required),
		['phoneNumber']: new FormControl(''),
	};

	get username() { return this.userform.get('username'); }
	get oldpassword() { return this.userform.get('oldpassword'); }
	get newpassword() { return this.userform.get('newpassword'); }
	get confirmpassword() { return this.userform.get('confirmPassword'); }
	get fullname() { return this.userform.get('fullname'); }
	get role() { return this.userform.get('role'); }
	get email() { return this.userform.get('email'); }
	get phoneNumber() { return this.userform.get('phoneNumber'); }

	constructor(
		private _profileService: ProfileService,
		private _formBuilder: FormBuilder,
		private _messageService: MessageService,
		private _route: ActivatedRoute,
		private _storageService: StorageService,
	) {
		this.userform = this._formBuilder.group(this.controlsConfig);
		this.userform.setValidators(updateProfileAFormFieldsValidator(this.userform));
	}

	private fillForm(account: any) {
		this.username.setValue(account.username);
		this.fullname.setValue(account.fullname);
		this.email.setValue(account.email);
		this.phoneNumber.setValue(account.phoneNumber);
		this.selectedRole = account.role;
	}

	public ngOnInit() {
		this._id = this._storageService.getCurrentUser().id;

		const roles = [
			'SYSADMIN',
			'SUPERVISOR',
		];
		roles.forEach(role => {
			let selectItem: SelectItem = {label: '', value: ''};
			selectItem.label = role;
			selectItem.value = role;
			this.roleItems.push(selectItem);
		});

		this._profileService.get(this._id).subscribe(account => {
			this._account = account;

			this.fillForm(account);
		});

		this.firstField.nativeElement.focus();
	}

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public reset() {
		this.fillForm(this._account);

		this.oldpassword.reset();
		this.newpassword.reset();
		this.confirmpassword.reset();

		this.userform.markAsPristine();
	}

	public updateProfile() {
		this.userform.markAsDirty();
		if (this.userform.valid) {
			let account: any = {};
			account['id'] = this._account.id;
			account['fullname'] = this.fullname.value;
			account['role'] = this.role.value;
			account['email'] = this.email.value;
			if (this.oldpassword.value) {
				account['oldPassword'] = this.oldpassword.value;
			}
			if (this.newpassword.value) {
				account['newPassword'] = this.newpassword.value;
			}
			if (this.phoneNumber.value) {
				account['phoneNumber'] = this.phoneNumber.value;
			}

			// If user type oldPassword and newPassword, first change password
			// Then change other profile detail
			if (account['oldPassword'] && account['newPassword']) {
				this._profileService.updatePassword(account).subscribe(
					(res1) => {
						if (res1.message === 'Success') {
							this._profileService.updateProfile(account).subscribe(
								(res2) => {
									if (res2.message === 'Success') {
										const msg: Message = {
											severity: 'success',
											summary: 'Profile has been successfully updated',
										};
										this.showMessage(msg);

										this._profileService.get(this._id).subscribe(res_account => {
											this._account = res_account;
											this.reset();
										});
									}
								},
								(err) => {
									const msg: Message = {
										severity: 'error',
										summary: err.error.message,
									};
									this.showMessage(msg);
								},
							);
						}
					},
					(err) => {
						const msg: Message = {
							severity: 'error',
							summary: err.error.message,
						};
						this.showMessage(msg);
					},
				);
			}
			else {
				this._profileService.updateProfile(account).subscribe(
					(res) => {
						if (res.message === 'Success') {
							const msg: Message = {
								severity: 'success',
								summary: 'Profile has been successfully updated',
							};
							this.showMessage(msg);

							this._profileService.get(this._id).subscribe(res_account => {
								this._account = res_account;
								this.reset();
							});
						}
					},
					(err) => {
						const msg: Message = {
							severity: 'error',
							summary: err.error.message,
						};
						this.showMessage(msg);
					},
				);
			}
		}
	}
}
