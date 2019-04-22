import { EmployeeForList } from './../Models/EmployeeForList';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeForList[];

  constructor() { }

  ngOnInit() {
    this.employees = [];

    const emp1: EmployeeForList = {
      Id: 1,
      Age: 10,
      FirstName: 'John',
      LastName: 'Doe',
      Salary: 100,
      TaxNumber: 12345,
      WorkingPosition: 'Developer'
    };

    const emp2: EmployeeForList = {
      Id: 2,
      Age: 20,
      FirstName: 'Edward',
      LastName: 'Kovalsky',
      Salary: 9100,
      TaxNumber: 8987,
      WorkingPosition: 'Ceo'
    };

    this.employees.push(emp1);
    this.employees.push(emp2);
  }
}
