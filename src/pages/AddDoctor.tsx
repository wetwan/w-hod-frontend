/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from "react";
import { useNavigate } from "react-router";
import { DoctorContext } from "../context/DoctorContext";
import { BiUserCircle } from "react-icons/bi";

const AddDoctor = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    school,
    setSchool,

    setExperience,
    website,
    setwebsite,
    specialist,
    setSpecialist,
    bannerPic,
    setBannerPic,
    profilePic,
    setProfilePic,
    about,
    setAbout,
  } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleAddDoctor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/hospital-dashboard/profile");
    scrollTo(0, 0);
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
    setExperience(selectedDate);
  };
  return (
    <div className="border min-h-screen border-green-500 rounded-md mt-2 mr-3 md:py-10 py-4 px-4">
      <h2 className="font-bold capitalize text-2xl clip "> add doctor</h2>
      <form onSubmit={handleAddDoctor}>
        <div className="md:w-5/6 mx-auto md:mt-5 ">
          <div className=" flex items-center max-md:flex-col gap-10 max-md:gap-3">
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="first Name"
              >
                First Name
              </label>
              <input
                type="text"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="first Name"
                id="first Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="lastname"
              >
                Last Name
              </label>
              <input
                type="text"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="last Name"
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex items-center max-md:flex-col gap-10 max-md:gap-3 md:mt-5">
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="text"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex items-center max-md:flex-col gap-10 max-md:gap-3 md:mt-5">
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="website"
              >
                Website
              </label>
              <input
                type="text"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="website"
                id="website"
                value={website}
                onChange={(e) => setwebsite(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="school"
              >
                School
              </label>
              <input
                type="text"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="school"
                id="school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex items-center max-md:flex-col gap-10 max-md:gap-3 md:mt-5">
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="specialist"
              >
                specialist
              </label>
              <input
                type="text"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="specialist"
                id="specialist"
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="experience"
              >
                Experience
              </label>
              <input
                type="date"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="years of experience"
                id="experience"
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div className=" flex items-center max-md:flex-col gap-10 max-md:gap-3 md:mt-5">
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="profile Pic"
              >
                profile Pic
              </label>
              <div className="flex items-center gap-4">
                <div className="  w-2/6 py-4 flex items-center justify-center">
                  {profilePic ? (
                    <img
                      src={URL.createObjectURL(profilePic)}
                      alt="hospital image"
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    <BiUserCircle className="xl w-full h-full" />
                  )}
                </div>
                <input
                  type="file"
                  id="profile Pic"
                  required
                  className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setProfilePic(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="banner Pic"
              >
                banner Pic
              </label>
              <div className="flex items-center gap-4">
                <div className="  w-2/6 py-4 flex items-center justify-center">
                  {bannerPic ? (
                    <img
                      src={URL.createObjectURL(bannerPic)}
                      alt="hospital image"
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    <BiUserCircle className="xl w-full h-full" />
                  )}
                </div>
                <input
                  type="file"
                  id="banner Pic"
                  required
                  className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setBannerPic(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className=" flex items-center max-md:flex-col gap-10 max-md:gap-3 md:mt-5">
            <div className="flex gap-2 flex-col  w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="About doctor"
              >
                About doctor
              </label>
              <textarea
                id="About doctor"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 max-w-full min-w-full w-full max-h-[150px] min-h-[150px] h-[150px] px-4 rounded-md outline-none"
                placeholder="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="w-5/6 mx-auto mt-5">
          <button className="border border-blue-600 cursor-pointer px-10 rounded-md bg text-white font-bold text-lg capitalize py-3">
            {" "}
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
