import { Component, OnInit } from '@angular/core';
import { ToastyService } from './toasty.service';

@Component({
  selector: 'app-toasty',
  templateUrl: './toasty.component.html',
  styleUrls: ['./toasty.component.css']
})
export class ToastyComponent implements OnInit {

  constructor(
    private toastService: ToastyService
  ) { }

  ngOnInit() {
  }

  showConfirm() {
    this.toastService.showConfirm();
  }

  onConfirm() {

  }

  onReject() {

  }
}
