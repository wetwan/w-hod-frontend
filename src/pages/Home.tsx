import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HospitalCard from "../components/HospitalCard";
import DoctorCard from "../components/DoctorCard";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useContext } from "react";
import Subcribtion from "../components/Subcribtion";
import Footer from "../components/Footer";
import { DoctorContext } from "../context/DoctorContext";
import { HospitalInfoContext } from "../context/HospitalInfo";
import Spinner from "../components/Spinner";

const Home = () => {
  const naviagte = useNavigate();

  const { Doctor } = useContext(DoctorContext);

  const { Hospital, loading } = useContext(HospitalInfoContext);

  return (
    <>
      <Navbar />
      <div className="mt-24 ">
        <Hero />
        <div className="md:w-5/6 py-8 w-full mx-auto mt-10  ">
          <>
            <div className="w-full text-gray-800">
              <h3 className="font-bold text-3xl py-2 px-4 sm:px-0">
                {" "}
                Nearest Hopital
              </h3>
              <p className=" px-4 sm:px-0"> Find the hopital nearest to you </p>
              <>
                {loading ? (
                  <Spinner loading={loading} />
                ) : (
                  <>
                    {" "}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  px-2 py-5 sm:gap-5 lg:gap-2">
                      {Hospital.map((item) => (
                        <HospitalCard
                          key={item._id}
                          id={item._id}
                          image={item.image}
                          name={item.name}
                          state={item.state}
                        />
                      ))}
                    </div>
                    <Button
                      text="More Hospital"
                      className="lg:w-1/5 w-3/4 rounded-md mt-4 mx-auto bg-blue-600 px-5 py-3 text-center font-bold text-white"
                      onClick={() => naviagte("/hospital")}
                    />
                  </>
                )}
              </>
            </div>
            <div className="w-full px-4 text-gray-800 mt-5">
              <h3 className="font-bold text-3xl py-2 px-4 sm:px-0">
                {" "}
                Nearest Doctor
              </h3>
              <p className="px-4 sm:px-0"> Find the doctor nearest to you </p>

              <>
                {loading ? (
                  <Spinner loading={loading} />
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-2 py-5 sm:gap-5 lg:gap-2">
                      {Doctor.map((item) => (
                        <DoctorCard
                          key={item._id}
                          Field={item.field}
                          image={item.image}
                          id={item._id}
                          name={`${item?.firstName} ${item.lastName}`}
                          state={item.state}
                        />
                      ))}
                    </div>
                    <Button
                      text="More Doctors"
                      className="lg:w-1/5 w-3/4  rounded-md mt-4 mx-auto bg-blue-600 px-5 py-3 text-center font-bold text-white"
                      onClick={() => naviagte("/doctor")}
                    />
                  </>
                )}
              </>
            </div>
            <div className="w-full px-4 text-gray-800 mt-5">
              <h3 className="font-medium text-3xl py-2 px-4 sm:px-0 capitalize">
                {" "}
                subscribe to our page
              </h3>
              <Subcribtion />
            </div>
          </>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
