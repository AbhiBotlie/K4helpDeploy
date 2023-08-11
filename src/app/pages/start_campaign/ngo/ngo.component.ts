import { Component, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, ReplaySubject, startWith, Subject, Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { Country } from '../../donate/donate.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-ngo',
  templateUrl: './ngo.component.html',
  styleUrls: ['./ngo.component.css']
})
export class NgoComponent implements OnInit {

  [x: string]: any;
  matcher = new MyErrorStateMatcher();

  startDate = new Date(2023, 0, 1);
  minDate!: Date;
  maxDate!: Date;

  isNgoFirstFormVisible: boolean = false;
  isNgoSecondFormVisible: boolean = true;
  isNgoThirdFormVisible: boolean = false;
  isNgoFourthFormVisible: boolean = false;
  isOtpNgoDivVisible: boolean = false;
  isNgoDivVisisble: boolean = false;
  isSocialDivVisible: boolean = false;
  isHospitalPageShow: boolean = false;
  showLoader: boolean = true;
  isButtonDisabled: boolean = true;
  selectedType = '';
  subscription!: Subscription;
  timer!: Observable<any>;
  userTypeSelect = '';
  val2: any;
  otp!: string;
  showOtpComponent = true;
  @ViewChildren('ngOtpInput') ngOtpInput: any;

  isDisabled: boolean = true;
  user_type = new Array<any>();
  relations = new Array<any>();
  deseases = new Array<any>();
  patients = new Array<any>();
  conditions = new Array<any>();
  genders = new Array<any>();
  medicals = new Array<any>();
  values = new Array<any>();
  selectedDate: any;
  campaignerData: any;
  campaignerId: any;
  campaignId: any;
  idOfCampaign: any;
  campaigner_phone: any;
  ngoForm!: FormGroup;
  ngoForm_2!: FormGroup;
  ngoForm_3!: FormGroup;
  frequencies: any;
  target_date: any = new Date();
  todayDate: any = new Date();
  file = "";

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
      return false;
    }
    return true;
  }

  cityCtrl = new FormControl('');
  Control = new FormControl('', Validators.required);
  cities = new Array<any>();
  purposeControl = new FormControl<any>(null, Validators.required);
  frequencyControl = new FormControl<any>(null, Validators.required);
  filteredCities: Observable<Country[]> | undefined;

  constructor(private service: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.filteredCities = this.cityCtrl.valueChanges.pipe(startWith(''), map(name => (name ? this._filterCities(name) : this.cities.slice())),);
  }

  private _filterCities(value: string) {
    const filterValue = value.toLowerCase();
    return this.cities.filter(cities => cities.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.campaignerId = localStorage.getItem("campaignerId");
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 0, 1);
    this.maxDate = new Date(currentYear + 10, 0, 1);

    var campaignerData = JSON.parse(localStorage.getItem('campaginerdetails') || '{}')
    this.campaignerData = campaignerData.value; 
    this.campaigner_phone = campaignerData.campaignerNumber;    

    this.service.getAllDropdownList().subscribe((response: any) => {
      this.user_type = response;
    });
    this.service.getPurposeDropdownList().subscribe((response: any) => {
      this.deseases = response;
    });
    this.service.getRlationDropdownList().subscribe((response: any) => {
      this.relations = response;
    });
    this.service.getConditionDropdownList().subscribe((response: any) => {
      this.conditions = response;
    });
    this.service.getFreuencyDropdownList().subscribe((response: any) => {
      this.frequencies = response;
    });
    this.service.getMedicalConditionDropdownList().subscribe((response: any) => {
      this.medicals = response;
    });
    this.service.getMedicalConditionDropdownList().subscribe((response: any) => {
      this.values = response;
    });
    var selectedTime = Math.floor(this.todayDate.getTime() - this.target_date.getTime()) / (1000 * 3600 * 24);
    this.selectedDate = selectedTime + 100;

    this.ngoForm = new FormGroup({
      patient_name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(/[(\[a-zA-Z0-9\])\\1{2,}]/)]),
      patient_email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      patient_number: new FormControl("", ([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0_%+-)?[6,7,8,9][0-9]{0,9}$")])),
      patient_age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern("^[1-9]?[0-9]{1}$|^100$")]),
      gender: new FormControl("", ([Validators.required])),
      city: new FormControl("", ([Validators.required])),
      patient_condition: new FormControl("", ([Validators.required])),
      campaignerId: new FormControl(this.campaignerId, ([Validators.required]))
    })

    this.ngoForm_3 = new FormGroup({
      pin_code: new FormControl("", ([Validators.required, Validators.minLength(6), Validators.maxLength(6)])),
      hospital_city: new FormControl("", Validators.compose([Validators.required])),
      hospital_name: new FormControl("", ([Validators.required, Validators.minLength(3), Validators.pattern(/[(\[a-zA-Z0-9\])\\1{2,}]/)])),
      hospital_Detail: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/[(\[a-zA-Z0-9\])\\1{2,}]/)]))
    })

    this.ngoForm_3 = new FormGroup({
      disease: new FormControl('', Validators.compose([Validators.required])),
      campaign_purpose: new FormControl("", Validators.compose([Validators.required])),
      required_amount: new FormControl("", ([Validators.required, Validators.minLength(4)])),
      target_date: new FormControl("", ([Validators.required])),
      patient_relation: new FormControl('', Validators.compose([Validators.required]))
    })
  }

  public myError = (controlName: string, errorName: string) => {
    return this.ngoForm.controls[controlName].hasError(errorName);
  }

  public myError1 = (controlName: string, errorName: string) => {
    return this.ngoForm_3.controls[controlName].hasError(errorName);
  }

  public myError2 = (controlName: string, errorName: string) => {
    return this.ngoForm_3.controls[controlName].hasError(errorName);
  }

  stateHandle() {
    this.ngoForm_3.enable();
  }

  hospitalBackClick() {
    this.isHospitalPageShow = false;
    this.isNgoSecondFormVisible = true;
    this.isNgoThirdFormVisible = false;
  }

  onSelectHospital(event: any) {
   
    this.selectedType = event.value;
  }

  submitFirstForm() {
    this.isNgoSecondFormVisible = false;
    this.isNgoThirdFormVisible = true;
    if (this.selectedType == 'Hospitalized') {
      this.isHospitalPageShow = true;
      this.isNgoThirdFormVisible = false;
    } 
  }

  ngoSecondBackClick() {
    this.isNgoSecondFormVisible = true;
    this.isNgoThirdFormVisible = false;
  }

  postHospitalForm(){
    this.service.postHospitalDetails(this.campaignId, this.ngoForm_2.value).subscribe((res:any)=>{
      
      
    })
    this.isNgoSecondFormVisible = false;
    this.isHospitalPageShow = false;
    this.isNgoThirdFormVisible = true;
  }

  updateFormData(){
    this.service.postLastCampaignForm(this.campaignId, this.ngoForm_3.value).subscribe((res:any)=>{
     
      
    })
    this.isNgoSecondFormVisible = false;
    this.isHospitalPageShow = false;
    this.isNgoThirdFormVisible = false;
  }
  
}