import { EmployeeService } from './services/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@NgModule({
   declarations: [
      AppComponent,
      EmployeeListComponent
   ],
   imports: [
      BrowserModule
   ],
   providers: [EmployeeService],
   bootstrap: [
      AppComponent,
      EmployeeListComponent
   ]
})
export class AppModule { }
