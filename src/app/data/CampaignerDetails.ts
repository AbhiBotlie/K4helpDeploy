export class CampaignerDetails{
    user_type: string;
    campaigner_name: string;
    campaignerEmail: string;
    campaignerNumber: string;
    otp: string;
    term_conditions: string;

    constructor(campaignerDetails : CampaignerDetails) {
        {
          this.user_type = campaignerDetails.user_type;
          this.campaigner_name = campaignerDetails.campaigner_name || '';
          this.campaignerEmail = campaignerDetails.campaignerEmail || '';
          this.campaignerNumber = campaignerDetails.campaignerNumber || '';
          this.otp = campaignerDetails.otp;
          this.term_conditions = campaignerDetails.term_conditions;
        }
    }
}