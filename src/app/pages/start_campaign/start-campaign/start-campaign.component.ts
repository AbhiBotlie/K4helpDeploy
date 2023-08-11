import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MsgPopUpComponent } from '../msg-pop-up/msg-pop-up.component';
import { IncorrectotpComponent } from '../incorrectotp/incorrectotp.component';
import { ExpiredotpComponent } from '../expiredotp/expiredotp.component';
import { InvalidemailComponent } from '../invalidemail/invalidemail.component';
import { WelcometodashboardComponent } from '../welcometodashboard/welcometodashboard.component';
import { OtpfilledpopupComponent } from '../otpfilledpopup/otpfilledpopup.component';
import { LoaderComponent } from 'src/app/loader/loader.component';
import { NewuserotpfillComponent } from '../newuserotpfill/newuserotpfill.component';
import { __values } from 'tslib';
import { TermAndConditionComponent } from 'src/app/term-and-condition/term-and-condition.component';
@Component({
  selector: 'app-start-campaign',
  templateUrl: './start-campaign.component.html',
  styleUrls: ['./start-campaign.component.css']
})
export class StartCampaignComponent implements OnInit {

  isTrue = false;
  movingText: any;
  userForm!: FormGroup;
  FormGroup: any;
  campaignerPhoneNumber: any;
  selectedType: any;
  user_type = new Array<any>();
  deseases = new Array<any>();
  isOtpDivVisible: boolean = false;
  isStartCampaignDivVisisble = true;
  otpButtonText = "Send OTP";
  isSendOtpBtnDisabled = false;
  flowType = "";
  isVisible = false;
  otpButton = false;
  message: any;
  campaignerId: any;
  keyPress(event: any) {
    Validators.pattern(/^[6-9]\d{9}$/)
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  restrictZero(event: any) {
    if (event.target.value.length === 0 && event.key === "0") {
      event.preventDefault();
    }
  }
  letterOnly(event: { which: any; keyCode: any; }): Boolean {
    var k;
    k = event.keyCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32);
  }

  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  constructor(private api: ApiService, private activateRouter: ActivatedRoute, private router: Router, private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {    
    let formname = "Start Campagin"
    this.api.getAllDropdownList().subscribe((response: any) => {
      this.user_type = response;
    });

    this.api.getMovingTextFormSIngleForm(formname).subscribe((res: any) => {
      this.movingText = res.text;
    })

    this.userForm = new FormGroup({
      user_type: new FormControl('', [Validators.required]),
      campaigner_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(/[(\[a-za-zA-Z0-9\])\\1{2,}\\[~`!@#$%^&()_={}[\]:;,.<>+\/?-]/)]),
      campaignerEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?")]),
      campaignerNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^((\\+91-?)|0_%+-)?[6,7,8,9][0-9]{0,9}$")]),
      term_conditions: new FormControl('',)
    });
  }

  public myError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  get userType() {
    return this.userForm.get('user_type');
  }

  get campaignerName() {
    return this.userForm.get('campaigner_name');
  }

  get campaignerEmail() {
    return this.userForm.get('campaignerEmail');
  }

  get campaignerNumber() {
    return this.userForm.get('campaignerNumber');
  }

  get otp() {
    return this.userForm.get('otp');
  }

  get termConditions() {
    return this.userForm.get('term_conditions');
  }
  sendOTP() {
    this.dialog.open(LoaderComponent);
    localStorage.setItem('campaginerdetails', JSON.stringify(this.userForm.getRawValue()))
    this.campaignerPhoneNumber = this.userForm.get('campaignerNumber')?.value;
    this.api.postOtpSend(this.userForm.getRawValue()).subscribe((response: any) => {
      this.dialog.closeAll();
      if (response.statusCode == AppConstants.NEW_USER_SUCESS_CODE_0) {
        let dialogRef = this.dialog.open(MsgPopUpComponent, { disableClose: true });
        dialogRef.afterClosed().subscribe(result => {
          this.dialog.open(OtpfilledpopupComponent, {
            width: '25%',
            height: '25vh',
            disableClose: true,
            data: {
              "flowType": "FORM_DATA"
            }
          }).afterClosed().subscribe(res => {
            console.log(res.data);

            this.otpButtonText = res.data;
            this.isSendOtpBtnDisabled = false;
            if (res.data == "Send OTP") {
              this.isSendOtpBtnDisabled = true;
            }
            res.url;
          })
        });
      }
      if (response.statusCode == AppConstants.USER_VERIFICATION_SUCESS_CODE_1) {
        this.dialog.open(OtpfilledpopupComponent, {
          disableClose: true,
          data: {
            "flowType": "DASHBOARD",
            "selectedType": this.selectedType,
          }
        }).afterClosed().subscribe(res => {
          this.otpButtonText = res.data;
          this.isSendOtpBtnDisabled = false;
          if (res.data == "Resend Otp") {
            this.isSendOtpBtnDisabled = false;
          }
        })
        this.disableEmailAndMobileNumber();
      } else if (response.statusCode == AppConstants.USER_DETAILS_INCORRECT_CODE_2) {
        let dialogRef = this.dialog.open(InvalidemailComponent, {
          disableClose: true,
          width: '23%',
          height: '19vh',
          data: {
            "message": response.message,
          }
        })
      }
    })
  }

  openTermAndCondition() {
    this.dialog.open(TermAndConditionComponent,
      {
        disableClose: true
      }
    );
  }

  disableEmailAndMobileNumber() {
    this.userForm.controls['campaignerEmail'].disable()
    this.userForm.controls['campaignerNumber'].disable()
    this.userForm.controls['user_type'].disable()
  }

  onChange(event: any) {
    this.selectedType = event.value;

  }
  onSubmit(userForm: FormGroup) {
    this.api.validateOTP(this.userForm.value).subscribe((response: any) => {
      if (response.statusCode == "0") {
        window.alert(response.message)
      } else if (response.statusCode == "1") {
        window.alert(response.message)
      } else {
        window.alert(response.message)
      }
    })
  }

  startNextClick(event: any, userForm: FormGroup) {
    this.campaignerId = sessionStorage.getItem('campaignerId');
    var termAndCondition = {
      "term_conditions": "true"
    }
    this.api.updateTermAndCondition(this.campaignerId, termAndCondition).subscribe((res: any) => {
    })
    this.router.navigate(['/startCampaign/individualCampaign']);
    // var dataofform = JSON.parse(localStorage.getItem('newuserotpdetails') || '{}');
    // dataofform.value = this.userForm.value
    // this.api.validateOTP(dataofform).subscribe((response: any) => {
    //   console.log(response);

    //   localStorage.setItem('campaignerId', JSON.stringify(response.campaignerId));
    //   if (response.statusCode == AppConstants.OTP_SUCESS_CODE_0) {
    //     if (this.flowType == "FORM_DATA") {
    //       this.api.userTypesForm(dataofform).subscribe((response: any) => {
    //         console.log(response);

    //         localStorage.setItem('campaignerId', JSON.stringify(response.campaignerId))

    //         this.router.navigate(['/startCampaign/individualCampaign']);

    // else if (this.selectedType === "NGO" && response.user_type == "NGO") {
    //   this.router.navigate(['/startCampaign/individualCampaign']);

    // }
    // else if (this.selectedType === "Social Activist" && response.user_type == "Social Activist") {
    //   this.router.navigate(['/startCampaign/individualCampaign']);

    // }
    //       })
    //     } else if (this.flowType = "DASHBOARD") {
    //       this.api.userTypesForm(this.userForm.getRawValue()).subscribe((response: any) => {

    //         if (this.selectedType == "Individual" && response.user_type == "Individual") {
    //           {
    //             this.dialog.open(WelcometodashboardComponent, {
    //               width: '20%',
    //               height: '13vh',
    //             })
    //           }
    //           this.router.navigate(['/individualdashboard/individualprofile']);
    //         }
    //         else if (this.selectedType === "NGO" && response.user_type == "NGO") {

    //           this.router.navigate(['/individualdashboard/individualprofile']);

    //         }
    //         else if (this.selectedType === "Social Activist" && response.user_type == "Social Activist") {
    //           this.router.navigate(['/individualdashboard/individualprofile']);

    //         } else {
    //           window.alert("Please select a valid user type to proceed!")
    //         }
    //       })
    //     }
    //   } else if (response.statusCode == AppConstants.OTP_INCORRECT_CODE_1) {
    //     this.dialog.open(IncorrectotpComponent, {
    //       width: '20%',
    //       height: '13vh',
    //     })
    //     this.otpButtonText = "Resend OTP"
    //     this.isSendOtpBtnDisabled = false;
    //   } else if (response.statusCode == AppConstants.OTP_EXPIRED_CODE_2) {
    //     this.dialog.open(ExpiredotpComponent, {
    //       width: '20%',
    //       height: '18vh',
    //     })
    //     this.otpButtonText = "Resend OTP"
    //     this.isSendOtpBtnDisabled = false;
    //   }
    // })
  }

}


