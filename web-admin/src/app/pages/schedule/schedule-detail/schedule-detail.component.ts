import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'ggm-schedule-detail',
	templateUrl: './schedule-detail.component.html',
	styleUrls: ['./schedule-detail.component.scss'],
})
@Injectable()
export class ScheduleDetailComponent implements OnInit {

	@ViewChild('tabs') private _tabItems: MenuItem[];

	public tabs: MenuItem[];
	public activeTab: MenuItem;

	constructor() { }

	public ngOnInit() {
		this.tabs = [
			{label: 'Ca làm việc', icon: '', routerLink: ['./edit']},
			{label: 'Danh sách nhân viên', icon: '', routerLink: ['./employees']},
		];
		this.activeTab = this.tabs[1];
	}
}
