/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";
import { Hospital } from "../types/type";
import { BiMailSend } from "react-icons/bi";
import { FaChair, FaInternetExplorer } from "react-icons/fa6";
import { BuildingOffice2Icon, PhoneIcon } from "@heroicons/react/24/solid";
import HosDoc from "../components/HosDoc";
import Button from "../components/Button";
import Review from "../components/Review";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { HospitalInfoContext } from "../context/HospitalInfo";

const UserHospitalPage = () => {
  const { id } = useParams();
  const { name, setName, email, setMessage, message, setEmail } =
    useContext(HospitalContext);

  const { Doctor } = useContext(DoctorContext);
  const { Hospital } = useContext(HospitalInfoContext);

  const [hospData, setHospData] = useState<Hospital | null>(null);

  const fetchHos = async () => {
    const data = Hospital.filter((hos) => hos._id === id);
    if (data.length !== 0) {
      setHospData(data[0]);
    }
  };

  useEffect(() => {
    if (Hospital.length > 0) {
      fetchHos();
    }
  }, [id, Hospital]);

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
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      Hospital_Id: hospData?._id,
    };
    toast.success("Review submitted successfully!");

    // Reset the fields
    setEmail("");
    setName("");
    setMessage("");
  };

  return (
    <>
      <Navbar />
      <div className="mt-28 w-full p-3">
        <div className=" w-5/6 hidden  md:block h-[40vh] mx-auto">
          <img
            src={hospData?.picBanner}
            className="w-full h-full"
            alt="banner pic"
          />
        </div>
        <div className="p-3  md:w-5/6 md:mt-5 mx-auto lg:grid grid-cols-5 gap-4">
          <div className=" w-full lg:p-4 col-span-3 my-4 lg:my-0 ">
            <div className="px-4 flex items-center justify-between flex-col md:flex-row gap-5  py-3">
              <div className=" rounded-full overflow-hidden  w-28 h-28">
                <img
                  src={hospData?.ProfilePic}
                  className="w-full h-full object-cover"
                  alt="profile pic"
                />
              </div>
              <div className="md:w-9/12 w-full ">
                <p className="border-color px-3 uppercase py-2 w-full text-sm">
                  {" "}
                  {hospData?.Hospital_Name}
                </p>
                <div className="text-sm flex items-center justify-between gap-3 mt-4">
                  <p className="w-5/6 border-color px-3 capitalize py-2 whitespace-nowrap overflow-scroll ">
                    {hospData?.Address}
                  </p>
                  <p className="border-color px-3 capitalize py-2 text-sm">
                    {hospData?.AddressState}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                {" "}
                contact information
              </h2>
              <div className="text-sm gap-2 flex items-center justify-between md:flex-row flex-col">
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <BiMailSend className="text-green-700 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {" "}
                    {hospData?.Email}
                  </p>
                </div>
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <FaInternetExplorer className="text-green-700 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {" "}
                    {hospData?.Website}
                  </p>
                </div>
              </div>
              <div className="text-sm gap-2 flex items-center justify-between md:flex-row flex-col sm:my-1  ">
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <PhoneIcon className="text-green-700 w-5 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {" "}
                    {hospData?.Phone_Number}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                {" "}
                general information
              </h2>
              <div className="text-sm gap-2 flex items-center justify-between md:flex-row flex-col">
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <BuildingOffice2Icon className="text-green-700 w-4 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {" "}
                    {hospData?.Type}
                  </p>
                </div>
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <FaChair className="text-green-700 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {" "}
                    {hospData?.ownership}
                  </p>
                </div>
              </div>
              <div className="text-sm gap-2 flex items-center justify-between md:flex-row flex-col sm:my-1  ">
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <PhoneIcon className="text-green-700 w-5 text-xl text-center" />
                  </div>
                  <div className="flex items-center w-full  gap-2">
                    {hospData?.facility.map((item, i) => (
                      <p
                        className="border-color w-fit capitalize px-3 py-2 overflow-scroll whitespace-nowrap text-sm "
                        key={i}
                      >
                        {" "}
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                {" "}
                availiable departments
              </h2>
              <div className=" px-5 flex items-center gap-3 overflow-scroll">
                {hospData?.Available_Specialists.map((item, i) => (
                  <p
                    className=" border-color w-fit capitalize px-3 py-2 text-center whitespace-nowrap text-sm"
                    key={i}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                {" "}
                about hospital
              </h2>

              <p className=" border-color w-11/12 mx-auto capitalize px-3 py-2  text-sm leading-relaxed ">
                {hospData?.About}
              </p>
            </div>
            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                {" "}
                hospital gallery
              </h2>
              <div className=" px-5 w-full overflow-scroll flex items-center gap-3">
                {hospData?.OtherImages.map((item, i) => (
                  <div className="w-[300px] h-[100px]" key={i}>
                    <img
                      src={item}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                {" "}
                leave a Review
              </h2>
              <form className="pb-5" onClick={handleReview}>
                <div className="gap-5 md:gap-10  flex md:items-center flex-col md:flex-row md:px-4 justify-between">
                  <div className="flex flex-col w-full">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="md:mt-4 mt-2 border border-color px-3 py-2 capitalize outline-none"
                      placeholder="john doe"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col  w-full">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="md:mt-4 mt-2 border outline-none border-color px-3 py-2"
                      placeholder="Joghdoe@email.com"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-5 md:px-4">
                  <label className="mb-3 block" htmlFor="textarea">
                    Meassage
                  </label>
                  <textarea
                    id="textarea"
                    className="border-color py-3 w-full px-3 max-h-28 min-h-28 md:min-h-[100px] md:max-h-[100px] placeholder-shown:capitalize text-xl overflow-scroll outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="please leave your message"
                  ></textarea>
                </div>
                <Button
                  className="md:ml-4 capitalize border-color px-10 mt-3 py-3"
                  text="submit"
                />
              </form>
            </div>
          </div>
          <div className="lg:border flex flex-col-reverse lg:block rounded-lg w-full lg:p-4 col-span-2 md:mt-0">
            <div className="">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                {" "}
                hospital doctors
              </h2>
              <div className="text-sm ">
                {Doctor.filter(
                  (doc) => hospData?.Hospital_Name === doc.Hospital_Name
                )
                  .slice(0, 5)
                  .map((item) => (
                    <div className="" key={item._id}>
                      <HosDoc
                        name={item.Name}
                        id={item._id}
                        field={item.Field}
                        image={item.ProfilePic}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-4">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                {" "}
                hospital reviwes
              </h2>
              <div className="text-sm ">
                {hospData?.Review.map((item, i) => (
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
      <Footer />
    </>
  );
};

export default UserHospitalPage;
