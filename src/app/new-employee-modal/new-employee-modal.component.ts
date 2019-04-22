import { EmployeeForDetails } from './../Models/EmployeeForDetails';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-employee-modal',
  templateUrl: './new-employee-modal.component.html',
  styleUrls: ['./new-employee-modal.component.css']
})
export class NewEmployeeModalComponent implements OnInit {
  @Output() newEmployee = new EventEmitter<EmployeeForDetails>();
  submitForm: FormGroup;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
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

  addNewEmployee() {
    if (this.submitForm.valid) {
      const newEmployee: EmployeeForDetails = {
        Id: 0,
        FirstName: this.submitForm.get('firstName').value,
        LastName: this.submitForm.get('lastName').value,
        Birth: this.submitForm.get('birth').value,
        Salary: this.submitForm.get('salary').value,
        WorkingPosition: this.submitForm.get('workingPosition').value,
        TaxNumber: this.submitForm.get('taxNumber').value
      };

      this.newEmployee.emit(newEmployee);
      this.bsModalRef.hide();
    } else {
      Object.keys(this.submitForm.controls).forEach(field => {
        const control = this.submitForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
