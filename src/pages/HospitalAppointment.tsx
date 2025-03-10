/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react";
import {
  AppointmentDetail,
  Appointments,
  HospitalContext,
} from "../context/HospitalContext";
import { useParams } from "react-router";
import moment from "moment";
import Spinner from "../components/Spinner";

const HospitalAppointment = () => {
  const { id } = useParams();
  const { appointment, appointmentDetails, loading, setLoading } =
    useContext(HospitalContext);

  const [appBio, setAppBio] = useState<Appointments | null>(null);
  const [appData, setAppData] = useState<AppointmentDetail | null>(null);
  const fecthAppointment = async () => {
    const data = appointment.filter((app) => app._id === id);
    if (data.length !== 0) {
      setAppBio(data[0]);
    }
  };
  const fetchBio = async () => {
    if (!appBio) return;

    const data = appointmentDetails.find(
      (app) => app.appointmentID._id === appBio._id
    );
    if (data) {
      setAppData(data);
    }
  };
  useEffect(() => {
    if (appointment.length > 0) {
      fecthAppointment();
    }
  }, [id, appointment]);
  useEffect(() => {
    if (appBio && appointmentDetails.length > 0) {
      fetchBio();
      setLoading(false);
    }
  }, [appBio, appointmentDetails]);
  return (
    <div>
      {loading ? (
        <Spinner loading />
      ) : (
        <div className="mt-3 md:border min-h-screen capitalize">
          <div className="md:w-5/6 mx-auto">
            <div className="container border mx-auto md:px-4 md:py-5 bg px-10 py-10  rounded-lg md:flex-row flex-col flex items-start lg:gap-10 justify-around ">
              <div className="w-32  h-32 mt-5 rounded-full overflow-hidden">
                <img
                  src={appBio?.userId.image}
                  alt="profile image"
                  className="w-full h-full"
                />
              </div>
              <div className="mt-5">
                <h5 className="text-2xl font-semibold capitalize">
                  {appBio?.userId.firstName} {appBio?.userId.lastName}
                </h5>
                <p className="text-gray-500 capitalize">
                  <span className="text-black mr-3 font-semibold capitalize">
                    {" "}
                    gender:
                  </span>{" "}
                  {appBio?.userId.gender}
                </p>
                <p className="text-gray-100 capitalize">
                  {" "}
                  <span className="text-black mr-3 font-semibold capitalize ">
                    {" "}
                    weight:
                  </span>
                  {appBio?.userId.weight} kg
                </p>
                <p className="text-gray-100 capitalize">
                  {" "}
                  <span className="text-black mr-3 font-semibold capitalize">
                    {" "}
                    height:
                  </span>
                  {appBio?.userId.height} cm
                </p>
                <p className="text-gray-100 capitalize">
                  {" "}
                  <span className="text-black mr-3 font-semibold capitalize"> email:</span>
                  {appBio?.userId.email}
                </p>
                <p className="text-gray-100 capitalize">
                  {" "}
                  <span className="text-black mr-3 font-semibold capitalize">
                    {" "}
                    phone:
                  </span>{" "}
                  {appBio?.userId.phone}
                </p>
              </div>
              <div className="mt-5">
                <h5 className="text-xl font-semibold capitalize">
                  {appBio?.doctorId?.firstName} {appBio?.doctorId?.lastName}
                </h5>
                <p className="text-gray-100 capitalize">
                  {appBio?.hospitalId?.name}
                </p>
              </div>
              <div className=" mt-5 sm:mx-10">
                <button className="px-4 py-2 border capitalize font-bold rounded-lg border-color mb-5">
                  {" "}
                  {appBio?.status}
                </button>
                <p className="text-gray-100 capitalize">
                  {" "}
                  <span className="text-black mr-3 font-semibold capitalize">
                    {" "}
                    date:
                  </span>{" "}
                  {moment(appBio?.slotDate, "D-M-YYYY").format("ll")}
                </p>
                <p className="text-gray-100 capitalize">
                  {" "}
                  <span className="text-black mr-3 font-semibold capitalize">
                    {" "}
                    time:
                  </span>{" "}
                  {moment(appBio?.slotTime, "hh:mm A").format("hh:mm A")}
                </p>
              </div>
            </div>
            {appBio?.status === "Canceled" && (
              <div className="md:w-5/6 mx-auto w-full">
                <p className="w-5/6 py-10 text-center mx-auto capitalize font-bold text-2xl  text-red-600">
                  {" "}
                  this appointment was cancelled
                </p>
              </div>
            )}
            {appBio?.status === "Pending" && (
              <p className="w-5/6 py-10 text-center mx-auto capitalize font-bold text-2xl text-yellow-600">
                {" "}
                this appointment is pending
              </p>
            )}
            {appBio?.status === "Successful" && (
              <div className="container rounded-xl py-5 px-4 border mx-auto mt-10 ">
                <h2 className="capitalize text-3xl font-extrabold ">
                  {" "}
                  doctor report{" "}
                </h2>
                <div className="container mx-auto mt-3 px-3">
                  <div className="">
                    <h5 className="text-gray-100 mt-5 font-semibold">
                      Reason for visit
                    </h5>
                    <p className="md:w-4/6 mt-5 border-color px-3 py-2">
                      {appData?.reason}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-gray-100 mt-5 font-semibold">
                      Medical history
                    </h5>
                    <p className="md:w-4/6 mt-5 border-color px-3 py-2">
                      {appData?.history}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-gray-100 mt-5 font-semibold">
                      Vital signs
                    </h5>
                    <div className=" md:px-10 mt-3 flex md:items-center gap-5 md:flex-row flex-col">
                      <div className="">
                        <h6 className="text-gray-900 font-semibold text-lg">
                          {" "}
                          Body temperature
                        </h6>
                        <p className="border-color px-3 py-2 mt-2">
                          {" "}
                          {appData?.temperature}
                        </p>
                      </div>
                      <div className="">
                        <h6 className="text-gray-900 font-semibold text-lg">
                          {" "}
                          Pulse rate
                        </h6>
                        <p className="border-color px-3 py-2 mt-2">
                          {" "}
                          {appData?.pulse}{" "}
                        </p>
                      </div>
                      <div className="">
                        <h6 className="text-gray-900 font-semibold text-lg">
                          {" "}
                          Respiration rate{" "}
                        </h6>
                        <p className="border-color px-3 py-2 mt-2">
                          {" "}
                          {appData?.respiration}
                        </p>
                      </div>
                      <div className="">
                        <h6 className="text-gray-900 font-semibold text-lg">
                          {" "}
                          blood preesure rate{" "}
                        </h6>
                        <p className="border-color px-3 py-2 mt-2">
                          {" "}
                          {appData?.blood_pressure}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <h5 className="text-gray-100 mt-5 font-semibold">
                      Doctor Diagnosis
                    </h5>
                    <p className="md:w-4/6 mt-5 border-color px-3 py-2">
                      {appData?.diagnosis}
                    </p>
                  </div>
                  <div className="">
                    <h5 className="text-gray-100 mt-5 font-semibold">
                      Doctor prebscription
                    </h5>
                    <p className="md:w-4/6 mt-5 border-color px-3 py-2"></p>{" "}
                    {appData?.prescriptions}
                  </div>
                  <div className="">
                    <h5 className="text-gray-500 mt-5 font-semibold">
                      Doctor signature
                    </h5>
                    <p className="w-fit mt-5 border-color px-10 py-4">
                      {appBio?.doctorId.firstName} {appBio?.doctorId.lastName}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalAppointment;
