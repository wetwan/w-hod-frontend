/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { HospitalInfoContext } from "../context/HospitalInfo";
import { FaHospital, FaX } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { CgLockUnlock } from "react-icons/cg";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const HospitalLogin = () => {
  const {
    email,

    setEmail,

    password,
    name,
    setName,
    setpassword,
    setShowHospitalLogin,
    image,
    setImage,
    backendUrl,
    setHosToken,
    setHosData,
  } = useContext(HospitalInfoContext);

  const [State, setState] = useState("login");
  const [isNext, setIsNext] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (State == "sign up" && !isNext) {
      return setIsNext(true);
    }

    try {
      if (State === "login") {
        const { data } = await axios.post(backendUrl + "/api/hospital/login", {
          email,
          password,
        });
        if (data.success) {
          setHosData(data.hospiatal);
          setHosToken(data.token);
          localStorage.setItem("hospital token", data.token);
          setShowHospitalLogin(false);
          navigate("/hospital-dashboard/appointment");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("email", email);

        if (image) {
          formData.append("image", image);
        }

        const response = await axios.post(
          backendUrl + "/api/hospital/hospital-register",
          formData
        );

        const { data } = response;

        if (data.success) {
          setHosData(data.hospiatal);
          setHosToken(data.token);
          localStorage.setItem("hospital token", data.token);
          setShowHospitalLogin(false);
          navigate("/hospital-dashboard/profile/edit");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute  w-full z-[100] top-0 right-0 bottom-0 left-0 bg-black/30 backdrop-blur-sm flex items-center justify-center ">
      <form
        className="relative bg-white p-10 rounded-xl text-slate-500 md:w-[500px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl capitalize font-bold mb-2 clip ">
          hospital {State}
        </h1>
        {State === "login" ? (
          <p className="uppercase text-sm mb-3">
            {" "}
            welcome back!, please login to continue{" "}
          </p>
        ) : (
          <p className="uppercase text-sm mb-3">
            {" "}
            welcome ! please sign-up to enjoy our servives
          </p>
        )}
        {State === "sign up" && isNext ? (
          <>
            <div className="flex items-center gap-10 w-5/6 mx-auto mt-10">
              <label htmlFor="logo" className="h-12 w-12">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="hospital image"
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <BiUserCircle className="w-full h-full" />
                )}
                <input
                  type="file"
                  id="logo"
                  hidden
                  required
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </label>
              <p className=" capitalize">
                upload hospiatal <br /> logo{" "}
              </p>
            </div>
          </>
        ) : (
          <>
            {State == "sign up" && (
              <div className="flex border-color border rounded-md my-3  items-center justify-between  py-2 gap-2">
                <label htmlFor="name" className="w-1/6  h-full p-2 ">
                  <FaHospital className="text-2xl w-full text-blue-400 " />{" "}
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  required
                  placeholder="hospiatal name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-5/6 text-sm h-full py-3 px-0.5 outline-none placeholder-shown:capitalize clip placeholder-shown:text-blue-400"
                />
              </div>
            )}
            <div className="flex border-color border rounded-md my-3  items-center justify-between  py-2 gap-2">
              <label htmlFor="email" className="w-1/6  h-full p-2 ">
                <MdEmail className="text-2xl w-full text-blue-400" />
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                placeholder="hospiatal email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-5/6 text-sm h-full py-3 px-0.5 outline-none placeholder-shown:capitalize clip placeholder-shown:text-blue-400"
              />
            </div>
            <div className="flex border-color border rounded-md my-3  items-center justify-between  py-2 gap-2">
              <label htmlFor="password" className="w-1/6  h-full p-2 ">
                <CgLockUnlock className="text-2xl w-full text-blue-400" />
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                placeholder="hospiatal password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                className="w-5/6 text-sm h-full py-3 px-0.5 outline-none placeholder-shown:capitalize clip placeholder-shown:text-blue-400"
              />
            </div>
            {State === "login" && (
              <p className="clip  capitalize mb-6 cursor-pointer text-sm">
                {" "}
                forgot password?
              </p>
            )}
          </>
        )}
        <button
          type="submit"
          className="bg rounded-2xl mt-10 w-4/6 mx-auto block py-4 capitalize text-white text-2xl font-bold cursor-pointer"
        >
          {State === "login" ? "login" : isNext ? "create account" : "next"}
        </button>
        {State === "login" ? (
          <p className="mt-5 text-center">
            Don"t have an account?{" "}
            <span
              className="clip capitalize cursor-pointer"
              onClick={() => setState("sign up")}
            >
              {" "}
              sign up
            </span>{" "}
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account{" "}
            <span
              className="clip capitalize cursor-pointer"
              onClick={() => setState("login")}
            >
              {" "}
              login
            </span>
          </p>
        )}
        <FaX
          className="absolute top-5 right-4 text-red-500 cursor-pointer text-xl"
          onClick={() => setShowHospitalLogin(false)}
        />
      </form>
    </div>
  );
};

export default HospitalLogin;
