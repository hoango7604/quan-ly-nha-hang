import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Message, MessageService } from 'primeng/api';

import { ControlsConfig } from '../../../data-types/controls-config';
import { editVisitorFormFieldsValidator } from '@@shared/directives/form-validation.directive';
import { EventInviteeService } from '../event-invitee.service';

@Component({
	selector: 'ggm-event-invitee-create',
	templateUrl: './event-invitee-create.component.html',
	styleUrls: ['./event-invitee-create.component.scss'],
})
export class EventInviteeCreateComponent implements OnInit, AfterViewInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	private controlsConfig: ControlsConfig = {
		['fullname']: new FormControl('', Validators.required),
		['email']: new FormControl('', Validators.required),
		['phoneNumber']: new FormControl(''),
		['company']: new FormControl(''),
	};
	public inviteeForm: FormGroup;

	get fullname() { return this.inviteeForm.get('fullname'); }
	get email() { return this.inviteeForm.get('email'); }
	get phoneNumber() { return this.inviteeForm.get('phoneNumber'); }
	get company() { return this.inviteeForm.get('company'); }

	constructor(
		private _messageService: MessageService,
		private _formBuilder: FormBuilder,
		private _eventInviteeService: EventInviteeService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {
		this.inviteeForm = this._formBuilder.group(this.controlsConfig);
		this.inviteeForm.setValidators(editVisitorFormFieldsValidator(this.inviteeForm));
	}

	public ngOnInit() {
		this.firstField.nativeElement.focus();
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

	public createInvitee() {
		this.inviteeForm.markAsDirty();
		if (this.inviteeForm.valid) {
			let invitee: any = {};
			invitee['fullname'] = this.fullname.value;
			invitee['email'] = this.email.value;
			if (this.phoneNumber.value) {
				invitee['phoneNumber'] = this.phoneNumber.value;
			}
			if (this.company.value) {
				invitee['company'] = this.company.value;
			}

			let inviteesList: Array<any> = [];
			inviteesList.push(invitee);
			this._eventInviteeService.createVisitorsAndAdd(inviteesList).subscribe(res => {
				if (res) {
					const msg: Message = {
						severity: 'success',
						summary: 'Invitee has been created successfully',
					};
					this.showMessage(msg);
					this.inviteeForm.reset();
					this.firstField.nativeElement.focus();
					this._router.navigate(['../', { updateTime: new Date().getTime() }], { relativeTo: this._route });
				}
			});
		}
	}
}
