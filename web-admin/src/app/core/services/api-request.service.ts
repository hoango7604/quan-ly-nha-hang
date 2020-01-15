import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable()

export class ApiRequestService {

	constructor (
		private _storageService: StorageService,
	) { }

	public appendAccessToken(): HttpHeaders {
		const currentToken: string = this._storageService.getCurrentAccessToken();
		return new HttpHeaders({
			'Authorization': `${currentToken}`,
			'Content-Type' : 'application/json',
			'Access-Control-Allow-Origin': '*',
		});
	}
}
