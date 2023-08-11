import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AppConstants } from 'src/AppConstants';

function _window() :any{
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  get nativeWindow(): any {
    return _window();
  }
  constructor(private http: HttpClient) { }
  id: any;
  planName:any;

  
  setId(id: any) {
    this.id = id;
  }

  getMovingTextFormSIngleForm(formname:any){
    return this.http.get(AppConstants.API_BASE_URL+"managemovingtext/getsingle/"+formname);
  }

  getAllDonors(){
    return this.http.get(AppConstants.API_BASE_URL+"logsOfDonor/get");
  }

  getId() {
    return this.id;
  }

  subject = new Subject();
  campId: any;

  getCampId() {
    return this.campId;
  }

  setCampId(id: any) {
    this.campId = id;
  }

  setPlanName(plan:any){
    console.log(plan);
    
    this.planName= plan.planName;
    console.log(this.planName);
    
  }

  getPlanName(){
    console.log(this.planName);
    
    return this.planName;
  }

  sendData(msg: any) {
    this.subject.next(msg);
  }

  getMsg(): Observable<any> {
    return this.subject.asObservable();
  }

  verifyUpdatedEmailOfCamapigner(data: any) {
    return this.http.post(AppConstants.API_BASE_URL + 'campaigner/verifyUpdatedEmail', data);
  }

  getSingleCampaignData(id: any) {
    return this.http.get(AppConstants.API_BASE_URL + 'campaign_details/get/' + id);
  }

  allCampaignsOfCampaigner(id:any){
    return this.http.get(AppConstants.API_BASE_URL + 'campaign_details/all/campagins/campaigner/' + id);
  }

  postWithdrawlRequest(id:any, data:any){
    return this.http.put(AppConstants.API_BASE_URL + 'withdrawl/post/'+id, data);
  }

  withdhrawlResquestData(campaignerId:any){
    return this.http.get(AppConstants.API_BASE_URL + 'withdrawl/get/withdrawl/'+campaignerId);
  }

  updatePatientDetails(id: any, data: any) {
    return this.http.put(AppConstants.API_BASE_URL + 'campaign_details/patientDetails/' + id, data);
  }

  updateAccountDetails(id: any, data: any) {
    return this.http.put(AppConstants.API_BASE_URL + 'campaign_details/accountDetails/' + id, data);
  }

  updatePatientKycDocs(id: any, data: any) {
    return this.http.put(AppConstants.API_BASE_URL + 'campaign_details/addPatientKyc/' + id, data);
  }

  postHospitalDetailsToCampaign(id:any, data:any ){
    return this.http.put(AppConstants.API_BASE_URL + 'campaign_details/addhospitaldetails/' + id, data);
  }

  postStoryToCampaign(id:any, data:any ){
    return this.http.put(AppConstants.API_BASE_URL + 'campaign_details/addstory/' + id, data)
  }

  updatePatientCondition(id: any, data: any) {
    return this.http.put(AppConstants.API_BASE_URL + 'campaign_details/conditionUpdate/' + id, data);
  }

  addBannerToCampaign(id: any, data: any) {
    return this.http.put(AppConstants.API_BASE_URL + 'campaign_details/addBanner/' + id, data);
  }

  getAllPlans() {
    return this.http.get(AppConstants.API_BASE_URL + 'plans/get');
  }

  getSinglePlan(id:any) {
    return this.http.get(AppConstants.API_BASE_URL + 'plans/get/'+id);
  }

  updatePlan(id:any, plan:any){
    return this.http.put(AppConstants.API_BASE_URL+"campaign_details/updateplan/"+id, plan);
  }

  uploadCampaignerAdhar(id:any, data:any){
    return this.http.put(AppConstants.API_BASE_URL + 'campaigner/post_campaigneradhar/'+id, data);
  }

  uploadCampaignerPan(id:any, data:any){
    return this.http.put(AppConstants.API_BASE_URL + 'campaigner/post_campaignerpancard/'+id, data);
  }

  patientImageToCampaign(id: any, data: any) {
    return this.http.put(AppConstants.API_BASE_URL + 'campaign_details/addImage/' + id, data);
  }

  // addPlanToCampaign(id: any, data: any) {
  //   return this.http.put(AppConstants.API_BASE_URL + 'campaign_details/addPlan/' + id, data);
  // }

  deleteMedicalDocument(id: any) {
    return this.http.delete(AppConstants.API_BASE_URL + 'uploadmedicalimage/delete/' + id);
  }

  deletePatientImage(id: any) {
    return this.http.delete(AppConstants.API_BASE_URL + 'multipleImages/delete/' + id);
  }

  getCampaignerDetailsById(id: any) {
    return this.http.get(AppConstants.API_BASE_URL + 'campaigner/get/' + id);
  }

  getCampaignerDetails(id: any) {
    return this.http.get(AppConstants.API_BASE_URL + 'campaigner/getsingle/' + id);
  }

  getSocialActivistDetails(id: any) {
    return this.http.get(AppConstants.API_BASE_URL + 'socialdetails/get/' + id);
  }
  
  getCampaignerDetailsByNumber(number: any) {
    return this.http.get(AppConstants.API_BASE_URL + 'campaigner/getsingleByNumber/' + number);
  }
  
  postPatientImage(data: any) {
    return this.http.post(AppConstants.API_BASE_URL + 'multipleImages/post', data);
  }

  uploadMedicalImages(data: any) {
    return this.http.post(AppConstants.API_BASE_URL + 'uploadmedicalimage/post', data);
  }

  uploadProfileImage(id: any, data: any) {
    return this.http.put(AppConstants.API_BASE_URL + 'campaigner/updateprofilepic/' + id, data);
  }

  updateEmailIdOfCampaigner(data: any) {
    return this.http.post(AppConstants.API_BASE_URL + 'campaigner/updateemailofcampaigner', data);
  }

  getPatientImages(id: any) {
    return this.http.get(AppConstants.API_BASE_URL + 'multipleImages/get/' + id);
  }

  getAllDonorsForCampaigner(id: any) {
    return this.http.get(AppConstants.API_BASE_URL + 'donateoncampaign/getdonors/' + id);
  }

  getAllDonations(id:any){
    return this.http.get(AppConstants.API_BASE_URL + 'donateoncampaign/totalamount/' + id);
  }

  postUpdatedPatientImage(id:any, data: any) {
    return this.http.put(AppConstants.API_BASE_URL + 'campaign_details/postUpdatedPatientImage/'+id, data);
  }

  postLogsOfUpdatedPatientImage(data: any) {
    return this.http.post(AppConstants.API_BASE_URL + 'updatedpatient/post', data);
  }

  getUpdate() {
    return this.http.get(AppConstants.API_BASE_URL + 'updatedpatient/getupdate');
  }
  
  postEmailLogOfCampaigner(data: any) {
    return this.http.post(AppConstants.API_BASE_URL + 'editemaillog/post', data);
  }

  getMedicalImages(id: any) {
    return this.http.get(AppConstants.API_BASE_URL + 'uploadmedicalimage/get/' + id);
  }

  getListOfDonorOnSingleCampaign(id:any){
    return this.http.get(AppConstants.API_BASE_URL + 'donateoncampaign/get/' + id);
  }

  public getAllDropdownList(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'user-type/get');
  }

  public getPurposeDropdownList(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'deseases/getAllDesease');
  }

  public postNgoDetails(data: any) {
    return this.http.post(AppConstants.API_BASE_URL + 'ngodetails/post', data);
  }

  public getRlationDropdownList(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'relationwithpatient/relation');
  }
  public getConditionDropdownList(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'patient_condition/getpatientcondition');
  }
  public getFreuencyDropdownList(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'donatefrequency/get');
  }
  public getMedicalConditionDropdownList(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'medical_dropdown/get');
  }
  public getGenderDropdownList(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'gender/get');
  }
  public getTaxDropdownList(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'taxbenifit/tax');
  }

  public getAboutNgo(id:any){
    return this.http.get(AppConstants.API_BASE_URL + 'ngodetails/get/'+id);
  }

  public postSocialActivistDetails(data: any) {
    return this.http.post(AppConstants.API_BASE_URL + 'socialdetails/post', data);
  }
  public getUnderSectionDropdownList(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'undersection/sections');
  }
  public getMonthlyHelpDropdownList(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'monthlyhelp/help');
  }
  public getDonateDropdownList(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'campaigntype/getAll');
  }

  public getAllPromise(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'promise/get');
  }

  public getAllTopNeededPeople(){
    return this.http.get(AppConstants.API_BASE_URL+"campaign_details/get/topneeded");
  }

  public getAllMostNeededPeople(){
    return this.http.get(AppConstants.API_BASE_URL+"campaign_details/get/mostneeded");
  }


  public getPlansFeature(){
    return this.http.get(AppConstants.API_BASE_URL+"master/get");
  }

  public getPlansFeatureById(id:any){
    return this.http.get(AppConstants.API_BASE_URL+"master/get/"+id);
  }

  // public getAllCampaignsOfCampaigner(id: number) {
  //   return this.http.get(AppConstants.API_BASE_URL + 'campaign_details/getcampaigns/' + id);
  // }

  public getVerifiedCampaigns(id: number) {
    return this.http.get(AppConstants.API_BASE_URL + 'campaign_details/get/completed/' + id);
  }

  public incompletedCampaignsOfCampaigner(id: number) {
    return this.http.get(AppConstants.API_BASE_URL + 'campaign_details/get/incomplete/' + id);
  }

  public getliveCampaigns(id: number) {
    return this.http.get(AppConstants.API_BASE_URL + 'campaign_details/getlive/campaigns/' + id);
  }

  public campaignerLogIn(data: any) {
    return this.http.post(AppConstants.API_BASE_URL + 'campaigner/verifyotpToLogin', data);
  }

  postFirstCampaignForm(data: any) {
    let header = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post(AppConstants.API_BASE_URL + 'campaign_details/post', data);
  }

  postHospitalDetails(id: any, data: any) {
    return this.http.put(AppConstants.API_BASE_URL + 'campaign_details/addhospitaldetails/' + id, data);
  }

  UpdateSocialform(id: any, data: any) {
    return this.http.put(AppConstants.API_BASE_URL + 'campaign_details/edit/' + id, data);
  }

  panDataVerify(pan: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    let options = { headers: headers };
    console.log();
    return this.http.get(AppConstants.API_BASE_URL).pipe(map((response: any) => { return response; }));
  }

  adharDataVerify(aadhaar: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    console.log();
    return this.http.get(AppConstants.API_BASE_URL).pipe(map((response: any) => { return response; }));
  }
  postData(campaigner_email: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': '*'
    });
    return this.http.post(AppConstants.API_BASE_URL + "sendotp/post", campaigner_email).pipe(map((data: any) => data.json()));
  }
  verifyEmail(otp: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': '*'
    })
    return this.http.post(AppConstants.API_BASE_URL + "sendotp/verifyEmail", otp).pipe(map((response: any) => response.json()));
  }
  getAllData() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    console.log();
    return this.http.get(AppConstants.API_BASE_URL).pipe(map((response: any) => { return response; }));
  }

  donateForm(donate: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.http.post(AppConstants.API_BASE_URL + "donordata/post", donate, options).pipe(map((data: any) => { return data }));
  }

  public getAllCampaignData(): Observable<any> {
    return this.http.get(AppConstants.API_BASE_URL + 'campaign_details/getlive/all');
  }

  postOtpSend(data: any): Observable<any> {
    return this.http.post(AppConstants.API_BASE_URL + 'sendotp/post', data).pipe(map((res: any) => res));
  }

  postOtpSendForLogIn(number: any) {
    return this.http.get(AppConstants.API_BASE_URL + 'campaigner/post/'+ number);
  }

  sendOtpToPhone(data:any): Observable<any> {
    return this.http.post(AppConstants.API_BASE_URL + 'campaigner/sendOtpToPhone', data).pipe(map((res: any) => res));
  }

  verifyUpdatedPhoneNumberOfCamapigner(data:any): Observable<any> {
    return this.http.post(AppConstants.API_BASE_URL + 'campaigner/verifyupdatedphonenumber', data).pipe(map((res: any) => res));
  }

  // verifyOtpSend(otp:any):Observable<any>{
  //   let headers = new Headers({ 'Content-Type':'*' });
  //   return this.http.post(AppConstants.API_BASE_URL+'sendotp/verifyEmail',otp).pipe(map((data:any) => data.json()));
  // }
  postTransationDetailsOfDonor(data:any){
    return this.http.post(AppConstants.API_BASE_URL + 'logsOfDonor/post', data);
  }

  InsertIntoWalletTable(data:any){
    return this.http.post(AppConstants.API_BASE_URL + 'wallet/post', data);
  }

  public getFundTargetInfo(id:any){     
    return this.http.get(AppConstants.API_BASE_URL + "campaign_details/getfundtarget/"+id);
  }
  
  UpdateIntoWalletTable(id:any, data:any){
    return this.http.put(AppConstants.API_BASE_URL + 'wallet/update/'+id, data);
  }

  getWalletDetails(id:any){
    return this.http.get(AppConstants.API_BASE_URL + 'wallet/get/'+id);
  }

  donateToCampaign(data:any){
    return this.http.post(AppConstants.API_BASE_URL+"donateoncampaign/post", data);
  }
  userTypesForm(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': '*' });
    console.log("service method" + data);
    return this.http.post(AppConstants.API_BASE_URL + 'campaigner/post', data).pipe(map((res: any) => res));
  }
  updateTermAndCondition(id:any, data: any): Observable<any> {
    return this.http.put(AppConstants.API_BASE_URL + 'campaigner/term/condition/'+id, data).pipe(map((res: any) => res));
  }

  updateCampaignerData(id: any, data: any) {
    return this.http.put(AppConstants.API_BASE_URL + 'campaigner/update/' + id, data);
  }

  updateNgoFormData(id: any, data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': '*' });
    console.log(data);
    return this.http.put(AppConstants.API_BASE_URL + 'campaigner/update/' + id, data).pipe(map((res: any) => res));
  }

  validateOTP(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': '*' });
    return this.http.post(AppConstants.API_BASE_URL + 'sendotp/verifyEmail', data).pipe(map((res: any) => res));
  }

  postLastCampaignForm(id: any, data: any) {
    return this.http.put(AppConstants.API_BASE_URL + "campaign_details/postlastform/" + id, data);
  }

  postMonthelyDetails(donate: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    let options = { headers: header };
    return this.http.post(AppConstants.API_BASE_URL + "monthlyhelpdata/post", donate, options).pipe(map((data: any) => { return data }));
  }

  addCYBData(data: any): Observable<any> {
    let header = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(AppConstants.API_BASE_URL + "celebrateyourbirthday/post", data).pipe(map((data: any) => { return data; }));
  }

  hospital = [
    {
      name: "apollo",
    }, {

      name: "avantika",
    }, {
      name: "fortis",
    }
  ]



}



