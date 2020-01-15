import { Component, OnInit } from '@angular/core';
import { SessionService } from '@@core/services/session.service';
import { Router } from '@angular/router';
import { StorageService } from '@@core/services/storage.service';

@Component({
	selector: 'ggm-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

	constructor(
		private _storageService: StorageService,
		private _sessionService: SessionService,
		private _router: Router,
	) { }

	public ngOnInit() {
		this._storageService.deleteData();
		this._sessionService.removeSession();

		this._router.navigate(['auth']);
	}
}
