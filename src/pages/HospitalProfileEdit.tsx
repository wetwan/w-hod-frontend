
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { HospitalInfoContext } from "../context/HospitalInfo";
import { BiUserCircle } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";

const HospitalProfileEdit = () => {
  const {
    hospistalName,
    sethospistalName,
    address,
    setAddress,
    email,
    setEmail,
    ofState,
    setOfState,
    website,
    setwebsite,
    phone,
    setPhone,
    type,
    setType,
    ownership,
    setOwnership,
    facility,
    setFacility,
    image,
    setImage,
    bannerPic,
    setBannerPic,
    setOtherImages,
    OtherImages,
    about,
    setAbout,
    hosToken,
    hosData,
    backendUrl,
  } = useContext(HospitalInfoContext);
  const navigate = useNavigate();
  const [facilityInput, setFacilityInput] = useState<string>("");

  const handleAddDoctor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.preventDefault();

    const formData = new FormData();

    // Append the form fields to FormData
    formData.append("name", hospistalName);
    formData.append("type", type);
    formData.append("email", email);
    formData.append("address", address);

    formData.append("state", ofState);
    formData.append("website", website);
    formData.append("phone", phone);
    formData.append("ownership", ownership);
    formData.append("facility", facility.join(","));
    formData.append("about", about);
    if (hosData?._id) {
      formData.append("id", hosData._id);
    }

    // Append the images (use conditional checks if required)
    if (bannerPic) {
      formData.append("banner", bannerPic); // ✅ Must match the backend field
    }

    if (image) {
      formData.append("image", image); // ✅ Must match the backend field
    }

    if (OtherImages && OtherImages.length > 0) {
      OtherImages.forEach((file) => {
        formData.append("otherImages", file); // ✅ Must match the backend field
      });
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/hospital/update",
        formData,
        // Pass the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper content type
            token: hosToken,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate(`/hospital-dashboard/profile`);
        scrollTo(0, 0);
        setAbout("");

        setEmail("");
        setOfState("");
        setImage(null);
        setwebsite("");
        setAbout("");
        setPhone("");
      } else {
        toast.error(data.message);
      }
      console.log(formData.get("name")); // Output: The value of "name" field
      console.log(formData.get("email")); // Output: The value of "email" field
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
    navigate("/hospital-dashboard/profile");
  };

  const handleFacilityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFacilityInput(e.target.value);
  };

  const handleAddFacility = () => {
    if (facilityInput && !facility.includes(facilityInput.toLowerCase())) {
      setFacility([...facility, facilityInput.trim()]);
      setFacilityInput(""); // Clear input field
    }
  };

  const handleRemoveFacility = (item: string) => {
    setFacility(facility.filter((c) => c !== item));
  };

  return (
    <div className="border min-h-screen border-green-500 rounded-md mt-2 mr-3 md:py-10 py-4 px-4">
      <h2 className="font-bold capitalize text-2xl clip "> edit profile</h2>
      <form onSubmit={handleAddDoctor}>
        <div className="md:w-5/6 mx-auto md:mt-5 ">
          <div className=" flex items-center max-md:flex-col gap-10 max-md:gap-3">
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="hospiatl name"
              >
                Hospiatl name
              </label>
              <input
                type="text"
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="hospiatl name"
                id="hospiatl name"
                value={hosData?.name || hospistalName}
                onChange={(e) => sethospistalName(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="address"
              >
                Hospital Address
              </label>
              <input
                type="text"
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="hospital address"
                id="address"
                value={hosData?.address || address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex items-center max-md:flex-col gap-10 max-md:gap-3 mt-6">
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="hospiatl email"
              >
                Hospiatl email
              </label>
              <input
                type="text"
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="hospiatl email"
                id="hospiatl email"
                value={hosData?.email || email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="state"
              >
                Hospital State
              </label>
              <input
                type="text"
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="hospital state"
                id="state"
                value={hosData?.state || ofState}
                onChange={(e) => setOfState(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex items-center max-md:flex-col gap-10 max-md:gap-3 mt-6">
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="hospiatl website"
              >
                Hospiatl website
              </label>
              <input
                type="text"
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="hospiatl website"
                id="hospiatl website"
                value={hosData?.website || website}
                onChange={(e) => setwebsite(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="phone number"
              >
                Hospital Phone number
              </label>
              <input
                type="text"
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                placeholder="hospital phone number"
                id="phone number"
                value={hosData?.phone || phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex items-center max-md:flex-col gap-10 max-md:gap-3 mt-6">
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="hospiatl type"
              >
                Hospiatl type
              </label>
              <select
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                id="hospiatl type"
                value={hosData?.type || type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="General">General</option>
                <option value="Clinic">Clinic</option>
                <option value="Teaching">Teaching</option>
                <option value="Specialist">Specialist</option>
              </select>
            </div>
            <div className="flex gap-2 flex-col md:w-1/2 w-full">
              <label
                className="md:px-3 capitalize font-semibold text-lg"
                htmlFor="hospiatl ownershiper"
              >
                Hospiatl ownershiper
              </label>
              <select
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                id="hospiatl ownershiper"
                value={hosData?.ownership || ownership}
                onChange={(e) => setOwnership(e.target.value)}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
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
                  {hosData?.image ? (
                    <img
                      src={
                        hosData?.image
                          ? hosData.image
                          : image
                          ? URL.createObjectURL(image)
                          : undefined
                      }
                      alt="hospital image"
                      className="rounded-full w-full h-full object-cover  border border-green-500"
                    />
                  ) : (
                    <BiUserCircle className="xl w-full h-full" />
                  )}
                </div>
                <input
                  type="file"
                  id="profile Pic"
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
                  {hosData?.banner ? (
                    <img
                      src={
                        hosData?.banner
                          ? hosData.banner
                          : bannerPic
                          ? URL.createObjectURL(bannerPic)
                          : undefined
                      }
                      alt="hospital image"
                      className="rounded-full w-full h-full object-cover  border border-green-500"
                    />
                  ) : (
                    <BiUserCircle className="xl w-full h-full" />
                  )}
                </div>
                <input
                  type="file"
                  id="banner Pic"
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
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 max-w-full min-w-full w-full max-h-[150px] min-h-[150px] h-[150px] px-4 rounded-md outline-none"
                placeholder="about"
                value={hosData?.about || about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className=" flex items-start max-md:flex-col gap-10 max-md:gap-3 md:mt-5">
            <div className="flex flex-col gap-3 mb-5 w-full md:w-1/2">
              <label
                htmlFor="facility"
                className="md:px-3 capitalize font-semibold text-lg"
              >
                Product Facility
              </label>
              <input
                type="text"
                id="facilityText"
                value={facilityInput || facility} // ✅ Fix: Use facilityInput here
                placeholder="lab"
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-4 px-4 rounded-md outline-none"
                onChange={handleFacilityInputChange}
              />
              <button
                type="button"
                className="bg text-white py-2 px-4 rounded mt-3"
                onClick={handleAddFacility}
              >
                Add Facility
              </button>

              {facility.length > 0 && (
                <div className="w-full mt-5">
                  <h4 className="text-primary-300 text-sm mb-2">
                    Selected Facilities:
                  </h4>
                  <ul className="flex gap-3 flex-wrap">
                    {facility.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-200 rounded"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => handleRemoveFacility(item)}
                        >
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>{" "}
            <div className="flex flex-col gap-3 mb-5 w-full md:w-1/2">
              <label
                htmlFor="image"
                className="md:px-3 capitalize font-semibold text-lg"
              >
                Product Images (URLs)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                id="image"
                className="border placeholder-shown:text-blue-800 placeholder:capitalize placeholder:text-blue-500 border-blue-300 py-3.5 px-4 rounded-md outline-none"
                onChange={(e) => {
                  if (e.target.files) {
                    setOtherImages(Array.from(e.target.files));
                  }
                }}
              />
            </div>
          </div>{" "}
        </div>
        <div className="w-5/6 mx-auto mt-5">
          <button className="border border-blue-600 cursor-pointer px-10 rounded-md bg text-white font-bold text-lg capitalize py-3">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HospitalProfileEdit;
