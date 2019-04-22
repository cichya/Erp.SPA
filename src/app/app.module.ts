import { EmployeeService } from './services/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NewEmployeeModalComponent } from './new-employee-modal/new-employee-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
   declarations: [
      AppComponent,
      EmployeeListComponent,
      NewEmployeeModalComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot()
   ],
   providers: [
      EmployeeService
   ],
   entryComponents: [
    NewEmployeeModalComponent
   ],
   bootstrap: [
      AppComponent,
      EmployeeListComponent
   ]
})
export class AppModule { }
