import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { AuthService } from 'src/app/security/auth.service';
import { ApoioService } from 'src/app/core/apoio.service';

export class CategoriaDTO {
  categoria: any;
  subcategorias: any[] = [];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displaySidebar: boolean = false;
  displaySpinner: boolean = false;
  menu: TreeNode[] = [];
  
  constructor(
    public apoio: ApoioService,
    public auth: AuthService
  ) { }

  ngOnInit(): void { }
}
