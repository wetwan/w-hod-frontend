/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { FaChair, FaInternetExplorer } from "react-icons/fa6";
import { BuildingOffice2Icon, PhoneIcon } from "@heroicons/react/24/solid";
import HosDoc from "../components/HosDoc";
import { DoctorContext, Doctors } from "../context/DoctorContext";
import { HospitalInfoContext, newHospital } from "../context/HospitalInfo";


const UserHospitalPage = () => {
  const { id } = useParams();

  const { Doctor } = useContext(DoctorContext);
  const { Hospital } = useContext(HospitalInfoContext);

  const [hospData, setHospData] = useState<newHospital | null>(null);
   const [doc, setDoc] = useState<Doctors[]>();
    const fecthAppointment = async () => {
      const data = Doctor.filter((app) => app.hospitatId === hospData?._id);
      if (data.length !== 0) {
        setDoc(data);
      }
    };
    useEffect(() => {
      if (Doctor.length > 0) {
        fecthAppointment();
      }
    });
  

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

  

  return (
    <>
      <Navbar />
      <div className="mt-28 w-full p-3">
        <div className=" w-5/6 hidden  md:block h-[40vh] mx-auto">
          <img
            src={hospData?.banner}
            className="w-full h-full"
            alt="banner pic"
          />
        </div>
        <div className="p-3  md:w-5/6 md:mt-5 mx-auto lg:grid grid-cols-5 gap-4">
          <div className=" w-full lg:p-4 col-span-3 my-4 lg:my-0 ">
            <div className="px-4 flex items-center justify-between flex-col md:flex-row gap-5  py-3">
              <div className=" rounded-full overflow-hidden  w-28 h-28">
                <img
                  src={hospData?.image}
                  className="w-full h-full object-cover"
                  alt="profile pic"
                />
              </div>
              <div className="md:w-9/12 w-full ">
                <p className="border-color px-3 uppercase py-2 w-full text-sm">
                  {" "}
                  {hospData?.name}
                </p>
                <div className="text-sm flex items-center justify-between gap-3 mt-4">
                  <p className="w-5/6 border-color px-3 capitalize py-2 whitespace-nowrap overflow-scroll ">
                    {hospData?.address}
                  </p>
                  <p className="border-color px-3 capitalize py-2 text-sm">
                    {hospData?.state}
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
                    {hospData?.email}
                  </p>
                </div>
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <FaInternetExplorer className="text-green-700 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {" "}
                    {hospData?.website}
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
                    {hospData?.phone}
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
                    {hospData?.type}
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
                {[...new Set(doc?.map((hos) => hos.field))].map(
                  (item, i) => (
                    <p
                      className=" border-color w-fit capitalize px-3 py-2 text-center whitespace-nowrap text-sm"
                      key={i}
                    >
                      {item}
                    </p>
                  )
                )}
              </div>
            </div>
            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                {" "}
                about hospital
              </h2>

              <p className=" border-color w-11/12 mx-auto capitalize px-3 py-2  text-sm leading-relaxed ">
                {hospData?.about}
              </p>
            </div>
            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                {" "}
                hospital gallery
              </h2>
              <div className=" px-5 w-full overflow-scroll flex items-center gap-3">
                {hospData?.otherImages.map((item, i) => (
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
         
          </div>
          <div className="lg:border flex flex-col-reverse lg:block rounded-lg w-full lg:p-4 col-span-2 md:mt-0">
            <div className="">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                {" "}
                hospital doctors
              </h2>
              <div className="text-sm ">
                {Doctor.filter((doc) => hospData?._id === doc.hospitatId)
                  .slice(0, 5)
                  .map((item) => (
                    <div className="" key={item._id}>
                      <HosDoc
                        name={`${item.firstName} ${item.lastName}`}
                        id={item._id}
                        field={item.field}
                        image={item.image}
                      />
                    </div>
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
