import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { appointments } from "../assets/index";

import Pagenation from "../components/Pagenation";
import Appointment from "../components/Appointment";

const UserAppointmentPage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-32">
        <div className="container mx-auto ">
          <Appointment />
          <Pagenation item={appointments} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserAppointmentPage;
