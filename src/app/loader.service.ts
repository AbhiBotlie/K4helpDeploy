import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading:boolean = true;
  onLoad() {
   
}
  constructor() { }

  setTimer(): Observable<any>{
    return this.setTimer();
  }
}
