/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useContext, useEffect, useState } from "react";
// import { DoctorContext } from "../context/DoctorContext";
import { HospitalContext } from "../context/HospitalContext";
import Pagenation from "../components/Pagenation";
import { useNavigate } from "react-router";
import { BiPlus } from "react-icons/bi";
import { HospitalInfoContext } from "../context/HospitalInfo";
import { Doctors } from "../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const HospitalDoctors = () => {
  const { currentPage } = useContext(HospitalContext);
  // const {  } = useContext(DoctorContext);
  const { doctors, hosData, backendUrl, hosToken, fetchDoctors } =
    useContext(HospitalInfoContext);

  const [selectedStatus, setSelectedStatus] = useState("all");
  // Make sure you have a Doctor type defined

  const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([]);

  const navigate = useNavigate();

  const findHospital = async () => {
    if (!hosData?._id) {
      console.log("Hospital data is missing");
      return [];
    }

    const matchedDoctors = doctors.filter(
      (doc) => doc.hospitatId === hosData._id
    );

    return matchedDoctors;
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsList = await findHospital();
      setFilteredDoctors(doctorsList); // Store doctors in state
    };

    fetchDoctors();
  }, [hosData, doctors]);

  const sortDoc = [...filteredDoctors].sort((a, b) => {
    const firstNameComparison = (a.firstName ?? "").localeCompare(
      b.firstName ?? ""
    );
    if (firstNameComparison !== 0) {
      return firstNameComparison;
    }
    return (a.lastName ?? "").localeCompare(b.lastName ?? "");
  });

  const filteredDoc = sortDoc.filter((appt) =>
    selectedStatus === "all" ? true : appt.field === selectedStatus
  );

  const sortAva = filteredDoc.sort((a, b) => {
    return Number(b.available) - Number(a.available);
  });
  const toggleAvailability = async (id: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/hospital/avalibility",
        {
          docId: id,
        },
        {
          headers: { token: hosToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchDoctors();
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
  

  return (
    <div className="border md:px-10 px-3 py-12 mb-20">
      <div className="flex items-center justify-between max-md:flex-col-reverse w-full p-2">
        <select
          className="mb-10 max-md:mb-5 border max-md:w-full px-2 py-4 outline-none border-color capitalize "
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value={"all"}>{"all"}</option>

          {[
            ...new Set(
              sortAva &&
                doctors
                  .sort((a, b) => a.field.localeCompare(b.field))
                  .map((doc) => doc.field)
            ),
          ].map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </select>

        <button
          className="flex items-center text-xl max-md:w-full mb-5 gap-3 justify-evenly  md:mb-10 border md:px-10 md:mr-10 md:gap-5 py-4 outline-none border-color capitalize "
          onClick={() => navigate("/hospital-dashboard/add-doctor")}
        >
          {" "}
          <span className="font-bold">add doctor</span>
          <BiPlus className="text-green-400" />
        </button>
      </div>
      <div className="grid lg:grid-cols-4 h-screen md:grid-cols-3 sm:grid-cols-2 max-sm:justify-start max-sm:items-start items-start max-sm:grid-cols-1">
        {sortAva.slice((currentPage - 1) * 9, currentPage * 12).map((doc) => {
          {
            /* {doctor.map((doc) => { */
          }
          return (
            <div
              className={`p-3 border w-[200px] max-md:w-5/6 mx-auto rounded-md ${
                doc?.available === true
                  ? "border-green-300 "
                  : "border-gray-300"
              }`}
              key={doc?._id}
            >
              <div
                onClick={() =>
                  navigate(`/hospital-dashboard/doctor/${doc?._id}`)
                }
                className={`h-[150px] ${
                  doc?.available === true ? "bg-green-300 " : "bg-gray-300"
                }`}
              >
                <img src={doc?.image} alt="" className="w-full h-full" />
              </div>

              <h3 className="capitalize font-bold clip ">
                {doc?.firstName} {doc?.lastName}
              </h3>
              <div className=" flex items-center justify-between">
                <h5>{doc?.field}</h5>

                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => toggleAvailability(doc._id)}
                  checked={doc?.available}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Pagenation item={doctors} />
    </div>
  );
};

export default HospitalDoctors;
