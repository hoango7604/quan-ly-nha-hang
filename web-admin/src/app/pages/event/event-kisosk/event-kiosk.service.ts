import { TableDataService } from '../../../core/data/interfaces/service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiRequestService } from '@@core/services/api-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class EventKioskService implements TableDataService<any> {

	private _eventId: string = this._router.url.split('/')[3];
	private _endpointRootURL: string = `${environment.API_URL}events/${this._eventId}/kiosks`;

	constructor(
		private _httpClient: HttpClient,
		private _router: Router,

		private _apiRequestService: ApiRequestService,
	) { }

	public add(data: any): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.post(this._endpointRootURL, data, { headers }).pipe(
			map(res => {
				if (res) return res;
				return null;
			}),
		);
	}

	public fetchData(pageIndex: number, pageSize: number, sortBy: string, sortType: string): Observable<any[]> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(this._endpointRootURL, { headers }).pipe(
			map((res: any) => {
				if (res) return res;
				return null;
			}),
		);
	}

	public update(data: any): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.patch(this._endpointRootURL, data, { headers }).pipe(
			map(res => {
				if (res) return res;
				return null;
			}),
		);
	}

	public delete(): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.delete(this._endpointRootURL, { headers }).pipe(
			map(res => {
				if (res) return res;
				return null;
			}),
		);
	}

	public searchGlobal(keyword: string): Observable<any[]> {
		return null;
	}

	public get(id: string): Observable<any> {
		return null;
	}
}
