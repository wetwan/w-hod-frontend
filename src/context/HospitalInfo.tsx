/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useState,
  ReactNode,
  ReactElement,
  useEffect,
} from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { Appointments } from "./HospitalContext";
import { Doctors } from "./DoctorContext";


export type newHospital = {
  _id: string;
  name: string;
  image: string;
  email: string;
  facility: string[];
  otherImages: string[];
  about: string;
  address: string;
  ownership: string;
  phone: string;
  state: string;
  type: string;
  website: string;
  banner: string;
};
type UseHospitalInfo = {
  appointment: Appointments[];
  setAppointment: (appointment: Appointments[]) => void;
  Hospital: newHospital[];
  setHospital: (hospitals: newHospital[]) => void;
  name: string;
  email: string;
  hospistalName: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  sethospistalName: (hospistalName: string) => void;
  password: string;
  setpassword: (password: string) => void;
  comfirmPassword: string;
  setcomfirmPassword: (comfirmPassword: string) => void;
  image: File | null;
  setImage: (image: File | null) => void;
  address: string;
  setAddress: (address: string) => void;
  ofState: string;
  setOfState: (ofState: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  website: string;
  setwebsite: (website: string) => void;
  type: string;
  setType: (type: string) => void;
  ownership: string;
  setOwnership: (ownership: string) => void;
  facility: string[];
  setFacility: (facility: string[]) => void;
  specialist: string;
  setSpecialist: (specialist: string) => void;
  about: string;
  setAbout: (about: string) => void;
  bannerPic: File | null;
  setBannerPic: (bannerPic: File | null) => void;
  OtherImages: File[] | null;
  setOtherImages: (OtherImages: File[] | null) => void;
  showHospitalLogin: boolean;
  setShowHospitalLogin: (showHospitalLogin: boolean) => void;
  hosToken: string | null;
  setHosToken: React.Dispatch<React.SetStateAction<string | null>>;
  hosData: newHospital | null;
  setHosData: React.Dispatch<React.SetStateAction<newHospital | null>>;
  fetchHospital: () => void;
  fetchDoctors: () => void;
  fetchAppointment: () => void;
  fetchHospitalData: () => void;
  backendUrl: string;
  doctors: Doctors[];
  setDoctors: (doctors: Doctors[]) => void;
};

const initContext: UseHospitalInfo = {
  hosToken: null,
  setHosToken: () => {},
  doctors: [],
  setDoctors: () => {},
  hosData: null,
  setHosData: () => {},
  Hospital: [],
  setHospital: () => {},
  showHospitalLogin: false,
  setShowHospitalLogin: () => {},
  name: "",
  email: "",
  hospistalName: "",
  setName: () => {},
  setEmail: () => {},
  sethospistalName: () => {},
  password: "",
  setpassword: () => {},
  comfirmPassword: "",
  setcomfirmPassword: () => {},
  image: null,
  setImage: () => {},
  address: "",
  setAddress: () => {},
  ofState: "",
  setOfState: () => {},
  phone: "",
  setPhone: () => {},
  website: "",
  setwebsite: () => {},
  type: "",
  setType: () => {},
  ownership: "",
  setOwnership: () => {},
  facility: [],
  setFacility: () => {},
  specialist: "",
  setSpecialist: () => {},
  about: "",
  setAbout: () => {},
  bannerPic: null,
  setBannerPic: () => {},
  fetchHospital: () => {},
  OtherImages: null,
  appointment: [],
  setAppointment: () => {},
  setOtherImages: () => {},
  fetchAppointment: () => {},
  fetchHospitalData: () => {},
  fetchDoctors: () => {},
  backendUrl: "",
};

export const HospitalInfoContext = createContext<UseHospitalInfo>(initContext);

const HospitalInfoContextProvider = ({
  children,
}: {
  children?: ReactNode;
}): ReactElement => {
  const [Hospital, setHospital] = useState<newHospital[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hospistalName, setHospistalName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [address, setAddress] = useState("");
  const [ofState, setOfState] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setwebsite] = useState("");
  const [type, setType] = useState("General");
  const [ownership, setOwnership] = useState("public");
  const [facility, setFacility] = useState<string[]>([]);
  const [specialist, setSpecialist] = useState<string>("");
  const [about, setAbout] = useState("");
  const [bannerPic, setBannerPic] = useState<File | null>(null);
  const [showHospitalLogin, setShowHospitalLogin] = useState(false);
  const [OtherImages, setOtherImages] = useState<File[] | null>(null);
  const [hosToken, setHosToken] = useState<string | null>(null);
  const [hosData, setHosData] = useState<newHospital | null>(null);
  const [doctors, setDoctors] = useState<Doctors[]>([]);
  const [appointment, setAppointment] = useState<Appointments[]>([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchHospital = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/hospital");
      if (data.success) {
        setHospital(data.hospitals);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  // fetch hospital data
  const fetchHospitalData = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/hospital/hospital`, {
        headers: { token: hosToken },
      });
      if (data.success) {
        setHosData(data.hospital);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/hospital/doctor", {
        headers: { token: hosToken },
      });

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Catch any error from the API or network
      console.error("Error fetching doctors:", error);
      toast.error("An error occurred while fetching doctors.");
    }
  };
  const fetchAppointment = async () => {
    try {
     
      const { data } = await axios.get(
        backendUrl + "/api/hospital/appointments",
        
      );
   

      if (data.success) {
        setAppointment(data.appointments);
    
      } else {
        // Handling errors from the server if 'success' is false
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      // If the error comes from axios (response error, timeout, etc.)
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast.error(errorMessage); // Log the full error for debugging
      } else {
        // For other unexpected errors
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchHospital();
    const storeHospialTkoen = localStorage.getItem("hospital token");
    if (storeHospialTkoen) {
      setHosToken(storeHospialTkoen);
    }
  }, []);
  useEffect(() => {
    if (hosToken) {
      fetchHospitalData();
     
    }
  }, [hosToken]);
  useEffect(() => {
    if (hosToken) {
      fetchDoctors();
    }
  }, [hosToken]);
  useEffect(() => {
    fetchAppointment();
  }, []);


  const value: UseHospitalInfo = {
    fetchAppointment,
    appointment,
    setAppointment,
    fetchDoctors,
    doctors,
    setDoctors,
    fetchHospitalData,
    backendUrl,
    hosToken,
    setHosToken,
    hosData,
    setHosData,
    Hospital,
    setHospital,
    showHospitalLogin,
    setShowHospitalLogin,
    name,
    email,
    hospistalName,
    setName,
    setEmail,
    sethospistalName: setHospistalName,
    password,
    setpassword: setPassword,
    comfirmPassword: confirmPassword,
    setcomfirmPassword: setConfirmPassword,
    image,
    setImage,
    address,
    setAddress,
    ofState,
    setOfState,
    phone,
    setPhone,
    website,
    setwebsite,
    type,
    setType,
    ownership,
    setOwnership,
    facility,
    setFacility,
    specialist,
    setSpecialist,
    about,
    setAbout,
    bannerPic,
    setBannerPic,
    OtherImages,
    setOtherImages,
    fetchHospital,
  };

  return (
    <HospitalInfoContext.Provider value={value}>
      {children}
    </HospitalInfoContext.Provider>
  );
};

export default HospitalInfoContextProvider;
