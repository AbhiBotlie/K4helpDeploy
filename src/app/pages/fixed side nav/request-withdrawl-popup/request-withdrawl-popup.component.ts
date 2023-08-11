import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-request-withdrawl-popup',
  templateUrl: './request-withdrawl-popup.component.html',
  styleUrls: ['./request-withdrawl-popup.component.css']
})
export class RequestWithdrawlPopupComponent implements OnInit {
  minAmount:any;
  withdrawlRequest!: FormGroup;
  dataSource: any;
  campaignerId: any;
  id:any;
  image:any;
  hospital:any;
  medical:any;

  constructor(private activatedRoute: ActivatedRoute,private route:ActivatedRoute, private service: ApiService,
    public dialogRef: MatDialogRef<RequestWithdrawlPopupComponent>, @Inject(MAT_DIALOG_DATA) data: any) { 
      this.id=data.id;
    }

  ngOnInit(): void {
    this.service.getSingleCampaignData(this.id).subscribe((res: any) => {
      this.withdrawlRequest.get("beneficiary_name")?.setValue(res.beneficiary_name);
      this.withdrawlRequest.get("bank_name")?.setValue(res.bank_name);
      this.withdrawlRequest.get("account_no")?.setValue(res.account_no);
      this.withdrawlRequest.get("branchName")?.setValue(res.branchName);
      this.withdrawlRequest.get("ifsc_code")?.setValue(res.ifsc_code);
    })
    this.campaignerId = sessionStorage.getItem('campaignerId');
   
    this.withdrawlRequest = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.min(25000)]),
      campaignId: new FormControl(this.id),
      campaignerId: new FormControl(this.campaignerId),
      hospitalBills: new FormControl(''),
      otherBills: new FormControl(''),
      latestMedicalDocs: new FormControl(''),
      beneficiary_name: new FormControl(''),
      bank_name: new FormControl(''),
      account_no: new FormControl(''),
      branchName: new FormControl(''),
      ifsc_code: new FormControl(''),
    })
  }

  onSubmit() {
    const formData= new FormData();
    formData.append("amount", this.withdrawlRequest.get("amount")?.value);
    formData.append("campaignId", this.withdrawlRequest.get("campaignId")?.value);
    formData.append("campaignerId", this.withdrawlRequest.get("campaignerId")?.value);
    formData.append("hospitalBills", this.withdrawlRequest.get("hospitalBills")?.value);
    formData.append("otherBills", this.withdrawlRequest.get("otherBills")?.value);
    formData.append("latestMedicalDocs", this.withdrawlRequest.get("latestMedicalDocs")?.value);
    formData.append("beneficiary_name", this.withdrawlRequest.get("beneficiary_name")?.value);
    formData.append("bank_name", this.withdrawlRequest.get("bank_name")?.value);
    formData.append("account_no", this.withdrawlRequest.get("account_no")?.value);
    formData.append("branchName", this.withdrawlRequest.get("branchName")?.value);
    formData.append("ifsc_code", this.withdrawlRequest.get("ifsc_code")?.value);
    this.service.postWithdrawlRequest(this.id, formData).subscribe((res:any)=>{
      console.log(res);
      
    })
  }

  onHospitalBillSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = (event.target.files[0] as File)
      this.withdrawlRequest.get('hospitalBills')?.setValue(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.hospital = reader.result as string;
      }
      reader.readAsDataURL(file)   
    }
  }
  onOtherBillSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = (event.target.files[0] as File)
      this.withdrawlRequest.get('otherBills')?.setValue(file);  
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
      }
      reader.readAsDataURL(file)    
    }
  }
  onMedicalImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = (event.target.files[0] as File)
      this.withdrawlRequest.get('latestMedicalDocs')?.setValue(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.medical = reader.result as string;
      }
      reader.readAsDataURL(file)   
    }
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

}
