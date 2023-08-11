import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { updateData } from '@syncfusion/ej2-angular-grids';
import { PopUpForMessages } from '../pop-up-for-messages/pop-up-for-messages';

@Component({
  selector: 'app-plans-pop-up',
  templateUrl: './plans-pop-up.component.html',
  styleUrls: ['./plans-pop-up.component.css']
})
export class PlansPopUpComponent implements OnInit {
  mynewArray = new Array<any>();
  plans = new Array<any>();
  campaignId: any;
  updateDataOfCampaign: any;
  planName: any;
  constructor(private service: ApiService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<PlansPopUpComponent>) {
    this.campaignId = data;
  }

  ngOnInit(): void {
    this.service.getPlansFeature().subscribe((res: any) => {
      this.mynewArray = res;
    })
    this.service.getAllPlans().subscribe((res: any) => {
      this.plans = res;
    })
  }

  onSelectTHePlan(plan: any) {
    this.data = plan.planName;
    var price = plan.price;
    let data={
      "selected_plan":plan.id,
      "planPrice":plan.price
    }
    this.service.getSingleCampaignData(this.campaignId).subscribe((res: any) => {
      if (res.planPrice < price) {
        this.dialog.open(PopUpForMessages,
          {
            disableClose: true,
            data: "success"
          }).afterClosed()
          .subscribe((confirm) => {          
            if (confirm) {
              this.service.updatePlan(this.campaignId, data).subscribe((res: any) => {
                console.log(res);           
              })
            }
          })
      } else {
        alert("select greater plan");
      }
    })
    this.updateDataOfCampaign = {
      "planPrice": plan.planId,
    }
    var planValue = plan.id + "";

    this.dialogRef.close({ data: this.data })

  }
}
