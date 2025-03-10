import moment from "moment";
import { useContext, useState, useMemo } from "react";
import { HospitalContext } from "../context/HospitalContext";
import { useNavigate } from "react-router";
const Appointment = () => {
  const navigate = useNavigate();
  const { appointment, currentPage } = useContext(HospitalContext);

  const [selectedStatus, setSelectedStatus] = useState("all");

  const sortAppointments = useMemo(() => {
    return appointment.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [appointment]);

  // Filter Appointments Based on Status
  const filteredAppointments = useMemo(() => {
    return sortAppointments.filter((appt) =>
      selectedStatus === "all" ? true : appt.status === selectedStatus
    );
  }, [sortAppointments, selectedStatus]);

  return (
    <div className="p-5 hadow-lg bg-white rounded-lg h-screen">
      {/* Heading & Filter Dropdown */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">My Appointments</h2>
        <select
          className="x-4 py-2 rounded-md outline-none bg-gray-100"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Canceled">Canceled</option>
          <option value="Successful">Successful</option>
        </select>
      </div>

      <table className="min-w-full bg-white rounded-lg overflow-scroll">
        <thead>
          <tr className="cursor-pointer h-[100px] inline-flex items-center  w-full justify-between border border-b my-4">
            <th className="py-3 px-4 text-left max-md:hidden">image</th>
            <th className="py-3 px-4 text-left">Doctor</th>
            <th className="py-3 px-4 text-left max-md:hidden">Hospital</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Time</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {filteredAppointments.length > 0 ? (
            filteredAppointments
              .slice((currentPage - 1) * 9, currentPage * 9)
              .map((appt) => (
                <tr
                  key={appt._id}
                  className="cursor-pointer h-[100px] inline-flex items-center  w-full justify-between border border-b"
                  onClick={() => navigate(`/appointment/${appt._id}`)}
                >
                  <td className="py-3 px-4 max-md:hidden">
                    <img
                      src={appt?.doctorId?.image}
                      alt="doctor"
                      className="w-12 h-12 rounded-full max-md:hidden"
                    />
                  </td>
                  <td className="text-lg font-semibold py-3 px-4 capitalize">{`${appt.doctorId.firstName} ${appt.doctorId.lastName}`}</td>
                  <td className="text-sm py-3 px-4 max-md:hidden">
                    {appt?.hospitalId.name}
                  </td>
                  <td className="text-sm py-3 px-4 ">
                    {moment(appt.slotDate, "D-M-YYYY").format("ll")}
                  </td>
                  <td className="text-sm py-3 px-4 ">
                    {moment(appt.slotTime, "hh:mm A").format("hh:mm A")}
                  </td>
                  <td
                    className={`text-lg font-semibold mx-2 my-2 inline-block mt-5 md:mt-0 py-3 px-4 capitalize rounded-lg ${
                      appt.status === "Pending"
                        ? "bg-yellow-100"
                        : appt.status === "Canceled"
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
              <td colSpan={6} className="text-center text-gray-500">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Appointment;
