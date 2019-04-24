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
    this.bsModalRef = this.modalService.show(ConfirmDeleteUserComponent);

    this.bsModalRef.content.toDelete.subscribe((toDelete: boolean) => {
      if (toDelete) {
        this.employeeService.deleteEmployee(id).subscribe(() => {
          this.employees.splice(this.employees.findIndex(x => x.id === id), 1);
        }, error => {
          console.log(error);
        });
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
        this.employeeService.addEmployee(newEmployee).subscribe((employee: EmployeeForList) => {
          this.employees.push(employee);
        }, error => {
          console.log(error);
        });
      }
    );
  }

  editEmployee(id: number) {
    const initialState = {
      isEdit: true,
      employeeId: id
    };

    this.bsModalRef = this.modalService.show(NewEmployeeModalComponent, {
      initialState
    });

    this.bsModalRef.content.editedEmployee.subscribe(
      (editedEmployee: EmployeeForDetails) => {
        this.employeeService.updateEmployee(editedEmployee.id, editedEmployee).subscribe((data: EmployeeForList) => {
          const idx = this.employees.findIndex(x => x.id === data.id);
          this.employees[idx] = data;
        }, error => {
          console.log(error);
        });
      }
    );
  }
}
