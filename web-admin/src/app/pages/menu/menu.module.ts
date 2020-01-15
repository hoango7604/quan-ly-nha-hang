import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuCreateComponent } from './menu-create/menu-create.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { SharedModule } from '@@shared/shared.module';
import { MenuService } from './menu.service';

@NgModule({
	imports: [
		CommonModule,
		MenuRoutingModule,
		SharedModule,
	],
	declarations: [
		MenuListComponent,
		MenuCreateComponent,
		MenuEditComponent,
	],
	providers: [
		MenuService,
	],
})
export class MenuModule { }
