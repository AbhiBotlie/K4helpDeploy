import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OtpfilledpopupComponent } from '../otpfilledpopup/otpfilledpopup.component';

@Component({
  selector: 'app-incorrectotp',
  templateUrl: './incorrectotp.component.html',
  styleUrls: ['./incorrectotp.component.css']
})
export class IncorrectotpComponent implements OnInit {
  otpisicorect = true;
  otpisinncorect = false;
  akash:any;
  constructor(private dialogRef: MatDialogRef<IncorrectotpComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.akash=data.msg;
  }
  
  ngOnInit(): void {
  

  }

  reload() {
    this.dialogRef.close({ data: 'Resend Otp' })
    // this.dialogRef.close();
  }

}
