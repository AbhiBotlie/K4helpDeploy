import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-about-social-activist-user',
  templateUrl: './about-social-activist-user.component.html',
  styleUrls: ['./about-social-activist-user.component.css']
})
export class AboutSocialActivistUserComponent implements OnInit {

  aboutSocialist!: FormGroup;
  idOfCampaigner: any;
  constructor(private service: ApiService,private router:Router) { }

  ngOnInit(): void {
    this.idOfCampaigner = sessionStorage.getItem('campaignerId');   
    this.service.getSocialActivistDetails(this.idOfCampaigner).subscribe((res: any) => {
      this.aboutSocialist.get('areaOfWorking')?.setValue(res.areaOfWorking);
      this.aboutSocialist.get('descreption')?.setValue(res.descreption);
    })
    this.aboutSocialist = new FormGroup({
      campaignerId: new FormControl(this.idOfCampaigner, [Validators.required]),
      areaOfWorking: new FormControl('', [Validators.required]),
      descreption: new FormControl('', [Validators.required]),
    })
  }
  onSubmit() {
    this.service.postSocialActivistDetails(this.aboutSocialist.value).subscribe((res: any) => {
    })
    alert("Data submited successfully ...!");
  }

  onClicked() {
    this.router.navigate(["/startCampaign/individualCampaign"])
  }
}
