import { useContext } from "react";
import { HospitalContext } from "../context/HospitalContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Appointment, Doctor, Hospital } from "../types/type";

type data = {
  item: Doctor[] | Hospital[] | Appointment[];
};

const Pagenation = ({ item }: data) => {
  const { currentPage, setCurrentPage } = useContext(HospitalContext);
  return (
    <div className=" flex items-center justify-center mt-5 gap-x-3">
      {item.length > 0 && (
        <div className="flex items-center justify-center gap-x-3">
          <button
            onClick={() => {
              setCurrentPage(Math.max(currentPage - 1, 1));
              scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`border-2 border-blue-400 px-4 py-2 rounded-lg active:bg-blue-400`}
          >
            <ChevronLeftIcon className="w-10" />
          </button>

          {Array.from({ length: Math.ceil(item.length / 9) }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`border-2 border-blue-400 px-4 py-2 rounded-lg $ outline-none{
                currentPage === 1 + i ? "bg-blue-400 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => {
              setCurrentPage(
                Math.min(currentPage + 1, Math.ceil(item.length / 9))
              );
              scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="border-2 border-blue-400 px-4 py-2 rounded-lg outline-none"
          >
            <ChevronRightIcon className="w-10" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagenation;
