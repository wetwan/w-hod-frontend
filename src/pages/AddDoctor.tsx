import { useContext } from "react";
import { useNavigate } from "react-router";
import { DoctorContext } from "../context/DoctorContext";
import { BiUserCircle } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { HospitalInfoContext } from "../context/HospitalInfo";

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
    college,
    setCollege,
    setExperience,
    website,
    setwebsite,
    field,
    setField,
    bannerImage,
    setBannerImage,
    image,
    setImage,
    about,
    setAbout,
    backendUrl,
    password,
    setpassword,
    state,
    experience,
    setState,
  } = useContext(DoctorContext);
  const { hosToken } = useContext(HospitalInfoContext);
  const navigate = useNavigate();

  const handleAddDoctor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    // Append the form fields to FormData
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("state", state);
    formData.append("website", website);
    formData.append("College", college);
    formData.append("experience", experience);
    formData.append("about", about);
    formData.append("field", field);

    // Append the images (use conditional checks if required)
    if (bannerImage) {
      formData.append("bannerImage", bannerImage); // "bannerImage" should match backend field name
    }

    if (image) {
      formData.append("image", image); // "image" should match backend field name
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/hospital/register",
        formData, // Pass the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper content type
            token: hosToken,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate(`/hospital-dashboard/doctor`);
        scrollTo(0, 0);
        setAbout("");
        setBannerImage(null);
        setFirstName("");
        setLastName("");
        setEmail("");
        setState("");
        setImage(null);
        setwebsite("");
        setCollege("");
        setExperience("");
        setAbout("");
        setPhone("");
        setpassword("");
        setField("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
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
                htmlFor="college"
              >
                College
              </label>
              <input
                type="text"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="college"
                id="college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex items-center max-md:flex-col gap-10 max-md:gap-3 md:mt-5">
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="password"
              >
                password
              </label>
              <input
                type="password"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="password"
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="state"
              >
                state
              </label>
              <input
                type="text"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="state"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex items-center max-md:flex-col gap-10 max-md:gap-3 md:mt-5">
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="field"
              >
                field
              </label>
              <input
                type="text"
                required
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="field"
                id="field"
                value={field}
                onChange={(e) => setField(e.target.value)}
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
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
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
                <div className=" w-14 h-14 flex items-center justify-center">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="hospital image"
                      className="rounded-full w-full h-full object-cover  border border-green-500"
                    />
                  ) : (
                    <BiUserCircle className="text-xl w-14 h-14  text-gray-500" />
                  )}
                </div>
                <input
                  type="file"
                  id="profile Pic"
                  required
                  className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
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
                <div className=" w-14 h-14 flex items-center justify-center">
                  {bannerImage ? (
                    <img
                      src={URL.createObjectURL(bannerImage)}
                      alt="hospital image"
                      className="rounded-full w-full h-full object-cover  border border-green-500"
                    />
                  ) : (
                    <BiUserCircle className="text-xl w-14 h-14  text-gray-500" />
                  )}
                </div>
                <input
                  type="file"
                  id="banner Pic"
                  required
                  className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setBannerImage(e.target.files[0]);
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
