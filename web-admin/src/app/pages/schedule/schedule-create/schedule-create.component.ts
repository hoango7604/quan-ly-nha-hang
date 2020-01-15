import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

import { ScheduleService } from '../schedule.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService, Message, SelectItem } from 'primeng/api';
import { basicEventFormValidator } from '@@shared/directives/form-validation.directive';
import { ControlsConfig } from '../../data-types/controls-config';

@Component({
	selector: 'ggm-schedule-create',
	templateUrl: './schedule-create.component.html',
	styleUrls: ['./schedule-create.component.scss'],
})
export class ScheduleCreateComponent implements OnInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	public eventForm: FormGroup;
	public msgs: Message[] = [];
	public stateItems: SelectItem[] = [];
	public shouldCreateAnother: boolean = false;

	private controlsConfig: ControlsConfig = {
		['eventName']: new FormControl('', Validators.required),
		['startTime']: new FormControl(new Date(), Validators.required),
		['endTime']: new FormControl(new Date(new Date().setHours(new Date().getHours() + 1)), Validators.required),
	};

	constructor(
		private _scheduleService: ScheduleService,
		private _formBuilder: FormBuilder,
		private _location: Location,
		private _messageService: MessageService,
		private _router: Router,
	) {
		this.eventForm = this._formBuilder.group(this.controlsConfig);
		this.eventForm.setValidators(basicEventFormValidator(this.eventForm, true));
	}

	public ngOnInit() {
		this.firstField.nativeElement.focus();
	}

	get eventName() { return this.eventForm.get('eventName'); }
	get startTime() { return this.eventForm.get('startTime'); }
	get endTime() { return this.eventForm.get('endTime'); }

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public createEvent() {
		this.eventForm.markAsDirty();
		if (this.eventForm.valid) {
			let data: any = {};
			data['tenCa'] = this.eventName.value;
			data['thoiGianBatDau'] = moment(this.startTime.value).format();
			data['thoiGianKetThuc'] = moment(this.endTime.value).format();

			this._scheduleService.add(data).subscribe(res => {
				if (res) {
					const msg: Message = {
						severity: 'success',
						summary: 'Tạo ca làm việc thành công',
					};
					this.showMessage(msg);
					this.firstField.nativeElement.focus();
					this._router.navigate(['/schedule/list']);
				}
			});
		}
	}
}
