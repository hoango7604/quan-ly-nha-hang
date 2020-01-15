import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
	providedIn: 'root',
})
export class ReadXlsxFileService {

	private _readXlsxFile: Subject<any>;

	constructor() {
		this._readXlsxFile = new Subject<any>();
	}

	public fileData(): Subject<any> {
		return this._readXlsxFile;
	}

	public readFile(file: File) {
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
			let data: Array<any>;
			data = XLSX.utils.sheet_to_json(ws, {header: 1});
			data.splice(0, 1);
			this._readXlsxFile.next(data);
		};

		reader.readAsBinaryString(file);
	}
}
