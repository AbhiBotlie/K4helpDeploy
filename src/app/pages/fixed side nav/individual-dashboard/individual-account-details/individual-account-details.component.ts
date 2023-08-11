import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { EditAccountFormComponent } from '../../edit-account-form/edit-account-form.component';
import { IndividualAddAccountformComponent } from '../../individual-add-accountform/individual-add-accountform.component';


@Component({
  selector: 'app-individual-account-details',
  templateUrl: './individual-account-details.component.html',
  styleUrls: ['./individual-account-details.component.css']
})
export class IndividualAccountDetailsComponent implements OnInit {
  Accountdetails = ['serialNo', 'campaignerId', 'campaignerName', 'cause category', 'desease', 'benifciary name', 'bank name', 'Branch name', 'IFSC code', 'account no', 'edit', 'block', 'hide']


  dataSource: any;
  service: any;
  description = new Array<any>();
  datas = new Array<any>();
  pageSizeOptions: number[] = [7, 10, 25, 100];
  public array: any;
  firstLastButtons = true;
  public pageSize = 7;
  public currentPage = 0;
  public pageLength = 100;

  constructor(private route: ActivatedRoute, private router: Router, private dashboard: DashboardService, private dialog: MatDialog) {
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

  
 

  openDialogAddaccount(){  
    this.dialog.open(IndividualAddAccountformComponent, {
      width: '500px',height:'550px', data:{"btnName": "ADD"}
    }).afterClosed().subscribe(()=>{
      
    })
  }
  
  openDialogEditaccount(){
    this.dialog.open(IndividualAddAccountformComponent, {
      width: '500px',height:'550px', data:{"btnName": "UPDATE"}
    }).afterClosed().subscribe(()=>{
      
    })
  }

}
