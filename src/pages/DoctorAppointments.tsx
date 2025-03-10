import { useContext, useState } from "react";

import Pagenation from "../components/Pagenation";
import { HospitalContext } from "../context/HospitalContext";
import { useNavigate } from "react-router";
import moment from "moment";
import { DoctorContext } from "../context/DoctorContext";
import { HospitalInfoContext } from "../context/HospitalInfo";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorAppointments = () => {
  const navigate = useNavigate();

  const { currentPage, backendUrl } = useContext(HospitalContext);

  const { appointment, fetchAppointment } = useContext(HospitalInfoContext);
  const { docData, docToken } = useContext(DoctorContext);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const checkHospitalId = appointment.filter(
    (appt) => appt.doctorId._id === docData?._id
  );

  const sortAppointments = checkHospitalId.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Filter Appointments Based on Status
  const filteredAppointments = sortAppointments.filter((appt) =>
    selectedStatus === "all" ? true : appt.status === selectedStatus
  );

  const ChnagAppointment = async (id: string, status: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/appointment-status",
        {
          id,
          status,
        },
        { headers: { token: docToken } }
      );
      if (data.success) {
        fetchAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="p-5 w-full border h-full min-h-screen  bg-white md:rounded-lg">
        {/* Heading & Filter Dropdown */}
        <div className="flex justify-between md:flex-row flex-col items-start gap-5  mb-5">
          <h2 className="text-2xl font-semibold">My Appointments</h2>
          <select
            className="border px-4 py-2 rounded-md outline-none bg-gray-100"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
            <option value="successful">Successful</option>
          </select>
        </div>

        <table className="max-md:max-w-full  table-auto max-md:whitespace-nowrap w-full bg-white rounded-lg overflow-scroll">
          <thead className="w-full">
            <tr className="capitalize w-full">
              <th className="py-3 px-4  text-left max-md:hidden">Image</th>
              <th className="py-3 px-4  text-left">Patient</th>
              <th className="py-3 px-4  text-left">Date</th>
              <th className="py-3 px-4  text-left">Time</th>
              <th className="py-3 px-4  text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments
                .slice((currentPage - 1) * 9, currentPage * 9)
                .map((appt) => (
                  <tr
                    key={appt._id}
                    className="border-b   cursor-pointer hover:bg-gray-50 even:bg-blue-50 odd:bg-green-50"
                    onClick={() =>
                      navigate(`/doctor-dashboard/appointment/${appt._id}`)
                    }
                    role="button"
                    tabIndex={0}
                  >
                    <td className="py-3 px-4  max-md:hidden">
                      <img
                        src={appt.userId.image}
                        alt={`Dr. ${appt.userId.firstName}`}
                        className="w-12 h-12 rounded-full max-md:hidden"
                      />
                    </td>
                    <td className="text-lg font-semibold py-3 px-4 ">
                      {appt.userId.firstName} {appt.userId.lastName}
                    </td>
                    <td className="text-sm py-3 px-4 ">
                      {moment(appt.slotDate).format("ll")}
                    </td>
                    <td className="text-sm py-3 px-4 ">
                      {moment(appt.slotTime, "HH:mm").format("hh:mm A")}
                    </td>
                    <td className={`py-3 px-4  order relative `}>
                      <div className="relative px-4 inline-block  text-left group">
                        <button className="text-gray-500 action-button ">
                          {appt.status}...
                        </button>
                        <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block  ">
                          <button
                            onClick={() =>
                              ChnagAppointment(appt._id, "Pending")
                            }
                            className="block font-bold w-full text-left px-4 py-3 text-yellow-300 hover:bg-yellow-100"
                          >
                            Pending
                          </button>
                          <button
                            onClick={() =>
                              ChnagAppointment(appt._id, "Cancelled")
                            }
                            className="block w-full text-left px-4 py-3 text-red-300 font-bold hover:bg-yellow-100"
                          >
                            Cancelled
                          </button>
                          <button
                            onClick={() =>
                              ChnagAppointment(appt._id, "Successful")
                            }
                            className="block w-full text-left px-4 py-3 text-green-300 font-bold hover:bg-yellow-100"
                          >
                            Successful
                          </button>
                        </div>
                      </div>
                      {/* <select
                        name=""
                        id=""
                        value={appt.status}
                        onChange={(e) => setChangeStatus(e.target.value)}
                        className="bg-transparent   border-none outline-none w-full h-full"
                        onClick={() => ChnagAppointment(appt._id, changeStatus)}
                      >
                        <option value="pending">Pending</option>
                        <option value="canceled">Canceled</option>
                        <option value="successful">Successful</option>
                      </select> */}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagenation item={appointment} />
      </div>
    </>
  );
};

export default DoctorAppointments;
