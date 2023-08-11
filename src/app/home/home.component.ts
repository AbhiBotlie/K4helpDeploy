import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/AppConstants';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CampaignDonatePageComponent } from '../campaign-donate-page/campaign-donate-page.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newsletter: any;
  // dataSource1=Array<any>();
  allNewsletter = new Array<any>();
  dynamicdiv = new Array<any>();
  imageBaseUrl: any;
  topNeeded = new Array<any>();
  constructor(private api: ApiService, private route: Router, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.imageBaseUrl = AppConstants.IMAGE_BASE_URL;
    this.api.getAllPromise().subscribe((data: any) => {
      this.allNewsletter = data;
    })
    this.api.getAllTopNeededPeople().subscribe((res: any) => {    
        this.topNeeded = res;
    })

  }

  onClick(id: any) {
    this.route.navigate(['campaginpage/' + id]);

  }

  donateNow(){
    this.dialog.open(CampaignDonatePageComponent);
  }



}