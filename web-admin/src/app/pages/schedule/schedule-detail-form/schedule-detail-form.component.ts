import { Component, Injectable, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as moment from 'moment';
import { MessageService, SelectItem, Message } from 'primeng/api';

import { ScheduleService } from '../schedule.service';
import { basicEventFormValidator } from '@@shared/directives/form-validation.directive';

@Component({
	selector: 'ggm-schedule-detail-form',
	templateUrl: './schedule-detail-form.component.html',
	styleUrls: ['./schedule-detail-form.component.scss'],
})
@Injectable()
export class ScheduleDetailFormComponent implements OnInit, AfterViewInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	private _id: string;
	private _startTime: Date;
	private _endTime: Date;

	public eventForm: FormGroup;
	public msgs: Message[] = [];
	public stateItems: SelectItem[] = [];
	public formReady: boolean = false;

	constructor(
		private _scheduleService: ScheduleService,
		private _formBuilder: FormBuilder,
		private _location: Location,
		private _messageService: MessageService,
		private _route: ActivatedRoute,
	) { }

	public ngOnInit() {

		this._id = window.location.hash.split('/')[3];

		this._scheduleService.get(this._id).subscribe(res => {
			if (res) {
				const data: any = res[0];

				this._startTime = new Date(data.thoiGianBatDau);
				this._endTime = new Date(data.thoiGianKetThuc);

				this.eventForm = this._formBuilder.group({
					['eventName']: new FormControl(data.tenCa, Validators.required),
					['startTime']: new FormControl(this._startTime, Validators.required),
					['endTime']: new FormControl(this._endTime, Validators.required),
				});

				this.eventForm.setValidators(basicEventFormValidator(this.eventForm, true));
				this.formReady = true;
			}
		});
	}

	public ngAfterViewInit() {
		this.firstField.nativeElement.focus();
	}

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	get eventName() { return this.eventForm.get('eventName'); }
	get startTime() { return this.eventForm.get('startTime'); }
	get endTime() { return this.eventForm.get('endTime'); }

	public onSave() {
		this.eventForm.markAsDirty();
		if (this.eventForm.valid) {
			let data: any = {};
			data['maCa'] = this._id;
			data['tenCa'] = this.eventName.value;
			data['thoiGianBatDau'] = moment(this.startTime.value).format();
			data['thoiGianKetThuc'] = moment(this.endTime.value).format();

			this._scheduleService.update(data).subscribe(res => {
				if (res) {
					const msg: Message = {
						severity: 'success',
						summary: 'Cập nhật ca làm việc thành công',
					};
					this.showMessage(msg);
					this.firstField.nativeElement.focus();
					this.eventForm.markAsPristine();
				}
			});
		}
	}
}
