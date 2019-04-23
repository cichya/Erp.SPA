import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-unsaved-content-modal',
  templateUrl: './unsaved-content-modal.component.html',
  styleUrls: ['./unsaved-content-modal.component.css']
})
export class UnsavedContentModalComponent implements OnInit {
  rootModal: BsModalRef;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  abortEdit() {
    this.bsModalRef.hide();
    this.rootModal.hide();
  }
}
