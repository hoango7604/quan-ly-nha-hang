import { Injectable } from '@angular/core';
import { ApiRequestService } from '@@core/services/api-request.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IAccount } from '../account/interfaces/IAccount';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {

	constructor(
		private _apiRequestService: ApiRequestService,

		private _httpClient: HttpClient,
	) {  }

	public get(id: string): Observable<IAccount | any> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(`${environment.API_URL}users?conditionA0=id&conditionB0=${id}&conditionO0==`, {headers}).pipe(
			map(res => {
				if (res) {
					const acc: any = res;
					return acc.data[0];
				}
				return null;
			}),
		);
	}

	public updatePassword(account: any): Observable<IAccount | any> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.put(
			`${environment.API_URL}users/password`,
			JSON.stringify(account),
			{ headers },
		).pipe(
			map(data => {
				console.log(data);
				if (data) {
					const res: any = data;
					return res;
				}
				return null;
			}),
		);
	}

	public updateProfile(account: any): Observable<IAccount | any> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.put(
			`${environment.API_URL}users/profile`,
			JSON.stringify(account),
			{ headers },
		).pipe(
			map(data => {
				if (data) {
					const res: any = data;
					return res;
				}
				return null;
			}),
		);
	}
}
