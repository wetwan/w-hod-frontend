import { BsPenFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet, useNavigate } from "react-router";
import { assets } from "../assets";
import { GiDoctorFace } from "react-icons/gi";
import { useContext } from "react";
import { HospitalInfoContext } from "../context/HospitalInfo";

const Hospital = () => {
  const navigate = useNavigate();

  const { hosData,setHosData,setHosToken } = useContext(HospitalInfoContext);
  const logout = () => {
    setHosToken(null)
    localStorage.removeItem("hospital token")
    setHosData(null)
    navigate('/')


  }
  return (
    <div className="min-h-screen ">
      <div className="w-full bg shadow-md">
        <div className="p-2 flex items-center w-5/6 mx-auto justify-between">
          <div
            className="w-20"
            onClick={() => {
              navigate("/hospital-dashboard/appointment");
            }}
          >
            <img src={assets.Logo} alt="logo" />
          </div>
          {hosData && (
            <div className="flex items-center text-white text-2xl gap-1 capitalize">
              <p className="max-sm:hidden ">
                welcome <span className="text-blue-300">{hosData.name}</span>
              </p>

              <div className="relative group">
                <img
                  src={hosData.image}
                  className="w-10 h-10 mx-2 rounded-full"
                  alt=""
                />
                <div className="absolute hidden  group-hover:block mt-1  px-7 py-4 bg-black rounded-lg ">
                  <ul className=" ">
                    <li
                      className="cursor-pointer"
                      onClick={() => logout()}
                    >
                      log out
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start h-full">
        <div className=" w-[20%] border-black min-h-screen  rounded-lg inline-block py-10">
          <ul className=" p-2 flex flex-col gap-5">
            <NavLink
              to={"/hospital-dashboard/appointment"}
              className={({ isActive }) =>
                ` cursor-pointer border flex py-2 rounded-lg items-center justify-start max-md:justify-center md:px-5  gap-4 capitalize font-bold transition-colors ease-in duration-300 ${
                  isActive
                    ? "text-white bg   "
                    : " text-blue-500 border-blue-500"
                }`
              }
            >
              <BsPenFill className="p-1 w-8 h-8" />
              <span className="max-md:hidden">appiontments</span>
            </NavLink>
            <NavLink
              to={"/hospital-dashboard/doctor"}
              className={({ isActive }) =>
                ` cursor-pointer border flex py-2 rounded-lg items-center justify-start max-md:justify-center md:px-5  gap-4 capitalize font-bold transition-colors ease-in duration-300 ${
                  isActive
                    ? "text-white bg   "
                    : " text-blue-500 border-blue-500"
                }`
              }
            >
              <GiDoctorFace className="p-1 w-8 h-8" />
              <span className="max-md:hidden">doctors</span>
            </NavLink>
            <NavLink
              to={"/hospital-dashboard/profile"}
              className={({ isActive }) =>
                ` cursor-pointer border flex py-2 rounded-lg items-center justify-start max-md:justify-center md:px-5 gap-4 capitalize font-bold transition-colors ease-in duration-300 ${
                  isActive
                    ? "text-white bg   "
                    : " text-blue-500 border-blue-500"
                }`
              }
            >
              <CgProfile className="p-1 w-8 h-8" />
              <span className="max-md:hidden"> my profile</span>
            </NavLink>
          </ul>
        </div>
        <div className="w-[80%] mb-24 overflow-scroll">
          <Outlet />
        </div>
      </div>
      <footer className="bottom-0 fixed p-3  text-center border w-full  uppercase font-bold text-xl  bg">
        <span className="text-blue-600 mx-2">w-hos </span> &copy; {/* */}
        {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Hospital;
