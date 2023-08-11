import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CampaignDonatePageComponent } from 'src/app/campaign-donate-page/campaign-donate-page.component';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';

@Component({
  selector: 'app-browse-campaign',
  templateUrl: './browse-campaign.component.html',
  styleUrls: ['./browse-campaign.component.css']
})
export class BrowseCampaignComponent implements OnInit {
  deseases = new Array<any>();
  allCreatedCampaign = new Array<any>();
  filteredCampaign = new Array<any>();
  mostNeededPeople = new Array<any>();
  imageBaseUrl = AppConstants.IMAGE_BASE_URL;
  constructor(private api: ApiService, private dropdown: ApiService, private dialog: MatDialog) { }

  projectcount: number = 0;
  isReadMore: any;
  campaignerId: any;
  projectcountstop: any = setInterval(() => {
    this.projectcount++;
    if (this.projectcount == 287) {
      clearInterval(this.projectcountstop);
    }

  }, 10)

  ngOnInit(): void {
    this.campaignerId = sessionStorage.getItem('campaignerId');
    this.isReadMore = true;
    this.api.getAllCampaignData().subscribe((data: any) => {
      this.allCreatedCampaign = data;
    })

    this.api.getAllMostNeededPeople().subscribe((res: any) => {
      this.mostNeededPeople = res;
    })

    this.dropdown.getPurposeDropdownList().subscribe((response: any) => {
      this.deseases = response;
    });
  }

  filterSelection(disease: String) {
    if (disease === 'ALL') {
      this.filteredCampaign = this.mostNeededPeople;
    } else {
      this.filteredCampaign = this.allCreatedCampaign;
    }
  }
  showText(id: any) {
    this.isReadMore = !this.isReadMore
  }

  mostNeeded(type: String) {
    if (type === 'MOST') {

    }
  }

  donateNow(id: any) {
    this.dialog.open(CampaignDonatePageComponent,
       { disableClose: true,
        data:id,
      }), {
    }
  }
}
