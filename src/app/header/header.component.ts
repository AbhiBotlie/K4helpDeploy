import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/AppConstants';
import { HomeDialogComponent } from '../dialogbox/home-dialog/home-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  events: string[] = [];
  opened!: boolean;
  shouldRun!:boolean;
  imageBaseUrl:any;
  isOpen=true;
constructor(private api:ApiService, private dialog:MatDialog, private router: Router) { }   
ngOnInit(): void {
  this.imageBaseUrl= AppConstants.IMAGE_BASE_URL;
//  this.dialog.open(HomeDialogComponent,{
//       disableClose: true,
//       width:'80%',
//       height:'70vh',
//      }) 
  
    
  }

  


}


