import { Injectable } from '@angular/core';
import { MessageService, Message } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { TableDataService } from '../../core/data/interfaces/service';
import { ApiRequestService } from '../../core/services/api-request.service';

@Injectable()
export class InvoiceService implements TableDataService<any> {

	constructor(
		private _apiRequestService: ApiRequestService,
		private _httpClient: HttpClient,
		private _messageService: MessageService,
	) {
	}

	public add(invoice: any): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.post(
			`${environment.API_URL}hoadon`,
			invoice,
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

	public get(id: string): Observable<any> {
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

	public fetchData(): Observable<any> {
		let headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${environment.API_URL}banan/phieuchonmon?isPaymentRequest=true`,
			{headers},
		).pipe(
			map(res => {
				if (res) {
					const response: any = res;
					if (Array.isArray(response.data) && response.data.length > 0) {
						response.data.forEach((pcm: any) => {
							pcm.tongTien = 0;
							pcm.chiTietPhieuChonMon.forEach((ctp: any) => pcm.tongTien += ctp.thanhTien);
						});
					}
					return response;
				}
				return null;
			}),
		);
	}

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
	public update(account: object | any): Observable<any> {
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

	public searchGlobal(keyword: string): Observable<any> {
		return null;
	}

	public getRoles(): Observable<any> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${environment.API_URL}nhanvien/vitri`,
			{headers},
		).pipe(
			map(res => {
				const roles: any = res;
				if (res) {
					return roles.data;
				}
				return null;
			}),
		);
	}
}
