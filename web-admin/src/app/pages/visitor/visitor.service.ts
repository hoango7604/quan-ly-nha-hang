import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { ApiRequestService } from '@@core/services/api-request.service';
import { TableDataService } from '@@core/data/interfaces/service';
import { environment } from '../../../environments/environment';
import { MessageService, Message } from 'primeng/api';

@Injectable()
export class VisitorService implements TableDataService<any> {

	constructor(
		private _apiRequestService: ApiRequestService,
		private _httpClient: HttpClient,
		private _messageService: MessageService,
	) { }

	// Fixed
	public add(id: any): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.post(
			`${environment.API_URL}banan/phieuchonmon`,
			{ maBan: id },
			{ headers },
		)
		.pipe(
			map(res => {
				if (res) {
					return res;
				}
				return null;
			}),
		);
	}

	// Fixed
	public getMenu(): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.get(
			`${environment.API_URL}menu`,
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					const resData: any = res;
					return resData;
				}
				return null;
			}),
		);
	}

	// Fixed
	public create(data: any): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.post(
			`${environment.API_URL}banan/chitietphieuchonmon`,
			data,
			{ headers },
		).pipe(
			map(res => {
				const resData: any = res;
				if (resData.affectedRow > 0) {
					return resData;
				}
				return null;
			}),
		);
	}

	public addMultiple(visitorsList: Array<any>): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.post(
			`${environment.API_URL}guests/`,
			JSON.stringify(visitorsList),
			{ headers },
		).pipe(
			map(res => {
				const resData: any = res;
				if (resData.length > 0) {
					return resData;
				}
				return null;
			}),
		);
	}

	// Fixed
	public get(id: string): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${environment.API_URL}banan/phieuchonmon`,
			{headers},
		)
		.pipe(
			map(res => {
				if (res) {
					const resData: any = res;
					const phieuchonmon = resData.data.filter((pcm: any) => pcm.maBan == id && pcm.hoaDon == null);
					if (phieuchonmon.length > 0) {
						return phieuchonmon[0];
					}
					else {
						return null;
					}
				}
				return null;
			}),
		);
	}

	// Fixed
	public fetchData(pageIndex?: number, pageSize?: number, sortBy?: string, sortType?: string): Observable<any[]> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${environment.API_URL}banan`,
			{headers},
		)
		.pipe(
			map(res => {
				if (res) {
					const response: any = res;
					return response;
				}
				return null;
			}),
		);
	}

	public delete(idArr: string[]): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();

		const queryString = idArr.map(val => {
			return 'id=' + encodeURIComponent(String(val));
		}).join('&');

		return this._httpClient.delete(`${environment.API_URL}guests?${queryString}`, {headers}).pipe(
			map(res => {
				if (res) {
					const msg: Message = {
						severity: 'success',
						summary: 'Visitors have been deleted successfully',
					};
					this._messageService.add(msg);
					return res;
				}
				return null;
			}),
		);
	}

	// Fixed
	public update(data: any): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.patch(
			`${environment.API_URL}banan/chitietphieuchonmon`,
			data,
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					const response: any = res;
					return response;
				}
				return null;
			}),
		);
	}

	// Fixed
	public paymentRequest(id: string): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();
		const data = {
			maBan: id,
			trangThai: 'DANGTHANHTOAN',
		};

		return this._httpClient.patch(
			`${environment.API_URL}banan`,
			data,
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					const response: any = res;
					return response;
				}
				return null;
			}),
		);
	}

	// Fixed
	public openTable(id: string): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();
		const data = {
			maBan: id,
			trangThai: 'DACOKHACH',
		};

		return this._httpClient.patch(
			`${environment.API_URL}banan`,
			data,
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					const response: any = res;
					return response;
				}
				return null;
			}),
		);
	}

	public searchGlobal(keyword: string): Observable<any[]> {
		return null;
	}
}
