import { Component, OnInit } from '@angular/core';

import { GgmSidebarService, GgmSidebar } from '../../components/layout-sidebar.service';
import { MenuItem } from 'primeng/api';
import { StorageService } from '@@core/services/storage.service';

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
		private _storageSerive: StorageService,
		private _sidebarSvc: GgmSidebarService,
	) {
		this.user = this._storageSerive.getCurrentUser();
		this.userMenu = [
			{
				label: (this.user ? this.user.tenDangNhap.toUpperCase() : 'ADMIN'),
				items: [
					{ label: 'Tài khoản', icon: 'fas fa-user-cog', routerLink: '/profile' },
					{ label: ' Đăng xuất', icon: 'fas fa-sign-out-alt', routerLink: '/auth/logout' },
				],
			},
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
