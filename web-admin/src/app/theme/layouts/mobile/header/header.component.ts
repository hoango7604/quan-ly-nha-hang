import { Component, OnInit } from '@angular/core';

import { GgmSidebarService, GgmSidebar } from '../../components/layout-sidebar.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'ggm-header',
	styleUrls: ['./header.component.scss'],
	templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

	public user: any;
	public userMenu: MenuItem[];
	private _sidebar: GgmSidebar;

	constructor(
		private _sidebarSvc: GgmSidebarService,
	) {
		this.userMenu = [
			{ label: 'Profile', icon: 'fas fa-user-cog', routerLink: '/profile' },
			{ label: 'Log Out', icon: 'fas fa-sign-out-alt', routerLink: '/auth/logout' },
		];
	}

	public ngOnInit() {
		// Empty
	}

	public toggleSidebar(): void {
		let sb = this._sidebar;
		if (!sb) {
			sb = this._sidebar = this._sidebarSvc.getSidebar('mainMenu');
		}
		if (!sb) { return; }
		sb.toggle();
	}
}
