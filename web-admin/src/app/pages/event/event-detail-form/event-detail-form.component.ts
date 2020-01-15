import { Component, Injectable, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MessageService, SelectItem, Message } from 'primeng/api';

import { EventService } from '../event.service';
import { basicEventFormValidator } from '@@shared/directives/form-validation.directive';
import { EventState } from '../models/event';

@Component({
	selector: 'ggm-event-detail-form',
	templateUrl: './event-detail-form.component.html',
	styleUrls: ['./event-detail-form.component.scss'],
})
@Injectable()
export class EventDetailFormComponent implements OnInit, AfterViewInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	private _id: string;
	private _startTime: Date;
	private _endTime: Date;

	public eventForm: FormGroup;
	public msgs: Message[] = [];
	public stateItems: SelectItem[] = [];
	public formReady: boolean = false;

	constructor(
		private _eventService: EventService,
		private _formBuilder: FormBuilder,
		private _location: Location,
		private _messageService: MessageService,
		private _route: ActivatedRoute,
	) { }

	public ngOnInit() {

		this._id = window.location.hash.split('/')[3];

		this._route.data.subscribe(res => {
			if (res) {
				const data: any = res[0];

				for (let state in EventState) {
					this.stateItems.push({ label: EventState[state], value: EventState[state] });
				}

				this._startTime = new Date(data.startTime);
				this._endTime = new Date(data.endTime);

				this.eventForm = this._formBuilder.group(
					{
						['eventName']: new FormControl(data.name),
						['place']: new FormControl(data.place),
						['startTime']: new FormControl(this._startTime),
						['endTime']: new FormControl(this._endTime),
						['eventState']: new FormControl(data.state, Validators.required),
						['requireCheckout']: new FormControl(data.requireCheckout),
						['useKiosk']: new FormControl(data.useKiosk),
					},
				);

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

	public onSave() {
		if (this.eventForm.valid && this.eventForm.dirty) {
			let data: any = {};

			Object.keys(this.eventForm.controls).forEach(key => {
				const control = this.eventForm.get(key);
				if (control.dirty) {
					data[key] = control.value;
				}
			});

			if (Object.values(data).length > 0) {
				data['id'] = this._id;
				console.log(data);
				this._eventService.update(data).subscribe(res => {
					if (res) {
						const msg: Message = {severity: 'success', summary: 'This event has been successfully updated'};
						this.showMessage(msg);
					}
				});
			}
		}
	}
}
