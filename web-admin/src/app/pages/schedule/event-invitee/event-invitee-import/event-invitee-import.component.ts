import { Component, AfterViewInit } from '@angular/core';
import { MessageService, Message } from 'primeng/api';
import { EventInviteeService } from '../event-invitee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReadXlsxFileService } from '../../../../core/services/read-xlsx-file.service';

@Component({
	selector: 'ggm-event-invitee-import',
	templateUrl: './event-invitee-import.component.html',
	styleUrls: ['./event-invitee-import.component.scss'],
})
export class EventInviteeImportComponent implements AfterViewInit {

	public data: Array<any> = [];
	public inviteesList: Array<any> = [];

	public isAttachedFile: Boolean = false;
	public isFirstAccess: Boolean = true;
	public fileDataObservable: any;

	constructor(
		private _messageService: MessageService,
		private _eventInviteeService: EventInviteeService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _xlsxReader: ReadXlsxFileService,
	) { }

	public ngAfterViewInit() {
		scrollBy({
			top: 10000,
			left: 0,
			behavior: 'smooth',
		});
	}

	public showMessage(msg: Message) {
		this._messageService.add(msg);
	}

	public readFileContent(event: any, button: any) {
		const files = event.files;
		if (files.length !== 1) throw new Error('Cannot use multiple files');

		this._xlsxReader.readFile(files[0]);
		this.fileDataObservable = this._xlsxReader.fileData().subscribe(
			data => {
				this.data = data;
				this.convertDataToListVisitor();
			},
		);

		this.isAttachedFile = true;
		this.isFirstAccess = false;
	}

	public discardFile(event: any, button: any) {
		button.clear();
		this.data = [];
		this.inviteesList = [];
		this.isAttachedFile = false;
		const msg: Message = {
			severity: 'warn',
			summary: 'File has been discard. Please select a new file',
		};
		this.showMessage(msg);
	}

	public convertDataToListVisitor() {
		this.data.map((rows: Array<any>) => {
			let invitee: any;
			invitee.fullname = rows[0];
			invitee.email = rows[1];
			invitee.phoneNumber = rows[2];
			invitee.company = rows[3];
			invitee.presentInEvent = false;
			invitee.sentInvitation = false;

			this.inviteesList.push(invitee);
		});

		this.fileDataObservable.unsubscribe();
	}

	public importInviteesFromFile() {
		this._eventInviteeService.createVisitorsAndAdd(this.inviteesList).subscribe(res => {
			if (res) {
				const msg: Message = {
					severity: 'success',
					summary: 'Invitees have been imported successfully',
				};
				this.showMessage(msg);
				this._router.navigate(['../', { updateTime: new Date().getTime() }], { relativeTo: this._route });
			}
		});
	}

}
