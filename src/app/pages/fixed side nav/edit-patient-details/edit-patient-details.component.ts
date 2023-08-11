import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-edit-patient-details',
  templateUrl: './edit-patient-details.component.html',
  styleUrls: ['./edit-patient-details.component.css']
})
export class EditPatientDetailsComponent implements OnInit {

  patientDetails!: FormGroup;
  dataSource: any;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.patientDetails = new FormGroup({
      campa_id: new FormControl('', [Validators.required]),
      patient_name: new FormControl('', [Validators.required]),
      phone_no: new FormControl('', [Validators.required]),
      cause_category: new FormControl('', [Validators.required]),
      desease: new FormControl('', [Validators.required]),
      account_details: new FormControl('', [Validators.required]),
      medical_docs: new FormControl('',[Validators.required])
    })
  }

  get campaignerName() {
    return this.patientDetails.get('campaigner_name');
  }

  get causeCategory() {
    return this.patientDetails.get('cause_category');
  }

  get beneficiaryName() {
    return this.patientDetails.get('beneficiary_name');
  }
  get bankName() {
    return this.patientDetails.get('bank_name');
  }

  get accountNo() {
    return this.patientDetails.get('account_no');
  }

  get ifscCode() {
    return this.patientDetails.get('ifsc_code');
  }

  onSubmit(){
    console.log(this.patientDetails.value);
    console.log("Submit button is clicked");
    alert("Sending data to Database.....");
      // this.api.addAccountDetail(this.patientDetails.value).subscribe((data: any) => {
      //   console.log(data);
      //   return data;
      // })
  }

}
