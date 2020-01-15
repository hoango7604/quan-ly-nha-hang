import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EventService } from '../event.service';
import { EventState } from '../models/event';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService, Message, SelectItem } from 'primeng/api';
import { basicEventFormValidator } from '@@shared/directives/form-validation.directive';

@Component({
	selector: 'ggm-event-create',
	templateUrl: './event-create.component.html',
	styleUrls: ['./event-create.component.scss'],
})
export class EventCreateComponent implements OnInit {

	@ViewChild('firstfield') public firstField: ElementRef;

	public eventForm: FormGroup;
	public msgs: Message[] = [];
	public stateItems: SelectItem[] = [];
	public shouldCreateAnother: boolean = false;

	constructor(
		private _eventService: EventService,
		private _formBuilder: FormBuilder,
		private _location: Location,
		private _messageService: MessageService,
		private _router: Router,
	) { }

	public ngOnInit() {
		for (let state in EventState) {
			this.stateItems.push({ label: EventState[state], value: EventState[state] });
		}

		this.eventForm = this._formBuilder.group(
			{
				['eventName']: new FormControl(''),
				['place']: new FormControl(''),
				['startTime']: new FormControl(new Date()),
				['endTime']: new FormControl(new Date(new Date().valueOf() + 3600000)),
				['eventState']: new FormControl(''),
				['requireCheckout']: new FormControl(false),
				['useKiosk']: new FormControl(false),
			},
		);

		this.eventForm.setValidators(basicEventFormValidator(this.eventForm, false));

		this.firstField.nativeElement.focus();
	}

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public createEvent() {
		if (this.eventForm.valid) {
			let data: any = {};

			Object.keys(this.eventForm.controls).forEach(key => {
				const control = this.eventForm.get(key);
				data[key] = control.value;
			});

			if (Object.values(data).length > 0) {
				this._eventService.add(data).subscribe(res => {
					if (res) {
						if (this.shouldCreateAnother) {
							const msg: Message = {
								severity: 'success',
								summary: 'The event has been successfully created',
							};
							this.showMessage(msg);
							Object.keys(this.eventForm.controls).forEach(key => {
								const control = this.eventForm.get(key);
								if (key !== 'startTime' && key !== 'endTime' && key !== 'useKiosk' && key !== 'requireCheckout') {
									control.reset();
								}
							});
							this.firstField.nativeElement.focus();
						}
						else this._router.navigate(['/events/list']);
					}
				});
			}
		}
	}
}
