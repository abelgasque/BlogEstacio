import { Component, Input, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-publish-feedback',
  templateUrl: './publish-feedback.component.html',
  styleUrls: ['./publish-feedback.component.css']
})
export class PublishFeedbackComponent implements OnInit {

  @Input() publications: any[] =[];
  @Input() isFooter:boolean = false;
  @Input() isHeader:boolean = false;
  
  constructor() { }

  ngOnInit() {
    AOS.init();
  }
}
