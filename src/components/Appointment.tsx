import moment from "moment";
import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";
import { useNavigate } from "react-router";

const Appointment = () => {
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
      <div className="p-5 border shadow-lg bg-white rounded-lg">
        {/* Heading & Filter Dropdown */}
        <div className="flex justify-between items-center mb-5">
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
        <table className="min-w-full bg-white rounded-lg overflow-scroll">
          <thead>
            <tr className="capitalize ">
              <th className="py-3 px-4 border-b text-left max-md:hidden">
                image
              </th>
              <th className="py-3 px-4 border-b text-left"> Doctor</th>
              <th className="py-3 px-4 border-b text-left max-md:hidden">
                Hospital
              </th>
              <th className="py-3 px-4 border-b text-left">Date</th>
              <th className="py-3 px-4 border-b text-left">time</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments
                .slice((currentPage - 1) * 9, currentPage * 9)
                .map((appt) => (
                  <tr
                    key={appt._id}
                    className="border-b cursor-pointer"
                    onClick={() => {
                      navigate(`/appointment/${appt._id}`);
                    }}
                  >
                    <td className="py-3 px-4 border-b max-md:hidden">
                      <img
                        src={appt.doctor_image}
                        alt="doctor"
                        className="w-12 h-12 rounded-full max-md:hidden"
                      />
                    </td>
                    <td className="text-lg font-semibold py-3 px-4 border-b">
                      {appt.doctor}
                    </td>
                    <td className="text-sm py-3 px-4 border-b max-md:hidden">
                      {appt.hospistal_name}
                    </td>
                    <td className="text-sm py-3 px-4 border-b">
                      {moment(appt.date).format("ll")}
                    </td>
                    <td className="text-sm py-3 px-4 border-b">
                      {moment(appt.time, "HH:mm").format("hh:mm A")}
                    </td>

                    <td
                      className={`text-lg font-semibold border mx-2 my-2 inline-block mt-5 md:mt-0 py-3 px-4 capitalize rounded-lg ${
                        appt.status === "pending"
                          ? "bg-yellow-100"
                          : appt.status === "canceled"
                          ? "bg-red-100"
                          : "bg-green-100"
                      } `}
                    >
                      {appt.status}
                    </td>
                  </tr>
                  // className=
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
      </div>
    </>
  );
};

export default Appointment;
