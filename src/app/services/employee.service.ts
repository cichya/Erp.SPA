import { EmployeeForList } from './../Models/EmployeeForList';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

constructor() { }

getEmployees(): EmployeeForList[] {
  const employees: EmployeeForList[] = [];

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

  employees.push(emp1);
  employees.push(emp2);

  return employees;
}

}
