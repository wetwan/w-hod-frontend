
import { Route, Routes } from "react-router";

import Home from "./pages/Home";
import UserHopitalsPage from "./pages/UserHopitalsPage";
import UserDoctorsPage from "./pages/UserDoctorsPage";
import { useUser } from "@clerk/clerk-react";
import UserProfile from "./pages/UserProfile";
import UserHospitalPage from "./pages/UserHospitalPage";
import UserDoctorPage from "./pages/UserDoctorPage";
import UserBookAppointment from "./pages/UserBookAppointment";
import { ToastContainer } from "react-toastify";
import UserAppointmentPage from "./pages/UserAppointmentPage";
import UserMyAppointment from "./pages/UserMyAppointment";
import { useContext } from "react";
import { HospitalInfoContext } from "./context/HospitalInfo";
import HospitalLogin from "./components/HospitalLogin";
import { DoctorContext } from "./context/DoctorContext";
import DoctorLogin from "./components/DoctorLogin";
import Hospital from "./pages/Hospital";
import Doctor from "./pages/Doctor";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorAppointment from "./pages/DoctorAppointment";
import HospitalProfile from "./pages/HospitalProfile";
import HospitalAppointments from "./pages/HospitalAppointments";
import HospitalAppointment from "./pages/HospitalAppointment";
import HospitalDoctor from "./pages/HospitalDoctor";
import HospitalDoctors from "./pages/HospitalDoctors";
import AddDoctor from "./pages/AddDoctor";
import HospitalProfileEdit from "./pages/HospitalProfileEdit";


const App = () => {
  const { user } = useUser();
  const { showHospitalLogin, hosToken } = useContext(HospitalInfoContext);
  const { showDoctorLogin, docToken } = useContext(DoctorContext);
  return (
    <div className="">
      {" "}
      <ToastContainer />
      {showHospitalLogin && <HospitalLogin />}
      {showDoctorLogin && <DoctorLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospital" element={<UserHopitalsPage />} />
        <Route path="/hospital/:id" element={<UserHospitalPage />} />
        <Route path="/doctor" element={<UserDoctorsPage />} />
        <Route path="/doctor/:id" element={<UserDoctorPage />} />
        {user ? (
          <>
            <Route
              path="/doctor/:id/book-appointment"
              element={<UserBookAppointment />}
            />

            <Route path="/appointment" element={<UserAppointmentPage />} />

            <Route path="/appointment/:id" element={<UserMyAppointment />} />

            <Route path={`/${user?.fullName}`} element={<UserProfile />} />
          </>
        ) : null}

        <Route path="/hospital-dashboard" element={<Hospital />}>
          {hosToken && (
            <>
              <Route path="profile" element={<HospitalProfile />} />
              <Route path="appointment" element={<HospitalAppointments />} />
              <Route path="appointment/:id" element={<HospitalAppointment />} />
              <Route path="doctor/:id" element={<HospitalDoctor />} />
              <Route path="doctor" element={<HospitalDoctors />} />
              <Route path="add-doctor" element={<AddDoctor />} />
              <Route path="profile/edit" element={<HospitalProfileEdit />} />
            </>
          )}
        </Route>
        <Route path="/doctor-dashboard" element={<Doctor />}>
          {docToken ? (
            <>
              <Route path="profile" element={<DoctorProfile />} />
              <Route path="appointment" element={<DoctorAppointments />} />
              <Route path="appointment/:id" element={<DoctorAppointment />} />
            </>
          ) : null}
        </Route>
      </Routes>{" "}
    </div>
  );
};
export default App;
