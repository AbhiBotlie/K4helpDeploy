import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { map, startWith } from 'rxjs';
import { Country } from '../../donate/donate.component';
import { DashboardService } from '../../fixed side nav/dashboard.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Cities } from 'src/Cities';

export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {
[x: string]: any;

  // [x: string]: any;
  // matcher = new MyErrorStateMatcher();

  isIndividualSecondDivVisisble: boolean = true;
  isIndividualThirdFormVisible: boolean = false;
  isIndividualFourthDivVisisble: boolean = false;
  isHospitalPageShow: boolean = false;
  selectedType = '';
  disabled = true;
  value: any;
  subscription!: Subscription;
  otp!: string;
  selectedTime!: number;
  medicals = new Array<any>();
  values = new Array<any>();
  selectedDate!: number;
  srcResult!: File;
  user_type = new Array<any>();
  relations = new Array<any>();
  deseases = new Array<any>();
  conditions = new Array<any>();
  frequencies = new Array<any>();
  genders = new Array<any>();
  @ViewChildren('ngOtpInput') ngOtpInput: any;
  userForm!: FormGroup;
  userForm1!: FormGroup;
  userForm2!: FormGroup;
  cities = new Array<any>();
  campaignerIdNo: any;
  campaignId: any;
  formData = "";
  dateSent: any;
  myDate: any;
  campaigner_phone: any;
  campaignerData: any;
  image = "assets/image/start.jpg";
  movingText = "Moving Text";
  todayNumber!: number;
  leftDays = 0;
  wallet!: FormGroup;
  startDate = new Date(2023, 0, 1);
  minDate!: Date;
  maxDate!: Date;
  target_date = new Date();
  todayDate: any = new Date();
  Cities: any;
socialMediaData: any;
iconWaterMark: any;
iconFields: any;
height: any;
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
  searchControl = new FormControl('');
  public inputFilter: FormControl = new FormControl();
  public controlFilter: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);



  frequencyControl = new FormControl<any>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);


  purposeControl = new FormControl<any>(null, Validators.required);
  cityCtrl = new FormControl('');
  Control = new FormControl('', Validators.required);
  matcher = new MyErrorStateMatcher();
  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private router: Router, private dashBoard: DashboardService, public datePipe: DatePipe) {

    let currentDateTime = this.datePipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
  }
  ngOnInit(): void {
    
    
    var campaignerData = JSON.parse(localStorage.getItem('campaginerdetails') || '{}')
    this.campaignerIdNo = sessionStorage.getItem('campaignerId');
    this.campaignerData = campaignerData.value;
    this.campaigner_phone = campaignerData.campaignerNumber
    this.minDate = new Date();

    this.api.getConditionDropdownList().subscribe((res: any) => {
      this.conditions = res;
    })

    this.api.getPurposeDropdownList().subscribe((res: any) => {
      this.deseases = res;
    })
    this.api.getRlationDropdownList().subscribe((res: any) => {
      this.relations = res;
    })

    this.api.getDonateDropdownList().subscribe((res: any) => {
      this.medicals = res;
    })
    this.api.getPurposeDropdownList().subscribe((res: any) => {
      this.deseases = res;
    })

    this.userForm = new FormGroup({
      campaignerId: new FormControl(this.campaignerIdNo, Validators.required),
      patient_name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      patient_email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?")]),
      patient_number: new FormControl("", ([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0_%+-)?[6,7,8,9][0-9]{0,9}$")])),
      patient_age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern("^[1-9]?[0-9]{1}$|^100$")]),
      patient_condition: new FormControl("", Validators.compose([Validators.required])),
      gender: new FormControl("", ([Validators.required])),
      city: new FormControl("", ([Validators.required])),
    });
    this.userForm1 = new FormGroup({
      hospital_name: new FormControl({ value: "", disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      hospital_address: new FormControl("", Validators.required),
      hospital_Detail: new FormControl("", Validators.required),
      hospital_city: new FormControl({ value: "", disabled: true }, ([Validators.required])),
      pin_code: new FormControl({ value: "", disabled: true }, [Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^((\\+91-?)|0_%+-)?[1-9]{1}[0-9]{9}$")]),
    });
    this.userForm2 = new FormGroup({
      campaign_purpose: new FormControl("", Validators.compose([Validators.required])),
      cause_category: new FormControl("", Validators.compose([Validators.required])),
      required_amount: new FormControl("", [Validators.required, Validators.minLength(3), Validators.min(25000)]),
      target_date: new FormControl("", [Validators.required]),
      patient_relation: new FormControl("", Validators.compose([Validators.required])),
    });

    this.wallet = new FormGroup({
      campaginId: new FormControl(''),
      campaignerId: new FormControl(''),
      amount: new FormControl(''),
    })
    this.cities = Cities.ListOfCities;    
  }

  addEvent(event: any) {
    this.myDate = new Date(event.target.value).getTime();
    this.leftDays = Math.floor((this.myDate - (new Date().getTime())) / (86400000))+1;
  }

  public myError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public myError1 = (controlName: string, errorName: string) => {
    return this.userForm1.controls[controlName].hasError(errorName);
  }

  public myError2 = (controlName: string, errorName: string) => {
    return this.userForm2.controls[controlName].hasError(errorName);
  }

  stateHandle() {
    this.userForm.enable();
  }
  get cause_category() {
    return this.userForm.get('cause_category');
  }
  get patient_relation() {
    return this.userForm.get('patient_relation');
  }
  get campaign_purpose() {
    return this.userForm.get('campaign_purpose');
  }
  get patient_name() {
    return this.userForm.get('patient_name');
  }
  get patient_email() {
    return this.userForm.get('patient_email');
  }
  get patient_number() {
    return this.userForm.get('patient_number');
  }
  get patient_age() {
    return this.userForm.get('patient_age');
  }

  onSubmit() {
    this.api.postLastCampaignForm(this.campaignId, this.userForm2.value).subscribe((response: any) => {
      this.wallet.get('campaginId')?.setValue(response.campaignId);
      this.wallet.get('campaignerId')?.setValue(response.campaignerId);
      this.api.InsertIntoWalletTable(this.wallet.value).subscribe((res: any) => {
      })
    })
  }
  onSelectHospital(event: any) {
    this.selectedType = event.value;
  }

  individualBackClick() {
    this.isIndividualSecondDivVisisble = false;
    this.router.navigate(['/startCampaign']);
  }

  individualSecondNextClick() {
    this.api.postFirstCampaignForm(this.userForm.value).subscribe((res: any) => {
      this.campaignId = res.campaignId;
    })
    this.isIndividualSecondDivVisisble = false;
    this.isIndividualThirdFormVisible = true;
    if (this.selectedType == 'Hospitalized') {
      this.isHospitalPageShow = true;
      this.isIndividualThirdFormVisible = false;
    }
    else if (this.selectedType == 'Serious') {
      this.isIndividualThirdFormVisible = true;
      this.isHospitalPageShow = false;
    }
  }
  individualSecondBackClick() {
    this.isIndividualSecondDivVisisble = true;
    this.isIndividualThirdFormVisible = false;

  }
  hospitalBackClick() {
    this.isHospitalPageShow = false;
    this.isIndividualSecondDivVisisble = true;
    this.isIndividualThirdFormVisible = false;
  }
  hospitalNextClick() {
    this.api.postHospitalDetails(this.campaignId, this.userForm1.value).subscribe((res: any) => {
    })
    this.isIndividualSecondDivVisisble = false;
    this.isHospitalPageShow = false;
    this.isIndividualThirdFormVisible = true;
  }

  
}