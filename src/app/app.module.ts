import { EmployeeService } from './services/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NewEmployeeModalComponent } from './Modals/new-employee-modal/new-employee-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UnsavedContentModalComponent } from './Modals/unsaved-content-modal/unsaved-content-modal.component';
import { ConfirmDeleteUserComponent } from './Modals/confirm-delete-user/confirm-delete-user.component';

@NgModule({
   declarations: [
      AppComponent,
      EmployeeListComponent,
      NewEmployeeModalComponent,
      UnsavedContentModalComponent,
      ConfirmDeleteUserComponent
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
      NewEmployeeModalComponent,
      UnsavedContentModalComponent,
      ConfirmDeleteUserComponent
   ],
   bootstrap: [
      AppComponent,
      EmployeeListComponent
   ]
})
export class AppModule { }
