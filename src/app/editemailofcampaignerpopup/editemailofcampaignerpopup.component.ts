import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatError } from '@angular/material/form-field';
import { isEmpty } from 'rxjs';
import { AppConstants } from 'src/AppConstants';
import { PopUpForMessages } from '../pop-up-for-messages/pop-up-for-messages';
import { OTPCorrectComponent } from '../otpcorrect/otpcorrect.component';
import { ExpiredotpComponent } from '../pages/start_campaign/expiredotp/expiredotp.component';
import { IncorrectotpComponent } from '../pages/start_campaign/incorrectotp/incorrectotp.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-editemailofcampaignerpopup',
  templateUrl: './editemailofcampaignerpopup.component.html',
  styleUrls: ['./editemailofcampaignerpopup.component.css']
})
export class EditemailofcampaignerpopupComponent implements OnInit {
  editEmail!: FormGroup;
  campaignerIdNo: any;
  campaignerData: any;
  campaignerDetails: any;
  response: any;
  campaignerIdFromStorage: any;
  showOtpField = false;
  imageBaseUrl:any;
  isOtpButtonDisabled = true;
  constructor(private service: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.imageBaseUrl= AppConstants.IMAGE_BASE_URL;
    this.campaignerIdFromStorage = sessionStorage.getItem('campaignerId');
    this.campaignerData = JSON.parse(localStorage.getItem('campaginerdetails') || '{}');
    this.service.getCampaignerDetails(this.campaignerIdFromStorage).subscribe((res: any) => {
      this.editEmail.get('campaignerEmail')?.setValue(res.campaignerEmail);
    })
    this.editEmail = new FormGroup({
      campaignerEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?")]),
      campaignerId: new FormControl(this.campaignerIdFromStorage, Validators.required),
      otp: new FormControl("", Validators.required),
    })


  }
  getOTP() {
    if(this.editEmail.get("campaignerEmail")?.value===""){
      alert("please fill email id")
    }else{
    this.isOtpButtonDisabled = false;
    this.service.updateEmailIdOfCampaigner(this.editEmail.value).subscribe((res: any) => {
      if (res.statusCode == AppConstants.EMAIL_EXISTING_CODE_0) {
        this.dialog.open(PopUpForMessages, {
          width: '500px',
          height: '300px'
        })
      }
      else {
        this.showOtpField = true;

      }
    })
  }
}
  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onSubmit() {
    this.service.verifyUpdatedEmailOfCamapigner(this.editEmail.value).subscribe((res: any) => {
      if (res.statusCode == AppConstants.OTP_SUCESS_CODE_0) {
        this.dialog.open(OTPCorrectComponent, {
          width: '500px',
          height: '400px'
        })
      }
      else if (res.statusCode == AppConstants.OTP_INCORRECT_CODE_1) {
        this.dialog.open(IncorrectotpComponent, {
          width: '500px',
          height: '400px'
        })
      }
      else if (res.statusCode == AppConstants.OTP_EXPIRED_CODE_2) {
        this.dialog.open(ExpiredotpComponent, {
          width: '500px',
          height: '400px'
        })
      }
    })
  }
}
