import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-newuserotpfill',
  templateUrl: './newuserotpfill.component.html',
  styleUrls: ['./newuserotpfill.component.css']
})
export class NewuserotpfillComponent implements OnInit {
  otpForm!: FormGroup;

  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('charCode restricted is: ' + charCode);
      return false;
    }
    return true;
  }
  
  constructor(private api: ApiService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.otpForm = new FormGroup({
      otp: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])),
    });
  }
  public myError = (controlName: string, errorName: string) => {
    return this.otpForm.controls[controlName].hasError(errorName);
  }


  verify(event: any, otpForm: FormGroup){
    var dataofform = JSON.parse(localStorage.getItem('campaginerdetails') || '{}');
    dataofform.otp = this.otpForm.value.otp
    console.log(dataofform)   
    localStorage.setItem('newuserotpdetails', JSON.stringify(dataofform))
    console.log(JSON.stringify(dataofform));
  }
}
