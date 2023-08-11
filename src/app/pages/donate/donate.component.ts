import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';

interface Frequency {
  name: string;
}
interface Purpose {
  name: string;
}
export interface Country {
  flag: string;
  name: string;
}

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  purposes = new Array<any>();
  donate!: FormGroup;
  frequencies = new Array<any>();
  showLoader = false;
  rzp1: any;
  options: any;
  transationId: any;
  imageBaseUrl: any;
  movingText: any;
  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
    this.filteredCountries = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      map(country => (country ? this._filterStates(country) : this.countries.slice())),
    );
  }

  ngOnInit(): void {
    this.imageBaseUrl = AppConstants.IMAGE_BASE_URL;
    let formname = "Donate";
    this.api.getMovingTextFormSIngleForm(formname).subscribe((res: any) => {
      this.movingText = res.text;
    })
    this.api.getMedicalConditionDropdownList().subscribe((res) => {
      this.purposes = res;
    })

    this.api.getFreuencyDropdownList().subscribe((res) => {
      this.frequencies = res;
    })
    this.donate = new FormGroup({
      donorName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/), Validators.minLength(3), Validators.maxLength(40)]),
      donorEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
      donorPhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0_%+-)?[6,7,8,9][0-9]{0,9}$")]),
      amount: new FormControl('', [Validators.required, Validators.minLength(4)]),
      selectpurpose: new FormControl('', Validators.compose([Validators.required])),
      frequency: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required]))
    })

  }

  public myError = (controlName: string, errorName: string) => {
    return this.donate.controls[controlName].hasError(errorName);
  }

  get purpose() {
    return this.donate.get('purpose');
  }

  get amount() {
    return this.donate.get('amount');
  }

  get email() {
    return this.donate.get('email');
  }

  letterOnly(event: { which: any; keyCode: any; }): Boolean {
    var k;
    k = event.keyCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123));
  }

  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  restrictZero(event: any) {
    if (event.target.value.length === 0 && event.key === "0") {
      event.preventDefault();
    }
  }

  countryCtrl = new FormControl('');
  filteredCountries: Observable<Country[]> | undefined;

  countries: Country[] = [
    {
      name: 'Arkansas',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },



    {
      name: 'Florida',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];

  private _filterStates(value: string): Country[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  }

  onClick() {

    this.showLoader = true;

    this.options = {
      "key": "rzp_test_7HdkaZ1xFGPomB", // Enter the Key ID generated from the Dashboard
      "amount": (this.donate.get("amount")?.value) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "K4Help", //your business name
      "description": "Donation",
      "image": "http://k4help.org/angular/assets/image/k4help.jpg",
      // "callback_url": "http://localhost:4200/paymentstatus",
      "handler": function (response: any) {
        alert(response.razorpay_payment_id);
        this.transationId = response.razorpay_payment_id;
        localStorage.setItem("transationId", response.razorpay_payment_id);
      },
      "prefill": {
        "name": this.donate.get("donorName")?.value, //your customer's name
        "email": this.donate.get("donarEmail")?.value,
        "contact": this.donate.get("donorPhoneNumber")?.value,
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };

    this.rzp1 = new this.api.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
    var a = JSON.stringify(localStorage.getItem("transationId"));
    if (a!== "null") {
      const formData = new FormData();
      formData.append("transtionId", a);
      formData.append("donorName", this.donate.get("donorName")?.value);
      formData.append("donorNumber", this.donate.get("donorPhoneNumber")?.value);

      formData.append("amount", this.donate.get("amount")?.value);
      this.api.postTransationDetailsOfDonor(formData).subscribe((res: any) => {
        localStorage.clear;
        this.api.donateForm(this.donate.value).subscribe((data: any) => {
        })
     });
     localStorage.removeItem('transationId');
    }
  }
}
