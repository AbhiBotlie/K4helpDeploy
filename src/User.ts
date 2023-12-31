export interface User {
  otp:string,
  dob:string,
  user_type:string,
  name?: string,
  email?: string,
  mobile?: string,
  amount?: number,
  number: string,
  selectpurpose:string,
  campaigner_name:string,
  campaigner_email: string,
  campaigner_number: string,
  term_conditions: boolean,
  patient_condition:string ,
  required_amount: string,
  available_days: string,
  medical_documents: string,
  description: string,
  campaign_purpose: string,
  patient_name: string,
  patient_age: string,
  gender: string,
  city: string,
  patient_email: string,
  patient_number: string,
  patient_relation: string,
  disease: string,
  target_date: string,
  ngo_name: string,
  tax_benifit: string,
  ngo_description: string,
  under_section: string
  }