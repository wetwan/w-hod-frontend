/* eslint-disable no-empty */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  ReactNode,
  ReactElement,
  useEffect,
  useContext,
  // useContext,
} from "react";
// import { doctorss } from "../assets";
import axios from "axios";
import { toast } from "react-toastify";
import { HospitalInfoContext, newHospital } from "./HospitalInfo";
import { Appointments } from "./HospitalContext";

export type Doctors = {
  firstName: string;
  lastName: string;
  AddressState: string;
  _id: string;
  Name: string;
  Hospital_Name: string;
  email: string;
  phone: string;
  website: string;
  College: string;
  experience: string;
  about: string;
  field: string;
  image: string;
  hospitatId: string;
  bannerImage: string;
  state: string;
  available: boolean;
  slot_booked: { [key: string]: string[] };
};
type UseDoctorInfo = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  backendUrl: string;
  Doctor: Doctors[];
  doctors: Doctors | null;
  setDoctor: React.Dispatch<React.SetStateAction<Doctors[]>>;
  setDoctors: (doctors: Doctors | null) => void;
  name: string;
  setName: (name: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  college: string;
  setCollege: (name: string) => void;
  experience: string;
  setExperience: (experience: string) => void;
  email: string;
  hospistalName: string;
  setEmail: (email: string) => void;
  sethospistalName: (hospistalName: string) => void;
  password: string;
  setpassword: (password: string) => void;
  comfirmPassword: string;
  setcomfirmPassword: (comfirmPassword: string) => void;
  appointment: Appointments[];
  setAppointment: (appointment: Appointments[]) => void;
  address: string;
  setAddress: (address: string) => void;
  state: string;
  setState: (State: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  website: string;
  setwebsite: (website: string) => void;

  field: string;
  setField: (field: string) => void;
  about: string;
  setAbout: (about: string) => void;
  bannerImage: File | null;
  setBannerImage: (bannerImage: File | null) => void;
  image: File | null;
  setImage: (image: File | null) => void;
  showDoctorLogin: boolean;
  setShowDoctorLogin: (showDoctorLogin: boolean) => void;
  fetchDoctor: () => void;
  fetchDoctorData: () => void;
  docToken: string | null;
  setDocToken: React.Dispatch<React.SetStateAction<string | null>>;
  docData: Doctors | null;
  setDocData: React.Dispatch<React.SetStateAction<Doctors | null>>;
  hosData: newHospital | null;
  sethosData: React.Dispatch<React.SetStateAction<newHospital | null>>;
  fetchAppointment: () => void;
};

const initContext: UseDoctorInfo = {
  loading: false,
  setLoading: () => {},
  sethosData: () => {},
  backendUrl: "",
  hosData: null,
  docToken: "",
  setDocToken: () => {},
  docData: null,
  setDocData: () => {},
  Doctor: [],
  doctors: null,
  setDoctor: () => {},
  setDoctors: () => {},
  showDoctorLogin: false,
  setShowDoctorLogin: () => {},
  name: "",
  setName: () => {},
  firstName: "",
  setFirstName: () => {},
  lastName: "",
  setLastName: () => {},
  college: "",
  setCollege: () => {},
  experience: "",
  setExperience: () => {},
  email: "",
  hospistalName: "",

  setEmail: () => {},
  sethospistalName: () => {},
  password: "",
  setpassword: () => {},
  comfirmPassword: "",
  setcomfirmPassword: () => {},
  fetchAppointment: () => {},
  address: "",
  setAddress: () => {},
  state: "",
  setState: () => {},
  phone: "",
  setPhone: () => {},
  website: "",
  setwebsite: () => {},
  appointment: [],

  field: "",
  setField: () => {},
  about: "",
  setAbout: () => {},
  bannerImage: null,
  setBannerImage: () => {},
  image: null,
  setImage: () => {},
  fetchDoctor: () => {},
  fetchDoctorData: () => {},
  setAppointment: () => {},
};

export const DoctorContext = createContext<UseDoctorInfo>(initContext);

const DoctorContextProvider = ({
  children,
}: {
  children?: ReactNode;
}): ReactElement => {
  const [Doctor, setDoctor] = useState<Doctors[]>([]);
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [hospistalName, setHospistalName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setwebsite] = useState("");
  const [field, setField] = useState("");
  const [about, setAbout] = useState("");
  const [college, setCollege] = useState("");
  const [experience, setExperience] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [showDoctorLogin, setShowDoctorLogin] = useState(false);
  const [docToken, setDocToken] = useState<string | null>(null);
  const [docData, setDocData] = useState<Doctors | null>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState<Doctors | null>(null);
  const [hosData, sethosData] = useState<newHospital | null>(null);
  const [appointment, setAppointment] = useState<Appointments[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { Hospital } = useContext(HospitalInfoContext);

  const fetchDoctor = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/doctor/");
      if (data.success) {
        setDoctor(data.doctors);
        setLoading(false);
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
  useEffect(() => {
    setLoading(true);
    fetchDoctor();
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchhos = async () => {
      setLoading(true);
      if (docData && docData.hospitatId && Hospital.length > 0) {
        const data = Hospital.find((hos) => hos._id === docData.hospitatId);

        if (data) {
          sethosData(data);
        }
      }
    };

    fetchhos();
    setLoading(false);
  }, [Doctor, Hospital, docData]);

  // fetch hospital data
  const fetchDoctorData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/", {
        headers: { token: docToken },
      });
      if (data.success) {
        setDocData(data.doctor);
        setLoading(true)
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
  const fetchAppointment = async () => {
    try {
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  useEffect(() => {
    setLoading(true)
    if (docToken) {
      fetchDoctorData();
      fetchAppointment();
    }
    setLoading(false)
  }, [docToken]);
  useEffect(() => {
    setLoading(true)
    fetchDoctor();
    const storedDoctorToken = localStorage.getItem("doctor token");
    if (storedDoctorToken) {
      setDocToken(storedDoctorToken);
    }
    setLoading(false)
  }, []);
  useEffect(() => {}, []);

  const value: UseDoctorInfo = {
    loading,
    setLoading,
    appointment,
    setAppointment,
    sethosData,
    hosData,
    doctors,
    setDoctors,
    backendUrl,
    docToken,
    setDocToken,
    docData,
    setDocData,
    college,
    setCollege,
    setExperience,
    experience,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    Doctor,
    setDoctor,
    showDoctorLogin,
    setShowDoctorLogin,
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
    state,
    setState,
    phone,
    setPhone,
    website,
    setwebsite,
    fetchAppointment,
    field,
    setField,
    about,
    setAbout,
    bannerImage,
    setBannerImage,
    fetchDoctorData,
    fetchDoctor,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
