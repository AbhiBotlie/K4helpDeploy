import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-individual-manageimages',
  templateUrl: './individual-manageimages.component.html',
  styleUrls: ['./individual-manageimages.component.css']
})
export class IndividualManageimagesComponent implements OnInit {

  ManageImage=['serialNo', 'campaignerId', 'campaignerName','Upload file','view sub doc'];
 

  dataSource:any;
  service: any;
  description = new Array<any>();
  datas = new Array<any>();
  pageSizeOptions: number[] = [];
  
  public array: any;
  firstLastButtons = true;
  public pageSize = 7;
  public currentPage = 0;
  public pageLength = 1000;
  
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
