import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../context/DoctorContext";

import { MdEmail } from "react-icons/md";
import { CgLockUnlock } from "react-icons/cg";
import { FaX } from "react-icons/fa6";
import { useNavigate } from "react-router";

const DoctorLogin = () => {
  const { email, setEmail, password, setpassword, setShowDoctorLogin } =
    useContext(DoctorContext);
  const naviagte = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    naviagte("/doctor-dashboard/appointment");
    setShowDoctorLogin(false)
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed w-full top-0 right-0 bottom-0 left-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999999999999]">
      <form
        className="relative bg-white p-10 rounded-xl text-slate-500 md:w-[500px] flex items-center flex-col"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl capitalize font-bold mb-2 clip ">
          doctor login
        </h1>
        <FaX
          className="absolute top-5 right-4 cursor-pointer text-xl text-red-500"
          onClick={() => setShowDoctorLogin(false)}
        />
        <p className="uppercase text-sm mb-3 text-blue-300">
          {" "}
          welcome back!, please login to continue{" "}
        </p>

        <>
          <div className="flex border-blue-400 border rounded-md my-3  items-center justify-between  py-2 gap-2 w-4/6">
            <label htmlFor="email" className="w-1/6  h-full p-2 ">
              <MdEmail className="text-2xl w-full text-blue-400" />
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              placeholder="doctor email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-5/6 text-sm h-full py-3 px-0.5 outline-none placeholder-shown:capitalize clip placeholder-shown:text-blue-400"
            />
          </div>
          <div className="flex border-blue-400 border rounded-md my-3  items-center justify-between  py-2 gap-2 w-4/6">
            <label htmlFor="password" className="w-1/6  h-full p-2 ">
              <CgLockUnlock className="text-2xl w-full text-blue-400" />
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              placeholder="doctor password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="w-5/6 text-sm h-full py-3 px-0.5 outline-none placeholder-shown:capitalize clip placeholder-shown:text-blue-400"
            />
          </div>

          <p className="clip  capitalize mx-6 cursor-pointer text-sm ">
            {" "}
            forgot password?
          </p>
        </>

        <button
          type="submit"
          className=" rounded-2xl mt-10 w-4/6 mx-auto block border clip border-blue-300 py-4 capitalize text-white text-2xl font-bold cursor-pointer"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default DoctorLogin;
