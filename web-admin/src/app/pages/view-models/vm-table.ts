import { Table } from 'primeng/table';
import { ViewChild } from '@angular/core';
import { ColumnTable } from '../data-types/column-table';

import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

import { TableDataService } from '../../core/data/interfaces/service';
import { OverlayPanel } from 'primeng/overlaypanel';

/**
 * VMTable is a class ViewModel of Table in the MVVM pattern
 * for implement, you must have the table id with name "tableContent"
 */
export abstract class VMTable {
	@ViewChild('tableContent') private tableContent: Table;
	@ViewChild('confirmDelete') protected confirmDelete: OverlayPanel;

	/**
	 * An array of objects to represent dynamic columns.
	 */
	public abstract cols: ColumnTable[];
	/**
	 * ID field name of the data table
	 */
	protected abstract idField: string;

	/**
	 * @selectedItems to contain the selected items
	 */
	public selectedItems: object[];
	protected datasource: object[];
	/**
	 * @datatable to contain table data
	 */
	public dataTable: object[];
	public loading: boolean;
	public totalRecords: number;
	/**
	 * @showDeleteBtn show delete button
	 */
	public showDeleteBtn: boolean = false;

	public sortField: string;
	public sortOrder: string;
	public pageSize: number;
	public pageIndex: number;

	/**
	 * @param _dataService is a service that you need to excute CRUD on the table
	 * and your service must implement from the DataService class
	 */
	constructor(
		private _dataService: TableDataService<any>,
		private _confirmationService: ConfirmationService,
	) {
		this.loading = true;
		this.selectedItems = [];
	}

	private _fetchData(): void {
		this._dataService.fetchData().subscribe(res => {
			if (res) {
				this.loading = false;
				this.dataTable = res['data'];
				this.totalRecords = res['total'];
			}
		});
	}

	protected resetList(): void {
		this.loading = true;
		this._fetchData();
	}

	public delete(id?: string): void {
		let idArr: string[] = [];

		if (id === undefined) {
			const selected: any[] = this.selectedItems;

			selected.forEach(acc => {
				idArr.push(acc.maNhanVien);
			});
		}
		else idArr.push(id);

		this._dataService.delete(idArr).subscribe(res => {
			if (res) {
				if (this.confirmDelete) {
					this.confirmDelete.hide();
				}
				this.showDeleteBtn = false;
				this.selectedItems = [];
				this.resetList();
			}
		});
	}

	protected confirmDeleteSingle(id: string) {
		this._confirmationService.confirm({
			message: 'Are you sure you want to delete?',
			accept: () => {
				this.delete(id);
			},
		});
	}

	protected deleteArray() { }

	public loadDataLazily(event: LazyLoadEvent) {
		this.loading = true;

		this.sortField = (event.sortField === undefined) ? 'id' : event.sortField;
		this.sortOrder = (event.sortOrder === 1) ? 'asc' : 'desc';
		this.pageSize = event.rows;
		this.pageIndex = (event.first / event.rows) + 1;

		this._fetchData();
	}

	public toggleHandler(event: Event) {
		this.showDeleteBtn = Boolean(this.selectedItems.length != 0);
	}
}
