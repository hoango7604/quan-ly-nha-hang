import { Component, AfterViewInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { VisitorService } from '../visitor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Visitor } from '../models/visitor';
import { ReadXlsxFileService } from '../../../core/services/read-xlsx-file.service';

@Component({
	selector: 'ggm-visitor-import',
	templateUrl: './visitor-import.component.html',
	styleUrls: ['./visitor-import.component.scss'],
})
export class VisitorImportComponent implements AfterViewInit {

	public data: Array<any> = [];
	public visitorsList: Array<Visitor> = [];

	public isAttachedFile: Boolean = false;
	public isFirstAccess: Boolean = true;
	public fileDataObservable: any;

	constructor(
		private _messageService: MessageService,
		private _visitorService: VisitorService,
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
		this.visitorsList = [];
		this.isAttachedFile = false;
		const msg: Message = {
			severity: 'warn',
			summary: 'File has been discard. Please select a new file',
		};
		this.showMessage(msg);
	}

	public convertDataToListVisitor() {
		this.data.map((rows: Array<any>) => {
			let visitor: Visitor = new Visitor();
			visitor.fullname = rows[0];
			visitor.email = rows[1];
			visitor.phoneNumber = rows[2];
			visitor.company = rows[3];

			this.visitorsList.push(visitor);
		});

		this.fileDataObservable.unsubscribe();
	}

	public importVisitorsFromFile() {
		this._visitorService.addMultiple(this.visitorsList).subscribe(res => {
			if (res) {
				const msg: Message = {
					severity: 'success',
					summary: 'Visitors have been imported successfully',
				};
				this.showMessage(msg);
				this._router.navigate(['../', { updateTime: new Date().getTime() }], { relativeTo: this._route });
			}
		});
	}

}
