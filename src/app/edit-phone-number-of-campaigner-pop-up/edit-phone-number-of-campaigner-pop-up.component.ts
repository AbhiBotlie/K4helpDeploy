import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppConstants } from 'src/AppConstants';
import { NumberAlreadyExistsComponent } from '../number-already-exists/number-already-exists.component';
import { OTPCorrectComponent } from '../otpcorrect/otpcorrect.component';
import { IncorrectotpComponent } from '../pages/start_campaign/incorrectotp/incorrectotp.component';
import { WrongUsertypePopupComponent } from '../pages/start_campaign/wrong-usertype-popup/wrong-usertype-popup.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-edit-phone-number-of-campaigner-pop-up',
  templateUrl: './edit-phone-number-of-campaigner-pop-up.component.html',
  styleUrls: ['./edit-phone-number-of-campaigner-pop-up.component.css']
})
export class EditPhoneNumberOfCampaignerPopUpComponent implements OnInit {

  editPhoneNumber!: FormGroup;
  campaignerIdFromStorage: any;
  campaignerIdNo: any;
  campaignerData: any;
  campaignerDetails: any;
  response: any;
  showOtpField = false;
  imageBaseUrl: any;
  constructor(private service: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.imageBaseUrl = AppConstants.IMAGE_BASE_URL;
    this.campaignerIdNo = sessionStorage.getItem('campaignerId');
    this.campaignerData = JSON.parse(localStorage.getItem('campaginerdetails') || '{}');
    this.service.getCampaignerDetails(this.campaignerIdNo).subscribe((res: any) => {
      this.editPhoneNumber.get('campaignerNumber')?.setValue(res.campaignerNumber);
    })

    this.editPhoneNumber = new FormGroup({
      campaignerNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^((\\+91-?)|0_%+-)?[6,7,8,9][0-9]{0,9}$")]),
      campaignerId: new FormControl(this.campaignerIdNo, Validators.required),
      otp: new FormControl("", Validators.required),
    })
  }

  sendOTP() {
    if (this.editPhoneNumber.get("campaignerNumber")?.value === "") {
      alert("please fill phone number")
    } else {
      this.service.sendOtpToPhone(this.editPhoneNumber.value).subscribe((res: any) => {
        if (res.statusCode == AppConstants.NUMBER_EXISTING_CODE_1) {
          this.dialog.open(NumberAlreadyExistsComponent, {
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
    this.service.verifyUpdatedPhoneNumberOfCamapigner(this.editPhoneNumber.value).subscribe((res: any) => {
      if (res.statusCode == AppConstants.NUMBER_EXISTING_CODE_0) {
        this.dialog.open(OTPCorrectComponent, {
          width: '500px',
          height: '300px'
        })
        // this.dialog.(EditPhoneNumberOfCampaignerPopUpComponent);
      }
      else if (res.statusCode == AppConstants.OTP_INCORRECT_CODE_1) {
        this.dialog.open(IncorrectotpComponent, {
          width: '500px',
          height: '300px'
        })
      }
      else if (res.statusCode == AppConstants.OTP_SUCESS_CODE_0) {
        this.dialog.open(IncorrectotpComponent, {
          width: '500px',
          height: '300px'
        })
      }
      else if (res.statusCode == AppConstants.OTP_SUCESS_CODE_0) {
        this.dialog.open(IncorrectotpComponent, {
          width: '500px',
          height: '300px'
        })
      }
    })
  }

}



