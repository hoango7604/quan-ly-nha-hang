import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/internal/operators/map';

import { ApiRequestService } from '@@core/services/api-request.service';

import { TableDataService } from '@@core/data/interfaces/service';
import { VisitorService } from '../../visitor/visitor.service';
import { take, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { MessageService, Message } from 'primeng/api';
import { environment } from '../../../../environments/environment';

@Injectable()
export class EventInviteeService implements TableDataService<any> {

	public eventId: string;

	constructor(
		private _apiRequestService: ApiRequestService,
		private _httpClient: HttpClient,
		private _visitorService: VisitorService,
		private _messageService: MessageService,
	) { }

	public fetchData(pageIndex: number, pageSize: number, sortBy: string, sortType: string): Observable<any[]> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${environment.API_URL}events/${this.eventId}/guests`,
			{ headers },
		).pipe(
			map((res: any) => {
				if (res) {
					return res;
				}
				return null;
			}),
		);
	}

	public fetchUninvitedVisitor(): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${environment.API_URL}events/${this.eventId}/guests?mode=out`,
			{ headers },
		).pipe(
			map((res: any) => {
				if (res) {
					return res;
				}
				return null;
			}),
		);
	}

	public get(id: string): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(
			`${environment.API_URL}events/${this.eventId}/guests/${id}`,
			{ headers },
		).pipe(
			map((res: any) => {
				if (res) {
					return res;
				}
				return null;
			}),
		);
	}

	public add(event: any): Observable<any> {
		return null;
	}

	public addMultitple(inviteeIdList: string[]): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();
		let body = {
			guestIdSet: inviteeIdList,
		};

		return this._httpClient.post(
			`${environment.API_URL}events/${this.eventId}/guests`,
			JSON.stringify(body),
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					return { message: 'Success' };
				}
				return null;
			}),
		);
	}

	public createVisitorsAndAdd(data: any[]): Observable<any | any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._visitorService.addMultiple(data)
		.pipe(
			take(1),
			mergeMap((visitorRes: Array<any>) => {
				if (visitorRes) {
					let body = {
						guestIdSet: visitorRes.map(visitor => visitor.id),
					};
					return this._httpClient.post(
						`${environment.API_URL}events/${this.eventId}/guests`,
						JSON.stringify(body),
						{ headers },
					).pipe(
						map(inviteeRes => {
							if (inviteeRes) {
								return { message: 'Success' };
							}
							return null;
						}),
					);
				}
				return EMPTY;
			}),
		);
	}

	public update(data: any): Observable<any | any> {
		return null;
	}

	public delete(idArr: string[]): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		const queryString = idArr.map(id => 'id=' + encodeURIComponent(String(id))).join('&');

		return this._httpClient.delete(
			`${environment.API_URL}events/${this.eventId}/guests?${queryString}`,
			{ headers },
		).pipe(
			map(res => {
				if (res) {
					const msg: Message = {
						severity: 'success',
						summary: 'Invitees have been deleted successfully',
					};
					this._messageService.add(msg);
					return res;
				}
				return null;
			}),
		);
	}

	public createInvitee(id: string, checkedIn: boolean, data: object): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.post(`${environment.API_URL}events/${id}/guests${checkedIn ? '?checkin=true' : ''}`, data, { headers }).pipe(
			map(res => {
				if (res) {
					return res;
				}
				return null;
			}),
		);
	}

	/**
	 * Gets the amount of guests in an event
	 * @param id Event ID
	 * @param invitedOnly Only get invited guests
	 */
	public getNumberOfInvitees(id: string, invitedOnly: boolean): Observable<number> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(`${environment.API_URL}events/${id}/${invitedOnly ? 'invited-' : ''}guests-number`, { headers }).pipe(
			map(res => {
				if (res) {
					return Number(res);
				}
				return null;
			}),
		);
	}

	public findInviteeByBarCode(id: string, barcode: string): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.post(`${environment.API_URL}events/${id}/guests/find-by-barcode`, { barcode }, { headers }).pipe(
			map(res => {
				if (res) {
					return res;
				}
				return null;
			}),
		);
	}

	public findInviteeByPhone(id: string, phoneNumber: string): Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.post(`${environment.API_URL}events/${id}/guests/find-by-phone-number`, { phoneNumber }, { headers }).pipe(
			map(res => {
				if (res) {
					return res;
				}
				return null;
			}),
		);
	}

	public inviteeCheckin(id: string, inviteeId: string):  Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.post(`${environment.API_URL}events/${id}/guests/checkin`, { inviteeId }, { headers }).pipe(
			map(res => {
				if (res) {
					return res;
				}
				return null;
			}),
		);
	}

	public inviteeCheckout(id: string, inviteeId: string):  Observable<any> {
		const headers: HttpHeaders = this._apiRequestService.appendAccessToken();

		return this._httpClient.post(`${environment.API_URL}events/${id}/guests/checkout`, { inviteeId }, { headers }).pipe(
			map(res => {
				if (res) {
					return res;
				}
				return null;
			}),
		);
	}

	public searchGlobal(keyword: string): Observable<any[]> {
		return null;
	}
}
