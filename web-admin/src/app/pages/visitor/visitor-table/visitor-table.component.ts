import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { VisitorService } from '../visitor.service';

@Component({
	selector: 'ggm-visitor-table',
	templateUrl: './visitor-table.component.html',
	styleUrls: ['./visitor-table.component.scss'],
})
export class VisitorTableComponent implements OnInit, AfterViewInit {

	public bananArr: any[];
	public bananClass: string[];

	constructor(
		private _visitorService: VisitorService,
		private _confirmService: ConfirmationService,
		private _route: ActivatedRoute,
	) {
		this.bananClass = new Array(12);
	}

	public ngOnInit() {
		this._visitorService.fetchData().subscribe(res => {
			if (res) {
				this.bananArr = (res as any).data;
				this.bananArr.sort((ban1: any, ban2: any) => ban1.maBan - ban2.maBan);

				this.bananArr.forEach((b: any, index: number) => {
					if (b.trangThai == 'DANGTHANHTOAN') {
						this.bananClass[index] = 'ui-button-warning';
					}
					else if (b.trangThai == 'DACOKHACH') {
						this.bananClass[index] = 'ui-button-primary';
					}
					else {
						this.bananClass[index] = 'ui-button-secondary';
					}
				});
			}
		});
	}

	public ngAfterViewInit() {

	}
}
