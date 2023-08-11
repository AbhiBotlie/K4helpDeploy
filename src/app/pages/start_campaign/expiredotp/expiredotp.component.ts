import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-expiredotp',
  templateUrl: './expiredotp.component.html',
  styleUrls: ['./expiredotp.component.css']
})
export class ExpiredotpComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ExpiredotpComponent>) { }

  ngOnInit(): void {
  }
  reload(){
    this.dialogRef.close({data:'Resend OTP'})
  }
}
