import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';



@Component({
  selector: 'app-monthly-help',
  templateUrl: './monthly-help.component.html',
  styleUrls: ['./monthly-help.component.css']
})
export class MonthlyHelpComponent implements OnInit {
  monthlyHelp!: FormGroup;
  purposeData=new Array<any>();
  frequencyData = new Array<any>();
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
  restrictZero(event: any) {
    if (event.target.value.length === 0 && event.key === "0") {
      event.preventDefault();
    }

  }

  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('charCode restricted is' + charCode);

      return false;
    }

    return true;
  }

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    let formname = "Monthly Help";
    this.api.getMovingTextFormSIngleForm(formname).subscribe((res: any) => {
      console.log(res);
      this.movingText = res.text;
    })

    this.imageBaseUrl= AppConstants.IMAGE_BASE_URL;
    this.api.getMedicalConditionDropdownList().subscribe((res:any)=>{
      this.purposeData= res;
    })

    this.api.getFreuencyDropdownList().subscribe((res:any)=>{
      this.frequencyData= res;
    })


    this.monthlyHelp = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
      amount: new FormControl('', [Validators.required, Validators.minLength(3)]),
      selectpurpose: new FormControl('', Validators.compose([Validators.required])),
      plan: new FormControl('', Validators.compose([Validators.required]))
    })

  }


  public myError = (controlName: string, errorName: string) => {
    return this.monthlyHelp.controls[controlName].hasError(errorName);
  }

  get plan() {
    return this.monthlyHelp.get('plan');
  }

  get purpose() {
    return this.monthlyHelp.get('purpose');
  }

  get amount() {
    return this.monthlyHelp.get('amount');
  }

  get email() {
    return this.monthlyHelp.get('email');
  }

  onSubmit() {
    console.log(this.monthlyHelp.value);
    this.api.postMonthelyDetails(this.monthlyHelp.value).subscribe((data: any) => {
      console.log(data)
      return data;
    })
  }

}
