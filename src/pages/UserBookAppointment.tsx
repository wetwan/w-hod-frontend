/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Doctor } from "../types/type";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import moment from "moment";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const UserBookAppointment = () => {
  const today = moment();
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const { Doctor } = useContext(DoctorContext);

  const [docData, setDocData] = useState<Doctor | null>(null);
  const [selectday, setSelectday] = useState<string | undefined>(undefined);
  const [selectTime, setSelectTime] = useState<string | undefined>(undefined);
  const [days, setDays] = useState<
    { date: moment.Moment; day: string; formmatedDate: string }[]
  >([]);

  const [time, setTime] = useState<{ time: string }[]>([]);

  const fetchDoc = async () => {
    const data = Doctor.filter((doc) => doc._id === id);
    if (data.length !== 0) {
      setDocData(data[0]);
    }
  };

  const getDay = (): void => {
    const nextsevendays = [];
    for (let index = 0; index < 10; index++) {
      const date = moment().add(index, "days");
      nextsevendays.push({
        date: date.clone(),

        day: date.format("ddd"),
        formmatedDate: date.format("Do MMM"),
      });
    }

    setDays(nextsevendays);
    setSelectday(today.format("YYYY-MM-DD"));
  };

  const getTime = (selectedDate: string) => {
    let startTime = moment("08:00 AM", "hh:mm A");

    const endTime = moment("05:30 PM", "hh:mm A");
    const timeSlots: { time: string }[] = [];

    if (moment(selectedDate).isSame(moment(), "day")) {
      startTime = moment();
      if (startTime.isAfter(endTime)) {
        setTime([]);
        return;
      }
      if (startTime.minutes() > 30) {
        startTime.add(1, "hour").startOf("hour");
      } else if (startTime.minutes() > 0) {
        startTime.minutes(30);
      }
    }

    while (startTime.isBefore(endTime)) {
      timeSlots.push({ time: startTime.format("hh:mm A") });
      startTime.add(30, "minutes");
    }

    setTime(timeSlots);
  };

  useEffect(() => {
    if (selectday) {
      getTime(selectday);
    }
  }, [selectday]);

  useEffect(() => {
    getDay();
  }, []);

  useEffect(() => {
    if (Doctor.length > 0) {
      fetchDoc();
    }
  }, [id, Doctor]);
  const handleBookAppointment = async () => {
    if (!selectday) {
      toast.error("Please select a day");
      return;
    }
    if (!selectTime) {
      toast.error("Please select a time");
      return;
    }

    const data = {
      doctorId: docData?._id,
      date: selectday,
      time: selectTime,
      user: user?.id,
    };

    console.log(data);
    toast.success("Appointment booked successfully!");
    setSelectday(today.format("YYYY-MM-DD"));
    setSelectTime(undefined);
    navigate("/appointment");
  };

  return (
    <>
      <Navbar />
      <div className="mt-28 w-full p-3 md:w-5/6 mx-auto">
        <div
          className=" cursor-pointer border-color md:w-1/6 w-fit px-4 py-2 capitalize "
          onClick={() => {
            navigate(-1);
            scrollTo(0, 0);
          }}
        >
          back to doctor
        </div>
        <div className="p-3  w-full">
          <div className=" w-full lg:p-4 my-4 lg:my-0 ">
            <div className="px-4 flex items-center justify-between flex-col md:flex-row gap-5 md:w-3/6  py-3">
              <div
                className={`relative border  rounded-full ${
                  docData?.avalaibility === "online"
                    ? "border-green-500"
                    : " border-gray-500"
                }`}
              >
                <div className=" rounded-full overflow-hidden  w-28 h-28">
                  <img
                    src={docData?.ProfilePic}
                    className="w-full h-full object-cover"
                    alt="profile pic"
                  />
                </div>{" "}
                <div
                  className={`z-50 absolute bottom-2 right-0 border p-3 rounded-full ${
                    docData?.avalaibility === "online"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                ></div>
              </div>

              <div className="md:w-9/12 w-full ">
                <p className="border-color px-3 uppercase py-2 w-full text-sm">
                  {docData?.Name}
                </p>
                <div className="text-sm flex items-center justify-between gap-3 mt-4">
                  <p className="w-5/6 border-color px-3 capitalize py-2 whitespace-nowrap overflow-scroll ">
                    {docData?.Hospital_Name}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h2 className="font-bold capitalize  mb-4 text-lg ">
                book an appointmnet
              </h2>
              {docData?.avalaibility === "online" ? (
                <>
                  <div className=" w-5/6 mx-auto mb-10">
                    <h3 className="font-semibold capitalize mb-5 clip ">
                      select a day{" "}
                    </h3>
                    <div className="flex items-center gap-5 overflow-scroll mb-10">
                      {days.map((day, i) => (
                        <button
                          className={`${
                            selectday === day.date.format("YYYY-MM-DD")
                              ? "text-green-400 bg-white shadow-sm  bg"
                              : "border-green-800 text-green-800"
                          } flex items-center flex-col cursor-pointer gap-1 rounded-full border px-16 whitespace-nowrap py-1  font-semibold `}
                          key={i}
                          onClick={() =>
                            setSelectday(day.date.format("YYYY-MM-DD"))
                          }
                        >
                          <p className="">{day.day}</p>
                          <p className="">
                            {moment(day.formmatedDate, "mm-dd").format(
                              "Do MMM"
                            )}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className=" w-5/6 mx-auto mb-10">
                    <h3 className="font-semibold capitalize mb-5 clip ">
                      select a time{" "}
                    </h3>
                    <div className="flex items-center gap-5 overflow-scroll ">
                      {time.map((time, i) => (
                        <button
                          className={`${
                            selectTime === time.time
                              ? "text-green-400 bg-white shadow-sm  bg"
                              : "border-green-800 text-green-800"
                          } flex items-center flex-col cursor-pointer gap-y-2 rounded-full border px-16 whitespace-nowrap py-3  font-semibold `}
                          key={i}
                          onClick={() => setSelectTime(time.time)}
                        >
                          <p className="">
                            {moment(time.time, "HH:mm").format("hh:mm A")}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm gap-2 flex items-center justify-center md:flex-row flex-col">
                    <Button
                      text=" book appointment"
                      className=" capitalize border-color px-6 py-3 font-bold "
                      onClick={() => {
                        handleBookAppointment();
                      }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-4xl capitalize font-bold w-4/6 mx-auto text-center">
                  Please note that this doctor is not available{" "}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserBookAppointment;
