import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@@shared/shared.module';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceService } from './invoice.service';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';

@NgModule({
	imports: [
		CommonModule,
		InvoiceRoutingModule,
		SharedModule,
	],
	declarations: [
		InvoiceListComponent,
		InvoiceEditComponent,
	],
	providers: [
		InvoiceService,
	],
})
export class InvoiceModule { }
