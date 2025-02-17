import { useNavigate } from "react-router";

type Props = {
  name: string;
  state: string;
  image: string;
  id: string;
};

const HospitalCard = ({ name, state, id, image }: Props) => {
  const naviagte = useNavigate();
  return (
    <div
      className="hover:border-gray-700 hover:border mx-auto bg-transparent border-color rounded-lg w-[250px] mt-3 cursor-pointer"
      onClick={() => {
        naviagte(`/hospital/${id}`);
      }}
    >
      <div className="w-[220px] h-[200px]  mx-auto mt-4">
        <img src={image} className="w-full h-full" alt="hospiatal logo" />
      </div>
      <div className="px-3">
        <h4 className="mt-5 overflow-hidden font-semibold text-xl whitespace-nowrap text-ellipsis">
          {" "}
          {name}
        </h4>
        <div className=" flex items-center justify-between  py-2">
          <span className="capitalize font-medium  text-base">{state}</span>
          <p className=" px-4 py-1.5 bg-white border rounded-md text-green-600 shadow-sm ">
            12.00 miles
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
