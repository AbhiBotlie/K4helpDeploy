import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BrowseCampaignComponent } from './pages/browse-campaign/browse-campaign.component';
import { CelebrateYourBirthdayComponent } from './pages/celebrate-your-birthday/celebrate-your-birthday.component';
import { DonateComponent } from './pages/donate/donate.component';
import { IndividualAccountDetailsComponent } from './pages/fixed side nav/individual-dashboard/individual-account-details/individual-account-details.component';
import { IndividualCampaginPageComponent } from './pages/fixed side nav/individual-dashboard/individual-campagin-page/individual-campagin-page.component';
import { IndividualDashboardComponent } from './pages/fixed side nav/individual-dashboard/individual-dashboard.component';
import { IndividualDonationComponent } from './pages/fixed side nav/individual-dashboard/individual-donation/individual-donation.component';
import { IndividualFundTargetComponent } from './pages/fixed side nav/individual-dashboard/individual-fund-target/individual-fund-target.component';
import { IndividualListOfDonationComponent } from './pages/fixed side nav/individual-dashboard/individual-list-of-donation/individual-list-of-donation.component';
import { IndividualListOfDonorComponent } from './pages/fixed side nav/individual-dashboard/individual-list-of-donor/individual-list-of-donor.component';
import { IndividualLogoutComponent } from './pages/fixed side nav/individual-dashboard/individual-logout/individual-logout.component';
import { IndividualMyCampaginComponent } from './pages/fixed side nav/individual-dashboard/individual-my-campagin/individual-my-campagin.component';
import { IndividualPatientDetailsComponent } from './pages/fixed side nav/individual-dashboard/individual-patient-details/individual-patient-details.component';
import { IndividualPatientKYCComponent } from './pages/fixed side nav/individual-dashboard/individual-patient-kyc/individual-patient-kyc.component';
import { IndividualPlansComponent } from './pages/fixed side nav/individual-dashboard/individual-plans/individual-plans.component';
import { IndividualProfileComponent } from './pages/fixed side nav/individual-dashboard/individual-profile/individual-profile.component';
import { IndividualStoryComponent } from './pages/fixed side nav/individual-dashboard/individual-story/individual-story.component';
import { IndividualUpdatesComponent } from './pages/fixed side nav/individual-dashboard/individual-updates/individual-updates.component';
import { IndividualWithdrawlRequestComponent } from './pages/fixed side nav/individual-dashboard/individual-withdrawl-request/individual-withdrawl-request.component';
import { LoginComponent } from './pages/login/login.component';
import { MonthlyHelpComponent } from './pages/monthly-help/monthly-help.component';
import { NewsLetterComponent } from './pages/news-letter/news-letter.component';
import { IndividualComponent } from './pages/start_campaign/individual/individual.component';
import { NgoComponent } from './pages/start_campaign/ngo/ngo.component';
import { IndividualManagebannerComponent } from './pages/fixed side nav/individual-dashboard/individual-managebanner/individual-managebanner.component';
import { IndividualManageimagesComponent } from './pages/fixed side nav/individual-dashboard/individual-manageimages/individual-manageimages.component';
import { StartCampaignComponent } from './pages/start_campaign/start-campaign/start-campaign.component';
import { CampaignPageIndividualComponent } from './pages/campaign-page-individual/campaign-page-individual.component';
import { LoaderComponent } from './loader/loader.component';
import { IndividualIncompletedCampaignsComponent } from './pages/fixed side nav/individual-dashboard/individual-incompleted-campaigns/individual-incompleted-campaigns.component';
import { EditIndividualCampaignerComponent } from './pages/fixed side nav/individual-dashboard/edit-individual-campaigner/edit-individual-campaigner.component';
import { ProfileEditCampaignerComponent } from './pages/fixed side nav/individual-dashboard/profile-edit-campaigner/profile-edit-campaigner.component';
import { VerifiedCampaignsComponent } from './pages/fixed side nav/individual-dashboard/verified-campaigns/verified-campaigns.component';
import { AboutSocialActivistUserComponent } from './pages/fixed side nav/individual-dashboard/about-social-activist-user/about-social-activist-user.component';
import { AboutNGOUserComponent } from './pages/fixed side nav/individual-dashboard/about-ngo-user/about-ngo-user.component';
import { PaymentResponseComponent } from './pages/payment-response/payment-response.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermAndConditionComponent } from './term-and-condition/term-and-condition.component';


const routes: Routes = [
  {path: 'loader', component: LoaderComponent},
  {path: 'home', component: HeaderComponent},
  {path: '', component: HomeComponent},
  {path: 'browser', component: BrowseCampaignComponent},
  {path: 'CelebrateYourBirthday', component:CelebrateYourBirthdayComponent},
  {path: 'MonthlyHelp', component:MonthlyHelpComponent},
  {path: 'startCampaign', component:StartCampaignComponent},
  {path: 'startCampaign/individualCampaign', component:IndividualComponent},
  {path: 'startCampaign/ngoCampaign', component:NgoComponent},
  {path: 'ngoCampaign', component:NgoComponent},
  {path: 'Donate', component:DonateComponent}, 
  {path:'paymentstatus', component: PaymentResponseComponent},
  {path: 'login', component:LoginComponent}, 
  {path: 'newsLetter',component:NewsLetterComponent},
  {path:'campaginpage/:id',component:CampaignPageIndividualComponent},
  {path: 'aboutus',component:AboutUsComponent},
  {path: 'termandcondition',component:TermAndConditionComponent},
  {path: 'individualdashboard',component:IndividualDashboardComponent,
  children:[

    {path:'individualprofile',component:IndividualProfileComponent},
    {path:'individualdonation',component:IndividualDonationComponent},
    {path:'individualmanagebanner',component:IndividualManagebannerComponent},
    {path:'individualmanageimages',component:IndividualManageimagesComponent},
    {path:'individualaccountdetails',component:IndividualAccountDetailsComponent},
    {path:'individualwithdrawlrequest',component:IndividualWithdrawlRequestComponent},
    {path:'individualpatientdetails',component:IndividualPatientDetailsComponent},
    {path:'individualpatientkyc',component:IndividualPatientKYCComponent},
    {path:'individualmycampagin',component:IndividualMyCampaginComponent},
    {path:'individualincompleteCampaign',component:IndividualIncompletedCampaignsComponent},
    {path:'individualverifiedcampagins',component:VerifiedCampaignsComponent},
    {path:'individualstory',component:IndividualStoryComponent},
    {path:'individualupdates',component:IndividualUpdatesComponent},
    {path:'individualplans',component:IndividualPlansComponent},
    {path:'individualfundtarget',component:IndividualFundTargetComponent},
    {path:'individuallistofdonor',component:IndividualListOfDonorComponent},
    {path:'individuallistofdonation',component:IndividualListOfDonationComponent},
    {path:'individualcampaginpage',component:IndividualCampaginPageComponent},
    {path:'individuallogout',component:IndividualLogoutComponent},
    {path:'editcampaignerdetails/:id',component:EditIndividualCampaignerComponent},
    {path:'profile',component:ProfileEditCampaignerComponent},
    {path:'aboutSocialActivist',component:AboutSocialActivistUserComponent},
    {path:'aboutNGO',component:AboutNGOUserComponent},   
  ]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
