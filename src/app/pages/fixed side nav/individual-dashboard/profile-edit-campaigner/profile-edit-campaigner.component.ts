import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';

@Component({
  selector: 'app-profile-edit-campaigner',
  templateUrl: './profile-edit-campaigner.component.html',
  styleUrls: ['./profile-edit-campaigner.component.css']
})
export class ProfileEditCampaignerComponent implements OnInit {
  maxDate = new Date();
  dataSource: any; 
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
  campaignerDataOfProfile: any;
  isShowProfilleVisible = true;
  isEditFormVisible = false;
  adharImage:any;
  panImage:any;
  image: any;
  
  constructor(public service: ApiService, public router: Router) { }
  ngOnInit(): void {

    this.campaignerIdno = sessionStorage.getItem('campaignerId');
    console.log(this.campaignerIdno);
    this.service.getCampaignerDetails(this.campaignerIdno).subscribe((response: any) => {
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
      this.camapignerForm.get("address")?.setValue(response.address);
      this.camapignerForm.get("state")?.setValue(response.state);
      this.camapignerForm.get("city")?.setValue(response.city);
      this.camapignerForm.get("country")?.setValue(response.country);
      this.camapignerForm.get("pincode")?.setValue(response.pincode);
      this.campaignerDataOfProfile = response.campaignerProfilePhoto;
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
      this.adharImage = AppConstants.CAMPAIGNER_ADHAR_IMAGE + response.campaignerAadharPicture;
      this.panImage = AppConstants.CAMPAIGNER_PAN_IMAGE + response.campaignerPanPicture;
      
    })
    this.camapignerForm = new FormGroup({
      campaigner_name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      campaignerEmail: new FormControl("", [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?")]),
      campaignerNumber: new FormControl("", ([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0_%+-)?[6,7,8,9][0-9]{0,9}$")])),
      campaignerDob: new FormControl("", [Validators.required]),
      campaignerAadharNo: new FormControl("", ([Validators.required, Validators.maxLength(12), Validators.minLength(12), Validators.pattern("")])),
      campaignerPanNo: new FormControl("", ([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      campaignerId: new FormControl("", (this.campaignerIdno, Validators.required)),
      campaignerFacebook: new FormControl("", ([Validators.required])),
      campaignerLinkedIn: new FormControl("", ([Validators.required])),
      campaignerInstagram: new FormControl("", ([Validators.required])),
      campaignerProfilePic: new FormControl("", ([Validators.required])),
      address: new FormControl("", ([Validators.required])),
      city: new FormControl("", ([Validators.required])),
      state: new FormControl("", ([Validators.required])),
      country: new FormControl("", ([Validators.required])),
      pincode: new FormControl("", ([Validators.required, Validators.minLength(6), Validators.maxLength(6),])),
      campaignerAadharPic: new FormControl("", ([Validators.required])),
      campaignerPancardPic: new FormControl("", ([Validators.required])),

    })

  }
  
  letterOnly(event: { which: any; keyCode: any; }): Boolean {
    var k;
    k = event.keyCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k==32);
  }

  OnlyDateAllowed(event: { which: any; keyCode: any; }): Boolean {
    var k;
    k = event.keyCode;
    return ((k > 46 && k < 58));
  }

  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  lettersAndNumber(event: { which: any; keyCode: any; }): Boolean {
    var k;  
    k = event.keyCode; 
    return((k > 64 && k < 91) || (k > 96 && k < 123) || ((k>47 && k<58))); 
  }
  onlyNumbers(event:{ which: any; keyCode: any; }): Boolean {
    var k=event.keyCode;
    return(((k>47 && k<58)));
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
    if (event.target.files.length > 0) {
      console.log(event.target.files[0] as File);

      const file = (event.target.files[0] as File)
      this.camapignerForm.get('campaignerProfilePic')?.setValue(file);
      const formData = new FormData();
      formData.append("campaignerProfilePic", this.camapignerForm.get("campaignerProfilePic")?.value);
      this.service.uploadProfileImage(this.campaignerIdno, formData).subscribe((res: any) => {
        console.log(res);
        this.image = AppConstants.CAMPAIGNER_PROFILE_PHOTO + res.campaignerProfilePhoto;

      })
    }
  }

  onSubmit() {
    const formData = new FormData();

    formData.append("campaigner_name", this.camapignerForm.get("campaigner_name")?.value);
    formData.append("campaignerEmail", this.camapignerForm.get("campaignerEmail")?.value);
    formData.append("campaignerNumber", this.camapignerForm.get("campaignerNumber")?.value);
    formData.append("campaignerAadharNo", this.camapignerForm.get("campaignerAadharNo")?.value);
    formData.append("campaignerPanNo", this.camapignerForm.get("campaignerPanNo")?.value);
    formData.append("campaignerDob", this.camapignerForm.get("campaignerDob")?.value);
    formData.append("campaignerId", this.camapignerForm.get("campaignerId")?.value);
    formData.append("campaignerLinkedIn", this.camapignerForm.get("campaignerLinkedIn")?.value);
    formData.append("campaignerFacebook", this.camapignerForm.get("campaignerFacebook")?.value);
    formData.append("campaignerInstagram", this.camapignerForm.get("campaignerInstagram")?.value);
    formData.append("address", this.camapignerForm.get("address")?.value);
    formData.append("city", this.camapignerForm.get("city")?.value);
    formData.append("state", this.camapignerForm.get("state")?.value);
    formData.append("country", this.camapignerForm.get("country")?.value);
    formData.append("pincode", this.camapignerForm.get("pincode")?.value);

    this.service.updateCampaignerData(this.campaignerIdno, formData).subscribe((res: any) => {
      console.log(res);
      this.image = AppConstants.CAMPAIGNER_PROFILE_PHOTO + res.campaignerProfilePhoto;
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
      this.adharImage = AppConstants.CAMPAIGNER_ADHAR_IMAGE + response.campaignerAadharPicture
      ;
      console.log(this.adharImage);
      
      this.panImage = AppConstants.CAMPAIGNER_PAN_IMAGE + response.campaignerPanPicture;
      alert("Updated")
      this.isEditFormVisible = false;
      this.isShowProfilleVisible = true;
      this.router.navigate(['individualdashboard/individualprofile'])
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
  onAdharSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = (event.target.files[0] as File);
      this.camapignerForm.get('campaignerAadharPic')?.setValue(file);
      const formData = new FormData();
      formData.append("campaignerAadharPic", this.camapignerForm.get("campaignerAadharPic")?.value);
      this.service.uploadCampaignerAdhar(this.campaignerIdno, formData).subscribe((res: any) => {
        console.log(res);

      })
    }
    alert("File uploaded successfully...");
  }

  onPanSelected(event: any) {
    if (event.target.files.length > 0) {
      const file1 = (event.target.files[0] as File)
      this.camapignerForm.get('campaignerPancardPic')?.setValue(file1);
      const formData = new FormData();
      formData.append("campaignerPancardPic", this.camapignerForm.get("campaignerPancardPic")?.value);
      this.service.uploadCampaignerPan(this.campaignerIdno, formData).subscribe((res: any) => {
        console.log(res);

      })
    }
    alert("File uploaded successfully...");
  }

  onClicked() {
    this.router.navigate(["/startCampaign/individualCampaign"]);
  }
}
