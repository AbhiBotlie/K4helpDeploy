import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css']
})
export class AddUpdateComponent implements OnInit {

  addUpdate!: FormGroup;
  dataSource: any;
  imageBaseUrl:any;
  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.imageBaseUrl= AppConstants.IMAGE_BASE_URL;
    this.addUpdate = new FormGroup({
      campaign_name: new FormControl('', [Validators.required]),
      campaign_id: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    })
  }

  get campaignName() {
    return this.addUpdate.get('campaign_name');
  }

  get campaignId() {
    return this.addUpdate.get('campaign_id');
  }

  get description() {
    return this.addUpdate.get('description');
  }

  get image() {
    return this.addUpdate.get('image');
  }

  onSubmit(){
    console.log(this.addUpdate.value);
    console.log("Submit button is clicked");
    alert("Sending data to Database.....");
      // this.api.addStoryData(this.addUpdate.value).subscribe((data: any) => {
      //   console.log(data);
      //   return data;
      // })
  }
}
