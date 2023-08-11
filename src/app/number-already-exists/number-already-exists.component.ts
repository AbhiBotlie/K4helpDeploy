import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/AppConstants';

@Component({
  selector: 'app-number-already-exists',
  templateUrl: './number-already-exists.component.html',
  styleUrls: ['./number-already-exists.component.css']
})
export class NumberAlreadyExistsComponent implements OnInit {
  imageBaseUrl:any;
  constructor() { }

  ngOnInit(): void {
    this.imageBaseUrl= AppConstants.IMAGE_BASE_URL;
  }
  reload(){
    window.location.reload();
  }
}
