import { EmployeeService } from './../services/employee.service';
import { EmployeeForList } from './../Models/EmployeeForList';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeForList[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }

  deleteEmployee(id: number) {
    // this.employeeService.deleteEmployee(id).subscribe((employees: EmployeeForList[]) => {
    //   this.employees = employees;
    // }, error => {
    //   console.log(error);
    // });

    this.employees = this.employees.filter(x => x.Id !== id);
  }
}
