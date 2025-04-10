/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
// import { HospitalContext } from "../context/HospitalContext";

import Button from "../components/Button";
import HosDoc from "../components/HosDoc";
import { CiMail } from "react-icons/ci";
import { CgWebsite } from "react-icons/cg";
import { BiCalendar, BiPhone } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa6";
import { GiLabCoat } from "react-icons/gi";
import { toast } from "react-toastify";
import { useClerk, useUser } from "@clerk/clerk-react";
import { DoctorContext, Doctors } from "../context/DoctorContext";

import axios from "axios";
import Spinner from "../components/Spinner";
import { HospitalInfoContext, newHospital } from "../context/HospitalInfo";
const UserDoctorPage = () => {
  const { id } = useParams();

  const { openSignIn } = useClerk();
  // const { name, setName, email, setMessage, message, setEmail } =
  //   useContext(HospitalContext);

  const { Doctor, backendUrl, loading, setLoading } =
    useContext(DoctorContext);
  const { Hospital} =
    useContext(HospitalInfoContext);

  const [docData, setDocData] = useState<Doctors | null>(null);
  const [hospData, sethosData] = useState<newHospital | null>(null);

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


  const navigate = useNavigate();

  const useYear = () => {
    if (!docData?.experience) return 0; // If no experience data, return 0

    const startDate = new Date(docData.experience); // Convert the string date to a Date object
    const currentYear = new Date().getFullYear();

    const startYear = startDate.getFullYear(); // Extract the year from the experience date

    return currentYear - startYear;
  };

  const fetchDoc = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/doctor/doctor/${id}`);
      if (data.success) {
        setDocData(data.doctor);
        setLoading(false);
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

  const relatedDoctors = Doctor.filter(
    (doc) => docData?._id !== doc._id && docData?.field === doc.field
  ).slice(0, 5);

  useEffect(() => {
    if (Doctor.length > 0) {
      fetchDoc();
      setLoading(false);
    }
  }, [id, Doctor]);

  // const handleReview = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!email.trim()) {
  //     toast.error("Please input your email");
  //     return;
  //   }
  //   if (!name.trim()) {
  //     toast.error("Please input your name");
  //     return;
  //   }
  //   if (!message.trim()) {
  //     toast.error("Please input your review");
  //     return;
  //   }

  //   const data = {
  //     name,
  //     email,
  //     message,
  //     Doctor_id: docData?._id,
  //   };

  //   console.log(data);

  //   toast.success("Review submitted successfully!");

  //   setEmail("");
  //   setName("");
  //   setMessage("");
  // };
  const { user } = useUser();

  return (
    <>
      <Navbar />
      {loading && <Spinner loading={loading} />}
      <div className="mt-28 w-full p-3">
        <div className=" w-5/6 hidden  md:block h-[40vh] mx-auto">
          <img
            src={docData?.bannerImage}
            className="w-full h-full object-fill"
            alt="banner pic"
          />
        </div>
        <div className="p-3  md:w-5/6 md:mt-5 mx-auto lg:grid grid-cols-5 gap-4">
          <div className=" w-full lg:p-4 col-span-3 my-4 lg:my-0 ">
            <div className="px-4 flex items-center justify-between flex-col md:flex-row gap-5  py-3">
              <div
                className={`relative border rounded-full ${
                  docData?.available === true
                    ? "border-green-500"
                    : "border-gray-500"
                }`}
              >
                <div className=" rounded-full overflow-hidden  w-28 h-28">
                  <img
                    src={docData?.image}
                    className="w-full h-full object-cover"
                    alt="profile pic"
                  />
                </div>{" "}
                <div
                  className={`z-10 absolute bottom-2 right-0 border p-3 rounded-full ${
                    docData?.available === true ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></div>
              </div>

              <div className="md:w-9/12 w-full ">
                <p className="border-color px-3 uppercase py-2 w-full text-sm">
                  {docData?.firstName} {docData?.lastName}
                </p>
                <div className="text-sm flex items-center justify-between gap-3 mt-4">
                  <p className="w-5/6 border-color px-3 capitalize py-2 whitespace-nowrap overflow-scroll ">
                    {hospData?.name}
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
                    {docData?.email}
                  </p>
                </div>
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <CgWebsite className="text-green-700 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {docData?.website}
                  </p>
                </div>
              </div>
              <div className="text-sm gap-2 flex items-center justify-between md:flex-row flex-col sm:my-1  ">
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <BiPhone className="text-green-700 w-5 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {docData?.phone}
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
                    {useYear()}
                  </p>
                </div>
              </div>
              <div className="text-sm gap-2 flex items-center justify-between md:flex-row flex-col sm:my-1  ">
                <div className="flex my-1 p-1 md:my-0 w-full md:w-1/2 items-center gap-2">
                  <div className=" border p-3 border-green-600 rounded-full">
                    <GiLabCoat className="text-green-700 w-5 text-xl text-center" />
                  </div>
                  <p className="border-color w-full px-3 py-2 overflow-scroll whitespace-nowrap text-sm ">
                    {docData?.field}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                book an appointmnet
              </h2>
              <div className="text-sm gap-2 flex items-center justify-center md:flex-row flex-col">
                {user ? (
                  <Button
                    text=" book an appointment"
                    className=" capitalize border-color px-6 py-3 font-bold "
                    onClick={() => {
                      navigate(`/doctor/${id}/book-appointment`);
                      window.scrollTo(0, 0);
                    }}
                  />
                ) : (
                  <Button
                    text=" login to book an appointment"
                    className=" capitalize border-color px-6 py-3 font-bold "
                    onClick={() => {
                      openSignIn();
                      window.scrollTo(0, 0);
                    }}
                  />
                )}
              </div>
            </div>

            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
                about doctor
              </h2>

              <p className=" border-color w-11/12 mx-auto capitalize px-3 py-2  text-sm leading-relaxed ">
                {docData?.about}
              </p>
            </div>

            {/* <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg">
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
            </div> */}
          </div>
          {relatedDoctors.length > 0 && (
            <div className="lg:border flex flex-col-reverse lg:block rounded-lg w-full lg:p-4 col-span-2 md:mt-0">
              <div>
                {relatedDoctors.length > 0 && (
                  <h2 className="font-medium capitalize mb-4 text-lg">
                    Related Doctors
                  </h2>
                )}
                <div className="text-sm">
                  {relatedDoctors.map((item) => (
                    <div key={item._id}>
                      <HosDoc
                        name={item.Name}
                        id={item._id}
                        field={item.field}
                        image={item.image}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="mt-4">
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
            </div> */}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDoctorPage;
