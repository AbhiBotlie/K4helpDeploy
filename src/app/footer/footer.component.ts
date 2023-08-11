import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/AppConstants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  imageBaseUrl:any;
  constructor() { }

  ngOnInit(): void {
    this.imageBaseUrl= AppConstants.IMAGE_BASE_URL;
  }

}
