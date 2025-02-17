/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useState,
  ReactNode,
  ReactElement,
  useEffect,
} from "react";
import { hospitals } from "../assets";
type Hospital = {
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

export type UseHospitalInfo = {
  Hospital: Hospital[];
  setHospital: (hospitals: Hospital[]) => void;
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
  facility: string[] ;
  setFacility: (facility:  string[]) => void;
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
};

const initContext: UseHospitalInfo = {
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
  OtherImages: null,
  setOtherImages: () => {},
};

export const HospitalInfoContext = createContext<UseHospitalInfo>(initContext);

const HospitalInfoContextProvider = ({
  children,
}: {
  children?: ReactNode;
}): ReactElement => {
  const [Hospital, setHospital] = useState<Hospital[]>([]);
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
  const [specialist, setSpecialist] = useState<string >('');
  const [about, setAbout] = useState("");
  const [bannerPic, setBannerPic] = useState<File | null>(null);
  const [showHospitalLogin, setShowHospitalLogin] = useState(false);
  const [OtherImages, setOtherImages] = useState<File[] | null>(null);

  const fetchHospital = async () => {
    setHospital(hospitals);
  };
  useEffect(() => {
    fetchHospital();
  }, []);

  const value: UseHospitalInfo = {
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
  };

  return (
    <HospitalInfoContext.Provider value={value}>
      {children}
    </HospitalInfoContext.Provider>
  );
};

export default HospitalInfoContextProvider;
