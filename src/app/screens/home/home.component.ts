import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  motoristaStats: any[] = [];
  motoristaInsucessoStats: any[] = [];
  bairroStats: any[] = [];

  motoristaColumns: Array<any> = [];
  motoristaInsucessoColumns: Array<any> = [];
  bairroColumns: Array<any> = [];

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.setupColumns();
  }

  loadData(): void {
    this.motoristaStats = this.dashboardService.getMotoristaStats();
    this.motoristaInsucessoStats = this.dashboardService.getMotoristaInsucessoStats();
    this.bairroStats = this.dashboardService.getBairroStats();
  }

  setupColumns(): void {
    this.dashboardService.getColumnsDataOptions().subscribe(columns => {
      this.motoristaColumns = columns;
    });

    this.dashboardService.getColumnsDataInsucessoOptions().subscribe(columns => {
      this.motoristaInsucessoColumns = columns;
    });

    this.dashboardService.getColumnsDataBairroOptions().subscribe(columns => {
      this.bairroColumns = columns;
    });
  }
}
