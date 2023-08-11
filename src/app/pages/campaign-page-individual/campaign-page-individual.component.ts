import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CampaignDonatePageComponent } from 'src/app/campaign-donate-page/campaign-donate-page.component';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';
import { DashboardService } from '../fixed side nav/dashboard.service';
import { OtpfilledpopupComponent } from '../start_campaign/otpfilledpopup/otpfilledpopup.component';
import { SharebtnComponentComponent } from '../sharebtn-component/sharebtn-component.component';

@Component({
  selector: 'app-campaign-page-individual',
  templateUrl: './campaign-page-individual.component.html',
  styleUrls: ['./campaign-page-individual.component.css']
})
export class CampaignPageIndividualComponent implements OnInit {
  dataSource = new Array<any>();
  singleCampaignData = {
    "cause_category": "",
    "patient_name": "",
    "bannerImage": "",
    "description": "",
    "updatedPatientImages": "",
    "conditionUpdate": "",
    "required_amount": "",
    "bank_name": "",
    "account_no": "",
    "ifsc_code": "",
    "campaignId": "",
    "campaignerId": "",
    "beneficiary_name": "",
    "patient_email": "",
    "patient_number": "",
    "desease":""
  };
  subscribe: any = Subscription;
  id: any;
  // id:any;
  bannerImage: any;
  aadharImage: any;
  isUrgent = false;
  isVerified = false;
  isUnverified = true;
  isTaxBenifit = false;
  description: any;
  medicalDocument = new Array<any>();
  serverPath: any;
  imageBaseUrl: any;
  topAmount= {
    "amount":"",
    "name":""
  };
  listOdDonor = new Array<any>();
  patientImages = new Array<any>();
  donorList = new Array<any>();
  serverUrl = AppConstants.IMAGE_BASE_URL;
  constructor(private service: ApiService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.imageBaseUrl = AppConstants.IMAGE_BASE_URL;
    this.serverPath = AppConstants.IMAGE_BASE_URL;
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.setCampId(this.id);
    this.service.getSingleCampaignData(this.id).subscribe((res: any) => {
      this.singleCampaignData.cause_category = res.cause_category;
      this.singleCampaignData.account_no = res.account_no;
      this.singleCampaignData.bank_name = res.bank_name;
      this.singleCampaignData.bannerImage = this.serverUrl+"/assets/campagin_banner/"+ res.bannerImage;
      this.singleCampaignData.beneficiary_name = res.beneficiary_name;
      this.singleCampaignData.campaignId = res.campaignId;
      this.singleCampaignData.campaignerId = res.campaignerId;
      this.singleCampaignData.conditionUpdate = res.conditionUpdate;
      this.singleCampaignData.description = res.description;
      this.singleCampaignData.ifsc_code = res.ifsc_code;
      this.singleCampaignData.patient_email = res.patient_email;
      this.singleCampaignData.patient_name = res.patient_name;
      this.singleCampaignData.patient_number = res.patient_number;
      this.singleCampaignData.required_amount = res.required_amount;
      this.singleCampaignData.desease = res.cause_category;
      this.singleCampaignData.updatedPatientImages = "assets/images_of_campagin/" + res.updatedPatientImages;
      this.description = res.description;
      this.bannerImage = AppConstants.IMAGE_BASE_URL + "assets/campagin_banner/" + res.bannerImage;
      if (res.type == "admin") {
        this.isUrgent = true;
        this.isUnverified = false;
        this.isVerified = true;
        this.isUrgent = true;
      }
      if (res.planPrice == 8) {
        this.isTaxBenifit = true;
        this.isUrgent = true;
      }
      if (res.verifyAccountDetails == 1 && res.verifyHospitalDetails == 1 && res.verifyBannerImage == 1 && res.verifyCampaignImage == 1 && res.verifyMedicalDocument == 1  && res.verifyStory == 1 && res.verifyPatient == 1) {
        this.isUnverified = false;
        this.isVerified = true;
      }
    })

    this.service.getPatientImages(this.id).subscribe((res: any) => {
      this.patientImages = res;
    })
    this.service.getMedicalImages(this.id).subscribe((res: any) => {
      this.medicalDocument = res;
    })
    this.service.getListOfDonorOnSingleCampaign(this.id).subscribe((res: any) => {
      this.listOdDonor = res;


      for (let i = 0; i < this.listOdDonor.length; i++) {
        for (let j = 0; j < this.listOdDonor.length; j++) {
          if (this.listOdDonor[i] < this.listOdDonor[j]) {
            this.topAmount = this.listOdDonor[i];
            this.listOdDonor[i] = this.listOdDonor[j];
            this.listOdDonor[j] = this.topAmount;            
          }
          console.log(this.listOdDonor[i].amount);
          
        }
      }
      this.topAmount.amount = this.listOdDonor[this.listOdDonor.length-1].amount;
      this.topAmount.name = this.listOdDonor[this.listOdDonor.length-1].donorName;      
    })
  }
  openDonationForm() {
    this.dialog.open(CampaignDonatePageComponent, 
      { disableClose: true ,
      data:this.id}), {
    }
  }

  onClickShare() {
    // this.dialog.open(SharebtnComponentComponent, { disableClose: true }), {
    //   width: "50vw",
    //   height: "70vh",
    // }
  }
}
