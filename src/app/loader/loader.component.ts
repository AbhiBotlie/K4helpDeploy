import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, startWith, Subject, Subscription, throwIfEmpty, timer } from 'rxjs';
import { AppConstants } from 'src/AppConstants';
import { LoaderService } from '../loader.service';
import { NextDirective } from '../next.directive';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  showLoader: boolean = true;      
  imageLoader: boolean = false;      
  subscription!: Subscription;
  imageBaseUrl:any;
  interval!: number;
   timer!: Observable<any>;
  loading$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(public _loader: LoaderService) { }

  ngOnInit(): void {
    this.imageBaseUrl= AppConstants.IMAGE_BASE_URL;
  }
   
}