import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DashboardService } from '../../dashboard.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-individual-my-campagin',
  templateUrl: './individual-my-campagin.component.html',
  styleUrls: ['./individual-my-campagin.component.css']
})
export class IndividualMyCampaginComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  MyCampagin = ['serialNo', 'campaignerId', 'campaignerName', 'Startdate /lastdate', 'Recived Amount', 'Required Amount', 'Remaining Amount', 'Withdrwal Amount', 'Final View', 'Active', 'Deactive']

  dataSource: any;
  description = new Array<any>();
  datas = new Array<any>();
  pageSizeOptions: number[] = [7, 10, 25, 100];
  public array: any;
  firstLastButtons = true;
  public pageSize = 7;
  public currentPage = 0;
  public pageLength = 100;
  public totalSize = 0;
  campaignerData: any;
  campaigner_phone: any;
  campaignerIdno: any;
  constructor(private route: ActivatedRoute, private router: Router, private dashboard: DashboardService, private service: ApiService) {
  }
  ngOnInit(): void {
    this.campaignerIdno = sessionStorage.getItem('campaignerId');
    var campaignerData = JSON.parse(localStorage.getItem('campaginerdetails') || '{}')
    this.campaignerData = campaignerData.value;
    this.campaigner_phone = campaignerData.campaignerNumber
    this.getArray();

    this.service.getliveCampaigns(this.campaignerIdno).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource<Element>(response);
      this.array = response;
      this.pageLength = this.array.length;
      this.iterator();
    })

  }

  private getArray() {
    this.service.getliveCampaigns(this.campaignerIdno)
      .subscribe((response: any) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
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
  viewCampaign(id: any) {
    this.router.navigate(['/campaginpage', id]);
  }

  chnageToEditable(id: any) {
    this.router.navigate(['individualdashboard/editcampaignerdetails/' + id]);
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
