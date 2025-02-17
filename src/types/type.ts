export type Hospital = {
  _id: string;
  Hospital_Name: string;
  Address: string;
  Email: string;
  Phone_Number: string;
  Website: string;
  Type: "General" | "Clinic" | "Teaching" | "Specialist";
  ownership: "Public" | "Private";
  Available_Specialists: string[];
  About: string;
  ProfilePic: string
  OtherImages: string[]
  picBanner: string
  AddressState: string
  facility: string[]
  Review: {
    Rating: number;
    Comment: string;
    name: string
    email: string
  }[]
};
export type Doctor = {
  AddressState: string
  _id: string;
  Name: string;
  first_Name? : string
  last_Name? : string
  Hospital_Name: string;
  Email: string;
  Phone: string;
  Website: string;
  College: string;
  Experience: string;
  About: string;
  Field: string;
  Review: {
    Rating: number;
    Comment: string;
    name: string
    email: string
  }[]
  ProfilePic: string
  picBanner: string
  avalaibility: 'online' | 'offline'
};

export type Appointment = {

  _id: string,
  name?: string,
  status: 'pending' | 'canceled' | 'successful',
  date: string,
  time: string,
  doctor: string,
  hospistal_name?: string,
  doctor_image?: string,

}

export type userdatas = {
  first_name?: string;
  email?: string;
  image?: File | string; 
  address?: string;
  gender?: string;
  date?: string;
  last_name?: string;
  blood_group?: string;
  blood_genotype?: string;
  phone?: string;
  Marital_status?: string;
  state?: string;
  kin_firstName?: string;
  kin_lastName?: string;
  kin_email?: string;
  kin_address?: string;
  Kin_gender?: string;
  kin_phone?: string;
  Kin_relation?: string;
  Kin_state?: string;
  height?: string
  weight?: string,
}

type VitalSigns = {
  bodyTemperature: string;
  pulseRate: string;
  respirationRate: string;
  bloodPressure: string;
};

export type AppointmentData = {
  _id: string;
  status: "pending" | "successful" | "canceled";
  doctor: string;
  reasonForVisit?: string;
  medicalHistory?: string;
  vitalSigns?: VitalSigns;
  doctorDiagnosis?: string;
  doctorPrescription?: string;
  appointments_id: string;
  reasonforcancelation?:string
};