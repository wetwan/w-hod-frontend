/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";
import { Doctor } from "../types/type";
import Button from "../components/Button";
import HosDoc from "../components/HosDoc";
import Review from "../components/Review";
import { CiMail } from "react-icons/ci";
import { CgWebsite } from "react-icons/cg";
import { BiCalendar, BiPhone } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa6";
import { GiLabCoat } from "react-icons/gi";
import { toast } from "react-toastify";
import { useClerk, useUser } from "@clerk/clerk-react";
import { DoctorContext } from "../context/DoctorContext";
const HospitalDoctor = () => {
  const { id } = useParams();
  const { openSignIn } = useClerk();
  const { name, setName, email, setMessage, message, setEmail } =
    useContext(HospitalContext);

  const { Doctor } = useContext(DoctorContext);

  const [docData, setDocData] = useState<Doctor | null>(null);

  const navigate = useNavigate();

  const fetchDoc = async () => {
    const data = Doctor.filter((doc) => doc._id === id);
    if (data.length !== 0) {
      setDocData(data[0]);
    }
  };
  const relatedDoctors = Doctor.filter(
    (doc) => docData?._id !== doc._id && docData?.Field === doc.Field
  ).slice(0, 5);

  useEffect(() => {
    if (Doctor.length > 0) {
      fetchDoc();
    }
  }, [id, Doctor]);
  const handleReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please input your email");
      return;
    }
    if (!name.trim()) {
      toast.error("Please input your name");
      return;
    }
    if (!message.trim()) {
      toast.error("Please input your review");
      return;
    }

    const data = {
      name,
      email,
      message,
      Doctor_id: docData?._id,
    };

    toast.success("Review submitted successfully!");

    setEmail("");
    setName("");
    setMessage("");
  };

  return (
    <>
      <div
        className={`${
          docData?.avalaibility === "online"
            ? "border-green-300"
            : "border-gray-300"
        } mt-2 rounded-md border`}
      >
        <div className=" hidden  md:block h-[40vh] mx-auto">
          <img
            src={docData?.picBanner}
            className="w-full h-full"
            alt="banner pic"
          />
        </div>
        <div className="p-3 md:mt-5 mx-auto lg:grid grid-cols-5 gap-4">
          <div className=" w-full lg:p-4 col-span-3 my-4 lg:my-0 ">
            <div className="px-4 flex items-center justify-between flex-col md:flex-row gap-5  py-3">
              <div
                className={`relative border  rounded-full ${
                  docData?.avalaibility === "online"
                    ? "border-green-500"
                    : " border-gray-500"
                }`}
              >
                <div className=" rounded-full overflow-hidden  w-28 h-28">
                  <img
                    src={docData?.ProfilePic}
                    className="w-full h-full object-cover"
                    alt="profile pic"
                  />
                </div>{" "}
                <div
                  className={`z-50 absolute bottom-2 right-0 border p-3 rounded-full ${
                    docData?.avalaibility === "online"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                ></div>
              </div>

              <div className="md:w-9/12 w-full ">
                <p className="border-color px-3 uppercase py-2 w-full text-sm">
                  {docData?.Name}
                </p>
                <div className="text-sm flex items-center justify-between gap-3 mt-4">
                  <p className="w-5/6 border-color px-3 capitalize py-2 whitespace-nowrap overflow-scroll ">
                    {docData?.Hospital_Name}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                contact information
              </h2>
              <div className="text-sm gap-2 flex items-center justify-between md:flex-row flex-col">
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <CiMail className="text-green-700 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {docData?.Email}
                  </p>
                </div>
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <CgWebsite className="text-green-700 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {docData?.Website}
                  </p>
                </div>
              </div>
              <div className="text-sm gap-2 flex items-center justify-between md:flex-row flex-col sm:my-1  ">
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <BiPhone className="text-green-700 w-5 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {docData?.Phone}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                acdamic and professional information
              </h2>
              <div className="text-sm gap-2 flex items-center justify-between md:flex-row flex-col">
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <FaGraduationCap className="text-green-700 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {docData?.College}
                  </p>
                </div>
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <BiCalendar className="text-green-700 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {docData?.Experience}
                  </p>
                </div>
              </div>
              <div className="text-sm gap-2 flex items-center justify-between md:flex-row flex-col sm:my-1  ">
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <GiLabCoat className="text-green-700 w-5 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {docData?.Field}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                about doctor
              </h2>

              <p className=" border-color w-11/12 mx-auto capitalize px-3 py-2  text-sm leading-relaxed ">
                {docData?.About}
              </p>
            </div>
          </div>
          <div className="lg:border flex flex-col-reverse lg:block rounded-lg w-full lg:p-4 col-span-2 md:mt-0">
            <div className="mt-4">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                doctor reviwes
              </h2>
              <div className="text-sm ">
                {docData?.Review.map((item, i) => (
                  <Review
                    key={i}
                    name={item.name}
                    review={item.Comment}
                    email={item.email}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalDoctor;
