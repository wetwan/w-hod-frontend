
/* eslint-disable prefer-const */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useClerk, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { DoctorContext, Doctors } from "../context/DoctorContext";
import Button from "../components/Button";
import axios from "axios";
import { HospitalInfoContext, newHospital } from "../context/HospitalInfo";

interface TimeSlot {
  datetime: Date;
  time: string;
}

const UserBookAppointment: React.FC = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { Doctor, fetchDoctor } = useContext(DoctorContext);
  const { Hospital, backendUrl } = useContext(HospitalInfoContext);

  const [docData, setDocData] = useState<Doctors>();
  const [hosData, sethosData] = useState<newHospital>();
  const [docSlots, setDocSlots] = useState<TimeSlot[][]>([]);
  const [slotIndex, setSlotIndex] = useState<number>(0);
  const [slotTime, setSlotTime] = useState<string>("");

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  useEffect(() => {
    const fetchhos = async () => {
      if (docData && docData.hospitatId && Hospital.length > 0) {
        const data = Hospital.find((hos) => hos._id === docData.hospitatId);

        if (data) {
          sethosData(data);
        } else {
          console.log("Hospital not found for:", docData.hospitatId);
        }
      }
    };

    fetchhos();
  }, [id, Doctor, Hospital, docData]);

  useEffect(() => {
    const fetchDoc = () => {
      if (!id) {
        console.error("Doctor ID is missing.");
        return;
      }
      const foundDoctor = Doctor.find((doc) => doc._id === id);
      if (foundDoctor) setDocData(foundDoctor);
    };
    fetchDoc();
  }, [Doctor, id]);

  useEffect(() => {
    if (docData) {
      const getAvailableSlots = () => {
        const today = new Date();
        const slots: TimeSlot[][] = [];

        for (let index = 0; index < 10; index++) {
          const currentDate = new Date(today);
          currentDate.setDate(today.getDate() + index);
          const endTime = new Date(currentDate);
          endTime.setHours(20, 0, 0, 0);

          if (index === 0) {
            currentDate.setHours(Math.max(8, today.getHours() + 1));
          } else {
            currentDate.setHours(8);
          }
          currentDate.setMinutes(0);

          const timeSlots: TimeSlot[] = [];
          while (currentDate < endTime) {
            let formmatedTime = currentDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();

            const slotDate = day + "-" + month + "-" + year;
            const slotTime = formmatedTime;
            const isSlotAvailable =
              docData?.slot_booked &&
              docData.slot_booked[slotDate] &&
              docData.slot_booked[slotDate].includes(slotTime)
                ? false
                : true;

            if (isSlotAvailable) {
              timeSlots.push({
                datetime: new Date(currentDate),
                time: formmatedTime,
              });
            }

            currentDate.setMinutes(currentDate.getMinutes() + 30);
          }
          slots.push(timeSlots);
        }
        setDocSlots(slots);
      };

      getAvailableSlots();
    }
  }, [docData]); // Ensure this effect only runs when docData is available.
  const handleBookAppointment = async (): Promise<void> => {
    if (!user) {
      toast.error("Please sign in to book an appointment.");
      return openSignIn();
    }

    try {
      const date = docSlots[slotIndex]?.[0]?.datetime;
      if (!date) {
        toast.error("Invalid date selection.");
        return;
      }

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}-${month}-${year}`;

      const requestBody = {
        userId: user?.id,
        doctorId: docData?._id,
        slotTime,
        slotDate,
        hospitalId: hosData?._id,
      };

      const { data } = await axios.post(
        backendUrl + "/api/user/apply",
        requestBody
      );

      if (data.success) {
        toast.success(data.message);
        fetchDoctor();
        navigate("/appointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-28 w-full p-3 md:w-5/6 mx-auto">
        <div
          className="cursor-pointer border w-fit px-4 py-2 border-color  mb-10 capitalize"
          onClick={() => navigate(-1)}
        >
          back to doctor
        </div>

        {docData ? (
          <div className="p-3 w-full px-10">
            <div className="flex items-center gap-5 mb-20">
              <div className={`relative border rounded-full border-gray-500`}>
                <div className="rounded-full overflow-hidden w-28 h-28">
                  <img
                    src={docData.image}
                    className="w-full h-full object-cover"
                    alt="Doctor"
                  />
                </div>
                <div
                  className={`absolute bottom-2 right-0 p-3 rounded-full  bg-gray-500`}
                ></div>
              </div>

              <div className="md:w-9/12 w-full">
                <p className="border-color w-2/6 max-md:w-full px-3 py-2">
                  {docData.firstName} {docData.lastName}
                </p>
                <p className="border px-3 py-2 mt-2 border-color w-2/6 max-md:w-full ">
                  {hosData && hosData.name}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <h2 className="font-bold text-lg">Book an appointment</h2>

              {docData && (
                <>
                  <div className="flex gap-3 overflow-x-scroll">
                    {docSlots.length > 0 &&
                      docSlots.map(
                        (daySlots, index) =>
                          daySlots.length > 0 && (
                            <div
                              key={index}
                              className={`flex items-center flex-col cursor-pointer gap-1 rounded-full border px-16 whitespace-nowrap py-1 font-semibold ${
                                slotIndex === index
                                  ? "text-green-400 bg-white shadow-sm bg"
                                  : "border-green-800 text-green-800"
                              }`}
                              onClick={() => setSlotIndex(index)}
                            >
                              <p>{daysOfWeek[daySlots[0].datetime.getDay()]}</p>
                              <p>{daySlots[0].datetime.getDate()}</p>
                            </div>
                          )
                      )}
                  </div>

                  <div className="flex gap-3 overflow-x-scroll mt-5">
                    {docSlots.length > 0 &&
                      docSlots[slotIndex]?.map((slot, i) => (
                        <p
                          key={i}
                          className={`flex items-center flex-col cursor-pointer gap-y-2 rounded-full border px-16 whitespace-nowrap py-3 font-semibold ${
                            slot.time === slotTime
                              ? "text-green-400 bg-white shadow-sm bg"
                              : "border-green-800 text-green-800"
                          }`}
                          onClick={() => setSlotTime(slot.time)}
                        >
                          {slot.time}
                        </p>
                      ))}
                  </div>
                </>
              )}

              <div className="text-sm gap-2 flex items-center justify-center md:flex-row flex-col mt-10">
                <Button
                  text=" book appointment"
                  className="capitalize border-color px-6 py-3 font-bold "
                  onClick={() => {
                    handleBookAppointment();
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
};

export default UserBookAppointment;
