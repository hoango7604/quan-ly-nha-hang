import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { take, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { EventService } from '../event.service';
import { VisitorService } from '../../visitor/visitor.service';


@Injectable()
export class EventDetailsResolver {
	constructor (
		private _eventService: EventService,
	) { }

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
		const id = state.url.split('/')[3];

		return this._eventService.get(id).pipe(
			take(1),
			mergeMap(evnt => {
				if (evnt) {
					return of(evnt);
				}
				return EMPTY;
			}),
		);
	}
}

@Injectable()
export class EventInviteeDetailsResolver {
	constructor (
		private _visitorService: VisitorService,
	) { }

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
		const id = route.paramMap.get('id');

		return this._visitorService.get(id).pipe(
			take(1),
			mergeMap(invitee => {
				if (invitee) {
					return of(invitee);
				}
				return EMPTY;
			}),
		);
	}
}
