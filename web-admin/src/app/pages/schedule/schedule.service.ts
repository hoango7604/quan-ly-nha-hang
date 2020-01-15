import { MessageService, Message } from 'primeng/api';
import { TableDataService } from '../../core/data/interfaces/service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiRequestService } from '@@core/services/api-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class ScheduleService implements TableDataService<any> {

	constructor(
		private _apiRequestService: ApiRequestService,
		private _httpClient: HttpClient,
		private _messageService: MessageService,
	) { }

	// Fixed
	public add(schedule: any): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.post(
			`${environment.API_URL}calamviec/`,
			schedule,
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

	// Fixed
	public get(id: string): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		let reqUrl: string = `${environment.API_URL}calamviec`;
		return this._httpClient.get(reqUrl, { headers }).pipe(
			map(res => {
				if (res) {
					const results: any = res;
					return (results.data as Array<any>).filter(val => val.maCa == id);
				}
				return null;
			}),
		);
	}

	public getAll(): Observable<any[]> {
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

	// Fixed
	public fetchData(pageIndex?: number, pageSize?: number, sortBy?: string, sortType?: string): Observable<any[]> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		let reqUrl: string = `${environment.API_URL}calamviec`;
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

	// Fixed
	public delete(idArr: string[]): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		const queryString = idArr.map(val => {
			return 'maCa=' + encodeURIComponent(String(val));
		}).join('&');

		return this._httpClient.delete(
			`${environment.API_URL}calamviec?${queryString}`,
			{ headers },
		)
		.pipe(
			map(res => {
				if (res) {
					const response: any = res;
					if (response && response.affectedRow > 0) {
						const msg: Message = {
							severity: 'success',
							summary: 'Xoá ca làm việc thành công',
						};
						this._messageService.add(msg);
						return response;
					}
				}
				return null;
			}),
		);
	}

	// Fixed
	public update(schedule: any): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();
		return this._httpClient.patch(
			`${environment.API_URL}calamviec`,
			schedule,
			{ headers },
		)
		.pipe(
			map(res => {
				if (res) {
					const result: any = res;
					return result;
				}
				return null;
			}),
		);
	}

	public searchGlobal(keyword: string): Observable<any[]> {
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

	public sort(sortField: string, sortOrder: number): Observable<any[]> {
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

	// Fixed
	public getEmployeesOutOfSchedule(id: string): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${environment.API_URL}calamviec/nhanvienOutOfCa?maCa=${id}`,
			{ headers },
		)
		.pipe(
			map(resCaLamViec => {
				if (resCaLamViec) {
					const results: any = resCaLamViec;
					return results;
				}
				return null;
			}),
		);
	}

	// Fixed
	public deleteEmployees(id: string, idArr: string[]): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		let queryString = idArr.map(val => {
			return 'maNhanVien=' + encodeURIComponent(String(val));
		}).join('&');

		queryString += `&maCa=${id}`;

		return this._httpClient.delete(
			`${environment.API_URL}calamviec/bangchiaca?${queryString}`,
			{ headers },
		)
		.pipe(
			map(res => {
				if (res) {
					const response: any = res;
					if (response && response.affectedRow > 0) {
						const msg: Message = {
							severity: 'success',
							summary: 'Xoá nhân viên thành công',
						};
						this._messageService.add(msg);
						return response;
					}
				}
				return null;
			}),
		);
	}

	// Fixed
	public addEmployees(id: string, idArr: string[]): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();
		const body = {
			maCa: id,
			maNhanVien: idArr,
		};

		return this._httpClient.post(
			`${environment.API_URL}calamviec/bangchiaca`,
			body,
			{ headers },
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
