import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddStoryComponent } from '../../add-story/add-story.component';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-individual-story',
  templateUrl: './individual-story.component.html',
  styleUrls: ['./individual-story.component.css']
})
export class IndividualStoryComponent implements OnInit {

  Story = ['serialNo', 'campaignerId', 'campaignerName', 'heading', 'image']

  dataSource: any;
  constructor(private route: ActivatedRoute, private router: Router, private dashboard: DashboardService, private dialog: MatDialog) { }
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
    this.dialog.open(AddStoryComponent, {
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
