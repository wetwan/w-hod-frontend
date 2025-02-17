/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useState,
  ReactNode,
  ReactElement,
  useEffect,
} from "react";
import { doctors } from "../assets";

type Doctor = {
  first_Name?: string;
  last_Name?: string;
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
export type UseDoctorInfo = {
  Doctor: Doctor[];
  setDoctor: (doctors: Doctor[]) => void;
  name: string;
  setName: (name: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  school: string;
  setSchool: (name: string) => void;
  experience: Date | null| undefined;
  setExperience: (experience: Date | null| undefined) => void;
  email: string;
  hospistalName: string;
  setEmail: (email: string) => void;
  sethospistalName: (hospistalName: string) => void;
  password: string;
  setpassword: (password: string) => void;
  comfirmPassword: string;
  setcomfirmPassword: (comfirmPassword: string) => void;
  image: string;
  setImage: (image: string) => void;
  address: string;
  setAddress: (address: string) => void;
  ofState: string;
  setOfState: (ofState: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  website: string;
  setwebsite: (website: string) => void;

  specialist: string;
  setSpecialist: (specialist: string) => void;
  about: string;
  setAbout: (about: string) => void;
  bannerPic: File | null;
  setBannerPic: (bannerPic: File | null) => void;
  profilePic: File | null;
  setProfilePic: (profilePic: File | null) => void;
  showDoctorLogin: boolean;
  setShowDoctorLogin: (showDoctorLogin: boolean) => void;
};

const initContext: UseDoctorInfo = {
  Doctor: [],
  setDoctor: () => {},
  showDoctorLogin: false,
  setShowDoctorLogin: () => {},
  name: "",
  setName: () => {},
  firstName: "",
  setFirstName: () => {},
  lastName: "",
  setLastName: () => {},
  school: "",
  setSchool: () => {},
  experience: null,
  setExperience: () => {},
  email: "",
  hospistalName: "",

  setEmail: () => {},
  sethospistalName: () => {},
  password: "",
  setpassword: () => {},
  comfirmPassword: "",
  setcomfirmPassword: () => {},
  image: "",
  setImage: () => {},
  address: "",
  setAddress: () => {},
  ofState: "",
  setOfState: () => {},
  phone: "",
  setPhone: () => {},
  website: "",
  setwebsite: () => {},

  specialist: "",
  setSpecialist: () => {},
  about: "",
  setAbout: () => {},
  bannerPic: null,
  setBannerPic: () => {},
  profilePic: null,
  setProfilePic: () => {},
};

export const DoctorContext = createContext<UseDoctorInfo>(initContext);

const DoctorContextProvider = ({
  children,
}: {
  children?: ReactNode;
}): ReactElement => {
  const [Doctor, setDoctor] = useState<Doctor[]>([]);
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [hospistalName, setHospistalName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [ofState, setOfState] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setwebsite] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [about, setAbout] = useState("");
  const [school, setSchool] = useState("");
  const [experience, setExperience] = useState<Date | null| undefined>();

  const [profilePic, setProfilePic] =useState<File | null>(null);
  const [bannerPic, setBannerPic] =useState<File | null>(null);
  const [showDoctorLogin, setShowDoctorLogin] = useState(false);
  const fetchDoctor = async () => {
    setDoctor(doctors);
  };
  useEffect(() => {
    fetchDoctor();
  }, []);

  const value: UseDoctorInfo = {
    school,
    setSchool,
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
    ofState,
    setOfState,
    phone,
    setPhone,
    website,
    setwebsite,

    specialist,
    setSpecialist,
    about,
    setAbout,
    bannerPic,
    setBannerPic,
    profilePic,
    setProfilePic,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
