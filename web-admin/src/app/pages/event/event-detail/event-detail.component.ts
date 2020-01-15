import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'ggm-event-detail',
	templateUrl: './event-detail.component.html',
	styleUrls: ['./event-detail.component.scss'],
})
@Injectable()
export class EventDetailComponent implements OnInit {

	@ViewChild('tabs') private _tabItems: MenuItem[];

	public tabs: MenuItem[];
	public activeTab: MenuItem;

	constructor() { }

	public ngOnInit() {
		this.tabs = [
			{label: 'Event Details', icon: '', routerLink: ['./edit']},
			{label: 'Event Invitees', icon: '', routerLink: ['./invitees']},
			{label: 'Event Staff', icon: ''},
			{label: 'Event Kiosks', icon: '', routerLink: ['./kiosks']},
		];
		this.activeTab = this.tabs[0];
	}
}
