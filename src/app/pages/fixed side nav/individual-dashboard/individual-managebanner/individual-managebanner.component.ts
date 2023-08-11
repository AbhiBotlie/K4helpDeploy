import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { DeletePopupComponent } from '../../delete-popup/delete-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { EditBannerComponent } from '../../edit-banner/edit-banner.component';

@Component({
  selector: 'app-individual-managebanner',
  templateUrl: './individual-managebanner.component.html',
  styleUrls: ['./individual-managebanner.component.css']
})
export class IndividualManagebannerComponent implements OnInit {


  managebanner = ['serialNo', 'campaignerId', 'campaignerName', 'Banner Image', 'text', 'edit', 'delete', 'final view'];
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

  openDialog(sno: any) {
    this.dialog.open(DeletePopupComponent, {
      width: '250px', enterAnimationDuration: "0ms", exitAnimationDuration: "0ms", data: { "user_id": sno }
    }).afterClosed()
      .subscribe((confirm: any) => {
        if (confirm) {
          this.dashboard.deleteData(sno).subscribe(() => {
           
          });
        }
      });
    console.log(sno);
  }

  openDialogEditBanner() {
    this.dialog.open(EditBannerComponent, {
      width: '500px', height: '550px'
    })
  }

}


