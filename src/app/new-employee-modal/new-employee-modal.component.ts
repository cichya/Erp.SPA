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

  createRegisterForm() {
    this.submitForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      birth: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      workingPosition: ['', [Validators.required]],
      taxNumber: ['', [Validators.required]],
    });
  }

  addNewEmployee() {
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
  }
}
