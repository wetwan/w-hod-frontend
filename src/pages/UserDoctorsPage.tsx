import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { HospitalContext } from "../context/HospitalContext";
import DoctorCard from "../components/DoctorCard";
import Button from "../components/Button";
import Pagenation from "../components/Pagenation";
import { MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/solid";
import Footer from "../components/Footer";
import { DoctorContext } from "../context/DoctorContext";
import Spinner from "../components/Spinner";

const UserDoctorsPage = () => {
  const {
    search,
    isSearched,
    setSearch,
    showFilter,
    setShowFilter,
    currentPage,
    setCurrentPage,
    handleSearch,
    doctorRef,
    loading,
    setLoading,
  } = useContext(HospitalContext);

  const { Doctor } = useContext(DoctorContext);

  const [doctorField, setDoctorField] = useState<string[]>([]);
  const [filterdoctor, setFilterdoctor] = useState(Doctor);

  const handleDocotrField = (Field: string) => {
    setDoctorField((prev) =>
      prev.includes(Field) ? prev.filter((c) => c !== Field) : [...prev, Field]
    );
  };

  useEffect(() => {
    setLoading(true);
    const matchesDoctorFeild = (Doctor: { field?: string }) =>
      doctorField.length === 0 || doctorField.includes(Doctor.field ?? "");

    const matcesDoctorName = (Doctor: {
      firstName: string;
      field?: string;
      lastName: string;
    }) =>
      search.doctor === "" ||
      Doctor.firstName.toLowerCase().includes(search.doctor.toLowerCase()) ||
      Doctor.lastName.toLowerCase().includes(search.doctor.toLowerCase()) ||
      Doctor.field?.toLowerCase().includes(search.doctor.toLowerCase());

    const newFilteredDocotor = Doctor.slice().filter(
      (Doctor) => matchesDoctorFeild(Doctor) && matcesDoctorName(Doctor)
    );
    setFilterdoctor(newFilteredDocotor);
    setCurrentPage(1);
    setLoading(false);
  }, [Doctor, doctorField, search, setCurrentPage]);

  return (
    <>
      <Navbar />

      <div className="mt-32 ">
        <form
          className="lg:w-3/6 md:w-4/5 w-11/12 mx-auto md:py-5 py-3 px-3 rounded-full mt-10 flex items-center justify-between gap-4 bg-gray-200"
          onClick={handleSearch}
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-full h-full flex items-center justify-start ">
              <UsersIcon className="w-5 mx-3 text-gray-500" />
              <input
                ref={doctorRef}
                type="text"
                className="w-4/6 py-3 px-3 h-full bg-transparent outline-none"
                placeholder="Search for  doctors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-slate-800 text-white md:py-3 py-1.5 px-5 rounded-full w-1/6 text-center items-center flex justify-center"
          >
            <MagnifyingGlassIcon className="h-5 w-5 font-bold text-2xl" />
          </button>
        </form>
        <div className="lg:w-5/6 px-5 py-8 w-full mx-auto flex flex-col lg:flex-row gap-4 mt-10 ">
          <div
            className={` ${
              isSearched && search.doctor ? "border-2 " : "border-0"
            }  w-full px-5 py-3 md:basis-1/6  rounded-md border-gray-500`}
          >
            {isSearched && search.doctor !== "" && (
              <>
                <h3 className="font-medium text-lg mb-4 capitalize">
                  current search
                </h3>
                <div className="mb-4 text-gray-600 flex gap-2">
                  {search && (
                    <>
                      {search.doctor !== "" && (
                        <span className="bg-green-100 py-2 px-4 inline-flex items-center text-gray-400 rounded-sm font-medium border-color">
                          {search.doctor}
                          <b
                            className="cursor-pointer ml-2 text-black text-xl"
                            onClick={() => setSearch({ ...search, doctor: "" })}
                          >
                            x
                          </b>
                        </span>
                      )}
                    </>
                  )}
                </div>
              </>
            )}{" "}
            {/* filter  */}
            <Button
              text={showFilter ? "close" : "filter"}
              className=" capitalize font-semibold border px-5 rounded-md border-blue-300 text-blue-400 py-3 w-fit lg:hidden"
              onClick={() => setShowFilter(!showFilter)}
            />{" "}
            {/* category filter  */}
            <div className={`${showFilter ? "" : 'max-lg:hidden mb-5"'} `}>
              <h4 className="font-semibold whitespace-nowrap text-[13px] uppercase py-4">
                Search by Specialists{" "}
              </h4>
              <ul className="space-y-4 text-gray-600 text-sm">
                {[
                  ...new Set(filterdoctor && Doctor.map((doc) => doc.field)),
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      onChange={() => handleDocotrField(item)}
                      checked={doctorField.includes(item)}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" flex-1 basis-4/6">
            <div className="w-full lg:px-4 text-gray-800 mt-5">
              <h2 className="font-bold text-3xl py-2"> Nearest Doctor</h2>
              {filterdoctor.length > 0 ? (
                <p className="ml-4"> Find the doctor nearest to you </p>
              ) : (
                <p className=" ml-4 text-red-400 capitalize">No doctor found</p>
              )}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-3 px-4 py-5">
                  {filterdoctor
                    .slice((currentPage - 1) * 9, currentPage * 9)
                    .map((item) => (
                      <DoctorCard
                        key={item._id}
                        Field={item.field}
                        image={item.image}
                        id={item._id}
                        name={`${item.firstName} ${item.lastName}`}
                        hospitalName={item.Hospital_Name}
                        state={item.state}
                      />
                    ))}
                </div>
              )}
            </div>
            <Pagenation item={filterdoctor} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDoctorsPage;
