import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { take, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { StorageService } from '@@core/services/storage.service';
import { ProfileService } from '../profile.service';

@Injectable()
export class ProfileDetailsResolver {
	constructor (
		private _profileService: ProfileService,
		private _storageService: StorageService,
	) { }

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
		const id = this._storageService.getCurrentUser().id;

		return this._profileService.get(id).pipe(
			take(1),
			mergeMap(acc => {
				if (acc) {
					return of(acc);
				}
				return EMPTY;
			}),
		);
	}
}
