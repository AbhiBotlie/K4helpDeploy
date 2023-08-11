import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppConstants } from 'src/AppConstants';
import { PlansPopUpComponent } from '../plans-pop-up/plans-pop-up.component';

@Component({
  selector: 'app-pop-up-for-messages',
  templateUrl: './pop-up-for-messages.html',
  styleUrls: ['./pop-up-for-messages.css']
})
export class PopUpForMessages implements OnInit {
  imageBaseUrl: any;
  emailExists = true;
  conformation = false;
  comingData: any;
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<PlansPopUpComponent>) {
    this.comingData = data;
  }

  ngOnInit(): void {
    this.imageBaseUrl = AppConstants.IMAGE_BASE_URL;
    if (this.comingData == "success") {
      this.emailExists = false;
      this.conformation = true;
    }
  }
  reload() {
    window.location.reload();
  }

}
