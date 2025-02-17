/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useState,
  ReactNode,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import { doctors, hospitals, appointments, appointmentsDatas } from "../assets";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useNavigate } from "react-router";

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
  ProfilePic: string;
  OtherImages: string[];
  picBanner: string;
  AddressState: string;
  facility: string[];
  Review: {
    Rating: number;
    Comment: string;
    name: string;
    email: string;
  }[];
};
export type Doctor = {
  AddressState: string;
  _id: string;
  Name: string;
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
    name: string;
    email: string;
  }[];
  ProfilePic: string;
  picBanner: string;
  avalaibility: "online" | "offline";
};

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
};

export type Appointment = {
  _id: string;
  name?: string;
  status: "pending" | "canceled" | "successful";
  date: string;
  time: string;
  doctor: string;
  hospistal_name?: string;
  doctor_image?: string;
  reasonforcancelation?: string;
};
// UseHospital type
export type UseHospital = {
  Doctor: Doctor[];
  setDoctor: (doctors: Doctor[]) => void;
  search: {
    doctor: string;
    hospital: string;
  };

  setSearch: (search: { doctor: string; hospital: string }) => void;
  Hospital: Hospital[];
  setHospital: (hospitals: Hospital[]) => void;
  appointment: Appointment[];
  setAppointment: (appointments: Appointment[]) => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  message: string;
  setMessage: (message: string) => void;
  isSearched: boolean;
  setIsSearched: (isSearched: boolean) => void;
  showFilter: boolean;
  setShowFilter: (isSearched: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  doctorRef: React.RefObject<HTMLInputElement>;
  hospitalRef: React.RefObject<HTMLInputElement>;

  AppointmentData: AppointmentData[];
  setAppointmentData: (appointmentData: AppointmentData[]) => void;
  image: File | null;
  setImage: (image: File | null) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  address: string;
  setAddress: (address: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  doB: Date | null| undefined;
  setDoB: (doB: Date | null | undefined) => void;
  weight: string;
  setWeight: (weight: string) => void;

  height: string;
  setHeight: (height: string) => void;

  bloodGroup: string;
  setBloodGroup: (bloodGroup: string) => void;

  bloodGenotype: string;
  setBloodGenotype: (bloodGenotype: string) => void;

  maritalStatus: string;
  setMaritalStatus: (maritalStatus: string) => void;

  stateof: string;
  setStateof: (stateOf: string) => void;

  kinFirstName: string;
  setKinFirstName: (kinFirstName: string) => void;

  kinLastName: string;
  setKinLastName: (kinLastName: string) => void;

  kinAddress: string;
  setKinAddress: (kinAddress: string) => void;

  kinEmail: string;
  setKinEmail: (kinEmail: string) => void;

  kinGender: string;
  setKinGender: (kinGender: string) => void;

  kinPhoneNumber: string;
  setKinPhoneNumber: (kinPhoneNumber: string) => void;

  kinRelationships: string;
  setKinRelationships: (kinRelationships: string) => void;

  kinStateOf: string;
  setKinStateOf: (kinStateOf: string) => void;
};
const initContext: UseHospital = {
  AppointmentData: [],
  setAppointmentData: () => {},
  Doctor: [],
  setDoctor: () => {},
  search: {
    doctor: "",
    hospital: "",
  },
  setSearch: () => {},
  Hospital: [],
  setHospital: () => {},
  appointment: [],
  setAppointment: () => {},
  name: "",
  setName: () => {},
  message: "",
  setMessage: () => {},
  email: "",
  setEmail: () => {},
  isSearched: false,
  setIsSearched: () => {},
  showFilter: false,
  setShowFilter: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  handleSearch: () => {},
  doctorRef: { current: null },
  hospitalRef: { current: null },

  image: null,
  setImage: () => {},

  phoneNumber: "",
  setPhoneNumber: () => {},

  address: "",
  setAddress: () => {},

  gender: "",
  setGender: () => {},

  doB: null,
  setDoB: () => {},

  weight: "",
  setWeight: () => {},

  height: "",
  setHeight: () => {},

  bloodGroup: "",
  setBloodGroup: () => {},

  bloodGenotype: "",
  setBloodGenotype: () => {},

  maritalStatus: "",
  setMaritalStatus: () => {},

  stateof: "",
  setStateof: () => {},

  kinFirstName: "",
  setKinFirstName: () => {},

  kinLastName: "",
  setKinLastName: () => {},

  kinAddress: "",
  setKinAddress: () => {},

  kinEmail: "",
  setKinEmail: () => {},

  kinGender: "",
  setKinGender: () => {},

  kinPhoneNumber: "",
  setKinPhoneNumber: () => {},

  kinRelationships: "",
  setKinRelationships: () => {},

  kinStateOf: "",
  setKinStateOf: () => {},
};

export const HospitalContext = createContext<UseHospital>(initContext);

const HospitalContextProvider = ({
  children,
}: {
  children?: ReactNode;
}): ReactElement => {
  const [search, setSearch] = useState({
    doctor: "",
    hospital: "",
  });
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [Doctor, setDoctor] = useState<Doctor[]>([]);
  const [AppointmentData, setAppointmentData] = useState<AppointmentData[]>([]);
  const [Hospital, setHospital] = useState<Hospital[]>([]);
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const hospitalRef = useRef<HTMLInputElement>(null);
  const doctorRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [address, setAddress] = useState<string>("hogn doe strrt");
  const [gender, setGender] = useState<string>("male");
  const [doB, setDoB] = useState<Date | null | undefined>(new Date(2000, 3, 19));
  const [weight, setWeight] = useState<string>("100");
  const [height, setHeight] = useState<string>("100");
  const [bloodGroup, setBloodGroup] = useState<string>("A+");
  const [bloodGenotype, setBloodGenotype] = useState<string>("AA");
  const [phoneNumber, setPhoneNumber] = useState<string>("0802345678");
  const [maritalStatus, setMaritalStatus] = useState<string>("single");
  const [stateof, setStateof] = useState<string>("osun");
  const [kinFirstName, setKinFirstName] = useState<string>("jane");
  const [kinLastName, setKinLastName] = useState<string>("doe");
  const [kinAddress, setKinAddress] = useState<string>("sdfghjk");
  const [kinEmail, setKinEmail] = useState<string>("asdfghujikol@gmai.com");
  const [kinGender, setKinGender] = useState<string>("male");
  const [kinPhoneNumber, setKinPhoneNumber] = useState<string>("1234567890");
  const [kinRelationships, setKinRelationships] = useState<string>("sister");
  const [kinStateOf, setKinStateOf] = useState<string>("osun");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch({
      doctor: doctorRef.current ? doctorRef.current.value : "",
      hospital: hospitalRef.current ? hospitalRef.current.value : "",
    });
    setIsSearched(true);
  };
  // const navigate = useNavigate();
  const fetchDoctor = async () => {
    setDoctor(doctors);
  };

  const fetchHospital = async () => {
    setHospital(hospitals);
  };
  const fecthAppointment = async () => {
    setAppointment(appointments);
  };
  const fecthAppointmentData = async () => {
    setAppointmentData(appointmentsDatas);
  };
  const fetchUserProfile = async () => {};

  useEffect(() => {
    fetchHospital();
    fecthAppointmentData();
    fetchUserProfile();
    fetchDoctor();
    fecthAppointment()
  }, []);

  const value = {
    fecthAppointmentData,
    AppointmentData,
    setAppointmentData,
    Doctor,
    setDoctor,
    Hospital,
    setHospital,
    search,
    setSearch,
    isSearched,
    setIsSearched,
    showFilter,
    setShowFilter,
    name,
    setName,
    setMessage,
    message,
    email,
    setEmail,
    currentPage,
    setCurrentPage,
    handleSearch,
    doctorRef,
    hospitalRef,
    fecthAppointment,
    setAppointment,
    appointment,
    fetchUserProfile,
    image,
    setImage,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    gender,
    setGender,
    doB,
    setDoB,
    weight,
    setWeight,
    height,
    setHeight,
    bloodGroup,
    setBloodGroup,
    bloodGenotype,
    setBloodGenotype,
    maritalStatus,
    setMaritalStatus,
    stateof,
    setStateof,
    kinFirstName,
    setKinFirstName,
    kinLastName,
    setKinLastName,
    kinAddress,
    setKinAddress,
    kinEmail,
    setKinEmail,
    kinPhoneNumber,
    setKinPhoneNumber,
    kinRelationships,
    setKinRelationships,
    kinStateOf,
    setKinStateOf,
    kinGender,
    setKinGender,
  };

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  );
};

export default HospitalContextProvider;
