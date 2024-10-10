import { Component, OnInit, ViewChild } from '@angular/core';

import { PoMenuComponent, PoMenuItem, PoModalComponent, PoTableColumn, PoToolbarAction } from '@po-ui/ng-components';
import { AuthenticationService } from './core/services/auth/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(PoMenuComponent, { static: false }) poMenu!: PoMenuComponent;
  @ViewChild('poModalProfile') profileModal!: PoModalComponent;

  actions!: Array<PoToolbarAction>;
  actionsIcon!: string;
  profileActions!: Array<PoToolbarAction>;
  menus!: Array<any>;
  hideMenu: boolean;
  columns: Array<PoTableColumn>;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.hideMenu = true;
    this.columns = this.getColumns();
    this.router.events.subscribe((event: any)=> {
      if (event instanceof NavigationEnd){
        this.handleMenu();
      }
    })
  }

  ngOnInit(): void {}

  afterNavigation(menu: PoMenuItem, salvarRecente: boolean = true): void {
    setTimeout(() => {
        this.poMenu.collapse();
    }, 250);
  }

  getColumns(): PoTableColumn[] {
    return [
      { property: 'perfil', label: ' ' }
    ]
  }

  setupMenu(){
    this.menus = [
      {    
        label: 'Dasboard',
        shortLabel: 'Dash',
        icon: 'po-icon-pallet-full',
        link: 'home',
        action: (menu: PoMenuItem) => this.afterNavigation(menu, false)
      },
      {
        label: 'Entregas',
        shortLabel: 'Ent.',
        icon: 'po-icon-truck',
        link: 'entregas',
        action: (menu: PoMenuItem) => this.afterNavigation(menu)
      },
    ];

    this.profileActions = [
      {
          icon: 'po-icon-exit',
          label: 'Sair',
          type: 'danger',
          separator: true,
          action: (item: any) => this.logout()
      }
    ];
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  handleMenu(){
    let currentRoute = this.activatedRoute.snapshot.firstChild?.url[0]?.path;

    if(currentRoute !== 'login'){
      this.hideMenu = false;
      this.setupMenu();
    }
    else {
      this.hideMenu = true;
    }
  }
}
