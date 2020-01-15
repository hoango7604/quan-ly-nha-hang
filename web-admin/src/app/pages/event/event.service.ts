import { Event } from './models/event';
import { TableDataService } from '../../core/data/interfaces/service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiRequestService } from '@@core/services/api-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class EventService implements TableDataService<Event> {

	constructor(
		private _apiRequestService: ApiRequestService,

		private _httpClient: HttpClient,
	) { }

	public add(event: Event): Observable<Event> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.post(
			`${environment.API_URL}events/`,
			event,
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					const result: any = res;
					return result;
				}
				return null;
			}),
		);
	}

	public get(id: string): Observable<Event> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(`${environment.API_URL}events?conditionA0=id&conditionB0=${id}&conditionO0==`, { headers }).pipe(
			map(res => {
				if (res) {
					const result: any = res;
					return result.data[0];
				}
				return null;
			}),
		);
	}

	public getAll(): Observable<Event[]> {
		// return new Promise(resolve => {
		// 	of(this.ELEMENT_DATA).subscribe(data => {
		// 		// resolve(data); // for use real data on server
		// 		resolve([...data]); // for use virtual data on client
		// 	}, err => {
		// 		console.error(err);
		// 	});
		// });
		return null;
	}

	public fetchData(pageIndex: number, pageSize: number, sortBy: string, sortType: string): Observable<Event[]> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		let reqUrl: string = `${environment.API_URL}events`;
		let params: string = '?';
		let hasParams: boolean = false;
		if (pageIndex) {
			hasParams = true;
			params += `page=${pageIndex}`;
		}
		if (pageSize) {
			if (hasParams) params += '&';
			hasParams = true;
			params += `limit=${pageSize}`;
		}

		if (hasParams) reqUrl += params;

		return this._httpClient.get(reqUrl, { headers }).pipe(
			map(res => {
				if (res) {
					const results: any = res;
					return results;
				}
				return null;
			}),
		);
	}

	public delete(idArr: string[]): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		const queryString = idArr.map(val => {
			return 'id=' + encodeURIComponent(String(val));
		}).join('&');

		return this._httpClient.delete(`${environment.API_URL}events?${queryString}`, { headers }).pipe(
			map(res => {
				if (res) {
					return res;
				}
				return null;
			}),
		);
	}

	public update(event: Event): Observable<Event> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();
		return this._httpClient.patch(`${environment.API_URL}events/`, {model: event}, { headers }).pipe(
			map(res => {
				if (res) {
					const result: any = res;
					return result;
				}
				return null;
			}),
		);
	}

	public searchGlobal(keyword: string): Observable<Event[]> {
		// return new Promise((resolve, reject) => {
		// 	let result: Event[] = [];
		// 	this.ELEMENT_DATA.forEach(element => {
		// 		if (element.name.includes(keyword)
		// 			|| element.position.toString().includes(keyword)
		// 			|| element.symbol.includes(keyword)
		// 			|| element.weight.toString().includes(keyword)) {
		// 				result.push(element);
		// 			}
		// 	});

		// 	of(result).subscribe(data => {
		// 		resolve(data);
		// 	}, err => {
		// 		console.error(err);
		// 		reject(err);
		// 	});
		// });
		return null;
	}

	public sort(sortField: string, sortOrder: number): Observable<Event[]> {
		// return new Promise((resolve, reject) => {
		// 	let result = this.ELEMENT_DATA.sort((a, b) => {
		// 		return sortOrder * (a[sortField] > b[sortField] ? 1 : -1);
		// 	});

		// 	of(result).subscribe(data => {
		// 		resolve(data);
		// 	}, err => {
		// 		console.log(err);
		// 		reject(err);
		// 	});
		// });
		return null;
	}

	public openEvent(id: string): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.post(`${environment.API_URL}events/${id}/open`, {}, { headers }).pipe(
			map((res: any) => {
				if (res.message === 'Success') {
					return res;
				}
				return null;
			}),
		);
	}

	public closeEvent(id: string): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.post(`${environment.API_URL}events/${id}/close`, {}, { headers }).pipe(
			map((res: any) => {
				if (res.message === 'Success') {
					return res;
				}
				return null;
			}),
		);
	}
}
