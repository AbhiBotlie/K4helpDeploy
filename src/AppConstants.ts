export class AppConstants {
  public static API_BASE_URL='http://localhost:8080/';
  //  public static API_BASE_URL='http://k4help.org/k4help/';

  //  public static IMAGE_BASE_URL = 'http://k4help.org/angular';
   public static IMAGE_BASE_URL = 'http://localhost:4200';

  
  //OTP Verification constants
  public static OTP_SUCESS_CODE_0 = "0";
  public static OTP_INCORRECT_CODE_1 = "1";
  public static OTP_EXPIRED_CODE_2 = "2";

    //Send/Resend OTP constants
    public static NEW_USER_SUCESS_CODE_0 = "0";
    public static USER_VERIFICATION_SUCESS_CODE_1 = "1";
    public static USER_DETAILS_INCORRECT_CODE_2 = "2";
    
    //Edit email response
    public static EMAIL_EXISTING_CODE_0 = "0";
    public static NEW_EMAIL_CODE_1 = "1";


    //Edit email response
    public static NUMBER_EXISTING_CODE_0 = "0";
    public static NUMBER_EXISTING_CODE_1 = "1";

    public static CAMPAIGN_BANNER = "assets/campagin_banner/";
    public static CAMPAIGNER_PROFILE_PHOTO = "assets/campaigner_images/";
    public static CAMPAIGNER_ADHAR_IMAGE = "assets/campaginer_adhaar_document/";
    public static CAMPAIGNER_PAN_IMAGE = "assets/campaginer_pan_document/";
}