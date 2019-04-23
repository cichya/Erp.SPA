import { EmployeeForDetails } from './../Models/EmployeeForDetails';
import { NewEmployeeModalComponent } from './../Modals/new-employee-modal/new-employee-modal.component';
import { EmployeeService } from './../services/employee.service';
import { EmployeeForList } from './../Models/EmployeeForList';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ConfirmDeleteUserComponent } from '../Modals/confirm-delete-user/confirm-delete-user.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeForList[];
  bsModalRef: BsModalRef;

  constructor(
    private employeeService: EmployeeService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }

  deleteEmployee(id: number) {
    // this.employeeService.deleteEmployee(id).subscribe((employees: EmployeeForList[]) => {
    //   this.employees = employees;
    // }, error => {
    //   console.log(error);
    // });

    this.bsModalRef = this.modalService.show(ConfirmDeleteUserComponent);

    this.bsModalRef.content.toDelete.subscribe((toDelete: boolean) => {
      if (toDelete) {
        this.employees = this.employees.filter(x => x.Id !== id);
      }
    });
  }

  addNewEmployee() {
    const initialState = {
      isEdit: false,
      employee: null
    };

    this.bsModalRef = this.modalService.show(NewEmployeeModalComponent, {
      initialState
    });

    this.bsModalRef.content.newEmployee.subscribe(
      (newEmployee: EmployeeForDetails) => {
        // this.employeeService.addEmployee(newEmployee)subscribe((employees: EmployeeForList[]) => {
        //   this.employees = employees;
        // }, error => {
        //   console.log(error);
        // });
        const emp: EmployeeForList = {
          Id: this.employees[this.employees.length - 1].Id + 1,
          Age: 10,
          FirstName: newEmployee.FirstName,
          LastName: newEmployee.LastName,
          Salary: newEmployee.Salary,
          TaxNumber: newEmployee.TaxNumber,
          WorkingPosition: newEmployee.WorkingPosition
        };

        this.employees.push(emp);
      }
    );
  }

  editEmployee(id: number) {
    // this.employeeService.getEmployee(id).subscribe((emp: EmployeeForDetails) => {
    //   const initialState = {
    //     isEdit: true,
    //     employee: emp
    //   };

    //   this.bsModalRef = this.modalService.show(NewEmployeeModalComponent, { initialState });

    // }, error => {
    //   console.log(error);
    // });

    const initialState = {
      isEdit: true,
      employee: this.employeeService.getEmployee(id)
    };

    this.bsModalRef = this.modalService.show(NewEmployeeModalComponent, {
      initialState
    });

    this.bsModalRef.content.editedEmployee.subscribe(
      (editedEmployee: EmployeeForDetails) => {
        // this.employeeService.addEmployee(newEmployee)subscribe((employees: EmployeeForList[]) => {
        //   this.employees = employees;
        // }, error => {
        //   console.log(error);
        // });
        const emp: EmployeeForList = {
          Id: editedEmployee.Id,
          Age: 10,
          FirstName: editedEmployee.FirstName,
          LastName: editedEmployee.LastName,
          Salary: editedEmployee.Salary,
          TaxNumber: editedEmployee.TaxNumber,
          WorkingPosition: editedEmployee.WorkingPosition
        };

        const idx = this.employees.findIndex(x => x.Id === emp.Id);
        this.employees[idx] = emp;
      }
    );
  }
}
