import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';

@Component({
  selector: 'app-individual-incompleted-campaigns',
  templateUrl: './individual-incompleted-campaigns.component.html',
  styleUrls: ['./individual-incompleted-campaigns.component.css']
})
export class IndividualIncompletedCampaignsComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  MyCampagin = ['serialNo', 'campaignerId', 'campaignerName', 'Startdate /lastdate', 'Recived Amount', 'Required Amount', 'Remaining Amount', 'Withdrwal Amount', 'Final View', 'Active']

  public array: any;
  openBanner!: boolean;
  openAccountDetails!: boolean;
  benificaryDetail!: boolean;
  fundTargets!: boolean;
  openSocialMediaPage!: boolean;
  addCampaignPlan!: boolean;
  addCampaignImage!: boolean;
  addCampaignUpdate!: boolean;
  addCampaignBannerImage!: boolean;
  addCampaigntKyc = true;
  patientName: any;
  patientEmail: any;
  editPatientDetails!: boolean;
  addPatientImgToCampaign!: FormGroup;
  patientConditionUpdate!: FormGroup;
  patientPhoneNumber: any;
  patientRelation: any;
  requiredAmount: any;
  city: any;
  gender: any;
  campaignerId: any;
  patientCondition: any;
  targetDate: any;
  campaignPurpose: any;
  causeCategory: any;
  patientDetails = false;
  campaignerData: any;
  patientAge: any;
  campaigner_phone: any;
  camapignerForm!: FormGroup;
  accountDetails!: FormGroup;
  addBanner!: FormGroup;
  userForm!: FormGroup;
  patientKyc!: FormGroup;
  addPlanToCampaign!: FormGroup;
  campaignData = Array<any>();
  campaignCount: number = 0;
  campaignId: any;
  srcResult: any;
  dataSource: any;
  incompleteCampign = false;
  completedCampaign = true;
  image: any;
  pageSizeOptions: number[] = [1, 5, 10, 25, 100];
  public pageSize = 7;
  public currentPage = 0;
  public pageLength = 100;
  public totalSize = 0;
  MyCampagin1 = ['serialNo', 'campaignerId', 'campaignerName', 'Startdate /lastdate', 'Recived Amount', 'Required Amount', 'Remaining Amount', 'Withdrwal Amount', 'Final View',];

  displayedColumns: string[] = ['position', 'name', 'weight'];

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit(): void {

    this.campaignerId = sessionStorage.getItem('campaignerId');
    var campaignerData = JSON.parse(localStorage.getItem('campaginerdetails') || '{}')
    this.campaignerData = campaignerData.value;
    this.campaigner_phone = campaignerData.campaignerNumber;
    this.service.incompletedCampaignsOfCampaigner(this.campaignerId).subscribe((response: any) => {  
      this.dataSource = response;
      this.getArray();
      this.userForm = new FormGroup({
        campaignerId: new FormControl("", Validators.required),
        patient_condition: new FormControl("", Validators.compose([Validators.required])),
        required_amount: new FormControl("", [Validators.required, Validators.minLength(3)]),
        target_date: new FormControl("", Validators.required),
        campaign_purpose: new FormControl("", Validators.compose([Validators.required])),
        patient_name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
        patient_email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        patient_number: new FormControl("", ([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0_%+-)?[6,7,8,9][0-9]{0,9}$")])),
        patient_age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern("^[1-9]?[0-9]{1}$|^100$")]),
        city: new FormControl("", ([Validators.required])),
        gender: new FormControl("", ([Validators.required])),
        patient_relation: new FormControl("", Validators.compose([Validators.required])),
        cause_category: new FormControl("", Validators.compose([Validators.required])),
      })
    })
    this.camapignerForm = new FormGroup({
      campaigner_name: new FormControl("", Validators.required),
      campaignerEmail: new FormControl("", Validators.required),
      campaignerNumber: new FormControl("", Validators.required),
      campaignerDob: new FormControl("", Validators.required),
      campaignerAadharNo: new FormControl("", Validators.required),
      campaignerPanNo: new FormControl("", Validators.required),
      campaignerId: new FormControl("", Validators.required),
    })
    this.patientConditionUpdate = new FormGroup({
      conditionUpdate: new FormControl("", Validators.required),
    })

    this.addPatientImgToCampaign = new FormGroup({
      patientImage: new FormControl("", Validators.required),
    })

    this.addBanner = new FormGroup({
      banner: new FormControl("", Validators.required),
    })

    this.addPlanToCampaign = new FormGroup({
      selected_plan: new FormControl("", Validators.required),
    })

    this.patientKyc = new FormGroup({
      aadhar_no: new FormControl("", Validators.required),
      pan_no: new FormControl("", Validators.required),
      panCard: new FormControl("", Validators.required),
      images: new FormControl("", Validators.required),
      banner: new FormControl("", Validators.required),
    })

    this.accountDetails = new FormGroup({
      beneficiary_name: new FormControl("", Validators.required),
      bank_name: new FormControl("", Validators.required),
      branchName: new FormControl("", Validators.required),
      ifsc_code: new FormControl("", Validators.required),
      account_no: new FormControl("", Validators.required),
    })


  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private getArray() {
   
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }

  onSelect(event: any) {

    this.campaignId = event.target.value;


    if (this.campaignId != "") {
      this.service.getSingleCampaignData(this.campaignId).subscribe((res: any) => {

        this.image = AppConstants.CAMPAIGN_BANNER + res.bannerImage;


        this.userForm.get('patient_name')?.setValue(res.patient_name);
        this.patientName = res.patient_name;
        this.userForm.get('patient_number')?.setValue(res.patient_number);
        this.patientPhoneNumber = res.patient_number;
        this.userForm.get('patient_email')?.setValue(res.patient_email);
        this.patientEmail = res.patient_email;;
        this.userForm.get('patient_age')?.setValue(res.patient_age);
        this.patientAge = res.patient_age;
        this.userForm.get('gender')?.setValue(res.gender);
        this.gender = res.gender;
        this.userForm.get('city')?.setValue(res.city);
        this.city = res.city;
        this.userForm.get('patient_condition')?.setValue(res.patient_condition);
        this.patientCondition = res.patient_condition;
        this.userForm.get('campaign_purpose')?.setValue(res.campaign_purpose);
        this.campaignPurpose = res.campaign_purpose;
        this.userForm.get('patient_relation')?.setValue(res.patient_relation);
        this.patientRelation = res.patient_relation;
        this.userForm.get('target_date')?.setValue(res.target_date);
        this.targetDate = res.target_date;
        this.userForm.get('cause_category')?.setValue(res.cause_category);
        this.causeCategory = res.cause_category;
        this.userForm.get('required_amount')?.setValue(res.required_amount);
        this.requiredAmount = res.required_amount;
        this.accountDetails.get('bank_name')?.setValue(res.bank_name);
        this.accountDetails.get('branchName')?.setValue(res.branchName);
        this.accountDetails.get('beneficiary_name')?.setValue(res.beneficiary_name);
        this.accountDetails.get('account_no')?.setValue(res.account_no);
        this.accountDetails.get('ifsc_code')?.setValue(res.ifsc_code);
        this.patientConditionUpdate.get("conditionUpdate")?.setValue(res.conditionUpdate);
        this.addPlanToCampaign.get("selected_plan")?.setValue(res.selected_plan);
        this.patientKyc.get("pan_no")?.setValue(res.pan_no);
        this.patientKyc.get("aadhar_no")?.setValue(res.aadhar_no);
      })
    }

  }

  onAdharSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = (event.target.files[0] as File)
      this.patientKyc.get('images')?.setValue(file);
    }
  }

  deletePatientImage() {

  }

  onPanSelected(event: any) {
    if (event.target.files.length > 0) {
      const file1 = (event.target.files[0] as File)
      this.patientKyc.get('panCard')?.setValue(file1);
    }
  }

  onBannerSelected(event: any) {
    if (event.target.files.length > 0) {
      const file1 = (event.target.files[0] as File)
      this.patientKyc.get('banner')?.setValue(file1);
      console.log(this.patientKyc.get('banner')?.value);
    }
  }

  onPatientImgSelected(event: any) {
    if (event.target.files.length > 0) {
      const file1 = (event.target.files[0] as File)
      this.addPatientImgToCampaign.get('patientImage')?.setValue(file1);
      console.log(this.addPatientImgToCampaign.get('patientImage')?.value);
    }
  }

  chnageToEditable(id: any) {
    this.router.navigate(['individualdashboard/editcampaignerdetails/' + id]);
  }
  onClickOpenAccountDetail() {
    if (this.openAccountDetails != true) {
      this.openAccountDetails = true;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.addCampaignPlan = false;
      this.addCampaignImage = false;
      this.addCampaignUpdate = false;
      this.addCampaignBannerImage = false;
      this.addCampaigntKyc = false;
      this.patientDetails = false;
      this.editPatientDetails = false;
    }
  }

  addPatientKyc() {
    if (this.addCampaigntKyc != true) {
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.addCampaignPlan = false;
      this.addCampaignImage = false;
      this.addCampaignUpdate = false;
      this.addCampaignBannerImage = false;
      this.addCampaigntKyc = true;
      this.patientDetails = false;
      this.editPatientDetails = false;
    }
  }

  addUpdate() {
    if (this.addCampaignUpdate != true) {
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.addCampaignPlan = false;
      this.addCampaignImage = false;
      this.addCampaignUpdate = true;
      this.addCampaignBannerImage = false;
      this.addCampaigntKyc = false;
      this.patientDetails = false;
      this.editPatientDetails = false;
    }
  }

  addPlan() {
    if (this.addCampaignPlan != true) {
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.addCampaignPlan = true;
      this.addCampaignImage = false;
      this.addCampaignUpdate = false;
      this.addCampaignBannerImage = false;
      this.addCampaigntKyc = false;
      this.patientDetails = false;
      this.editPatientDetails = false;
    }
  }

  addBannerImage() {
    if (this.addCampaignBannerImage != true) {
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.addCampaignPlan = false;
      this.addCampaignImage = false;
      this.addCampaignUpdate = false;
      this.addCampaignBannerImage = true;
      this.addCampaigntKyc = false;
      this.patientDetails = false;
      this.editPatientDetails = false;
    }
  }

  addImage() {
    if (this.addCampaignImage != true) {
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.addCampaignPlan = false;
      this.addCampaignImage = true;
      this.addCampaignUpdate = false;
      this.addCampaignBannerImage = false;
      this.addCampaigntKyc = false;
      this.patientDetails = false;
      this.editPatientDetails = false;
    }
  }

  addPatientDetails() {
    if (this.patientDetails != true) {
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.addCampaignPlan = false;
      this.addCampaignImage = false;
      this.addCampaignUpdate = false;
      this.addCampaignBannerImage = false;
      this.addCampaigntKyc = false;
      this.patientDetails = true;
      this.editPatientDetails = false;
    }
  }
  editDetails() {
    if (this.editPatientDetails != true) {
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.addCampaignPlan = false;
      this.addCampaignImage = false;
      this.addCampaignUpdate = false;
      this.addCampaignBannerImage = false;
      this.addCampaigntKyc = false;
      this.patientDetails = false;
      this.editPatientDetails = true;
    }
  }

  updatePatientDetails() {
    if (this.campaignId != null) {
      this.service.updatePatientDetails(this.campaignId, this.userForm.value).subscribe((res: any) => {
        this.patientName = res.patient_name;
        this.patientPhoneNumber = res.patient_number;
        this.patientEmail = res.patient_email;
        this.patientAge = res.patient_age;
        this.city = res.city;
        this.patientCondition = res.patient_condition;
        this.campaignPurpose = res.campaign_purpose;
        this.patientRelation = res.patient_relation;
        this.targetDate = res.target_date;
        this.causeCategory = res.cause_category;
        this.requiredAmount = res.required_amount;
      })
      alert("Data Updated Successfully !!")
      this.addPatientDetails();
    }
  }

  updateAccountDetails() {
    if (this.campaignId != null) {
      this.service.updateAccountDetails(this.campaignId, this.accountDetails.value).subscribe((res: any) => {
        console.log(res);

      })
    }
  }
  submitForPatientKyc() {
    if (this.campaignId != null) {
      const patientKycData = new FormData();
      patientKycData.append('images', this.patientKyc.get('images')?.value);
      console.log(this.patientKyc.get('images')?.value);

      patientKycData.append('panCard', this.patientKyc.get('panCard')?.value);
      patientKycData.append('pan_no', this.patientKyc.get('pan_no')?.value);
      patientKycData.append('aadhar_no', this.patientKyc.get('aadhar_no')?.value);
      this.service.updatePatientKycDocs(this.campaignId, patientKycData).subscribe((res: any) => {
        console.log(res);
      })
    }
  }

  viewIncompleteCampaignPage(id: any) {
    this.router.navigate(['campaginpage/' + id]);
  }

  conditionUpdate() {
    if (this.campaignId != null) {
      this.service.updatePatientCondition(this.campaignId, this.patientConditionUpdate.value).subscribe((res: any) => {
        console.log(res);

      })
    }
  }

  planSubmit() {
    // if (this.campaignId != null) {
    //   this.service.addPlanToCampaign(this.campaignId, this.addPlanToCampaign.value).subscribe((res: any) => {
    //     console.log(res);

    //   })
    // }
  }

  addBannerToCampaign() {
    if (this.campaignId != null) {
      const patientKycData = new FormData();
      patientKycData.append('banner', this.patientKyc.get('banner')?.value);
      this.service.addBannerToCampaign(this.campaignId, patientKycData).subscribe((res: any) => {
        console.log(res);

      })
    }
  }

  patientImageToCampaign() {
    if (this.campaignId != null) {
      const patientKycData = new FormData();
      patientKycData.append('patientImage', this.addPatientImgToCampaign.get('patientImage')?.value);
      this.service.patientImageToCampaign(this.campaignId, patientKycData).subscribe((res: any) => {
        console.log(res);

      })
    }
  }




  onClicked() {
    this.router.navigate(["/startCampaign/individualCampaign"])
  }

  dataSourcee = [{ "id": "1", "campaignId": "amit", "amount": "0", "employee_age": "0", "profile_image": "" }
    , { "id": "247793", "campaignId": "Ana", "amount": "123", "employee_age": "123", "profile_image": "" },
  { "id": "247856", "campaignId": "Joseph Beltran", "amount": "1000", "employee_age": "23", "profile_image": "" },
  { "id": "247982", "campaignId": "testyeyyeye1", "amount": "123", "employee_age": "23", "profile_image": "" },
  { "id": "248038", "campaignId": "Hendry", "amount": "61888", "employee_age": "26", "profile_image": "" }]



}


