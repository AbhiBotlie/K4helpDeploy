import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;
  selectedType: any;
  user_type = new Array<any>();
  deseases = new Array<any>();
  isOtpDivVisible: boolean = false;
  isStartCampaignDivVisisble = true;
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
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)
      return false;
    return true;
  }

  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('campaignerId') == null) {
      this.userForm = new FormGroup({
        campaignerNumber: new FormControl("", [Validators.required, Validators.minLength(10), Validators.pattern("^((\\+91-?)|0_%+-)?[6,7,8,9][0-9]{0,9}$")]),
        otp: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])),
      });
    }else{
      this.router.navigate(['/individualdashboard/individualprofile'])
    }
  }
  public myError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  sendOTP() {
    this.api.postOtpSendForLogIn(this.userForm.get("campaignerNumber" + "")?.value).subscribe((response: any) => {
      if (response.statusCode == 0) {
        alert(response.message);
      }
      this.campaignerId = response.campaignerDetails.campaignerId;
      this.userForm.get("otp")?.setValue(response.campaignerDetails.otp);
      this.isOtpDivVisible = true;


    })


  }

  onSubmit() {
    this.api.campaignerLogIn(this.userForm.value).subscribe((res: any) => {
      if (res.statusCode == 1) {
        sessionStorage.setItem('campaignerId', this.campaignerId);
        this.router.navigate(['/individualdashboard/individualprofile'])
        alert("successfully login........")
      }
      else if (res.statusCode == 0) {
        alert("Please enter correct otp")
      }
    })
  }
}
