import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { HospitalContext } from "../context/HospitalContext";
import Pagenation from "../components/Pagenation";
import moment from "moment";

const HospitalAppointments = () => {
  const navigate = useNavigate();
  const { appointment, currentPage } = useContext(HospitalContext);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const sortAppointments = appointment.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Filter Appointments Based on Status
  const filteredAppointments = sortAppointments.filter((appt) =>
    selectedStatus === "all" ? true : appt.status === selectedStatus
  );
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
                      navigate(`/hospital-dashboard/appointment/${appt._id}`)
                    }
                    role="button"
                    tabIndex={0}
                  >
                    <td className="py-3 px-4  max-md:hidden">
                      <img
                        src={appt.doctor_image}
                        alt={`Dr. ${appt.doctor}`}
                        className="w-12 h-12 rounded-full max-md:hidden"
                      />
                    </td>
                    <td className="text-lg font-semibold py-3 px-4 ">
                      {appt.doctor}
                    </td>
                    <td className="text-sm py-3 px-4 ">
                      {moment(appt.date).format("ll")}
                    </td>
                    <td className="text-sm py-3 px-4 ">
                      {moment(appt.time, "HH:mm").format("hh:mm A")}
                    </td>
                    <td
                      className={`text-lg font-semibold border mx-2  inline-block my-5 py-3 px-4 capitalize rounded-lg ${
                        appt.status === "pending"
                          ? "bg-yellow-100"
                          : appt.status === "canceled"
                          ? "bg-red-100"
                          : "bg-green-100"
                      }`}
                    >
                      {appt.status}
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

export default HospitalAppointments;
