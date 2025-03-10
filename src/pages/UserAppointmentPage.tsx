import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


import Pagenation from "../components/Pagenation";
import Appointment from "../components/Appointment";
import { useContext } from "react";
import { HospitalContext } from "../context/HospitalContext";

const UserAppointmentPage = () => {
  const{ appointment} = useContext(HospitalContext)
  return (
    <>
      <Navbar />
      <div className="mt-32">
        <div className="container mx-auto ">
          <Appointment />
          <Pagenation item={appointment} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserAppointmentPage;
