/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@clerk/clerk-react";
import { useContext, useEffect, useState } from "react";
import { Appointment, AppointmentData } from "../types/type";
import { HospitalContext } from "../context/HospitalContext";
import { useParams } from "react-router";

const DoctorAppointment = () => {
  const { id } = useParams();
  const { appointment, AppointmentData, weight, height, phoneNumber, gender } =
    useContext(HospitalContext);
  const { user } = useUser();

  const [appBio, setAppBio] = useState<Appointment | null>(null);
  const [appData, setAppData] = useState<AppointmentData | null>(null);
  const fecthAppointment = async () => {
    const data = appointment.filter((app) => app._id === id);
    if (data.length !== 0) {
      setAppBio(data[0]);
    }
  };
  const fetchBio = async () => {
    if (!appBio) return;

    const data = AppointmentData.find(
      (app) => app.appointments_id === appBio._id
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
    if (appBio && AppointmentData.length > 0) {
      fetchBio();
    }
  }, [appBio, AppointmentData]);
  return (
    <>
      <div
        className={`mt-3  min-h-screen py-4 ${
          appData?.status === "pending" && " border-yellow-300"
        } border  ${appData?.status ===  'successful' && 'border-green-300'}  ${appData?.status ===  'canceled' && 'border-red-300'}`}
      >
        <div className="md:w-5/6 mx-auto">
          <div className="container border mx-auto md:px-4 md:py-5 bg px-10 py-10  rounded-lg md:flex-row flex-col flex items-start lg:gap-10 justify-around ">
            <div className="w-32  h-32 mt-5 rounded-full overflow-hidden">
              <img
                src={user?.imageUrl}
                alt="profile image"
                className="w-full h-full"
              />
            </div>
            <div className="mt-5">
              <h5 className="text-2xl font-semibold capitalize">
                {user?.fullName}
              </h5>
              <p className="text-gray-500 capitalize">
                <span className="text-black mr-3 font-semibold"> gender:</span>{" "}
                {gender}
              </p>
              <p className="text-gray-500 capitalize">
                {" "}
                <span className="text-black mr-3 font-semibold"> weight:</span>
                {weight}
              </p>
              <p className="text-gray-500 capitalize">
                {" "}
                <span className="text-black mr-3 font-semibold"> height:</span>
                {height}
              </p>
              <p className="text-gray-500 capitalize">
                {" "}
                <span className="text-black mr-3 font-semibold"> email:</span>
                {user?.emailAddresses[0].emailAddress}
              </p>
              <p className="text-gray-500 capitalize">
                {" "}
                <span className="text-black mr-3 font-semibold">
                  {" "}
                  phone:
                </span>{" "}
                {phoneNumber}
              </p>
            </div>
            <div className="mt-5">
              <h5 className="text-xl font-semibold capitalize">
                {appBio?.doctor}
              </h5>
              <p className="text-gray-500 capitalize">
                {appBio?.hospistal_name}
              </p>
            </div>
            <div className=" mt-5 sm:mx-10">
              <button className="px-4 py-2 border capitalize font-bold rounded-lg border-color mb-5">
                {" "}
                {appBio?.status}
              </button>
              <p className="text-gray-500 capitalize">
                {" "}
                <span className="text-black mr-3 font-semibold">
                  {" "}
                  date:
                </span>{" "}
                {appBio?.date}
              </p>
              <p className="text-gray-500 capitalize">
                {" "}
                <span className="text-black mr-3 font-semibold">
                  {" "}
                  time:
                </span>{" "}
                {appBio?.time}
              </p>
            </div>
          </div>
          {appBio?.status === "canceled" && (
            <div className="md:w-5/6 mx-auto w-full">
              <p className="w-5/6 py-10 text-center mx-auto capitalize font-bold text-2xl  text-red-600">
                {" "}
                this appointment was cancelled
              </p>
              <div className="">
                <h5 className="text-gray-500 mt-5 font-semibold">
                  Reason for cancelation
                </h5>
                <p className="md:w-4/6 mt-5 border-color px-3 py-4">
                  {appData?.reasonforcancelation}
                </p>
              </div>
            </div>
          )}
          {appBio?.status === "pending" && (
            <p className="w-5/6 py-10 text-center mx-auto capitalize font-bold text-2xl text-yellow-600">
              {" "}
              this appointment is pending
            </p>
          )}
          {appBio?.status === "successful" && (
            <div className="container rounded-xl py-5 px-4 border mx-auto mt-10 ">
              <h2 className="capitalize text-3xl font-extrabold ">
                {" "}
                doctor report{" "}
              </h2>
              <div className="container mx-auto mt-3 px-3">
                <div className="">
                  <h5 className="text-gray-500 mt-5 font-semibold">
                    Reason for visit
                  </h5>
                  <p className="md:w-4/6 mt-5 border-color px-3 py-2">
                    {appData?.reasonForVisit}
                  </p>
                </div>
                <div className="">
                  <h5 className="text-gray-500 mt-5 font-semibold">
                    Medical history
                  </h5>
                  <p className="md:w-4/6 mt-5 border-color px-3 py-2">
                    {appData?.medicalHistory}
                  </p>
                </div>
                <div className="">
                  <h5 className="text-gray-500 mt-5 font-semibold">
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
                        {appData?.vitalSigns?.bodyTemperature}
                      </p>
                    </div>
                    <div className="">
                      <h6 className="text-gray-900 font-semibold text-lg">
                        {" "}
                        Pulse rate
                      </h6>
                      <p className="border-color px-3 py-2 mt-2">
                        {" "}
                        {appData?.vitalSigns?.pulseRate}{" "}
                      </p>
                    </div>
                    <div className="">
                      <h6 className="text-gray-900 font-semibold text-lg">
                        {" "}
                        Respiration rate{" "}
                      </h6>
                      <p className="border-color px-3 py-2 mt-2">
                        {" "}
                        {appData?.vitalSigns?.respirationRate}
                      </p>
                    </div>
                    <div className="">
                      <h6 className="text-gray-900 font-semibold text-lg">
                        {" "}
                        blood preesure rate{" "}
                      </h6>
                      <p className="border-color px-3 py-2 mt-2">
                        {" "}
                        {appData?.vitalSigns?.bloodPressure}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <h5 className="text-gray-500 mt-5 font-semibold">
                    Doctor Diagnosis
                  </h5>
                  <p className="md:w-4/6 mt-5 border-color px-3 py-2">
                    {appData?.doctorDiagnosis}
                  </p>
                </div>
                <div className="">
                  <h5 className="text-gray-500 mt-5 font-semibold">
                    Doctor prebscription
                  </h5>
                  <p className="md:w-4/6 mt-5 border-color px-3 py-2">
                    {appData?.doctorPrescription}
                  </p>
                </div>
                <div className="">
                  <h5 className="text-gray-500 mt-5 font-semibold">
                    Doctor signature
                  </h5>
                  <p className="w-fit mt-5 border-color px-10 py-4">
                    {appBio?.doctor}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorAppointment;
