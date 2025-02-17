import { useNavigate } from "react-router";

type props = {
  id: string;
  image: string;
  name: string;
  field: string;
};

const HosDoc = ({ id, image, name, field }: props) => {
  const naviagte = useNavigate();
  return (
    <div
      onClick={() => {
        naviagte(`/doctor/${id}`);
        scrollTo(0, 0);
      }}
      className="cursor-pointer flex px-4 py-1 mt-3 rounded-xl items-center gap-3 bg"
    >
        <div className=" w-20 bg-blue-800 rounded-full">
            <img src={image} alt="propile pic" />
        </div>
        <div className="">
            <p className="border p-2 px-5 rounded-md shadow my-3 text-white w-full ">{name}</p>
            <p className="border whitespace-nowrap p-2 px-5 rounded-md shadow-md my-3 text-white w-full ">{field}</p>
            
        </div>
    </div>
  );
};

export default HosDoc;
