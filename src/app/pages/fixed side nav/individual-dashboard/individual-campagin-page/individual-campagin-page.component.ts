import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-individual-campagin-page',
  templateUrl: './individual-campagin-page.component.html',
  styleUrls: ['./individual-campagin-page.component.css']
})
export class IndividualCampaginPageComponent implements OnInit {
  dataSource:any;
  service: any;
  description = new Array<any>();
  datas = new Array<any>();
  pageSizeOptions: number[] = [7, 10, 25, 100];
  public array: any;
  firstLastButtons = true;
  public pageSize = 7;
  public currentPage = 0;
  public pageLength = 100;
  campaginpage=['serialNo','campaignerId','campaignerName','startdateenddate','finalview']
  constructor(private route: ActivatedRoute, private router: Router,private dashboard:DashboardService) {
  }
  ngOnInit(): void {
    
   
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }
}