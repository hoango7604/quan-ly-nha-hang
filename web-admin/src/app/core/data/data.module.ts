import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../pages/account/account.service';
import { TicketService } from '../../pages/ticket/ticket.service';
import { AuthService } from '../../pages/auth/auth.service';
import { StorageService } from '@@core/services/storage.service';
import { SessionService } from '@@core/services/session.service';
import { ApiRequestService } from '@@core/services/api-request.service';
import { AuthGuard } from '@@shared/guards/auth.guard';
import { AuthInterceptor } from '@@shared/helpers/auth.interceptor';
import { LoggedOutGuard } from '@@shared/guards/logged-out-guard';
import { AuthRedirectGuard } from '@@shared/guards/auth-redirect.guard';
import { AccountDetailsResolver, RoleDetailsResolver } from '../../pages/account/helpers/details.resolver';
import { TicketComboService } from '../../pages/ticket-combo/ticket-combo.service';
import { RoleService } from '../../pages/account/role.service';
import { ErrorsInterceptor } from '@@shared/helpers/errors.interceptor';
import { ConfirmationService } from 'primeng/api';
import { ProfileDetailsResolver } from '../../pages/profile/helpers/details.resolver';
import { ReadXlsxFileService } from '../services/read-xlsx-file.service';


const SERVICES = [
	AccountService,
	ApiRequestService,
	AuthService,
	ConfirmationService,
	MessageService,
	TicketService,
	TicketComboService,
	UserService,
	ReadXlsxFileService,
	RoleService,
	SessionService,
	StorageService,
];

const GUARDS = [
	AuthGuard,
	AuthRedirectGuard,
	LoggedOutGuard,
];

const INTERCEPTORS = [
	AuthInterceptor,
	ErrorsInterceptor,
];

const RESOLVERS = [
	AccountDetailsResolver,
	ProfileDetailsResolver,
	RoleDetailsResolver,
];

const PROVIDERS = [
	...SERVICES,
	...GUARDS,
	...INTERCEPTORS,
	...RESOLVERS,
];

@NgModule({
	imports: [
		CommonModule,
	],
	providers: [
		...PROVIDERS,
	],
})
export class DataModule {
	public static forRoot(): ModuleWithProviders {
		return <ModuleWithProviders>{
			ngModule: DataModule,
			providers: [
				...PROVIDERS,
			],
		};
	}
}
