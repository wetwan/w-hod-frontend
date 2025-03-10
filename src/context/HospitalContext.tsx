/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useState,
  ReactNode,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

type VitalSigns = {
  bodyTemperature: string;
  pulseRate: string;
  respirationRate: string;
  bloodPressure: string;
};
type Userd = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  gender: string;
  image: string;
  dob: string;
  height: string;
  weight: string;
  blood_group: string;
  blood_genotype: string;
  marital_status: string;
  kin_firstName: string;
  kin_lastName: string;
  kin_address: string;
  kin_state: string;
  kin_phone: string;
  kin_email: string;
  kin_gender: string;
  kin_relationship: string;
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

export type Appointments = {
  doctor: ReactNode;
  _id: string;
  slotDate: string;
  slotTime: string;
  date: number;
  status: string;
  hospitalId: {
    _id: string;
    name: string;
    image: string;
  };

  doctorId: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    image: string;
    height: string;
    weight: string;
    blood_group: string;
    blood_genotype: string;
    marital_status: string;
    kin_firstName: string;
    kin_lastName: string;
    kin_address: string;
    kin_state: string;
    kin_phone: string;
    kin_email: string;
  };
};
export type AppointmentDetail = {
  _id: string; // Appointment Detail ID
  appointmentID: {
    _id: string;  // Appointment ID
    date: number;  // Date of the appointment (Unix timestamp)
  };
  blood_pressure: string;
  date: number;  // Date in milliseconds (Unix timestamp)
  diagnosis: string;
  doctorId: {
    _id: string;  // Doctor ID
    firstName: string;  // Doctor's first name
    lastName: string;  // Doctor's last name
    image: string;  // URL of the doctor's image
  };
  history: string;
  prescriptions: string;
  pulse: string;
  reason: string;
  respiration: string;
  temperature: string;
  __v: number;  // Version key, typically used by Mongoose
};

// UseHospital type
type UseHospital = {
  search: {
    doctor: string;
    hospital: string;
  };
  fetchUser: () => void;
  userData: Userd | null;
  setUserData: (user: Userd | null) => void;
  setSearch: (search: { doctor: string; hospital: string }) => void;
  appointment: Appointments[];
  setAppointment: (appointments: Appointments[]) => void;
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
  doB: string;
  setDoB: (doB: string) => void;
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
  backendUrl: string;
  fetchAppointment: () => void;
  setAppoint: (appoint: Appointments | null) => void;
  appoint: Appointments | null;
  appointmentDetails: AppointmentDetail[];
  setAppointmentDetails: (AppointmentDetails: AppointmentDetail[]) => void;
  fetchAppointmentDeatils: () => void;
};
const initContext: UseHospital = {
  fetchAppointmentDeatils: () => {},
  setAppointmentDetails: () => {},
  appointmentDetails: [],
  setAppoint: () => {},
  appoint: null,
  fetchAppointment: () => {},
  userData: null,
  setUserData: () => {},
  AppointmentData: [],
  setAppointmentData: () => {},

  search: {
    doctor: "",
    hospital: "",
  },
  setSearch: () => {},
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
  fetchUser: () => {},
  image: null,
  setImage: () => {},
  phoneNumber: "",
  setPhoneNumber: () => {},
  address: "",
  setAddress: () => {},
  gender: "",
  setGender: () => {},
  doB: "",
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
  backendUrl: "",
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
  const [userData, setUserData] = useState<Userd | null>(null);
  const [AppointmentData, setAppointmentData] = useState<AppointmentData[]>([]);
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetail[]>([]);

  const [appointment, setAppointment] = useState<Appointments[]>([]);
  const [appoint, setAppoint] = useState<Appointments | null>(null);
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
  const [doB, setDoB] = useState<string>("");
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

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();
  const { getToken } = useAuth();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch({
      doctor: doctorRef.current ? doctorRef.current.value : "",
      hospital: hospitalRef.current ? hospitalRef.current.value : "",
    });
    setIsSearched(true);
  };
  const fetchAppointment = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments");

      if (data.success) {
        setAppointment(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  const fetchAppointmentDeatils = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/details");

      if (data.success) {
        setAppointmentDetails(data.appointment);
      
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const fetchUser = async () => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Authentication token is missing.");
        return;
      }

      const { data } = await axios.get(`${backendUrl}/api/user/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user:", error);

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const fetchUserProfile = async () => {};

  useEffect(() => {
    fetchUserProfile();
    fetchAppointmentDeatils();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUser();
      fetchAppointment();
    }
  }, [user]);

  const value = {
    fetchAppointmentDeatils,
    appointmentDetails,
    setAppointmentDetails,
    setAppoint,
    appoint,
    backendUrl,
    fetchUser,
    AppointmentData,
    setAppointmentData,
    userData,
    setUserData,
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
    fetchAppointment,
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
