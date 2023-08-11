import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { RootComponent } from './root/root.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CelebrateYourBirthdayComponent } from './pages/celebrate-your-birthday/celebrate-your-birthday.component';
import { BrowseCampaignComponent } from './pages/browse-campaign/browse-campaign.component';
import { MonthlyHelpComponent } from './pages/monthly-help/monthly-help.component';
import { DonateComponent } from './pages/donate/donate.component';
import { LoginComponent } from './pages/login/login.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NewsLetterComponent } from './pages/news-letter/news-letter.component';
import { IndividualDashboardComponent } from './pages/fixed side nav/individual-dashboard/individual-dashboard.component';
import { IndividualComponent } from './pages/start_campaign/individual/individual.component';
import { NgoComponent } from './pages/start_campaign/ngo/ngo.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IndividualProfileComponent } from './pages/fixed side nav/individual-dashboard/individual-profile/individual-profile.component';
import { IndividualDonationComponent } from './pages/fixed side nav/individual-dashboard/individual-donation/individual-donation.component';
import { IndividualManagebannerComponent } from './pages/fixed side nav/individual-dashboard/individual-managebanner/individual-managebanner.component';
import { IndividualManageimagesComponent } from './pages/fixed side nav/individual-dashboard/individual-manageimages/individual-manageimages.component';
import { IndividualAccountDetailsComponent } from './pages/fixed side nav/individual-dashboard/individual-account-details/individual-account-details.component';
import { IndividualWithdrawlRequestComponent } from './pages/fixed side nav/individual-dashboard/individual-withdrawl-request/individual-withdrawl-request.component';
import { IndividualPatientDetailsComponent } from './pages/fixed side nav/individual-dashboard/individual-patient-details/individual-patient-details.component';
import { IndividualPatientKYCComponent } from './pages/fixed side nav/individual-dashboard/individual-patient-kyc/individual-patient-kyc.component';
import { IndividualMyCampaginComponent } from './pages/fixed side nav/individual-dashboard/individual-my-campagin/individual-my-campagin.component';
import { IndividualStoryComponent } from './pages/fixed side nav/individual-dashboard/individual-story/individual-story.component';
import { IndividualUpdatesComponent } from './pages/fixed side nav/individual-dashboard/individual-updates/individual-updates.component';
import { IndividualPlansComponent } from './pages/fixed side nav/individual-dashboard/individual-plans/individual-plans.component';
import { IndividualFundTargetComponent } from './pages/fixed side nav/individual-dashboard/individual-fund-target/individual-fund-target.component';
import { IndividualListOfDonorComponent } from './pages/fixed side nav/individual-dashboard/individual-list-of-donor/individual-list-of-donor.component';
import { IndividualListOfDonationComponent } from './pages/fixed side nav/individual-dashboard/individual-list-of-donation/individual-list-of-donation.component';
import { IndividualCampaginPageComponent } from './pages/fixed side nav/individual-dashboard/individual-campagin-page/individual-campagin-page.component';
import { IndividualLogoutComponent } from './pages/fixed side nav/individual-dashboard/individual-logout/individual-logout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { DeletePopupComponent } from './pages/fixed side nav/delete-popup/delete-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { IndividualAddAccountformComponent } from './pages/fixed side nav/individual-add-accountform/individual-add-accountform.component';
import { CampaignPageIndividualComponent } from './pages/campaign-page-individual/campaign-page-individual.component';
import { HomeDialogComponent } from './dialogbox/home-dialog/home-dialog.component';
import { StartCampaignComponent } from './pages/start_campaign/start-campaign/start-campaign.component';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';
import { MsgPopUpComponent } from './pages/start_campaign/msg-pop-up/msg-pop-up.component';
import { AddStoryComponent } from './pages/fixed side nav/add-story/add-story.component';
import { AddUpdateComponent } from './pages/fixed side nav/add-update/add-update.component';
import { StylePaginatorDirective } from './DirectivePagSty';
import { IncorrectotpComponent } from './pages/start_campaign/incorrectotp/incorrectotp.component';
import { ExpiredotpComponent } from './pages/start_campaign/expiredotp/expiredotp.component';
import { InvalidemailComponent } from './pages/start_campaign/invalidemail/invalidemail.component';
import { WelcometodashboardComponent } from './pages/start_campaign/welcometodashboard/welcometodashboard.component';
import { OtpfilledpopupComponent } from './pages/start_campaign/otpfilledpopup/otpfilledpopup.component';
import { EditAccountFormComponent } from './pages/fixed side nav/edit-account-form/edit-account-form.component';
import { EditBannerComponent } from './pages/fixed side nav/edit-banner/edit-banner.component';
import { EditPatientDetailsComponent } from './pages/fixed side nav/edit-patient-details/edit-patient-details.component';
import { LoaderComponent } from './loader/loader.component';
import { WrongUsertypePopupComponent } from './pages/start_campaign/wrong-usertype-popup/wrong-usertype-popup.component';
import { NewuserotpfillComponent } from './pages/start_campaign/newuserotpfill/newuserotpfill.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { IndividualIncompletedCampaignsComponent } from './pages/fixed side nav/individual-dashboard/individual-incompleted-campaigns/individual-incompleted-campaigns.component';
import { CampaignFormComponent } from './pages/fixed side nav/campaign-form/campaign-form.component';
import { DatePipe } from '@angular/common';
import { EditIndividualCampaignerComponent } from './pages/fixed side nav/individual-dashboard/edit-individual-campaigner/edit-individual-campaigner.component';
import { ProfileEditCampaignerComponent } from './pages/fixed side nav/individual-dashboard/profile-edit-campaigner/profile-edit-campaigner.component';
import { VerifiedCampaignsComponent } from './pages/fixed side nav/individual-dashboard/verified-campaigns/verified-campaigns.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AboutNGOUserComponent } from './pages/fixed side nav/individual-dashboard/about-ngo-user/about-ngo-user.component';
import { AboutSocialActivistUserComponent } from './pages/fixed side nav/individual-dashboard/about-social-activist-user/about-social-activist-user.component';
import { EditemailofcampaignerpopupComponent } from './editemailofcampaignerpopup/editemailofcampaignerpopup.component';
import { EditPhoneNumberOfCampaignerPopUpComponent } from './edit-phone-number-of-campaigner-pop-up/edit-phone-number-of-campaigner-pop-up.component';
import { NumberAlreadyExistsComponent } from './number-already-exists/number-already-exists.component';
import { OTPCorrectComponent } from './otpcorrect/otpcorrect.component';
import { PopUpForMessages } from './pop-up-for-messages/pop-up-for-messages';
import { PaymentResponseComponent } from './pages/payment-response/payment-response.component';
import { CampaignDonatePageComponent } from './campaign-donate-page/campaign-donate-page.component';
import { SharebtnComponentComponent } from './pages/sharebtn-component/sharebtn-component.component';
import { RequestWithdrawlPopupComponent } from './pages/fixed side nav/request-withdrawl-popup/request-withdrawl-popup.component';
import { PlansPopUpComponent } from './plans-pop-up/plans-pop-up.component';
import { NextbuttonDirective } from './nextbutton.directive';
import { PrevbuttonDirective } from './prevbutton.directive';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermAndConditionComponent } from './term-and-condition/term-and-condition.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CelebrateYourBirthdayComponent,
    BrowseCampaignComponent,
    MonthlyHelpComponent,
    DonateComponent,
    LoginComponent,
    NewsLetterComponent,
    IndividualDashboardComponent,
    IndividualComponent,
    NgoComponent,
    IndividualProfileComponent,
    IndividualDonationComponent,
    IndividualManagebannerComponent,
    IndividualManageimagesComponent,
    IndividualAccountDetailsComponent,
    IndividualWithdrawlRequestComponent,
    IndividualPatientDetailsComponent,
    IndividualPatientKYCComponent,
    IndividualMyCampaginComponent,
    IndividualStoryComponent,
    IndividualUpdatesComponent,
    IndividualPlansComponent,
    IndividualFundTargetComponent,
    IndividualListOfDonorComponent,
    IndividualListOfDonationComponent,
    IndividualCampaginPageComponent,
    IndividualLogoutComponent,
    DeletePopupComponent,
    IndividualAddAccountformComponent,
    CampaignPageIndividualComponent,
    HomeDialogComponent,
    StartCampaignComponent,
    NextDirective,
    PrevDirective,
    MsgPopUpComponent,
    AddStoryComponent,
    AddUpdateComponent,
    StylePaginatorDirective,
    IncorrectotpComponent,
    ExpiredotpComponent,
    InvalidemailComponent,
    WelcometodashboardComponent,
    OtpfilledpopupComponent,
    EditAccountFormComponent,
    EditBannerComponent,
    EditPatientDetailsComponent,
    LoaderComponent,
    WrongUsertypePopupComponent,
    NewuserotpfillComponent,
    IndividualIncompletedCampaignsComponent,
    CampaignFormComponent,
    EditIndividualCampaignerComponent,
    ProfileEditCampaignerComponent,
    VerifiedCampaignsComponent,
    AboutNGOUserComponent,
    AboutSocialActivistUserComponent,
    EditemailofcampaignerpopupComponent,
    EditPhoneNumberOfCampaignerPopUpComponent,
    NumberAlreadyExistsComponent,
    OTPCorrectComponent,
    PopUpForMessages,
    PaymentResponseComponent,
    CampaignDonatePageComponent,
    SharebtnComponentComponent,
    RequestWithdrawlPopupComponent,
    PlansPopUpComponent,
    NextbuttonDirective,
    PrevbuttonDirective,
    AboutUsComponent,
    TermAndConditionComponent, 
  ],

  
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule, MatIconModule,
    MatDividerModule,
    MatListModule,
    ScrollingModule,
    MatProgressBarModule,
    MatGridListModule,
    MatDialogModule,
    DragDropModule,
    DatePipe,
    MatTooltipModule,
    MatIconModule,
    IvyCarouselModule,
    MatExpansionModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
  ],

  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
