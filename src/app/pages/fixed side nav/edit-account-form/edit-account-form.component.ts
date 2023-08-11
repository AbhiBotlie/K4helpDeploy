import { Component, OnInit, Inject} from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-edit-account-form',
  templateUrl: './edit-account-form.component.html',
  styleUrls: ['./edit-account-form.component.css']
})
export class EditAccountFormComponent implements OnInit {

  dataSource: any;

   

  updateAccountDetails={
    beneficiary_name:"",
    cause_category:"",
    patient_name:"",
    bank_name:"",
    account_no:"",
    ifsc_code:"",
    }

  constructor(private api: ApiService, private dashboard: DashboardService,
    @Inject(MAT_DIALOG_DATA) public dataedit: any) { 
      this.updateAccountDetails = dataedit;
    }

  ngOnInit(): void {   
  }


  onUpdateAccountDetail(){
   this.dashboard.postDashboardIndividual(this.updateAccountDetails).subscribe((response:any)=>{
    console.log(response);
     return response;
    
   })
  }



}
