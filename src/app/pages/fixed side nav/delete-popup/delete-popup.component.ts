import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent {

  id :number;
  adminData =new Array<any>();
  constructor(public dialogRef: MatDialogRef<DeletePopupComponent>, @Inject(MAT_DIALOG_DATA) data:any){
    console.log("Matdialog : "+ this.dialogRef)
    this.id = data.user_id;
    console.log("User id in Delete popup : "+ this.id);
}
}
