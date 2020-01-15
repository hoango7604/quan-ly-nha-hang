import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorRoutingModule } from './visitor-routing.module';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { VisitorCreateComponent } from './visitor-create/visitor-create.component';
import { VisitorEditComponent } from './visitor-edit/visitor-edit.component';
import { SharedModule } from '@@shared/shared.module';
import { VisitorImportComponent } from './visitor-import/visitor-import.component';
import { VisitorService } from './visitor.service';
import { VisitorTableComponent } from './visitor-table/visitor-table.component';

@NgModule({
	imports: [
		CommonModule,
		VisitorRoutingModule,
		SharedModule,
	],
	declarations: [
		VisitorListComponent,
		VisitorCreateComponent,
		VisitorEditComponent,
		VisitorImportComponent,
		VisitorTableComponent,
	],
	providers: [
		VisitorService,
	],
})
export class VisitorModule { }
