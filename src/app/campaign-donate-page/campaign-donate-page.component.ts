import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-campaign-donate-page',
  templateUrl: './campaign-donate-page.component.html',
  styleUrls: ['./campaign-donate-page.component.css']
})
export class CampaignDonatePageComponent implements OnInit {
  donate!: FormGroup;
  wallet!: FormGroup;
  purposes: any;
  showLoader!: boolean;
  rzp1: any;
  id: any;
  amount: any;
  transationId: any;
  loadingProgress=false;
  options = {
    "key": "rzp_test_7HdkaZ1xFGPomB",
    "amount": 1,
    "currency": "INR",
    "name": "K4Help",
    "description": "Donation",
    "image": "/assets/image/logoInBlack.png",
    // "callback_url": "http://localhost:4200/paymentstatus",
    "handler": this.paymentCapture.bind(this),
    "prefill": {
      "name": "",
      "email": "",
      "contact": "",
    },
    "notes": {
      "address": "K4help Official"
    },
    "theme": {
      "color": "#000"
    }
  };

  constructor(private api: ApiService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id= data;
   }

  letterOnly(event: { which: any; keyCode: any; }): Boolean {
    var k;
    k = event.keyCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32);
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

  ngOnInit() {
    this.api.getPurposeDropdownList().subscribe((res) => {
      this.purposes = res;
    })
    this.donate = new FormGroup({
      donorName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/), Validators.minLength(3), Validators.maxLength(40)]),
      donorEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
      donorPhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0_%+-)?[6,7,8,9][0-9]{0,9}$")]),
      amount: new FormControl('', [Validators.required, Validators.minLength(4)]),
      updatedAmount: new FormControl(''),
      selectpurpose: new FormControl('', Validators.compose([Validators.required])),
      campaignId: new FormControl('', Validators.compose([Validators.required])),
      campaignerId: new FormControl('', Validators.compose([Validators.required])),
      transactionId: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required])),
    })
    this.wallet = new FormGroup({
      campaginId: new FormControl(''),
      campaignerId: new FormControl(''),
      amount: new FormControl(''),
      updatedAmount: new FormControl('')
    })
    this.api.getSingleCampaignData(this.id).subscribe((res: any) => {
      this.donate.get('campaignerId')?.setValue(res.campaignerId);
      this.donate.get('campaignId')?.setValue(res.campaignId);
    })
  }
  onClick() {
    this.showLoader = true;
    this.options.amount = 100*(this.donate.get("amount")?.value);
    this.options.prefill.name = this.donate.get("donorName")?.value;
    this.options.prefill.email = this.donate.get("donorEmail")?.value;
    this.options.prefill.contact = this.donate.get("donorPhoneNumber")?.value;
    this.rzp1 = new this.api.nativeWindow.Razorpay(this.options);
    this.rzp1.open();   
  }
  paymentCapture(response:any) {
    this.loadingProgress = true;
    const formData = new FormData();
    formData.append("donorName", this.donate.get("donorName")?.value);
    formData.append("donorPhoneNumber", this.donate.get("donorPhoneNumber")?.value);
    formData.append("donorEmail", this.donate.get("donorEmail")?.value);
    formData.append("amount", this.donate.get("amount")?.value);
    formData.append("selectpurpose", this.donate.get("selectpurpose")?.value);
    formData.append("country", this.donate.get("country")?.value);
    formData.append("campaignerId", this.donate.get("campaignerId")?.value);
    formData.append("campaignId", this.donate.get("campaignId")?.value); 
    formData.append("transactionId ", response.razorpay_payment_id);   
    if (this.transationId != "null") {     
      this.api.donateToCampaign(formData).subscribe((response: any) => {
        var id = response.campaignId;
        this.api.getWalletDetails(response.campaignId).subscribe((res: any) => {
          this.wallet.get('amount')?.setValue(res.amount + response.amount);
          this.wallet.get('updatedAmount')?.setValue(res.updatedAmount + response.amount);
          this.api.UpdateIntoWalletTable(id, this.wallet.value).subscribe((amountUpdate: any) => {
          })
        })
      });
    }
 }
 amountButton(amount: number){
    this.donate.get('amount')?.setValue(amount);
 }
}
