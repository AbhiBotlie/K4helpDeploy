import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AppConstants } from 'src/AppConstants';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit {

  addStory!: FormGroup;
  dataSource: any;
  imageBaseUrl:any;
  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.imageBaseUrl= AppConstants.IMAGE_BASE_URL;
    this.addStory = new FormGroup({
      campaign_name: new FormControl('', [Validators.required]),
      campaign_id: new FormControl('', [Validators.required]),
      heading: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    })
  }

  get campaignName() {
    return this.addStory.get('campaign_name');
  }

  get campaignId() {
    return this.addStory.get('campaign_id');
  }

  get heading() {
    return this.addStory.get('heading');
  }

  get image() {
    return this.addStory.get('image');
  }

onSubmit(){
  console.log(this.addStory.value);
  console.log("Submit button is clicked");
  alert("Sending data to Database.....");
    // this.api.addStoryData(this.addStory.value).subscribe((data: any) => {
    //   console.log(data);
    //   return data;
    // })
}

}
