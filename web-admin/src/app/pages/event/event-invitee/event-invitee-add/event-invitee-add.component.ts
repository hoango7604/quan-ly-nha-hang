import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Visitor } from '../../../visitor/models/visitor';
import { EventInviteeService } from '../event-invitee.service';
import { MessageService, Message } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'ggm-event-invitee-add',
	templateUrl: './event-invitee-add.component.html',
	styleUrls: ['./event-invitee-add.component.scss'],
})
export class EventInviteeAddComponent implements OnInit, AfterViewInit {

	public uninvitedList: Visitor[];

	public selectedList: Visitor[];

	public isSelectedList: Boolean;

	constructor(
		private _eventInviteeService: EventInviteeService,
		private _messageService: MessageService,
		private _router: Router,
		private _route: ActivatedRoute,
	) { }

	public ngOnInit() {
		this.isSelectedList = false;

		this._eventInviteeService.fetchUninvitedVisitor().subscribe(
			res => {
				this.uninvitedList = res.data;
				this.selectedList = [];
			},
		);
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

	public tableChange() {
		if (this.selectedList.length == 0) {
			this.isSelectedList = false;
		}
		else {
			this.isSelectedList = true;
		}
	}

	public addInvitees() {
		let inviteeIdList = this.selectedList.map(visitor => visitor.id);

		this._eventInviteeService.addMultitple(inviteeIdList).subscribe(
			res => {
				if (res) {
					const msg: Message = {
						severity: 'success',
						summary: 'Invitees have been added successfully',
					};
					this.showMessage(msg);
					this._router.navigate(['../', { updateTime: new Date().getTime() }], { relativeTo: this._route });
				}
			},
		);
	}
}
