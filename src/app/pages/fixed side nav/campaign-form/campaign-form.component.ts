import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit {

  startDate = new Date();
  minDate!: Date;
  maxDate!: Date;
  relations: any;
  conditions: any;
  medicals: any;
  imageBaseUrl:any;
  constructor(private service: ApiService, private activatedRoute: ActivatedRoute) { }
  campForm!: FormGroup;
  deseases = new Array<any>();

  ngOnInit(): void {
    this.imageBaseUrl= AppConstants.IMAGE_BASE_URL;
    this.service.getPurposeDropdownList().subscribe((response: any) => {
      this.deseases = response;
    });
    this.service.getRlationDropdownList().subscribe((response: any) => {
      this.relations = response;
    });
    this.service.getConditionDropdownList().subscribe((response: any) => {
      this.conditions = response;
    });

    this.campForm = new FormGroup({
      patient_email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      patient_name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(/[(\[a-zA-Z0-9\])\\1{2,}]/)]),
      patient_number: new FormControl("", ([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0_%+-)?[6,7,8,9][0-9]{0,9}$")])),
      campaigner_name: new FormControl('', [Validators.required]),
      campaigner_email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      campaigner_number: new FormControl('', [Validators.required]),
      patient_condition: new FormControl('', Validators.compose([Validators.required])),
      patient_relation: new FormControl('', Validators.compose([Validators.required])),
      target_date: new FormControl('', [Validators.required]),
      required_amount: new FormControl('', ([Validators.required, Validators.minLength(4)])),
      patient_age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern("^[1-9]?[0-9]{1}$|^100$")]),
      desease: new FormControl('', Validators.compose([Validators.required])),
      gender: new FormControl('', [Validators.required]),
      purpose: new FormControl('', Validators.compose([Validators.required])),
      hospital_name: new FormControl("", ([Validators.required, Validators.minLength(3), Validators.pattern(/[(\[a-zA-Z0-9\])\\1{2,}]/)])),
      pin_code: new FormControl('', [Validators.required]),
    })
  }

}
