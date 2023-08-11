import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invalidemail',
  templateUrl: './invalidemail.component.html',
  styleUrls: ['./invalidemail.component.css']
})
export class InvalidemailComponent implements OnInit {
  message:string="";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.message= data.message;
  }
  ngOnInit(): void {

  }

}
