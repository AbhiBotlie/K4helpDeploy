import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { startWith, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Country } from 'src/app/pages/donate/donate.component';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';
import { DashboardService } from '../../dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { PlansPopUpComponent } from 'src/app/plans-pop-up/plans-pop-up.component';

@Component({
  selector: 'app-edit-individual-campaigner',
  templateUrl: './edit-individual-campaigner.component.html',
  styleUrls: ['./edit-individual-campaigner.component.css']
})
export class EditIndividualCampaignerComponent implements OnInit {

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
  editPatientDetails!: boolean;
  uploadMedicalDocuments!: boolean;
  addStoryToCampaign!: boolean;
  addHospitalDetailsToCampaign!: boolean;
  patientName: any;
  patientEmail: any;
  patientPhoneNumber: any;
  patientRelation: any;
  requiredAmount: any;
  array1: any = [];
  city: any;
  gender: any;
  campaignerId: any;
  patientCondition: any;
  targetDate: any;
  campaignPurpose: any;
  causeCategory: any;
  patientDetails!: boolean;
  campaignerData: any;
  patientAge: any;
  campaigner_phone: any;
  image: any;
  campaignId: any;
  srcResult: any;
  dataSource1: any;
  dataSource2: any;
  campaignData = Array<any>();
  campaignCount: number = 0;
  uploadPatientImage!: FormGroup;
  camservicegnerForm!: FormGroup;
  addStoryToCampaignFormGroup!: FormGroup;
  addHospitalDetailsToCampaignFormGroup!: FormGroup;
  accountDetails!: FormGroup;
  addPatientImgToCampaign!: FormGroup;
  patientConditionUpdate!: FormGroup;
  addBanner!: FormGroup;
  userForm!: FormGroup;
  patientKyc!: FormGroup;
  addPlanToCampaign!: FormGroup;
  uploadMedicalDocumentsOfCampaign!: FormGroup;
  cities = new Array<any>();
  filteredCities: Observable<Country[]> | undefined;
  user_type = new Array<any>();
  relations = new Array<any>();
  deseases = new Array<any>();
  conditions = new Array<any>();
  frequencies = new Array<any>();
  genders = new Array<any>();
  medicals = new Array<any>();
  values = new Array<any>();
  plans = new Array<any>();
  incompleteCampign = false;
  patientAdharImage: any;
  serverImage= AppConstants.IMAGE_BASE_URL;
  patientPanImage: any;
  patientUpdatedImage: any;
  completedCampaign = true;
  TestArray: any = [];
  MyCampagin1 = ['serialNo', 'campaignerId', 'campaignerName', 'Startdate /lastdate', 'Recived Amount', 'Required Amount', 'Remaining Amount', 'Withdrwal Amount', 'Final View', 'Active', 'Deactive'];
  displayedColumns = ['position', 'campId', 'name', 'weight'];
  madicalTable = ['position', 'campId', 'name', 'weight']
  selectedType: any;
  minDate: any;
  cityCtrl = new FormControl('');
  mynewArray = new Array<any>();
  text: any;
  arryOfSelectedCheckbox: any = [];
  test: any;
  valueOfFeature: any;
  plan = {
    "value": [],
    "planName": "",
    "number": 1
  };
  MAIN_ID: any;
  constructor(private service: ApiService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
    this.minDate = new Date();
    this.filteredCities = this.cityCtrl.valueChanges.pipe(
      startWith(''),
      map(name => (name ? this._filterCities(name) : this.cities.slice())),
    );
    this.campaignId = this.route.snapshot.paramMap.get('id');
  }

  private _filterCities(value: string) {
    const filterValue = value.toLowerCase();
    return this.cities.filter(cities => cities.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.service.getSingleCampaignData(this.campaignId).subscribe((res: any) => {
      this.service.getSinglePlan(res.selected_plan).subscribe((response: any) => {
        this.plan.planName = response.planName;
        this.plan.number = response.selected_plan;
        this.MAIN_ID = res.selected_plan;

      })
    });
    this.service.getPlansFeature().subscribe((res: any) => {
      this.mynewArray = res;
    })
    this.service.getAllPlans().subscribe((res: any) => {
      this.plans = res;

    })

    this.campaignerId = sessionStorage.getItem("campaignerId");
    this.campaignId = this.route.snapshot.paramMap.get('id')
    var campaignerData = JSON.parse(localStorage.getItem('campaginerdetails') || '{}')
    this.campaigner_phone = campaignerData.campaignerNumber;
    this.service.getCampaignerDetails(this.campaignerId).subscribe((response: any) => {
      this.service.incompletedCampaignsOfCampaigner(response.campaignerId).subscribe((res: any) => {
        this.campaignData = res;
        this.campaignCount = this.campaignData.length;
      })
    })

    this.service.getPatientImages(this.campaignId).subscribe((res: any) => {
      this.dataSource1 = res;
    })
    this.service.getMedicalImages(this.campaignId).subscribe((res: any) => {
      this.dataSource2 = res;
    })

    this.service.getAllDropdownList().subscribe((response: any) => {
      this.user_type = response;
    });
    this.service.getPurposeDropdownList().subscribe((response: any) => {
      this.deseases = response;
    });
    this.service.getRlationDropdownList().subscribe((response: any) => {
      this.relations = response;
    });
    this.service.getConditionDropdownList().subscribe((response: any) => {
      this.conditions = response;
    });
    // this.service.getFreuencyDropdownList().subscribe((response: any) => {
    //   this.frequencies = response;
    // });
    this.service.getDonateDropdownList().subscribe((response: any) => {
      this.medicals = response;
    });
    // this.service.getMedicalConditionDropdownList().subscribe((response: any) => {
    //   this.values = response;
    // });
    this.service.getGenderDropdownList().subscribe((response: any) => {
      this.genders = response;
    });
    //this.cities = this.service.city;


    this.userForm = new FormGroup({
      patient_name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      patient_email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      patient_number: new FormControl("", ([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0_%+-)?[6,7,8,9][0-9]{0,9}$")])),
      patient_age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern("^[1-9]?[0-9]{1}$|^100$")]),
      gender: new FormControl("", ([Validators.required])),
      patient_condition: new FormControl("", Validators.compose([Validators.required])),
      patient_relation: new FormControl("", Validators.compose([Validators.required])),
      campaign_purpose: new FormControl("", Validators.compose([Validators.required])),
      required_amount: new FormControl("", [Validators.required, Validators.minLength(3)]),
      target_date: new FormControl("", Validators.required),
      cause_category: new FormControl("", Validators.compose([Validators.required])),
      city: new FormControl("", ([Validators.required])),
    })

    this.addStoryToCampaignFormGroup = new FormGroup({
      description: new FormControl("", Validators.compose([Validators.required])),
    })

    this.addHospitalDetailsToCampaignFormGroup = new FormGroup({
      hospitalName: new FormControl("", Validators.required),
      hospitalCity: new FormControl("", Validators.required),
      hospitalPincode: new FormControl("", Validators.required)
    })

    this.patientConditionUpdate = new FormGroup({
      conditionUpdate: new FormControl("", Validators.required),
      updatePatientImage: new FormControl("", Validators.required),
    })

    this.addPatientImgToCampaign = new FormGroup({
      patientImage: new FormControl("", Validators.required),
    })

    this.addBanner = new FormGroup({
      banner: new FormControl("", Validators.required),
      heading: new FormControl("", [Validators.required]),
    })
    this.uploadPatientImage = new FormGroup({
      file: new FormControl("", Validators.required),
      campaignId: new FormControl("", Validators.required),
    })
    this.uploadMedicalDocumentsOfCampaign = new FormGroup({
      file: new FormControl("", Validators.required),
      campaignId: new FormControl("", Validators.required),
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
    this.service.getUpdate().subscribe((res:any)=>{
      this.patientUpdatedImage = res.updatedImageOfPatient;
      this.patientConditionUpdate.get('conditionUpdate')?.setValue(res.updateMessage);
    })
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
        this.patientAdharImage = this.serverImage+"/assets/patient_adhaar/"+ res.aadharPicture;
        this.patientPanImage = this.serverImage+"/assets/patient_pan/"+ res.pancardPicture;
        
        
        this.accountDetails.get('bank_name')?.setValue(res.bank_name);
        this.accountDetails.get('branchName')?.setValue(res.branchName);
        this.accountDetails.get('beneficiary_name')?.setValue(res.beneficiary_name);
        this.accountDetails.get('account_no')?.setValue(res.account_no);
        this.accountDetails.get('ifsc_code')?.setValue(res.ifsc_code);
        this.patientConditionUpdate.get("conditionUpdate")?.setValue(res.conditionUpdate);
        this.addPlanToCampaign.get("selected_plan")?.setValue(res.selected_plan);
        this.patientKyc.get("pan_no")?.setValue(res.pan_no);
        this.patientKyc.get("aadhar_no")?.setValue(res.aadhar_no);
        this.addHospitalDetailsToCampaignFormGroup.get("hospitalName")?.setValue(res.hospitalName);
        this.addHospitalDetailsToCampaignFormGroup.get("hospitalCity")?.setValue(res.hospitalCity);
        this.addHospitalDetailsToCampaignFormGroup.get("hospitalPincode")?.setValue(res.hospitalPincode);
        this.addBanner.get('heading')?.setValue(res.heading);
      })
    }

  }

  letterOnly(event: { which: any; keyCode: any; }): Boolean {
    var k;
    k = event.keyCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32);
  }

  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  restrictZero(event: any) {
    if (event.target.value.length === 0 && event.key === "0") {
      event.preventDefault();
    }

  }

  onSelectHospital(event: any) {
    this.selectedType = event.value;
  }
  public myError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public myError6 = (controlName: string, errorName: string) => {
    return this.addHospitalDetailsToCampaignFormGroup.controls[controlName].hasError(errorName);
  }
  public myError7 = (controlName: string, errorName: string) => {
    return this.addStoryToCampaignFormGroup.controls[controlName].hasError(errorName);
  }

  onSelect(event: any) {

    this.router.navigateByUrl("individualdashboard/editcampaignerdetails/" + event.target.value);

    if (event.target.value != "") {
      this.service.getSingleCampaignData(event.target.value).subscribe((res: any) => {
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
  public myError1 = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public myError2 = (controlName: string, errorName: string) => {
    return this.addPlanToCampaign.controls[controlName].hasError(errorName);
  }

  public myError3 = (controlName: string, errorName: string) => {
    return this.patientConditionUpdate.controls[controlName].hasError(errorName);
  }

  public myError4 = (controlName: string, errorName: string) => {
    return this.patientKyc.controls[controlName].hasError(errorName);
  }

  public myError5 = (controlName: string, errorName: string) => {
    return this.accountDetails.controls[controlName].hasError(errorName);
  }

  onAdharSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = (event.target.files[0] as File);
      this.patientKyc.get('images')?.setValue(file);
    }
    alert("File uploaded successfully...");
  }

  onPatientImagesSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = (event.target.files[0] as File);
      this.uploadPatientImage.get('file')?.setValue(file);
    }
    alert("File selected...");
  }

  onUpdatedPatientImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = (event.target.files[0] as File);
      this.patientConditionUpdate.get('updatePatientImage')?.setValue(file);
      const formData = new FormData();
      formData.append("updatePatientImage", this.patientConditionUpdate.get('updatePatientImage')?.value);
    }
    alert("File selected...");
  }

  deletePatientImage(id: any) {
    this.service.deletePatientImage(id).subscribe((res: any) => {
      this.service.getPatientImages(this.campaignId).subscribe((res: any) => {
        this.dataSource1 = res;
      })
    })
  }

  deleteMedicalImage(id: any) {
    this.service.deleteMedicalDocument(id).subscribe((res: any) => {
      this.service.getMedicalImages(this.campaignId).subscribe((res: any) => {
        this.dataSource2 = res;
      })
    })

  }

  submitHospitalDetailsOfCampaign() {
    this.service.postHospitalDetailsToCampaign(this.campaignId, this.addHospitalDetailsToCampaignFormGroup.value).subscribe((res: any) => {
    })
  }

  submitStoryOfCampaign() {
    this.service.postStoryToCampaign(this.campaignId, this.addStoryToCampaignFormGroup.value).subscribe((res: any) => {
    })
  }

  onPanSelected(event: any) {
    if (event.target.files.length > 0) {
      const file1 = (event.target.files[0] as File)
      this.patientKyc.get('panCard')?.setValue(file1);
    }
    alert("File selected...");
  }

  onBannerSelected(event: any) {
    if (event.target.files.length > 0) {
      const file1 = (event.target.files[0] as File)
      this.addBanner.get('banner')?.setValue(file1);
    }
    alert("Image selected...");
  }

  onPatientImgSelected(event: any) {
    if (event.target.files.length > 0) {
      const file1 = (event.target.files[0] as File)
      this.addPatientImgToCampaign.get('patientImage')?.setValue(file1);
    }
  }

  onMedicalImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file1 = (event.target.files[0] as File)
      this.uploadMedicalDocumentsOfCampaign.get('file')?.setValue(file1);
    }
  }

  uploadMedicalDocument() {
    const formData = new FormData();
    formData.append("file", this.uploadMedicalDocumentsOfCampaign.get("file")?.value)
    formData.append("campaignId", this.campaignId)
    this.service.uploadMedicalImages(formData).subscribe((res: any) => {
      this.service.getMedicalImages(this.campaignId).subscribe((res: any) => {
        this.dataSource2 = res;
      })
    })
  }

  uploadPatientImageMethod() {
    const formData = new FormData();
    formData.append("file", this.uploadPatientImage.get("file")?.value)
    formData.append("campaignId", this.campaignId)
    this.service.postPatientImage(formData).subscribe((res: any) => {
      this.service.getPatientImages(this.campaignId).subscribe((res: any) => {
        this.dataSource1 = res;
      })
    })
  }

  uploadMedicalImages() {
    if (this.uploadMedicalDocuments != true) {
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.addCampaignPlan = false;
      this.addCampaignImage = false;
      this.addCampaignUpdate = false;
      this.addCampaignBannerImage = false;
      this.addCampaigntKyc = false;
      this.patientDetails = false;
      this.editPatientDetails = false;
      this.uploadMedicalDocuments = true;
      this.addStoryToCampaign = false;
      this.addHospitalDetailsToCampaign = false;
    }
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
      this.uploadMedicalDocuments = false;
      this.addStoryToCampaign = false;
      this.addHospitalDetailsToCampaign = false;
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
      this.uploadMedicalDocuments = false;
      this.addStoryToCampaign = false;
      this.addHospitalDetailsToCampaign = false;
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
      this.uploadMedicalDocuments = false;
      this.addStoryToCampaign = false;
      this.addHospitalDetailsToCampaign = false;
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
      this.uploadMedicalDocuments = false;
      this.addStoryToCampaign = false;
      this.addHospitalDetailsToCampaign = false;
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
      this.uploadMedicalDocuments = false;
      this.addStoryToCampaign = false;
      this.addHospitalDetailsToCampaign = false;
    }
  }

  changePlan() {
    this.dialog.open(PlansPopUpComponent, {
      width: "100vw",
      height: "80%",
      data: this.campaignId,
      disableClose: true
    }).afterClosed().subscribe(result => {

    })
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
      this.uploadMedicalDocuments = false;
      this.addStoryToCampaign = false;
      this.addHospitalDetailsToCampaign = false;
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
      this.uploadMedicalDocuments = false;
      this.addStoryToCampaign = false;
      this.addHospitalDetailsToCampaign = false;
    }
  }
  editDetails() {
    this.editPatientDetails = true;
    this.patientDetails = false;
    // if (this.editPatientDetails != true) {
    //   this.openAccountDetails = false;
    //   this.benificaryDetail = false;
    //   this.fundTargets = false;
    //   this.addCampaignPlan = false;
    //   this.addCampaignImage = false;
    //   this.addCampaignUpdate = false;
    //   this.addCampaignBannerImage = false;
    //   this.addCampaigntKyc = false;
    //   this.patientDetails = false;
    //   this.editPatientDetails = true;
    //   this.uploadMedicalDocuments = false;
    //   this.addStoryToCampaign = false;
    //   this.addHospitalDetailsToCampaign = false;
    // }
  }



  updatePatientDetails() {
    if (this.campaignId != null) {
      this.service.updatePatientDetails(this.campaignId, this.userForm.value).subscribe((res: any) => {
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
        this.uploadMedicalDocuments = false;
        this.addStoryToCampaign = false;
        this.addHospitalDetailsToCampaign = false;
      })
      alert("Data Updated Successfully !!")
      this.addPatientDetails();
    }
  }

  updateAccountDetails() {
    if (this.campaignId != null) {
      this.service.updateAccountDetails(this.campaignId, this.accountDetails.value).subscribe((res: any) => {
      })
    }
    alert("Data updated succesfully...");
  }
  submitForPatientKyc() {
    if (this.campaignId != null) {
      const patientKycData = new FormData();
      patientKycData.append('images', this.patientKyc.get('images')?.value);
      patientKycData.append('panCard', this.patientKyc.get('panCard')?.value);
      patientKycData.append('pan_no', this.patientKyc.get('pan_no')?.value);
      patientKycData.append('aadhar_no', this.patientKyc.get('aadhar_no')?.value);
      this.service.updatePatientKycDocs(this.campaignId, patientKycData).subscribe((res: any) => {
      })
      alert("Data updated successfully...");
    }
  }

  conditionUpdate() {
    const formData = new FormData();
    formData.append("updatePatientImage", this.patientConditionUpdate.get("updatePatientImage")?.value);
    formData.append("conditionUpdate", this.patientConditionUpdate.get("conditionUpdate")?.value);
    const formData1 = new FormData();
        formData1.append('campaignId', this.campaignId);
        formData1.append('updateMessage', this.patientConditionUpdate.get("conditionUpdate")?.value);
        formData1.append('updateImage', this.patientConditionUpdate.get("updatePatientImage")?.value);
    if (this.campaignId != null) {
      this.service.updatePatientCondition(this.campaignId, formData).subscribe((res: any) => {
      })
      this.service.postLogsOfUpdatedPatientImage(formData1).subscribe((response: any) => {
      })
    }
    alert("Data updated successfully...");
  }

  planSubmit() {
    this.dialog.open(PlansPopUpComponent, {
      height: "90vh",
      data: this.campaignId,
    })
  }

  addBannerToCampaign() {
    if (this.campaignId != null) {
      const patientKycData = new FormData();
      patientKycData.append('banner', this.addBanner.get('banner')?.value);
      patientKycData.append('heading', this.addBanner.get('heading')?.value);
      this.service.addBannerToCampaign(this.campaignId, patientKycData).subscribe((res: any) => {
        this.image = AppConstants.CAMPAIGN_BANNER + res.bannerImage;
      })
    }
    alert("Banner uploded successfully...");
  }

  patientImageToCampaign() {
    if (this.campaignId != null) {
      const patientKycData = new FormData();
      patientKycData.append('patientImage', this.addPatientImgToCampaign.get('patientImage')?.value);
      this.service.patientImageToCampaign(this.campaignId, patientKycData).subscribe((res: any) => {
      })
    }
    alert("Data updated successfully...");
  }

  uploadHospitalDetaails() {
    if (this.addHospitalDetailsToCampaign != true) {
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.addCampaignPlan = false;
      this.addCampaignImage = false;
      this.addCampaignUpdate = false;
      this.addCampaignBannerImage = false;
      this.addCampaigntKyc = false;
      this.patientDetails = false;
      this.editPatientDetails = false;
      this.uploadMedicalDocuments = false;
      this.addStoryToCampaign = false;
      this.addHospitalDetailsToCampaign = true;
    }
  }

  uploadStoryOfPatient() {
    if (this.addStoryToCampaign != true) {
      this.openAccountDetails = false;
      this.benificaryDetail = false;
      this.fundTargets = false;
      this.addCampaignPlan = false;
      this.addCampaignImage = false;
      this.addCampaignUpdate = false;
      this.addCampaignBannerImage = false;
      this.addCampaigntKyc = false;
      this.patientDetails = false;
      this.editPatientDetails = false;
      this.uploadMedicalDocuments = false;
      this.addStoryToCampaign = true;
      this.addHospitalDetailsToCampaign = false;
    }
  }

  try(id: any) {
    if (this.plan.number == 1) {
      this.service.getSinglePlan(this.plan.number).subscribe((res: any) => {
        this.arryOfSelectedCheckbox = res.arryOfSelectedCheckbox;
      })
    }
    if (this.plan.number == 2) {
      this.service.getSinglePlan(this.plan.number).subscribe((res: any) => {
        this.arryOfSelectedCheckbox = res.arryOfSelectedCheckbox;
      })
    }
    if (this.plan.number == 3) {
      this.service.getSinglePlan(this.plan.number).subscribe((res: any) => {
      })
    }
  }
  onClicked() {
    this.router.navigate(["/startCampaign/individualCampaign"])
  }
}



