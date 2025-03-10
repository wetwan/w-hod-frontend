import { useNavigate } from "react-router";

type Props = {
  name: string;
  state?: string;
  id: string;
  hospitalName?: string;
  image: string;
  Field: string;
};
const DoctorCard = ({ name, Field, state, hospitalName, image, id }: Props) => {
  const naviagte = useNavigate();
  return (
    <div
      className=" hover:border-gray-700 hover:border mx-auto bg-transparent border-color rounded-lg w-[250px] mt-3 cursor-pointer"
      onClick={() => {
        naviagte(`/doctor/${id}`);
        scrollTo(0, 0);
      }}
    >
      <div className="w-[230px] h-[200px] bg-blue-600  mx-auto mt-4">
        <img src={image} className="w-full h-full" alt="doctor img" />
      </div>
      <div className="px-3">
        <h3 className="mt-5 font-semibold text-xl  capitalize"> {name} Md.</h3>
        <h4
          className="text-black font-medium border w-fit p-2
        bg-blue-400 rounded capitalize"
        >
          {Field}
        </h4>
        <h4 className="my-2 text-blue-300 font-medium  text-xl overflow-hidden whitespace-nowrap text-ellipsis">
          {" "}
          {hospitalName}
        </h4>
        <div className=" flex items-center justify-between  py-2">
          <span className="capitalize font-medium  text-base px-4 py-1.5 bg-white border rounded-md text-green-600 shadow-sm">
            {state}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
