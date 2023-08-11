import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { AppConstants } from 'src/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public campaignDataArray = [];
  public subject = new Subject<any>();
  private campaignData = new BehaviorSubject(this.campaignDataArray);
  currentData = this.campaignData.asObservable();
  setCampaignData(data: any) {
    console.log(data);
    this.campaignData.next(data);

  }


  deleteData(sno: any) {
    return this.http.delete(AppConstants.API_BASE_URL + "campaign_details/delete/" + sno);
  }
  deleteRecord(elementAt: <T, D = T>(index: number, defaultValue?: D) => import("rxjs").OperatorFunction<T, T | D>) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }


  //  ___________________post methods_____________________________________________________________________________ 

  postDashboardIndividual(data: any): Observable<any> {
    return this.http.post(AppConstants.API_BASE_URL + "campaign_details/post", data).pipe(map((data: any) => data));
  }
  postDashboardSocialActivist(data: any): Observable<any> {
    return this.http.post(AppConstants.API_BASE_URL + "campaign_details/post", data).pipe(map((data: any) => data.json()));
  }
  postDashboardInputName(data: any): Observable<any> {
    return this.http.post(AppConstants.API_BASE_URL + "campaign_details/post", data).pipe(map((data: any) => data.json()));
  }
  postNgoDashboard(data: any): Observable<any> {
    return this.http.post(AppConstants.API_BASE_URL + "campaign_details/post", data).pipe(map((data: any) => data));
  }

  addNewAccountDetails(userCauseDetails: any): Observable<any> {
    return this.http.post(AppConstants.API_BASE_URL + "campaign_details/post", userCauseDetails);
  }
  addNewAccountStory(userCauseDetails: any): Observable<any> {
    return this.http.post(AppConstants.API_BASE_URL + "campaign_details/post", userCauseDetails);
  }
  uploadmanageimages(campId: any, textBoxSocialActivist: any): Observable<any> {
    let variable = new HttpHeaders({ 'Content-Type': '*' });
    return this.http.post(AppConstants.API_BASE_URL + "campaign_details/update/" + campId, textBoxSocialActivist);
  }





  // ____________________delete____________________________________________________________________________________ 
  public deleteDonationDetail(id: any) {
    return this.http.delete("https://jsonplaceholder.typicode.com/users" + id);
  }

  deleteRecords(campId: String): Observable<number> {
    let httpheaders = new HttpHeaders().set('Content-type', 'application/Json'); let options = { headers: httpheaders };
    return this.http.delete<number>(AppConstants.API_BASE_URL + "campaign_details/delete/" + campId);
  }


  // __________________________Update_________________________________________________________________


  public updateRecord(edit: any): Observable<any> {
    let httpheaders = new HttpHeaders().set('Content-type', 'application/Json'); let options = { headers: httpheaders };
    return this.http.put(AppConstants.API_BASE_URL + "campaigner/update/", edit).pipe(map((data: any) => data.json()));
  }
}

