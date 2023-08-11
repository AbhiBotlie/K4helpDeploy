import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { RequestWithdrawlPopupComponent } from '../../request-withdrawl-popup/request-withdrawl-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-individual-withdrawl-request',
  templateUrl: './individual-withdrawl-request.component.html',
  styleUrls: ['./individual-withdrawl-request.component.css']
})
export class IndividualWithdrawlRequestComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  Withdrwalrequest = ['serialNo', 'campaignerId', 'cause', 'Recived Fund', 'Withdrwal Request', 'Status']
  dataSource: any;
  service: any;
  description = new Array<any>();
  datas = new Array<any>();
  campaignerId:any;
  firstLastButtons = true;
  pageSizeOptions: number[] = [1, 5, 10, 25, 100];
  public array: any;
  public pageSize = 7;
  public currentPage = 0;
  public pageLength = 100;
  public totalSize = 0;
  constructor(private route: ActivatedRoute, private router: Router, private dashboard: ApiService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.dashboard.withdhrawlResquestData(sessionStorage.getItem('campaignerId')).subscribe((res:any)=>{
      console.log(res);
      
    })
    this.campaignerId= sessionStorage.getItem('campaignerId');
    this.getArray();
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private getArray() {
    this.dashboard.withdhrawlResquestData(this.campaignerId)
      .subscribe((response:any) => {
        this.dataSource = new MatTableDataSource<Element>(response);        
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
  }
  
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }

  onClick(id: any) {
    this.dialog.open(RequestWithdrawlPopupComponent, {
      disableClose: true,
      data: {
        "id": id
      }
    })
  }

  onClicked() {
    this.router.navigate(["/startCampaign/individualCampaign"])
  }
  dataSourcee = [{ "donorName": "1", "campaignId": "amit", "amount": "0", "employee_age": "0", "dateAndTime": "" }
    , { "donorName": "247793", "campaignId": "Ana", "amount": "123", "employee_age": "123", "dateAndTime": "" },
  { "donorName": "247856", "campaignId": "Joseph Beltran", "amount": "1000", "employee_age": "23", "dateAndTime": "" },
  { "donorName": "247982", "campaignId": "testyeyyeye1", "amount": "123", "employee_age": "23", "dateAndTime": "" },
  { "donorName": "248038", "campaignId": "Hendry", "amount": "61888", "employee_age": "26", "dateAndTime": "" }]

}
