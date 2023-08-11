import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';
import { ExpiredotpComponent } from '../expiredotp/expiredotp.component';
import { IncorrectotpComponent } from '../incorrectotp/incorrectotp.component';
import { WrongUsertypePopupComponent } from '../wrong-usertype-popup/wrong-usertype-popup.component';

@Component({
  selector: 'app-otpfilledpopup',
  templateUrl: './otpfilledpopup.component.html',
  styleUrls: ['./otpfilledpopup.component.css']
})
export class OtpfilledpopupComponent implements OnInit {
  otpForm: any;
  flowType = "";
  selectedType: any;
  userForm: any;
  isSendOtpBtnDisabled = true;
  isOtpDivVisible: boolean = false;
  otpButtonText = "Send OTP";




  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('charCode restricted is: ' + charCode);

      return false;
    }

    return true;
  }

  constructor(private api: ApiService, private dialog: MatDialog, private router: Router
    , @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<OtpfilledpopupComponent>) {
    this.flowType = data.flowType;
    this.selectedType = data.selectedType;
  }

  ngOnInit(): void {
    this.otpForm = new FormGroup({
      otp: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])),
    });
  }
  public myError = (controlName: string, errorName: string) => {
    return this.otpForm.controls[controlName].hasError(errorName);
  }

  verify(event: any, otpForm: FormGroup) {
    var dataofform = JSON.parse(localStorage.getItem('campaginerdetails') || '{}');
    dataofform.otp = this.otpForm.value.otp;
    this.api.validateOTP(dataofform).subscribe((response: any) => {
      if (response.statusCode == AppConstants.OTP_SUCESS_CODE_0) {
        if (this.flowType == "FORM_DATA") {
          this.api.userTypesForm(dataofform).subscribe((response: any) => {
            sessionStorage.setItem('campaignerId', JSON.stringify(response.campaignerId));             
          })
          this.dialogRef.close({ url: this.router.navigate(['/startCampaign']), data:'Send OTP'});
        } else
          if (this.flowType == "DASHBOARD") {
            this.api.getCampaignerDetailsByNumber(dataofform.campaignerNumber).subscribe((res: any) => {
              if (this.selectedType == res.user_type) {
                this.dialogRef.close({ url: this.router.navigate(['/individualdashboard/individualprofile'])});              
                sessionStorage.setItem('campaignerId', JSON.stringify(res.campaignerId));
              } else {
                this.dialog.open(WrongUsertypePopupComponent, {
                  width: '30%',
                  height: '25vh',
                })
              }
            })
          }
      }
      else if (response.statusCode == AppConstants.OTP_INCORRECT_CODE_1) {
        this.dialog.open(IncorrectotpComponent, {
          width: '20%',
          height: '15vh',
          disableClose: true,
          data:{msg:response.message}
        }).afterClosed().subscribe(res => {                   
          this.dialogRef.close({ data: res.data });
        })
      } else if (response.statusCode == AppConstants.OTP_EXPIRED_CODE_2) {
        this.dialog.open(ExpiredotpComponent, {
          width: '20%',
          height: '15vh',
        }).afterClosed().subscribe(res => {
          this.dialogRef.close({ data: res.data });
        })
      }
    })
  }
}















