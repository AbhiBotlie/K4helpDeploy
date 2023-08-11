import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-individual-add-accountform',
  templateUrl: './individual-add-accountform.component.html',
  styleUrls: ['./individual-add-accountform.component.css']
})
export class IndividualAddAccountformComponent implements OnInit {

  btnName:any = ""
  isUpdate:any= false
  accountDetails!: FormGroup;
  dataSource: any;

  datas = new Array<any>();
  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, 
    public dialogRef: MatDialogRef<IndividualAddAccountformComponent>, @Inject(MAT_DIALOG_DATA) data:any) { 
       this.btnName = data.btnName
       if(this.btnName == "UPDATE")
         this.isUpdate = true
    }

  ngOnInit(): void {
    this.api.getAllCampaignData().subscribe((res:any)=>{
      this.datas= res;
    })

    this.accountDetails = new FormGroup({
      campaigner_name: new FormControl('', [Validators.required]),
      cause_category: new FormControl('', [Validators.required]),
      desease: new FormControl('', [Validators.required]),
      beneficiary_name: new FormControl('', [Validators.required]),
      bank_name: new FormControl('', [Validators.required]),
      account_no: new FormControl('', [Validators.required]),
      ifsc_code: new FormControl('', [Validators.required])
    })
  }

  get campaignerName() {
    return this.accountDetails.get('campaigner_name');
  }

  get causeCategory() {
    return this.accountDetails.get('cause_category');
  }

  get desease() {
    return this.accountDetails.get('cause_category');
  }

  get beneficiaryName() {
    return this.accountDetails.get('beneficiary_name');
  }
  get bankName() {
    return this.accountDetails.get('bank_name');
  }

  get accountNo() {
    return this.accountDetails.get('account_no');
  }

  get ifscCode() {
    return this.accountDetails.get('ifsc_code');
  }

  onSubmit() {
    if (this.btnName == "ADD") {
      // this.api.postCampTypesForm(this.accountDetails.value).subscribe(data => {
      //   console.log(data);  
      //   this.dialogRef.close();
      // })
    }else if (this.btnName == "UPDATE") {
      // this.api.putCampTypesForm(this.accountDetails.value).subscribe(data => {
      //   console.log(data);  
      //   this.dialogRef.close();
      // })
      window.alert("UPDATE Called...")
    }
  }    
}
