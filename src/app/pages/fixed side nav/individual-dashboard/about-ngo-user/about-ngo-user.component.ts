import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-about-ngo-user',
  templateUrl: './about-ngo-user.component.html',
  styleUrls: ['./about-ngo-user.component.css']
})
export class AboutNGOUserComponent implements OnInit {

  aboutNGO!: FormGroup;
  taxBenefits = new Array<any>();
  underSections = new Array<any>();
  idOfCampaigner:any;
  constructor(private service: ApiService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idOfCampaigner = sessionStorage.getItem('campaignerId');
    var data= JSON.parse(localStorage.getItem('campaginerdetails') || '{}');     
    this.service.getCampaignerDetails(this.idOfCampaigner).subscribe((res:any)=>{
      console.log(res);    
    })

    this.service.getUnderSectionDropdownList().subscribe((response: any) => {
      this.underSections = response;     
    });

    this.service.getTaxDropdownList().subscribe((response: any) => {
      this.taxBenefits = response;    
    });

    this.service.getAboutNgo(this.idOfCampaigner).subscribe((res:any)=>{
      // this.aboutNGO.get('nameOfNgo')?.setValue(res.nameOfNgo);
      // this.aboutNGO.get('areaOfWorking')?.setValue(res.areaOfWorking);
      // this.aboutNGO.get('descreption')?.setValue(res.descreption);
      // this.aboutNGO.get('texBenifit')?.setValue(res.texBenifit);
      // this.aboutNGO.get('underSection')?.setValue(res.underSection);
      // this.aboutNGO.get('document')?.setValue(res.document);
      // this.aboutNGO.get('taxBenifit')?.setValue(res.taxBenifit);
      // this.aboutNGO.get('ngoDoc')?.setValue(res.ngoDoc);
      
    })

    this.aboutNGO = new FormGroup({
      nameOfNgo: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(/[(\[a-zA-Z0-9\])\\1{2,}]/)])),
      areaOfWorking: new FormControl('', [Validators.required]),
      descreption: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(600)]),
      texBenifit: new FormControl('', Validators.compose([Validators.required])),
      underSection: new FormControl('', Validators.compose([Validators.required])),
      document: new FormControl('', [Validators.required]),
      campaignerId:new FormControl('', [Validators.required]),
      taxBenifit:new FormControl('', [Validators.required]),
      ngoDoc:new FormControl('', [Validators.required]),
    })
  }

  public myError = (controlName: string, errorName: string) => {
    return this.aboutNGO.controls[controlName].hasError(errorName);
  }

  get ngoName() {
    return this.aboutNGO.get('working_area');
  }

  get workingArea() {
    return this.aboutNGO.get('working_area');
  }

  get description() {
    return this.aboutNGO.get('description');
  }

  get taxBenefit() {
    return this.aboutNGO.get('working_area');
  }

  get underSection() {
    return this.aboutNGO.get('working_area');
  }

  get documents() {
    return this.aboutNGO.get('working_area');
  }
  onNgoDocSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = (event.target.files[0] as File);
      this.aboutNGO.get('ngoDoc')?.setValue(file);
    }
    alert("File uploaded successfully...");
  }

  ontaxBenifitSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = (event.target.files[0] as File);
      this.aboutNGO.get('taxBenifit')?.setValue(file);
    }
    alert("File uploaded successfully...");
  }

  onSubmit(){
    const formData= new FormData();
    formData.append("campaignerId", this.idOfCampaigner);
    formData.append("nameOfNgo", this.aboutNGO.get("nameOfNgo")?.value);
    formData.append("areaOfWorking", this.aboutNGO.get("areaOfWorking")?.value);
    formData.append("descreption", this.aboutNGO.get("descreption")?.value);
    formData.append("texBenifit", this.aboutNGO.get("texBenifit")?.value);
    formData.append("underSection", this.aboutNGO.get("underSection")?.value);
    formData.append("taxBenifit", this.aboutNGO.get("taxBenifit")?.value);
    formData.append("ngoDoc", this.aboutNGO.get("ngoDoc")?.value);

    this.service.postNgoDetails(formData).subscribe((res:any)=>{
      console.log(res);
      alert("Data is saved to database.....");
    })
  }
  onClicked() {
    this.router.navigate(["/startCampaign/individualCampaign"])
  }
}
