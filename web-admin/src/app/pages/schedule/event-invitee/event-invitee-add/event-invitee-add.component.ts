import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessageService, Message } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../schedule.service';

@Component({
	selector: 'ggm-event-invitee-add',
	templateUrl: './event-invitee-add.component.html',
	styleUrls: ['./event-invitee-add.component.scss'],
})
export class EventInviteeAddComponent implements OnInit, AfterViewInit {

	public uninvitedList: any[];

	public selectedList: any[];

	public isSelectedList: Boolean;

	public maCa: string;

	constructor(
		private _scheduleService: ScheduleService,
		private _messageService: MessageService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {
		this.maCa = this._router.url.split('/')[3];
	}

	public ngOnInit() {
		this.isSelectedList = false;

		this._scheduleService.getEmployeesOutOfSchedule(this.maCa).subscribe(
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
		let inviteeIdList = this.selectedList.map(visitor => visitor.maNhanVien);

		this._scheduleService.addEmployees(this.maCa, inviteeIdList).subscribe(
			res => {
				if (res) {
					const msg: Message = {
						severity: 'success',
						summary: 'Thêm nhân viên thành công',
					};
					this.showMessage(msg);
					this._router.navigate(['../', { updateTime: new Date().getTime() }], { relativeTo: this._route });
				}
			},
		);
	}
}
