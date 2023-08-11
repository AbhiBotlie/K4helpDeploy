import { Component, OnInit,Inject} from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../../../AppConstants';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-home-dialog',
  templateUrl: './home-dialog.component.html',
  styleUrls: ['./home-dialog.component.css']
})
export class HomeDialogComponent implements OnInit {
  imageBaseUrl:any;
 
    constructor(private api: ApiService, private activateRouter: ActivatedRoute, private router: Router, public dialogRef: MatDialogRef<HomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
        dialogRef.disableClose = true;
     }
  
  
     onNoClick(): void {
      this.dialogRef.close();
    }

    selected = 'option2';


  ngOnInit(): void {
    this.imageBaseUrl= AppConstants.IMAGE_BASE_URL;
    this.api.getAllDropdownList().subscribe((response: any) => {
      this.user_type = response;
    });
    this.api.getPurposeDropdownList().subscribe((response: any) => {
      this.deseases = response;
    });
    this.userForm = new FormGroup({
      user_type: new FormControl('', [Validators.required]),
      campaigner_name: new FormControl('', [Validators.required, Validators.pattern(/[(\[a-zA-Z0-9\])\\1{2,}]/)]),
      campaignerEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      campaignerNumber: new FormControl("", [Validators.required, Validators.minLength(10), Validators.pattern("^((\\+91-?)|0_%+-)?[6,7,8,9][0-9]{0,9}$")]),
      otp: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])),
      term_conditions: new FormControl(false, [Validators.required]),
      disease: new FormControl("", ([Validators.required]))
    });
  }

  userForm!: FormGroup;
  selectedType: any;
  user_type = new Array<any>();
  deseases = new Array<any>();
  isOtpDivVisible: boolean = false;
  isStartCampaignDivVisisble = true;
  otpButtonText = "Send OTP";
  isSendOtpBtnDisabled = false;
  flowType = "";
 
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
    console.log(event)
  }
  letterOnly(event: { which: any; keyCode: any; }): Boolean {
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)
      return false;
    return true;
  }
  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('charCode restricted is: ' + charCode);

      return false;
    }

    return true;
  }

  public myError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  onSubmit(userForm: FormGroup) {
    console.log(userForm.value);
    this.api.validateOTP(this.userForm.value).subscribe((response: any) => {
      console.log(response)
      if (response.statusCode == "0") {
        window.alert(response.message)
      } else if (response.statusCode == "1") {
        window.alert(response.message)
      } else {
        window.alert(response.message)
      }
    })
  }


  sendOTP() {
    console.log("send-otp :" + this.userForm.getRawValue());
    this.api.postOtpSend(this.userForm.getRawValue()).subscribe((response: any) => {
      console.log(response)
      if (response.statusCode == AppConstants.NEW_USER_SUCESS_CODE_0) {
        window.alert(response.message)
        this.isOtpDivVisible = true;
        this.isSendOtpBtnDisabled = true;
        this.disableEmailAndMobileNumber();
        this.flowType = "FORM_DATA"
      } else if (response.statusCode == AppConstants.USER_VERIFICATION_SUCESS_CODE_1) {
        window.alert(response.message)
        this.isOtpDivVisible = true;
        this.isSendOtpBtnDisabled = true;
        this.disableEmailAndMobileNumber();
        this.flowType = "DASHBOARD"
      } else if (response.statusCode == AppConstants.USER_DETAILS_INCORRECT_CODE_2) {
        window.alert(response.message)
        this.flowType = ""
      }
    })
  }

  disableEmailAndMobileNumber() {
    this.userForm.controls['campaignerEmail'].disable()
    this.userForm.controls['campaignerNumber'].disable()
  }

  onChange(event: any) {
    this.selectedType = event.value;

  }

  startNextClick(event: any, userForm: FormGroup) {
    console.log(userForm.getRawValue());
    this.api.validateOTP(this.userForm.getRawValue()).subscribe((response: any) => {
      console.log(response)
      if (response.statusCode == AppConstants.OTP_SUCESS_CODE_0) {
        window.alert(response.message)
        if (this.flowType == "FORM_DATA") {
          this.api.userTypesForm(this.userForm.getRawValue()).subscribe((response: any) => {
            console.log(response)
            if (this.selectedType == "Individual" && response.user_type  == "Individual") {
              this.router.navigate(['/startCampaign/individualCampaign']);
            }
            else if (this.selectedType === "NGO" && response.user_type  == "NGO") {
              this.router.navigate(['/startCampaign/ngoCampaign']);

            }
            else if (this.selectedType === "Social Activist" && response.user_type  == "Social Activist") {
              this.router.navigate(['/startCampaign/socialActivistCampaign']);

            }
          })
        } else if (this.flowType = "DASHBOARD") {
          this.api.userTypesForm(this.userForm.getRawValue()).subscribe((response: any) => {
            console.log(response)
            if (this.selectedType == "Individual" && response.user_type  == "Individual") {
              this.router.navigate(['/individualdashboard']);
            }
            else if (this.selectedType === "NGO" && response.user_type  == "NGO") {
              this.router.navigate(['/ngodashboard']);

            }
            else if (this.selectedType === "Social Activist" && response.user_type  == "Social Activist") {
              this.router.navigate(['/socialactivistdashboard']);

            }else{
              window.alert("Please select a valid user type to proceed!")
            }
          })
        }
      } else if (response.statusCode == AppConstants.OTP_INCORRECT_CODE_1) {
        window.alert(response.message)
      } else if (response.statusCode == AppConstants.OTP_EXPIRED_CODE_2) {
        window.alert(response.message)
        this.otpButtonText = "Resend OTP"
        this.isSendOtpBtnDisabled = false;
      }
    })
  }
}