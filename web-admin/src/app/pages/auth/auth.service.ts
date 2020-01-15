import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { StorageService } from '@@core/services/storage.service';
import { ApiRequestService } from '@@core/services/api-request.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

	constructor(
		private _httpClient: HttpClient,
		private _storageService: StorageService,
		private _apiRequestService: ApiRequestService,
	) { }

	public authenticate(authData: any): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.post(
			`${environment.API_URL}nhanvien/login`,
			authData,
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					const acc: any = res;
					return acc;
				}
				return null;
			}),
		);
	}
}
