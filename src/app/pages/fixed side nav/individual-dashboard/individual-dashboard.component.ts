import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DashboardService } from '../dashboard.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-individual-dashboard',
  templateUrl: './individual-dashboard.component.html',
  styleUrls: ['./individual-dashboard.component.css']
})
export class IndividualDashboardComponent implements OnInit {
  imageeeee="http://k4help.org/angular/assets/image/logoInBlack.png"
  dataSource: any;
  openSidebar: boolean = true;
  campaignerId: any;
  userType: any;
  data: any;
  campaignerData:any;
  campaignId:any;
  isEnabled: boolean = false;
  sidenav: boolean = true;
  
  constructor(private route: ActivatedRoute, private router: Router, private dashboard: DashboardService, private service: ApiService) {
  }
  ngOnInit(): void {
    this.sidenav = true;
    var campaignerData = JSON.parse(localStorage.getItem('campaginerdetails') || '{}')
    this.campaignerId = sessionStorage.getItem('campaignerId');
    this.campaignerData = campaignerData.value;

    // this.service.getAllCampaignsOfCampaigner(this.campaignerId).subscribe((res:any)=>{
    //   this.campaignId=res.campaignId; 
    // })
    if (sessionStorage.getItem("campaignerId")==null) {
      this.router.navigate(["/login"]);
    }
    this.data = JSON.parse(localStorage.getItem('campaginerdetails') || '{}');
    this.campaignerId = sessionStorage.getItem('campaignerId');
    this.campaignerData = this.data;
    this.service.getCampaignerDetailsById(this.campaignerId).subscribe((res:any)=>{
      this.userType= res.user_type;
    })
    this.getScreenWidth().subscribe(width => {
      if (width < 640) {
        this.showToggle = 'show';
        this.mode = 'over';
        this.openSidenav = false;
      }
      else if (width > 640) {
        this.showToggle = 'hide';
        this.mode = 'side';
        this.openSidenav = true;
      }
    });

  }
  public onClick(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    if (value === 'individualprofile')
      this.router.navigate(['individualprofile'], { relativeTo: this.route });
    else if (value === 'individualdonation') {
      this.router.navigate(['individualdonation'], { relativeTo: this.route });
    }
    else if (value === 'individualmanagebanner') {
      this.router.navigate(['individualmanagebanner'], { relativeTo: this.route });
    }
    else if (value === 'individualmanageimages') {
      this.router.navigate(['individualmanageimages'], { relativeTo: this.route });
    }
    else if (value === 'individualaccountdetails') {
      this.router.navigate(['individualaccountdetails'], { relativeTo: this.route });
    }
    else if (value === 'individualwithdrawlrequest') {
      this.router.navigate(['individualwithdrawlrequest'], { relativeTo: this.route });
    }
    else if (value === 'individualpatientdetails') {
      this.router.navigate(['individualpatientdetails'], { relativeTo: this.route });
    }
    else if (value === 'individualpatientkyc') {
      this.router.navigate(['individualpatientkyc'], { relativeTo: this.route });
    }
    else if (value === 'individualmycampagin') {
      this.router.navigate(['individualmycampagin'], { relativeTo: this.route });
    }
    else if (value === 'individualstory') {
      this.router.navigate(['individualstory'], { relativeTo: this.route });
    }
    else if (value === 'individualupdates') {
      this.router.navigate(['individualupdates'], { relativeTo: this.route });
    }
    else if (value === 'individualplans') {
      this.router.navigate(['individualplans'], { relativeTo: this.route });
    }
    else if (value === 'individualfundtarget') {
      this.router.navigate(['individualfundtarget'], { relativeTo: this.route });
    }
    else if (value === 'individuallistofdonor') {
      this.router.navigate(['individuallistofdonor'], { relativeTo: this.route });
    }
    else if (value === 'individuallistofdonation') {
      this.router.navigate(['individuallistofdonation'], { relativeTo: this.route });
    }
    else if (value === 'individualcampaginpage') {
      this.router.navigate(['individualcampaginpage'], { relativeTo: this.route });
    }
    else if (value === 'individuallogout') {
      this.router.navigate(['individuallogout'], { relativeTo: this.route });
    }


  }

  onChange(event: any) {
    if (event.target.value === "Completed Campaign") {
      this.router.navigate(["individualmycampagin"], { relativeTo: this.route })
    } else if (event.target.value === "Incomplete Campaigns" || event.target.value === "") {
      this.router.navigate(["individualincompleteCampaign"], { relativeTo: this.route })
    } else if (event.target.value === "Verified Campaigns" || event.target.value === "") {
      this.router.navigate(["individualverifiedCampaign"], { relativeTo: this.route })
    }
  }

  onClicked() {
    this.router.navigate(["/startCampaign/individualCampaign"], { relativeTo: this.route })
  }

  menuSidebar = [
    {
      link_name: "My Profile",
      link: "/individualdashboard/individualprofile",
      icon: "bx bx-grid-alt",
      sub_menu: []
    },
    {
      link_name: "About NGO",
      link: "/individualdashboard/aboutNGO",
      icon: "bx bx-grid-alt",
      sub_menu: []
    }, {
      link_name: "About Social Activist",
      link: "/individualdashboard/aboutSocialActivist",
      icon: "bx bx-grid-alt",
      sub_menu: []
    }, {
      link_name: "My Donation",
      link: "/individualdashboard/individuallistofdonation",
      icon: "bx bx-collection",
      sub_menu: [
        // {
        //   link_name: "List of Donation",
        //   link: "/individualdashboard/individuallistofdonation",
        //   icon: "bx bx-compass",
        // }, {
        //   link_name: "List of Donor",
        //   link: "/individualdashboard/individuallistofdonor",
        //   icon: "bx bx-plug",
        // }
      ]
    }, {
      link_name: "Withdrawl Request",
      link: "/individualdashboard/individualwithdrawlrequest",
      icon: "bx bx-book-alt",
      sub_menu: []
    }, {
      link_name: "My Campaigns",
      link: "",
      icon: "bx bx-pie-chart-alt-2",
      sub_menu: [
        {
          link_name: "Incomplete Campaign",
          link: "/individualdashboard/individualincompleteCampaign",
        }, {
          link_name: "Completed Camapign",
          link: "/individualdashboard/individualverifiedcampagins",
        }, {
          link_name: "Live Camapign",
          link: "/individualdashboard/individualmycampagin",
        }
      ]
    }, {
      link_name: "Fund Target",
      link: "/individualdashboard/individualfundtarget",
      icon: "bx bx-line-chart",
      sub_menu: []
    }, {
      link_name: "Logout",
      link: "/individualdashboard/individuallogout",
      icon: "bx bx-history",
      sub_menu: []
    }
  ]

  RemoveElementFromArray(element: any) {
    this.menuSidebar.forEach((value, index) => {
      
      if (value == element) this.menuSidebar.splice(index, 1);
    });
  }

  getMenuSidebar() {
    this.menuSidebar.forEach((value) => {
      if (this.userType === "Individual") {
        this.menuSidebar = this.menuSidebar.filter(item => item.link_name !== 'About NGO');
        this.menuSidebar = this.menuSidebar.filter(item => item.link_name !== 'About Social Activist');
        
      }
       if(this.userType === "NGO"){
        this.menuSidebar = this.menuSidebar.filter(item => item.link_name !== 'About Social Activist');
        
      }
      if(this.userType === "Social Activist"){
        this.menuSidebar = this.menuSidebar.filter(item => item.link_name !== 'About NGO');
        
      }

    });
    return this.menuSidebar;
  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }


  showToggle: any;
  mode: any;
  openSidenav: boolean = true;
  private screenWidth$ = new BehaviorSubject<number>
    (window.innerWidth);

  @ViewChild('sidenav') matSidenav: MatSidenav | undefined;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }
}



