import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'k4help_2.0';
  campaignId: any;
  constructor(public router: Router, public route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id')    
  }
  public URL = '/individualdashboard';
  public UL = '/individualdashboard/individualprofile';
  

  isValid(): boolean {
    
    if ((this.router.url != '/individualdashboard')
    && (this.router.url != '/individualdashboard/individualprofile')
      && (this.router.url != '/individualdashboard/individualdonation')
      && (this.router.url != '/individualdashboard/individualmanagebanner')
      && (this.router.url != '/individualdashboard/individualmanageimages')
      && (this.router.url != '/individualdashboard/individualaccountdetails')
      && (this.router.url != '/individualdashboard/individualwithdrawlrequest')
      && (this.router.url != '/individualdashboard/individualpatientdetails')
      && (this.router.url != '/individualdashboard/individualpatientkyc')
      && (this.router.url != '/individualdashboard/individualmycampagin')
      && (this.router.url != '/individualdashboard/individualverifiedcampagins')
      && (this.router.url != '/individualdashboard/individualstory')
      && (this.router.url != '/individualdashboard/individualupdates')
      && (this.router.url != '/individualdashboard/individualplans')
      && (this.router.url != '/individualdashboard/individualfundtarget')
      && (this.router.url != '/individualdashboard/individuallistofdonor')
      && (this.router.url != '/individualdashboard/individuallistofdonation')
      && (this.router.url != '/individualdashboard/individualcampaginpage')
      && (this.router.url != '/individualdashboard/individuallogout')
      && (this.router.url != '/individualdashboard/aboutSocialActivist')
      && (this.router.url != '/individualdashboard/aboutNGO')
      && (this.router.url != '/individualdashboard/individualincompleteCampaign')
      && (this.router.url != '/individualdashboard/profile')
      && (this.router.url != '/individualdashboard/editcampaignerdetails/' + this.campaignId)     
      && (this.router.url != '/ngodashboard')
      && (this.router.url != '/ngodashboard/ngoprofile')
      && (this.router.url != '/ngodashboard/ngodonation')
      && (this.router.url != '/ngodashboard/ngoaddyourworkingarea')
      && (this.router.url != '/ngodashboard/ngodonation')
      && (this.router.url != '/ngodashboard/ngomanagebanner')
      && (this.router.url != '/ngodashboard/ngomanageimages')
      && (this.router.url != '/ngodashboard/ngoaccountdetails')
      && (this.router.url != '/ngodashboard/ngowithdrwalrequest')
      && (this.router.url != '/ngodashboard/ngopatientdetails')
      && (this.router.url != '/ngodashboard/ngopatientkyc')
      && (this.router.url != '/ngodashboard/ngomyCampaigns')
      && (this.router.url != '/ngodashboard/ngoincompleteCampaigns')
      && (this.router.url != '/ngodashboard/ngoverifiedCampaigns')
      && (this.router.url != '/ngodashboard/ngostory')
      && (this.router.url != '/ngodashboard/ngoupdates')
      && (this.router.url != '/ngodashboard/ngoplans')
      && (this.router.url != '/ngodashboard/ngofundtarget')
      && (this.router.url != '/ngodashboard/ngolistofdonor')
      && (this.router.url != '/ngodashboard/ngolistofdonation')
      && (this.router.url != '/ngodashboard/ngocampaginpage')
      && (this.router.url != '/ngodashboard/ngologout')
      && (!this.router.url.startsWith('/individualdashboard'))
      && (!this.router.url.startsWith('/campaginpage'))
      && (this.router.url != '/socialactivistdashboard')
      && (this.router.url != '/socialactivistdashboard/socialprofile')
      && (this.router.url != '/socialactivistdashboard/socialaddyourworkingarea')
      && (this.router.url != '/socialactivistdashboard/socialdonation')
      && (this.router.url != '/socialactivistdashboard/socialmanagebanner')
      && (this.router.url != '/socialactivistdashboard/socialmanageimages')
      && (this.router.url != '/socialactivistdashboard/socialaccountdetails')
      && (this.router.url != '/socialactivistdashboard/socialwithdrawlrequest')
      && (this.router.url != '/socialactivistdashboard/socialpatientdetails')
      && (this.router.url != '/socialactivistdashboard/socialpatientkyc')
      && (this.router.url != '/socialactivistdashboard/socialmycampagin')
      && (this.router.url != '/socialactivistdashboard/socialstory')
      && (this.router.url != '/socialactivistdashboard/socialupdates')
      && (this.router.url != '/socialactivistdashboard/socialplans')
      && (this.router.url != '/socialactivistdashboard/socialfundtarget')
      && (this.router.url != '/socialactivistdashboard/sociallistofdonor')
      && (this.router.url != '/socialactivistdashboard/sociallistofdonation')
      && (this.router.url != '/socialactivistdashboard/socialcampaginpage')
      && (this.router.url != '/socialactivistdashboard/sociallogout')
      && (this.router.url != '/socialactivistdashboard/aboutSocialActivist')
      && (this.router.url != '/socialactivistdashboard/socialCompleteCampaigns')
      && (this.router.url != '/socialactivistdashboard/socialVerifiedCampaigns')
      && (this.router.url != '/socialactivistdashboard/socialIncompleteCampaigns')



    ) {
      return true;
    }
    return false;
  }
}
