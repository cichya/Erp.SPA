import { PaginatedData } from './../Models/Pagination';
import { EmployeeForDetails } from './../Models/EmployeeForDetails';
import { NewEmployeeModalComponent } from './../Modals/new-employee-modal/new-employee-modal.component';
import { EmployeeService } from './../services/employee.service';
import { EmployeeForList } from './../Models/EmployeeForList';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ConfirmDeleteUserComponent } from '../Modals/confirm-delete-user/confirm-delete-user.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pagination } from '../Models/pagination';
import { FilterParams } from '../Models/FilterParams';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeForList[];
  bsModalRef: BsModalRef;
  searchForm: FormGroup;
  pagination: Pagination;
  filterParams: FilterParams;
  currentPage = 1;

  constructor(
    private employeeService: EmployeeService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createSearchForm();
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 0
    };

    this.searchForm.get('lastNameFilter').setValue('');
    this.searchForm.get('taxNumberFilter').setValue('');
    this.searchForm.get('workingPositionFilter').setValue('');

    this.loadData();
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      lastNameFilter: [''],
      taxNumberFilter: [''],
      workingPositionFilter: ['']
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }

  loadData() {
    this.employeeService
      .getEmployees(this.pagination.currentPage, this.pagination.itemsPerPage, this.filterParams)
      .subscribe(
        (res: PaginatedData<EmployeeForList[]>) => {
          this.employees = res.result;
          this.pagination = res.pagination;
        },
        error => {
          console.log(error);
        }
      );
  }

  search() {
    this.filterParams = {
      lastNameFilter: this.searchForm.get('lastNameFilter').value,
      taxNumberFilter: this.searchForm.get('taxNumberFilter').value,
      workingPositionFilter: this.searchForm.get('workingPositionFilter').value
    };

    this.loadData();
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
        this.employees = this.employees.filter(x => x.id !== id);
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
          id: this.employees[this.employees.length - 1].id + 1,
          age: 10,
          firstName: newEmployee.firstName,
          lastName: newEmployee.lastName,
          salary: newEmployee.salary,
          taxNumber: newEmployee.taxNumber,
          workingPosition: newEmployee.workingPosition
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
          id: editedEmployee.id,
          age: 10,
          firstName: editedEmployee.firstName,
          lastName: editedEmployee.lastName,
          salary: editedEmployee.salary,
          taxNumber: editedEmployee.taxNumber,
          workingPosition: editedEmployee.workingPosition
        };

        const idx = this.employees.findIndex(x => x.id === emp.id);
        this.employees[idx] = emp;
      }
    );
  }
}
