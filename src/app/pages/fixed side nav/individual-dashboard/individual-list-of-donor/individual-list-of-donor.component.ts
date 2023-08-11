import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-individual-list-of-donor',
  templateUrl: './individual-list-of-donor.component.html',
  styleUrls: ['./individual-list-of-donor.component.css']
})
export class IndividualListOfDonorComponent implements OnInit {

  listofdonar=['srno','cid','donorid','amount','date'];

  dataSource:any;
  description = new Array<any>();
  datas = new Array<any>();
  pageSizeOptions: number[] = [7, 10, 25, 100];
  public array: any;
  firstLastButtons = true;
  public pageSize = 7;
  public currentPage = 0;
  public pageLength = 100;
  campaignerId:any;
  campaginpage=['serialNo','campaignerId','campaignerName','startdateenddate','finalview']
  constructor(private route: ActivatedRoute, private router: Router,private dashboard:DashboardService, private service:ApiService) {
  }
  ngOnInit(): void {
    
    this.campaignerId= sessionStorage.getItem('campaignerId');    
    this.service.getAllDonorsForCampaigner(this.campaignerId).subscribe((res:any)=>{      
      this.dataSource = new MatTableDataSource<Element>(res);  
      this.array = res;  
      this.pageLength = this.array.length;
      this.iterator();
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
  onClicked() {
    this.router.navigate(["/startCampaign/individualCampaign"])
  }
  dataSourcee = [{ "donorName": "1", "campaignId": "amit", "amount": "0", "employee_age": "0", "dateAndTime": "" }
    , { "donorName": "247793", "campaignId": "Ana", "amount": "123", "employee_age": "123", "dateAndTime": "" },
  { "donorName": "247856", "campaignId": "Joseph Beltran", "amount": "1000", "employee_age": "23", "dateAndTime": "" },
  { "donorName": "247982", "campaignId": "testyeyyeye1", "amount": "123", "employee_age": "23", "dateAndTime": "" },
  { "donorName": "248038", "campaignId": "Hendry", "amount": "61888", "employee_age": "26", "dateAndTime": "" }]

}
