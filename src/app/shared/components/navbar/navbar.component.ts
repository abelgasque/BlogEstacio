import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { ApoioService } from 'src/app/util/apoio.service';
import { Pessoa } from 'src/app/util/model';
import { ToastyService } from '../toasty/toasty.service';

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
  pessoa: any = null;
  pathImgPessoa = "../../../../assets/img/pessoas_perfil/";
  isAdministrador: boolean = false;

  constructor(
    public apoio: ApoioService,
    private router: Router,
    private toastyService: ToastyService
  ) { }

  ngOnInit(): void {
    this.setPessoa();
  }

  setPessoa() {
    let pessoa = this.apoio.getPessoaStorage();
    if (pessoa != null) {
      this.pessoa = pessoa;
    }
    this.isAdmin();
  }

  loggout() {
    this.apoio.removePessoaStorage();
    this.setPessoa();
    this.router.navigate(['/seguranca', 'login']);
    this.toastyService.showSuccess("Loggout efetuado com sucesso!");
  }
  
  isAdmin() {
    if (this.pessoa != null && this.pessoa.tipo_pessoa == "ADMINISTRADOR") {
      this.isAdministrador = true;
    } else {
      this.isAdministrador = false;
    }
  }
}
