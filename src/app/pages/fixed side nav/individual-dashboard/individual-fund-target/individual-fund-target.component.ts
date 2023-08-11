import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-individual-fund-target',
  templateUrl: './individual-fund-target.component.html',
  styleUrls: ['./individual-fund-target.component.css']
})
export class IndividualFundTargetComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  campaignerId: any;
  FundTarget = ['serialNo', 'campaignerId', 'cause category', 'collected Amount', 'required Amount', 'Last Date', 'Plan'];
  dataSource: any;
  description = new Array<any>();
  datas = new Array<any>();
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];
  public array: any;
  firstLastButtons = true;
  public pageSize = 7;
  public currentPage = 0;
  public pageLength = 100;
  public totalSize = 0;

  campaginpage = ['serialNo', 'campaignerId', 'campaignerName', 'startdateenddate', 'finalview']
  constructor(private route: ActivatedRoute, private router: Router, private service: ApiService,) {
  }
  ngOnInit(): void {
    this.campaignerId = sessionStorage.getItem('campaignerId');    
    this.service.getFundTargetInfo(this.campaignerId).subscribe((response: any) => {
      console.log(response);     
      this.dataSource = new MatTableDataSource<Element>(response);
      this.dataSource.paginator = this.paginator;
    })
    this.getArray();
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  
  private getArray() {
    this.service.getFundTargetInfo(this.campaignerId)
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
  onClicked() {
    this.router.navigate(["/startCampaign/individualCampaign"])
  }

  dataSourcee = [{ "id": "1", "campaignId": "amit", "amount": "0", "employee_age": "0", "profile_image": "" }
    , { "id": "247793", "campaignId": "Ana", "amount": "123", "employee_age": "123", "profile_image": "" },
  { "id": "247856", "campaignId": "Joseph Beltran", "amount": "1000", "employee_age": "23", "profile_image": "" },
  { "id": "247982", "campaignId": "testyeyyeye1", "amount": "123", "employee_age": "23", "profile_image": "" },
  { "id": "248038", "campaignId": "Hendry", "amount": "61888", "employee_age": "26", "profile_image": "" }]

}
