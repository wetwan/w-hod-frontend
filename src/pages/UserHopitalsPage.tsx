import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { HospitalContext } from "../context/HospitalContext";
import HospitalCard from "../components/HospitalCard";
import Button from "../components/Button";
import Pagenation from "../components/Pagenation";
import {
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Footer from "../components/Footer";
import { HospitalInfoContext } from "../context/HospitalInfo";

const UserHopitalsPage = () => {
  const {
    search,
    isSearched,
    setSearch,
    showFilter,
    setShowFilter,
    setCurrentPage,
    currentPage,
    handleSearch,
    hospitalRef,
  } = useContext(HospitalContext);

  const { Hospital } = useContext(HospitalInfoContext);

  const [selectedHospitalType, setSelectedHospitalType] = useState<string[]>(
    []
  );
  const [hospitalOwnership, setHospitalOwnership] = useState<string[]>([]);
  const [hospitalstate, setHospitalstate] = useState<string[]>([]);
  const [filterHospital, setFilterHospital] = useState(Hospital);

  const handleHospitalType = (type: string) => {
    setSelectedHospitalType((prev) =>
      prev.includes(type) ? prev.filter((c) => c !== type) : [...prev, type]
    );
  };
  const handleHospitaloqnwership = (ownership: string) => {
    setHospitalOwnership((prev) =>
      prev.includes(ownership)
        ? prev.filter((c) => c !== ownership)
        : [...prev, ownership]
    );
  };
  const handleHospitalState = (state: string) => {
    setHospitalstate((prev) =>
      prev.includes(state) ? prev.filter((c) => c !== state) : [...prev, state]
    );
  };
  useEffect(() => {
    const matchesHospitalOwnership = (Hospital: { ownership: string }) =>
      hospitalOwnership.length === 0 ||
      hospitalOwnership.includes(Hospital.ownership);
    const matchesHospitalType = (Hospital: { type: string }) =>
      selectedHospitalType.length === 0 ||
      selectedHospitalType.includes(Hospital.type);
    const matchesHospitalState = (Hospital: { state: string }) =>
      hospitalstate.length === 0 || hospitalstate.includes(Hospital.state);

    const matcesHospitalName = (Hospital: { name: string; state: string }) =>
      search.hospital === "" ||
      Hospital.name.toLowerCase().includes(search.hospital.toLowerCase()) ||
      Hospital.state.toLowerCase().includes(search.hospital.toLowerCase());

    const newFilteredHospiatl = Hospital.slice().filter(
      (Hospital) =>
        matchesHospitalOwnership(Hospital) &&
        matcesHospitalName(Hospital) &&
        matchesHospitalType(Hospital) &&
        matchesHospitalState(Hospital)
    );
    setFilterHospital(newFilteredHospiatl);
    setCurrentPage(1);
  }, [
    Hospital,
    search,
    hospitalOwnership,
    setCurrentPage,
    selectedHospitalType,
    hospitalstate,
  ]);

  return (
    <>
      <Navbar />

      <div className="mt-32 ">
        {" "}
        <form
          className="lg:w-3/6 md:w-4/5 w-11/12 mx-auto md:py-5 py-3 px-3 rounded-full mt-10 flex items-center justify-between gap-4 bg-gray-200"
          onClick={handleSearch}
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-full h-full flex items-center justify-start ">
              <BuildingOfficeIcon className="w-5 mx-3 text-gray-500" />
              <input
                ref={hospitalRef}
                type="text"
                className="w-4/6 py-3 px-3 h-full bg-transparent outline-none"
                placeholder="Search for  clinics, hospitals, etc."
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
        <div className="lg:w-5/6 px-5 py-8 w-full mx-auto flex flex-col lg:flex-row gap-4  ">
          <div
            className={` ${
              isSearched && search.hospital && showFilter
                ? "border-2 "
                : "border-0"
            }  w-4/5  px-5 py-3 md:basis-1/6  rounded-md border-gray-500`}
          >
            {isSearched && search.hospital !== "" && (
              <>
                <h3 className="font-medium text-lg mb-4 capitalize">
                  current search
                </h3>
                <div className="mb-4 text-gray-600 flex gap-2">
                  {search && (
                    <>
                      {search.hospital !== "" && (
                        <span className="py-2 bg-blue-100 px-4 inline-flex items-center text-gray-400 rounded-sm font-medium border-color">
                          {search.hospital}
                          <b
                            className="cursor-pointer ml-2 text-black text-xl"
                            onClick={() =>
                              setSearch({ ...search, hospital: "" })
                            }
                          >
                            x
                          </b>
                        </span>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
            {/* filter  */}
            <Button
              text={showFilter ? "close" : "filter"}
              className=" capitalize font-semibold border px-5 rounded-md border-blue-300 text-blue-400 py-3 w-fit lg:hidden"
              onClick={() => setShowFilter(!showFilter)}
            />
            {/* category filter  */}
            <div className={`${showFilter ? "" : 'max-lg:hidden mb-5"'} `}>
              <h4 className="font-semibold text-base uppercase py-4">
                Search by Hopital Type{" "}
              </h4>
              <ul className="space-y-4 text-gray-600 ">
                {[
                  ...new Set(filterHospital && Hospital.map((hos) => hos.type)),
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      onChange={() => handleHospitalType(item)}
                      checked={selectedHospitalType.includes(item)}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* search by state  */}
            <div className={`${showFilter ? "" : 'max-lg:hidden mb-5"'} `}>
              <h4 className="font-semibold text-base uppercase  py-4">
                Search by state{" "}
              </h4>
              <ul className="space-y-4 text-gray-600 ">
                {[
                  ...new Set(
                    filterHospital && Hospital.map((hos) => hos.state)
                  ),
                ]
                  .slice(0, 5)
                  .map((item, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <input
                        type="checkbox"
                        onChange={() => handleHospitalState(item)}
                        checked={hospitalstate.includes(item)}
                      />
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
            <div className={`${showFilter ? "" : 'max-lg:hidden mb-5"'} `}>
              <h4 className="font-semibold text-base uppercase  py-4">
                Search by Ownership{" "}
              </h4>
              <ul className="space-y-4 text-gray-600 ">
                {[
                  ...new Set(
                    filterHospital && Hospital.map((hos) => hos.ownership)
                  ),
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      onChange={() => handleHospitaloqnwership(item)}
                      checked={hospitalOwnership.includes(item)}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" flex-1 basis-4/6">
            <div className="w-full lg:px-4 text-gray-800 mt-5">
              <h2 className="font-bold text-3xl py-2 ml-4" id="hopital-list">
                Nearest Hopital
              </h2>
              {filterHospital.length > 0 ? (
                <p className="ml-4"> Find the hospital nearest to you </p>
              ) : (
                <p className=" ml-4 text-red-400 capitalize">
                  No hospital found
                </p>
              )}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4  px-4 py-5">
                {filterHospital
                  .slice((currentPage - 1) * 9, currentPage * 9)
                  .map((item) => (
                    <HospitalCard
                      key={item._id}
                      id={item._id}
                      image={item.image}
                      name={item.name}
                      state={item.state}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>{" "}
        <Pagenation item={filterHospital} />
      </div>
      <Footer />
    </>
  );
};

export default UserHopitalsPage;
