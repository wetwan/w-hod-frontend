import { useContext, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useUser } from "@clerk/clerk-react";
import { BiEdit } from "react-icons/bi";
import { HospitalContext } from "../context/HospitalContext";

const UserProfile = () => {
  const { user } = useUser();
  const {
    image,
    setImage,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    gender,
    setGender,
    doB,
    setDoB,
    weight,
    setWeight,
    height,
    setHeight,
    bloodGroup,
    setBloodGroup,
    bloodGenotype,
    setBloodGenotype,
    maritalStatus,
    setMaritalStatus,
    stateof,
    setStateof,
    kinFirstName,
    setKinFirstName,
    kinLastName,
    setKinLastName,
    kinAddress,
    setKinAddress,
    kinEmail,
    setKinEmail,
    kinPhoneNumber,
    setKinPhoneNumber,
    kinRelationships,
    setKinRelationships,
    kinStateOf,
    setKinStateOf,
    kinGender,
    setKinGender,
  } = useContext(HospitalContext);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
    setDoB(selectedDate);
  };

  const handleSubmite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
  };
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <Navbar />
      <div className="mt-32">
        <div className="">
          <div
            className="flex items-start justify-between flex-col md:flex-row gap-5 mx-auto w-5/6
        "
          >
            <div className="md:w-1/5 w-full rounded-full p-2 overflow-hidden relative">
              {isEdit && (
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                  className="border border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full rounded-md capitalize"
                  placeholder="profile image"
                  hidden
                  id="image"
                />
              )}
              {isEdit && (
                <label
                  htmlFor="image"
                  className="absolute text-black z-50  text-center bg-black/30 backdrop-blur-sm rounded-full  w-20 h-20  left-16 top-16 flex items-center justify-center"
                >
                  <BiEdit className="text-3xl text-white/60 " />{" "}
                </label>
              )}
              <img
                src={image ? URL.createObjectURL(image) : user?.imageUrl}
                alt=""
                className="w-full"
              />
            </div>
            <form
              onSubmit={handleSubmite}
              className="md:w-4/5 w-full  border p-2"
            >
              <div className="">
                <h3 className="text-xl  font-bold capitalize mb-5 clip ">
                  persoanl information
                </h3>
                <div className="p-2 w-full">
                  <div className="flex items-center mb-5 justify-between md:flex-row flex-col gap-10">
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">first name</p>

                      <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                        {user?.firstName}
                      </h3>
                    </div>
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">last name </p>

                      <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                        {user?.lastName}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center mb-5 justify-between md:flex-row flex-col gap-10">
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">address</p>
                      {isEdit ? (
                        <input
                          type="text"
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          placeholder="address"
                          value={address}
                        />
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {address}
                        </h3>
                      )}
                    </div>
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">state</p>
                      {isEdit ? (
                        <input
                          type="text"
                          onChange={(e) => setStateof(e.target.value)}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          placeholder="state"
                          value={stateof}
                        />
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {stateof}
                        </h3>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mb-5 justify-between md:flex-row flex-col gap-10">
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">phone</p>
                      {isEdit ? (
                        <input
                          type="text"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          placeholder="phone"
                          value={phoneNumber}
                        />
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {phoneNumber}
                        </h3>
                      )}
                    </div>
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">email</p>

                      <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                        {user?.emailAddresses[0].emailAddress}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center mb-5 justify-between md:flex-row flex-col gap-10">
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">gender</p>
                      {isEdit ? (
                        <select
                          onChange={(e) => setGender(e.target.value)}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          value={gender}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {gender}
                        </h3>
                      )}
                    </div>
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">date</p>
                      {isEdit ? (
                        <input
                          type="date"
                          onChange={handleDateChange}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          placeholder="date"
                        />
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {doB ? doB.toDateString() : "No date selected"}
                        </h3>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mb-5 justify-between md:flex-row flex-col gap-10">
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">height</p>
                      {isEdit ? (
                        <input
                          type="text"
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="height"
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          value={height}
                        />
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {height} m
                        </h3>
                      )}
                    </div>
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">weight</p>
                      {isEdit ? (
                        <input
                          type="text"
                          onChange={(e) => setWeight(e.target.value)}
                          value={weight}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          placeholder="weight"
                        />
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {weight} kg
                        </h3>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mb-5 justify-between md:flex-row flex-col gap-10">
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">blood group</p>
                      {isEdit ? (
                        <select
                          onChange={(e) => setBloodGroup(e.target.value)}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          value={bloodGroup}
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {bloodGroup}
                        </h3>
                      )}
                    </div>
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">
                        blood genotype
                      </p>
                      {isEdit ? (
                        <select
                          onChange={(e) => setBloodGenotype(e.target.value)}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          value={bloodGenotype}
                        >
                          <option value="">Select Genotype</option>
                          <option value="AA">AA</option>
                          <option value="AS">AS</option>
                          <option value="SS">SS</option>
                          <option value="AC">AC</option>
                          <option value="SC">SC</option>
                        </select>
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {bloodGenotype}
                        </h3>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mb-5 justify-between md:flex-row flex-col gap-10">
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">
                        Marital status
                      </p>
                      {isEdit ? (
                        <select
                          onChange={(e) => setMaritalStatus(e.target.value)}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          value={maritalStatus}
                        >
                          <option value="">Select Marital Status</option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                          <option value="separated">Separated</option>
                        </select>
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {maritalStatus}
                        </h3>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <h3 className="text-xl  font-bold capitalize mb-5 clip ">
                  next of information
                </h3>
                <div className="p-2  w-full">
                  <div className="flex items-center mb-5 justify-between md:flex-row flex-col gap-10">
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">first name</p>
                      {isEdit ? (
                        <input
                          type="text"
                          onChange={(e) => setKinFirstName(e.target.value)}
                          value={kinFirstName}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          placeholder="first-name"
                        />
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {kinFirstName}
                        </h3>
                      )}
                    </div>
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">last name</p>
                      {isEdit ? (
                        <input
                          type="text"
                          onChange={(e) => setKinLastName(e.target.value)}
                          value={kinLastName}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          placeholder="address"
                        />
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {kinLastName}
                        </h3>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mb-5 justify-between md:flex-row flex-col gap-10">
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">address</p>
                      {isEdit ? (
                        <input
                          type="text"
                          onChange={(e) => setKinAddress(e.target.value)}
                          value={kinAddress}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          placeholder="address"
                        />
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {kinAddress}
                        </h3>
                      )}
                    </div>
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">state</p>
                      {isEdit ? (
                        <input
                          type="text"
                          onChange={(e) => setKinStateOf(e.target.value)}
                          value={kinStateOf}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          placeholder="state"
                        />
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {kinStateOf}
                        </h3>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mb-5 justify-between md:flex-row flex-col gap-10">
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">phone</p>
                      {isEdit ? (
                        <input
                          type="text"
                          onChange={(e) => setKinPhoneNumber(e.target.value)}
                          value={kinPhoneNumber}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          placeholder="phone"
                        />
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {kinPhoneNumber}
                        </h3>
                      )}
                    </div>
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">email</p>

                      {isEdit ? (
                        <input
                          type="email"
                          onChange={(e) => setKinEmail(e.target.value)}
                          value={kinEmail}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                          placeholder="address"
                        />
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {kinEmail}
                        </h3>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mb-5 justify-between md:flex-row flex-col gap-10">
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">gender</p>
                      {isEdit ? (
                        <select
                          onChange={(e) => setKinGender(e.target.value)}
                          value={kinGender}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {kinGender}
                        </h3>
                      )}
                    </div>
                    <div className="md:w-1/2 w-full">
                      <p className="capitalize font-semibold ">Relationship</p>
                      {isEdit ? (
                        <select
                          onChange={(e) => setKinRelationships(e.target.value)}
                          value={kinRelationships}
                          className="border rounded-md border-blue-600 outline-none placeholder-shown:capitalize px-4 py-2 w-full capitalize mt-3"
                        >
                          <option value="">Select Relationship</option>
                          <option value="father">Father</option>
                          <option value="mother">Mother</option>
                          <option value="brother">Brother</option>
                          <option value="sister">Sister</option>
                          <option value="son">Son</option>
                          <option value="daughter">Daughter</option>
                          <option value="husband">Husband</option>
                          <option value="wife">Wife</option>
                          <option value="uncle">Uncle</option>
                          <option value="aunt">Aunt</option>
                          <option value="cousin">Cousin</option>
                          <option value="nephew">Nephew</option>
                          <option value="niece">Niece</option>
                          <option value="grandfather">Grandfather</option>
                          <option value="grandmother">Grandmother</option>
                          <option value="friend">Friend</option>
                          <option value="guardian">Guardian</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <h3 className="border-color mt-3 px-4 py-2 w-full capitalize">
                          {kinRelationships}
                        </h3>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-5 px-5">
                {isEdit ? (
                  <button
                    type="submit"
                    onClick={() => {
                      setIsEdit(false);
                    }}
                    className="bg-green-600 text-white px-20 py-4 text-2xl  rounded-md"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="bg-blue-600 text-white  px-20 py-4 text-2xl   rounded-md"
                  >
                    Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
