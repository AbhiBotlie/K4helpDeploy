import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';

@Component({
  selector: 'app-celebrate-your-birthday',
  templateUrl: './celebrate-your-birthday.component.html',
  styleUrls: ['./celebrate-your-birthday.component.css']
})
export class CelebrateYourBirthdayComponent implements OnInit {

  celebrateYourBirthday!: FormGroup;
  purposeData=new Array<any>();
  startDate = new Date(1900, 0, 1);
  minDate!: Date;
  maxDate!: Date;
  imageBaseUrl:any;
  movingText:any;
  keyPress(event: any) {
    Validators.pattern(/^[6-9]\d{9}$/)
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
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
      console.log('charCode restricted is' + charCode);

      return false;
    }

    return true;
  }

  restrictZero(event: any) {
    if (event.target.value.length === 0 && event.key === "0") {
      event.preventDefault();
    }

  }

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.imageBaseUrl= AppConstants.IMAGE_BASE_URL;
    let formname = "CYB";
    this.api.getMovingTextFormSIngleForm(formname).subscribe((res: any) => {
      console.log(res);
      this.movingText = res.text;
    })
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 123, 0, 1);
    this.maxDate = new Date();

    this.api.getMedicalConditionDropdownList().subscribe((res:any)=>{
      this.purposeData= res;
    })

    this.celebrateYourBirthday = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
      date: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.minLength(3)]),
      purpose: new FormControl('', Validators.compose([Validators.required]))
    })
  }

  get purpose() {
    return this.celebrateYourBirthday.get('purpose');
  }

  get amount() {
    return this.celebrateYourBirthday.get('amount');
  }

  get email() {
    return this.celebrateYourBirthday.get('email');
  }

  public myError = (controlName: string, errorName: string) => {
    return this.celebrateYourBirthday.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    console.log(this.celebrateYourBirthday.value);
    this.api.addCYBData(this.celebrateYourBirthday.value).subscribe((data: any) => {
      console.log(data)
      return data;
    })
  }

}


function moment() {
  throw new Error('Function not implemented.');
}

