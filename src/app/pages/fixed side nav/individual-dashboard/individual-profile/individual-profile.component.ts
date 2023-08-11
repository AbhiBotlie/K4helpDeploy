import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';
import { DashboardService } from '../../dashboard.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditemailofcampaignerpopupComponent } from 'src/app/editemailofcampaignerpopup/editemailofcampaignerpopup.component';
import { EditPhoneNumberOfCampaignerPopUpComponent } from 'src/app/edit-phone-number-of-campaigner-pop-up/edit-phone-number-of-campaigner-pop-up.component';
@Component({
  selector: 'app-individual-profile',
  templateUrl: './individual-profile.component.html',
  styleUrls: ['./individual-profile.component.css']
})
export class IndividualProfileComponent implements OnInit {

  dataSource: any;
  imageee="https://cdn001.tintin.com/public/tintin/img/shared/header/logo-tintin-240.png"
  openBanner!: boolean;
  openAccountDetails!: boolean;
  benificaryDetail!: boolean;
  fundTargets!: boolean;
  openSocialMediaPage!: boolean;
  campaignerData: any;
  camapigner_email: any;
  campaigner_name: string = "";
  campaigner_phone: any;
  camapignerForm!: FormGroup;
  campaignerIdno: any;
  campaignerNumberval: any;
  campaignerEmailval: any;
  campaignerdob: any;
  campaigneradhar: any;
  campaignerPan: any;
  campaignerFacebook: any;
  campaigner_Instagram: any;
  campaignerLinkedin: any;
  address: any;
  city: any;
  state: any;
  country: any;
  pincode: any;
  isShowProfilleVisible = true;
  isEditFormVisible = false;
  campaignerDataOfProfile: any;
  image: any;
  campaignerId:any;
  constructor(private route: ActivatedRoute, private router: Router, private dashboard: DashboardService, private service: ApiService,
    private dialog: MatDialog) {
  }
  ngOnInit(): void {
    
    this.campaignerId= sessionStorage.getItem('campaignerId');
    var campaignerData = JSON.parse(localStorage.getItem('campaginerdetails') || '{}')
    this.campaignerData = campaignerData.value;
    this.campaigner_phone = campaignerData.campaignerNumber;
    this.campaignerIdno = campaignerData.campaignerId;

    
    this.service.getCampaignerDetails(this.campaignerId).subscribe((response: any) => {
      if (response.user_type === "Individual") {
        this.camapignerForm.get("campaigner_name")?.setValue(response.campaigner_name);
        this.camapignerForm.get("campaignerEmail")?.setValue(response.campaignerEmail);
        this.camapignerForm.get("campaignerNumber")?.setValue(response.campaignerNumber);
        this.camapignerForm.get("campaignerAadharNo")?.setValue(response.campaignerAadharNo);
        this.camapignerForm.get("campaignerPanNo")?.setValue(response.campaignerPanNo);
        this.camapignerForm.get("campaignerDob")?.setValue(response.campaignerDob);
        this.camapignerForm.get("campaignerId")?.setValue(response.campaignerId);
        this.camapignerForm.get("campaignerLinkedIn")?.setValue(response.campaignerLinkedIn);
        this.camapignerForm.get("campaignerFacebook")?.setValue(response.campaignerFacebook);
        this.camapignerForm.get("campaignerInstagram")?.setValue(response.campaignerInstagram);
      }
      this.campaignerDataOfProfile = response;
      this.campaignerIdno = response.campaignerId;
      this.campaigner_name = response.campaigner_name;
      this.campaignerNumberval = response.campaignerNumber;
      this.camapigner_email = response.campaignerEmail;
      this.campaignerdob = response.campaignerDob;
      this.campaigneradhar = response.campaignerAadharNo;
      this.campaignerPan = response.campaignerPanNo;
      this.campaignerLinkedin = response.campaignerLinkedIn;
      this.campaignerFacebook = response.campaignerFacebook;
      this.campaigner_Instagram = response.campaignerInstagram;
      this.image = AppConstants.IMAGE_BASE_URL +"/assets/campaigner_images/"+ response.campaignerProfilePhoto;
      this.address = response.address;
      this.state = response.state;
      this.city = response.city;
      this.country = response.country;
      this.pincode = response.pincode;
    })
    this.camapignerForm = new FormGroup({
      campaigner_name: new FormControl("", Validators.required),
      campaignerEmail: new FormControl("", Validators.required),
      campaignerNumber: new FormControl("", Validators.required),
      campaignerDob: new FormControl("", Validators.required),
      campaignerAadharNo: new FormControl("", Validators.required),
      campaignerPanNo: new FormControl("", Validators.required),
      campaignerId: new FormControl("", Validators.required),
      campaignerFacebook: new FormControl("", Validators.required),
      campaignerLinkedIn: new FormControl("", Validators.required),
      campaignerInstagram: new FormControl("", Validators.required),
      campaignerProfilePic: new FormControl("", Validators.required),
    })



  }


  onClickBannerDetails() {
    if (this.openBanner != true) {
      this.openBanner = true;
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.openSocialMediaPage = false;
    }
    else {
      this.openBanner = false;
    }
  }
  onClickOpenAccountDetail() {
    if (this.openAccountDetails != true) {
      this.openBanner = false;
      this.openAccountDetails = true;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.openSocialMediaPage = false;
    }
    else {
      this.openAccountDetails = false;
    }
  }

  changeForm() {
    this.isShowProfilleVisible = true;
    this.router.navigate(['individualdashboard/profile']);
  }
  onSelectedProgilePic(event: any) {
    alert("event.target.files");
    if (event.target.files.length > 0) {
      const file = (event.target.files[0] as File)
      this.camapignerForm.get('campaignerProfilePic')?.setValue(file);
    }
  }

  onSubmit() {

    const formData = new FormData();

    formData.append("campaigner_name", this.camapignerForm.get("campaigner_name")?.value);
    console.log("first name" + this.camapignerForm.get("campaigner_name")?.value);

    formData.append("campaignerEmail", this.camapignerForm.get("campaignerEmail")?.value);
    console.log("second value " + this.camapignerForm.get("campaignerEmail")?.value);

    formData.append("campaignerNumber", this.camapignerForm.get("campaignerNumber")?.value);
    formData.append("campaignerAadharNo", this.camapignerForm.get("campaignerAadharNo")?.value);
    formData.append("campaignerPanNo", this.camapignerForm.get("campaignerPanNo")?.value);
    formData.append("campaignerDob", this.camapignerForm.get("campaignerDob")?.value);
    formData.append("campaignerId", this.camapignerForm.get("campaignerId")?.value);
    formData.append("campaignerLinkedIn", this.camapignerForm.get("campaignerLinkedIn")?.value);
    formData.append("campaignerFacebook", this.camapignerForm.get("campaignerFacebook")?.value);
    formData.append("campaignerInstagram", this.camapignerForm.get("campaignerInstagram")?.value);
    formData.append("campaignerProfilePic", this.camapignerForm.get("campaignerProfilePic")?.value);
    console.log(this.camapignerForm.get("campaignerProfilePic")?.value);

    console.log("meri value  " + formData);

    console.log("dusri  value  " + this.campaignerIdno);


    this.service.updateCampaignerData(this.campaignerIdno, formData).subscribe((res) => {
      console.log(res);
      window.location.reload;
    })
    this.service.getCampaignerDetailsById(this.campaignerIdno).subscribe((response: any) => {
      if (response.user_type === "Individual") {
        this.camapignerForm.get("campaigner_name")?.setValue(response.campaigner_name);
        this.camapignerForm.get("campaignerEmail")?.setValue(response.campaignerEmail);
        this.camapignerForm.get("campaignerNumber")?.setValue(response.campaignerNumber);
        this.camapignerForm.get("campaignerAadharNo")?.setValue(response.campaignerAadharNo);
        this.camapignerForm.get("campaignerPanNo")?.setValue(response.campaignerPanNo);
        this.camapignerForm.get("campaignerDob")?.setValue(response.campaignerDob);
        this.camapignerForm.get("campaignerId")?.setValue(response.campaignerId);
        this.camapignerForm.get("campaignerLinkedIn")?.setValue(response.campaignerLinkedIn);
        this.camapignerForm.get("campaignerFacebook")?.setValue(response.campaignerFacebook);
        this.camapignerForm.get("campaignerInstagram")?.setValue(response.campaignerInstagram);
      }
      this.campaignerIdno = response.campaignerId;
      this.campaigner_name = response.campaigner_name;
      this.campaignerNumberval = response.campaignerNumber;
      this.camapigner_email = response.campaignerEmail;
      this.campaignerdob = response.campaignerDob;
      this.campaigneradhar = response.campaignerAadharNo;
      this.campaignerPan = response.campaignerPanNo;
      this.campaignerLinkedin = response.campaignerLinkedIn;
      this.campaignerFacebook = response.campaignerFacebook;
      this.campaigner_Instagram = response.campaignerInstagram;
      this.image = AppConstants.CAMPAIGNER_PROFILE_PHOTO + response.campaignerProfilePhoto;
      alert("Updated")
      this.isEditFormVisible = false;
      this.isShowProfilleVisible = true;
    })
  }

  onClickBenioficaryDetail() {
    if (this.benificaryDetail != true) {
      this.openBanner = false;
      this.openAccountDetails = false;
      this.benificaryDetail = true;
      this.fundTargets = false;
      this.openSocialMediaPage = false;
    }
    else {
      this.benificaryDetail = false;
    }
  }

  fundTarget() {
    if (this.fundTargets != true) {
      this.openBanner = false;
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = true;
      this.openSocialMediaPage = false;
    }
    else {
      this.fundTargets = false;
    }
  }
  onClickOpenSocialMedia() {
    if (this.openSocialMediaPage != true) {
      this.openBanner = false;
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.openSocialMediaPage = true;
    }
    else {
      this.openSocialMediaPage = false;
    }
  }

  editEmailId() {
    //this.api
    this.dialog.open(EditemailofcampaignerpopupComponent, {disableClose:true,
      width: "500px", height: "300px"
    })
  }

  editPhoneNumber() {
    this.dialog.open(EditPhoneNumberOfCampaignerPopUpComponent, {disableClose:true,
      width: "500px", height: "300px"
    }).afterClosed().subscribe((res: any) => {
    })
  }

  onClicked() {
    this.router.navigate(["/startCampaign/individualCampaign"], { relativeTo: this.route })
  }
}
