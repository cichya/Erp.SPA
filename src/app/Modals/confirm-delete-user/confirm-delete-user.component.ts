import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-confirm-delete-user',
  templateUrl: './confirm-delete-user.component.html',
  styleUrls: ['./confirm-delete-user.component.css']
})
export class ConfirmDeleteUserComponent implements OnInit {
  @Output() toDelete = new EventEmitter<boolean>();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  noDeleteEmployee() {
    this.toDelete.emit(false);
    this.bsModalRef.hide();
  }

  deleteEmployee() {
    this.toDelete.emit(true);
    this.bsModalRef.hide();
  }
}
