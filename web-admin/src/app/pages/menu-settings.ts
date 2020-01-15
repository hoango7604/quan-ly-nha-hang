import { GgmMenuItem } from '@@theme/layouts/components/stack-menu.component';

export const MENU_ITEMS: GgmMenuItem[] = [
	{
		label: 'Quản lý bàn',
		title: 'Quản lý bàn',
		icon: 'fas fa-door-open',
		routerLink: ['/table'],
	},
	{
		label: 'Quản lý nhân viên',
		title: 'Quản lý nhân viên',
		icon: 'fas fa-users',
		routerLink: ['/accounts'],
	},
	{
		label: 'Quản lý ca',
		title: 'Quản lý ca',
		icon: 'fas fa-ticket-alt',
		routerLink: ['/schedule'],
	},
	{
		label: 'Quản lý thực đơn',
		title: 'Quản lý thực đơn',
		icon: 'ui-icon-restaurant-menu',
		routerLink: ['/menu'],
	},
	{
		label: 'Quản lý hoá đơn',
		title: 'Quản lý hoá đơn',
		icon: 'fas fa-hand-holding-usd',
		routerLink: ['/invoice'],
	},
];
