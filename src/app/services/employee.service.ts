import { EmployeeForDetails } from './../Models/EmployeeForDetails';
import { EmployeeForList } from './../Models/EmployeeForList';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: EmployeeForList[];

constructor() { }

getEmployees(): EmployeeForList[] {
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

  return this.employees;
}

deleteEmployee(id: number): any {
  this.employees = this.employees.filter(x => x.Id !== id);

  return this.employees;
}

addEmployee(newEmployee: EmployeeForDetails) {
  const emp: EmployeeForList = {
    Id: newEmployee.Id,
    Age: 10,
    FirstName: newEmployee.FirstName,
    LastName: newEmployee.LastName,
    Salary: newEmployee.Salary,
    TaxNumber: newEmployee.TaxNumber,
    WorkingPosition: newEmployee.WorkingPosition
  };

  this.employees.push(emp);

  return this.employees;
}

}
