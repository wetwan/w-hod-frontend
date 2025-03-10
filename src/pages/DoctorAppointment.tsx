/* eslint-disable react-hooks/exhaustive-deps */


import { useContext, useEffect, useState } from "react";

import { AppointmentDetail, Appointments, HospitalContext } from "../context/HospitalContext";
import { useParams } from "react-router";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import { DoctorContext } from "../context/DoctorContext";
import { HospitalInfoContext } from "../context/HospitalInfo";

const DoctorAppointment = () => {
  const { id } = useParams();
  const {  backendUrl, appointmentDetails } = useContext(HospitalContext);
  const { appointment } = useContext(HospitalInfoContext);
  const { docToken } = useContext(DoctorContext);

  const [appBio, setAppBio] = useState<Appointments | null>(null);
  const [appData, setAppData] = useState<AppointmentDetail | null>(null);
  // const [save, setSave] = useState<boolean>(false);
  const [save, setSave] = useState(() => {
    const savedState = localStorage.getItem("saveState");
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    // Whenever `save` changes, update localStorage to persist the value
    localStorage.setItem("saveState", JSON.stringify(save));
  }, [save]);
  // Form data state management
  const [formData, setFormData] = useState({
    reason: "",
    history: "",
    temperature: "",
    pulse: "",
    respiration: "",
    blood_pressure: "",
    diagnosis: "",
    prescriptions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchAppointment = async () => {
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
  const handleAddDoctor = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      !formData.reason ||
      !formData.history ||
      !formData.temperature ||
      !formData.pulse ||
      !formData.respiration ||
      !formData.blood_pressure ||
      !formData.diagnosis ||
      !formData.prescriptions ||
      !appBio?._id
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!docToken) {
      toast.error("Authorization token is missing.");
      return;
    }
    const payload = {
      ...formData,
      doctorId: appBio.doctorId._id, // Assuming docBio is the doctor's info
      appointmentID: appBio._id, // Make sure appointmentID is set somewhere in your state or props
    };
  

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/details`, // ✅ Send appointment ID in the route
        payload, // ✅ Send JSON body
        {
          headers: {
            "Content-Type": "application/json",
            token: docToken, 
            "doctorId": appBio?._id, // ✅ Send doctor ID in the headers
            // ✅ Use Bearer token for security
          },
        }
      );

      if (data.success) {
        toast.success("Appointment details submitted successfully!");
        setSave(true);
        setFormData({
          reason: "",
          history: "",
          temperature: "",
          pulse: "",
          respiration: "",
          blood_pressure: "",
          diagnosis: "",
          prescriptions: "",
        });
      } else {
        toast.error(data.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting appointment details:", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unexpected error occurred."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    if (appointment.length > 0) {
      fetchAppointment();
    }
  }, [id, appointment]);

  useEffect(() => {
    if (appBio && appointmentDetails.length > 0) {
      fetchBio();
    }
  }, [appBio, appointmentDetails]);

  return (
    <div
      className={`mt-3 min-h-screen py-4 ${
        appBio?.status === "pending" && " border-yellow-300"
      } border  ${appBio?.status === "successful" && "border-green-300"}  ${
        appBio?.status === "canceled" && "border-red-300"
      }`}
    >
      <div className="md:w-5/6 mx-auto">
        <div className="container border mx-auto md:px-4 md:py-5 bg px-10 py-10  rounded-lg md:flex-row flex-col flex items-start lg:gap-10 justify-around ">
          <div className="w-32 h-32 mt-5 rounded-full overflow-hidden">
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
            <p className="text-gray-100 capitalize">
              <span className="text-black mr-3 font-semibold"> gender:</span>{" "}
              {appBio?.userId.gender}
            </p>
            <p className="text-gray-100 capitalize">
              {" "}
              <span className="text-black mr-3 font-semibold"> weight:</span>
              {appBio?.userId.weight} kg
            </p>
            <p className="text-gray-100 capitalize">
              {" "}
              <span className="text-black mr-3 font-semibold"> height:</span>
              {appBio?.userId.height} cm
            </p>
            <p className="text-gray-100 capitalize">
              {" "}
              <span className="text-black mr-3 font-semibold"> email:</span>
              {appBio?.userId.email}
            </p>
            <p className="text-gray-100 capitalize">
              {" "}
              <span className="text-black mr-3 font-semibold">
                {" "}
                phone:
              </span>{" "}
              {appBio?.userId.phone}
            </p>
          </div>
          <div className="mt-5">
            <h5 className="text-xl font-semibold capitalize">
              {appBio?.doctorId.firstName} {appBio?.doctorId.lastName}
            </h5>
            <p className="text-gray-100 capitalize">
              {appBio?.hospitalId.name}
            </p>
          </div>
          <div className="mt-5 sm:mx-10">
            <button className="px-4 py-2 border capitalize font-bold rounded-lg border-color mb-5">
              {appBio?.status}
            </button>
            <p className="text-gray-100 capitalize">
              <span className="text-black mr-3 font-semibold"> date:</span>{" "}
              {moment(appBio?.slotDate, "D-M-YYYY").format("ll")}
            </p>
            <p className="text-gray-100 capitalize">
              <span className="text-black mr-3 font-semibold"> time:</span>{" "}
              {moment(appBio?.slotTime, "hh:mm A").format("hh:mm A")}
            </p>
          </div>
        </div>

        {/* Conditional rendering for appointment status */}
        {appBio?.status === "Canceled" && (
          <div className="md:w-5/6 mx-auto w-full">
            <p className="w-5/6 py-10 text-center mx-auto capitalize font-bold text-2xl  text-red-600">
              this appointment was cancelled
            </p>
            <div className="">
              <h5 className="text-gray-100 mt-5 font-semibold">
                Reason for cancellation
              </h5>
              <p className="md:w-4/6 mt-5 border-color px-3 py-4">
                {appData?.reason}
              </p>
            </div>
          </div>
        )}
        {appBio?.status === "Pending" && (
          <p className="w-5/6 py-10 text-center mx-auto capitalize font-bold text-2xl text-yellow-600">
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
                <h5 className="text-gray-500 mt-5 font-semibold">
                  Reason for visit
                </h5>
                {save ? (
                  <p className="md:w-4/6 mt-5 border-color px-3 py-2">
                    {appData?.reason}
                  </p>
                ) : (
                  <textarea
                    name="reason"
                    className="border-color max-w-4/6 w-4/5 h-56 max-h-56 outline-none"
                    value={formData.reason}
                    onChange={handleChange}
                  ></textarea>
                )}
              </div>
              <div className="">
                <h5 className="text-gray-500 mt-5 font-semibold">
                  Medical history
                </h5>
                {save ? (
                  <p className="md:w-4/6 mt-5 border-color px-3 py-2">
                    {appData?.history}
                  </p>
                ) : (
                  <textarea
                    name="history"
                    id=""
                    className="border-color max-w-4/6 w-4/5 h-56 max-h-56 outline-none"
                    value={formData.history}
                    onChange={handleChange}
                  ></textarea>
                )}
              </div>
              <div className="">
                <h5 className="text-gray-500 mt-5 font-semibold">
                  Vital signs
                </h5>
                <div className=" md:px-10 mt-3 flex md:items-center gap-5 md:flex-row flex-col flex-wrap pb-10">
                  <div className="">
                    <h6 className="text-gray-900 font-semibold text-lg">
                      {" "}
                      Body temperature
                    </h6>
                    {save ? (
                      <p className="border-color px-3 py-2 mt-2">
                        {" "}
                        {appData?.temperature}
                      </p>
                    ) : (
                      <input
                        type="text"
                        name="temperature"
                        className="border-color px-3 py-2 mt-2"
                        value={formData.temperature}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                  <div className="">
                    <h6 className="text-gray-900 font-semibold text-lg">
                      {" "}
                      Pulse rate
                    </h6>
                    {save ? (
                      <p className="border-color px-3 py-2 mt-2">
                        {" "}
                        {appData?.pulse}{" "}
                      </p>
                    ) : (
                      <input
                        type="text"
                        name="pulse"
                        className="border-color px-3 py-2 mt-2"
                        value={formData.pulse}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                  <div className="">
                    <h6 className="text-gray-900 font-semibold text-lg">
                      {" "}
                      Respiration rate{" "}
                    </h6>
                    {save ? (
                      <p className="border-color px-3 py-2 mt-2">
                        {" "}
                        {appData?.respiration}
                      </p>
                    ) : (
                      <input
                        type="text"
                        className="border-color px-3 py-2 mt-2"
                        name="respiration"
                        value={formData.respiration}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                  <div className="">
                    <h6 className="text-gray-900 font-semibold text-lg">
                      {" "}
                      blood preesure rate{" "}
                    </h6>
                    {save ? (
                      <p className="border-color px-3 py-2 mt-2">
                        {" "}
                        {appData?.blood_pressure}
                      </p>
                    ) : (
                      <input
                        type="text"
                        className="border-color px-3 py-2 mt-2"
                        name="blood_pressure"
                        value={formData.blood_pressure}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="">
                <h5 className="text-gray-500 mt-5 font-semibold">
                  Doctor Diagnosis
                </h5>
                {save ? (
                  <p className="md:w-4/6 mt-5 border-color px-3 py-2">
                    {appData?.diagnosis}
                  </p>
                ) : (
                  <textarea
                    name="diagnosis"
                    id=""
                    className="border-color max-w-4/6 w-4/5 h-56 max-h-56 outline-none"
                    value={formData.diagnosis}
                    onChange={handleChange}
                  ></textarea>
                )}
              </div>
              <div className="">
                <h5 className="text-gray-500 mt-5 font-semibold">
                  Doctor prebscription
                </h5>
                {save ? (
                  <p className="md:w-4/6 mt-5 border-color px-3 py-2">
                    {appData?.prescriptions}
                  </p>
                ) : (
                  <textarea
                    name="prescriptions"
                    id=""
                    className="border-color max-w-4/6 w-4/5 h-56 max-h-56 outline-none"
                    value={formData.prescriptions}
                    onChange={handleChange}
                  ></textarea>
                )}
              </div>

              {save && (
                <div className="">
                  <h5 className="text-gray-500 mt-5 font-semibold">
                    Doctor signature
                  </h5>
                  <p className="w-fit mt-5 border-color px-10 py-4 capitalize font-semibold">
                    {appBio?.doctorId.firstName} {appBio?.doctorId.lastName}
                  </p>{" "}
                </div>
              )}

             {!save && <button
                type="submit"
                className="mt-10 border px-20 py-5 bg rounded-md outline-none text-xl capitalize font-bold text-white"
                onClick={handleAddDoctor}
              >
                Save
              </button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;
