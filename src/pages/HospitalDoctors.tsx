import { useContext, useState } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { HospitalContext } from "../context/HospitalContext";
import Pagenation from "../components/Pagenation";
import { useNavigate } from "react-router";
import { BiPlus } from "react-icons/bi";

const HospitalDoctors = () => {
  const { currentPage } = useContext(HospitalContext);
  const { Doctor } = useContext(DoctorContext);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const sortDoc = Doctor.sort((a, b) => {
    return a.Name.localeCompare(b.Name);
  });

  const filteredDoc = sortDoc.filter((appt) =>
    selectedStatus === "all" ? true : appt.Field === selectedStatus
  );
  const sortAva = filteredDoc.sort((b, a) => {
    return a.avalaibility.localeCompare(b.avalaibility);
  });
  const naviagte = useNavigate();

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
                Doctor.sort((a, b) => a.Field.localeCompare(b.Field)).map(
                  (doc) => doc.Field
                )
            ),
          ].map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </select>

        <button
          className="flex items-center text-xl max-md:w-full mb-5 gap-3 justify-evenly  md:mb-10 border md:px-10 md:mr-10 md:gap-5 py-4 outline-none border-color capitalize "
          onClick={() => naviagte("/hospital-dashboard/add-doctor")}
        >
          {" "}
          <span className="font-bold">add doctor</span>
          <BiPlus className="text-green-400" />
        </button>
      </div>
      <div className="flex items-center gap-10 flex-wrap">
        {sortAva.slice((currentPage - 1) * 9, currentPage * 12).map((doc) => {
          return (
            <div
              className={`p-3 border w-[200px] max-md:w-5/6 mx-auto rounded-md ${
                doc.avalaibility === "online"
                  ? "border-green-300 "
                  : "border-gray-300"
              }`}
              key={doc._id}
              onClick={() => naviagte(`/hospital-dashboard/doctor/${doc._id}`)}
            >
              <div
                className={`h-[150px] ${
                  doc.avalaibility === "online"
                    ? "bg-green-300 "
                    : "bg-gray-300"
                }`}
              >
                <img src={doc.ProfilePic} alt="" className="w-full h-full" />
              </div>

              <h3>{doc.Name}</h3>
              <div className=" flex items-center justify-between">
                 <h5>{doc.Field}</h5>
                 <input type="checkbox" name="" id="" />
              </div>
             
            </div>
          );
        })}
      </div>
      <Pagenation item={Doctor} />
    </div>
  );
};

export default HospitalDoctors;
