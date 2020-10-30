import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.css']
})
export class LandpageComponent implements OnInit {

  panelOpenState = false;

  constructor() { }

  ngOnInit() {
    AOS.init();
  }

}
