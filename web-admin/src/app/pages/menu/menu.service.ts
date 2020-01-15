import { Injectable } from '@angular/core';
import { MessageService, Message } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


import { TableDataService } from '../../core/data/interfaces/service';
import { ApiRequestService } from '../../core/services/api-request.service';

import { IAccount } from './interfaces/IAccount';

@Injectable()
export class MenuService implements TableDataService<IAccount> {

	constructor(
		private _apiRequestService: ApiRequestService,
		private _httpClient: HttpClient,
		private _messageService: MessageService,
	) {
	}

	// Fixed
	public add(account: IAccount): Observable<IAccount> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.post(
			`${environment.API_URL}menu`,
			JSON.stringify(account),
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

	// Fixed
	public get(id: string): Observable<IAccount | any> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(`${environment.API_URL}nhanvien`, {headers}).pipe(
			map(res => {
				const response: any = res;
				if (response && Array.isArray(response.data)) {
					const acc: any = response.data.filter((nhanvien: any) => {
						nhanvien.tenViTri = nhanvien.viTri.tenViTri;
						return nhanvien.maNhanVien == id;
					});
					return acc[0];
				}
				return null;
			}),
		);
	}

	// Fixed
	public fetchData(pageIndex?: number, pageSize?: number, sortBy?: string, sortType?: string): Observable<IAccount[]> {
		let headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		let url: string = `${environment.API_URL}menu`;
		let condition: string = '?';
		let isCondition: boolean = false;
		if (pageIndex) {
			isCondition = true;
			condition += `page=${pageIndex}`;
		}
		if (pageSize) {
			if (isCondition) condition += '&';
			isCondition = true;
			condition += `limit=${pageSize}`;
		}

		if (isCondition) url += condition;

		return this._httpClient.get(
			url,
			{headers},
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
	public delete(idArr: string[]): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();

		const queryString = idArr.map(val => {
			return 'maNhanVien=' + encodeURIComponent(String(val));
		}).join('&');

		return this._httpClient.delete(
			`${environment.API_URL}nhanvien?${queryString}`,
			{headers},
		).pipe(
			map(res => {
				const response: any = res;
				if (response && response.affectedRow > 0) {
					const msg: Message = {
						severity: 'success',
						summary: 'Xoá nhân viên thành công',
					};
					this._messageService.add(msg);
					return response;
				}
				return null;
			}),
		);
	}

	/**
	 * Can only update other accounts, not current user profile
	 * For updating current user profile, use the two methods above
	 */
	// Fixed
	public update(account: IAccount | object | any): Observable<IAccount | any> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.patch(
			`${environment.API_URL}nhanvien`,
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

	public searchGlobal(keyword: string): Observable<IAccount[]> {
		return null;
	}

	// Fixed
	public getCategory(): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${environment.API_URL}menu/danhmucmon`,
			{headers},
		).pipe(
			map(res => {
				if (res) {
					return res;
				}
				return null;
			}),
		);
	}
}
