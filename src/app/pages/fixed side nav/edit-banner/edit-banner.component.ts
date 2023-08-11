import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.css']
})
export class EditBannerComponent implements OnInit {

  bannerDetails!: FormGroup;
  dataSource: any;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.bannerDetails = new FormGroup({
      campaign_name: new FormControl('', [Validators.required]),
      banner_image: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      camp_id: new FormControl('', [Validators.required]),
    })
  }

  get campaignerName() {
    return this.bannerDetails.get('campaigner_name');
  }

  get causeCategory() {
    return this.bannerDetails.get('cause_category');
  }

  get beneficiaryName() {
    return this.bannerDetails.get('beneficiary_name');
  }
  get bankName() {
    return this.bannerDetails.get('bank_name');
  }

  get accountNo() {
    return this.bannerDetails.get('account_no');
  }

  get ifscCode() {
    return this.bannerDetails.get('ifsc_code');
  }


  onSubmit(){
    console.log(this.bannerDetails.value);
    console.log("Submit button is clicked");
    alert("Sending data to Database.....");
      // this.api.addAccountDetail(this.bannerDetails.value).subscribe((data: any) => {
      //   console.log(data);
      //   return data;
      // })
  }

}
