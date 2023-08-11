import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUpdateComponent } from '../../add-update/add-update.component';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-individual-updates',
  templateUrl: './individual-updates.component.html',
  styleUrls: ['./individual-updates.component.css']
})
export class IndividualUpdatesComponent implements OnInit {

  Updates = ['serialNo', 'campaignerId', 'campaignerName', 'image', 'description'];

  dataSource: any;
  constructor(private route: ActivatedRoute, private router: Router, private dashboard: DashboardService, private dialog: MatDialog) {}
    description = new Array<any>();
    datas = new Array<any>();
    pageSizeOptions: number[] = [7, 10, 25, 100];
  public array: any;
  firstLastButtons = true;
  public pageSize = 7;
  public currentPage = 0;
  public pageLength = 100;

  ngOnInit(): void {

  
  }
  openDialogAddaccount() {
    this.dialog.open(AddUpdateComponent, {
      width: '500px', height: '550px'
    })
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