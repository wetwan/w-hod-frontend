
import { NavLink, useNavigate } from "react-router";
import { assets } from "../assets";
import Button from "./Button";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { HospitalInfoContext } from "../context/HospitalInfo";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { setShowHospitalLogin } = useContext(HospitalInfoContext);
  const { setShowDoctorLogin } = useContext(DoctorContext);
  const { user } = useUser();
  const naviagte = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="w-full fixed top-0 z-50 bg-blue-50">
      <nav className="flex justify-between gap-3 items-center w-5/6 mx-auto py-4">
        <div className=" flex items-center justify-center lg:gap-20 gap-5">
          <div
            onClick={() => {
              naviagte("/");
              scrollTo(0, 0);
            }}
            className="w-14 border bg-blue-200 cursor-pointer"
          >
            <img src={assets.Logo} alt="" />
          </div>
          <div className="text-white bg-gray-300 rounded-lg  hidden md:block">
            <ul className="flex justify-between w-full items-center lg:gap-4 gap-2 lg:px-5 px-3 py-2">
              <NavLink
                onClick={() => {
                  scrollTo(0, 0);
                }}
                to="/"
                className={({ isActive }) =>
                  `lg:px-4 py-3 px-2 cursor-pointer transition-colors ease-in duration-300 ${
                    isActive
                      ? "text-blue-600 bg-blue-300 rounded-md font-semibold "
                      : " "
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => {
                  scrollTo(0, 0);
                }}
                to="/hospital"
                className={({ isActive }) =>
                  `lg:px-4 py-3 px-2 cursor-pointer transition-colors ease-in duration-300 ${
                    isActive
                      ? "text-blue-600 bg-blue-300 rounded-md font-semibold "
                      : " "
                  }`
                }
              >
                Hospitals
              </NavLink>
              <NavLink
                onClick={() => {
                  scrollTo(0, 0);
                }}
                to="/doctor"
                className={({ isActive }) =>
                  `lg:px-4 py-3 px-2 cursor-pointer transition-colors ease-in duration-300 ${
                    isActive
                      ? "text-blue-600 bg-blue-300 rounded-md font-semibold "
                      : " "
                  }`
                }
              >
                Doctors
              </NavLink>
              {user && (
                <NavLink
                  onClick={() => {
                    scrollTo(0, 0);
                  }}
                  to="/appointment"
                  className={({ isActive }) =>
                    `lg:px-4 py-3 px-2 cursor-pointer transition-colors ease-in duration-300 ${
                      isActive
                        ? "text-blue-600 bg-blue-300 rounded-md font-semibold "
                        : " "
                    }`
                  }
                >
                  Appointment
                </NavLink>
              )}
              {user && (
                <NavLink
                  onClick={() => {
                    scrollTo(0, 0);
                  }}
                  to={`/${user.fullName}`}
                  className={({ isActive }) =>
                    `lg:px-4 py-3 px-2 cursor-pointer transition-colors ease-in duration-300 ${
                      isActive
                        ? "text-blue-600 bg-blue-300 rounded-md font-semibold "
                        : " "
                    }`
                  }
                >
                  My Profile
                </NavLink>
              )}
            </ul>
          </div>
        </div>

        {user ? (
          <div className=" items-center gap-4 capitalize hidden md:flex">
            <p className="text-black font-bold text-xl hidden lg:block">
              welcome{" "}
              <span className="text-blue-600 font-light"> {user.fullName}</span>
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="md:flex items-center lg:gap-4 gap-2 justify-between hidden ">
            <Button
              onClick={() => openSignIn()}
              text="sign in"
              className="text-white capitalize lg:px-7 px-4 text-base lg:py-3 py-3  whitespace-nowrap rounded-lg shadow-md bg-blue-600"
            />
            <Button
              onClick={() => setShowDoctorLogin(true)}
              text="Doctor sign in"
              className="text-white capitalize lg:px-7 px-4 text-base lg:py-3 py-3  whitespace-nowrap rounded-lg shadow-md bg-green-600"
            />
            <Button
              onClick={() => {
                setShowHospitalLogin(true);
              }}
              text="hospital sign in"
              className="text-white capitalize lg:px-7 px-4 text-base lg:py-3 py-3  whitespace-nowrap rounded-lg shadow-md bg-gray-600"
            />
          </div>
        )}

        <div
          className=" border border-red-200 menu-slide md:hidden"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Bars3Icon className="text-black text-2xl w-12" />
        </div>
      </nav>

      {isOpen && (
        <div className="fixed top-0 right-0 bg-blue-400 bottom-0  w-3/5 menu-slide">
          <div className="py-4 flex items-center justify-end  ">
            <p
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="text-2xl leading-none  mr-4  p-2 rounded-full text-red-400 bg-black w-10 h-10 text-center"
            >
              X
            </p>
          </div>
          <div className="">
            <ul className="flex justify-between w-full flex-col items-center gap-4 px-5 py-2">
              <NavLink
                onClick={() => {
                  scrollTo(0, 0);
                }}
                to="/"
                className={({ isActive }) =>
                  `lg:px-4 py-3 px-2 cursor-pointer transition-colors ease-in duration-300 ${
                    isActive
                      ? "text-blue-600 bg-blue-300 rounded-md font-semibold "
                      : " "
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => {
                  scrollTo(0, 0);
                }}
                to="/hospital"
                className={({ isActive }) =>
                  `lg:px-4 py-3 px-2 cursor-pointer transition-colors ease-in duration-300 ${
                    isActive
                      ? "text-blue-600 bg-blue-300 rounded-md font-semibold "
                      : " "
                  }`
                }
              >
                Hospitals
              </NavLink>
              <NavLink
                onClick={() => {
                  scrollTo(0, 0);
                }}
                to="/doctor"
                className={({ isActive }) =>
                  `lg:px-4 py-3 px-2 cursor-pointer transition-colors ease-in duration-300 ${
                    isActive
                      ? "text-blue-600 bg-blue-300 rounded-md font-semibold "
                      : " "
                  }`
                }
              >
                Doctors
              </NavLink>
              {user && (
                <NavLink
                  onClick={() => {
                    scrollTo(0, 0);
                  }}
                  to="/appointment"
                  className={({ isActive }) =>
                    `lg:px-4 py-3 px-2 cursor-pointer transition-colors ease-in duration-300 ${
                      isActive
                        ? "text-blue-600 bg-blue-300 rounded-md font-semibold "
                        : " "
                    }`
                  }
                >
                  Appointment
                </NavLink>
              )}
              {user && (
                <NavLink
                  onClick={() => {
                    scrollTo(0, 0);
                  }}
                  to={`/${user.fullName}`}
                  className={({ isActive }) =>
                    `lg:px-4 py-3 px-2 cursor-pointer transition-colors ease-in duration-300 ${
                      isActive
                        ? "text-blue-600 bg-blue-300 rounded-md font-semibold "
                        : " "
                    }`
                  }
                >
                  My Profile
                </NavLink>
              )}
            </ul>
          </div>
          <div className="absolute bottom-0 right-0 left-0 ">
            {user ? (
              <div className="flex items-center justify-center pb-3 gap-4 capitalize">
                <p className="text-black font-bold text-base text-center">
                  <span className="text-blue-600 font-light">
                    {" "}
                    {user.fullName}
                  </span>
                </p>
                <UserButton />
              </div>
            ) : (
              <div className="md:flex items-center gap-4  justify-center w-5/6 mx-auto  ">
                <Button
                  onClick={() => openSignIn()}
                  text="sign in"
                  className="text-white capitalize lg:px-7 px-4 text-base lg:py-3 py-3  whitespace-nowrap mb-4 text-center rounded-lg shadow-md bg-blue-600"
                />
                <Button
                  onClick={() => setShowDoctorLogin(true)}
                  text="Doctor sign in"
                  className="text-white capitalize lg:px-7 px-4 text-base lg:py-3 py-3  whitespace-nowrap mb-4 text-center rounded-lg shadow-md bg-green-600"
                />
                <Button
                  onClick={() => setShowHospitalLogin(true)}
                  text="hospital sign in"
                  className="text-white capitalize lg:px-7 px-4 text-base lg:py-3 py-3  whitespace-nowrap mb-4 text-center rounded-lg shadow-md bg-gray-600"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
