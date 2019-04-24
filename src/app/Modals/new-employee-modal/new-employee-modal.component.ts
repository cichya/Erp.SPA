import { EmployeeService } from './../../services/employee.service';
import { EmployeeForDetails } from './../../Models/EmployeeForDetails';
import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UnsavedContentModalComponent } from '../unsaved-content-modal/unsaved-content-modal.component';

@Component({
  selector: 'app-new-employee-modal',
  templateUrl: './new-employee-modal.component.html',
  styleUrls: ['./new-employee-modal.component.css']
})
export class NewEmployeeModalComponent implements OnInit {
  @Output() newEmployee = new EventEmitter<EmployeeForDetails>();
  @Output() editedEmployee = new EventEmitter<EmployeeForDetails>();
  submitForm: FormGroup;
  isEdit: boolean;
  employeeId: number;
  employee: EmployeeForDetails;
  bsModalRefSecond: BsModalRef;
  maxDate: Date;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.submitForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(public bsModalRef: BsModalRef,
              private fb: FormBuilder,
              private modalService: BsModalService,
              private employeeService: EmployeeService) {
                this.maxDate = new Date();
                this.maxDate.setDate(this.maxDate.getDate() - 1);
               }

  ngOnInit() {
    this.createRegisterForm();

    if (this.isEdit) {
      this.loadData();
    }
  }

  loadData() {
    this.employeeService.getEmployee(this.employeeId).subscribe((data: EmployeeForDetails) => {
      this.employee = data;

      this.firstName.setValue(this.employee.firstName);
      this.lastName.setValue(this.employee.lastName);
      this.birth.setValue(new Date(this.employee.birth));
      this.salary.setValue(this.employee.salary);
      this.workingPosition.setValue(this.employee.workingPosition);
      this.taxNumber.setValue(this.employee.taxNumber);
    }, error => {
      console.log(error);
    });
  }

  get firstName() { return this.submitForm.get('firstName'); }
  get lastName() { return this.submitForm.get('lastName'); }
  get birth() { return this.submitForm.get('birth'); }
  get salary() { return this.submitForm.get('salary'); }
  get workingPosition() { return this.submitForm.get('workingPosition'); }
  get taxNumber() { return this.submitForm.get('taxNumber'); }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  createRegisterForm() {
    this.submitForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      birth: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      workingPosition: ['', [Validators.required]],
      taxNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  submitAction() {
      if (this.submitForm.valid) {
        const newEmployee: EmployeeForDetails = {
          id: this.isEdit ? this.employee.id : 0,
          firstName: this.submitForm.get('firstName').value,
          lastName: this.submitForm.get('lastName').value,
          birth: this.submitForm.get('birth').value,
          salary: this.submitForm.get('salary').value,
          workingPosition: this.submitForm.get('workingPosition').value,
          taxNumber: this.submitForm.get('taxNumber').value
        };

        if (this.isEdit) {
          this.editedEmployee.emit(newEmployee);
        } else {
          this.newEmployee.emit(newEmployee);
        }
        this.bsModalRef.hide();
      } else {
        Object.keys(this.submitForm.controls).forEach(field => {
          const control = this.submitForm.get(field);
          control.markAsTouched({ onlySelf: true });
        });
    }
  }

  hideMainModal() {
    if (this.isEdit && this.submitForm.dirty) {
      const initialState = {
        rootModal: this.bsModalRef
      };

      this.bsModalRefSecond = this.modalService.show(UnsavedContentModalComponent, { initialState });
    } else {
      this.bsModalRef.hide();
    }
  }
}
