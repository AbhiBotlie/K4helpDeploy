import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/AppConstants';

@Component({
  selector: 'app-otpcorrect',
  templateUrl: './otpcorrect.component.html',
  styleUrls: ['./otpcorrect.component.css']
})
export class OTPCorrectComponent implements OnInit {
  imageBaseUrl:any;
  constructor() { }

  ngOnInit(): void {
    this.imageBaseUrl= AppConstants.IMAGE_BASE_URL;
  }
  reload(){
    window.location.reload();
  }
}
