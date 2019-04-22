import { EmployeeService } from './services/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NewEmployeeModalComponent } from './new-employee-modal/new-employee-modal.component';

@NgModule({
   declarations: [
      AppComponent,
      EmployeeListComponent,
      NewEmployeeModalComponent
   ],
   imports: [
      BrowserModule,
      ModalModule.forRoot()
   ],
   providers: [
      EmployeeService
   ],
   bootstrap: [
      AppComponent,
      EmployeeListComponent
   ]
})
export class AppModule { }
