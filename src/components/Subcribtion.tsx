import { useState } from "react";
import { assets } from "../assets";
import Button from "./Button";

const Subcribtion = () => {
  const [email, SetEmail] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetEmail('')
  };
  return (
    <div
      className="relative rounded-2xl overflow-hidden mt-4 lg:h-[40vh] h-[30vh]"
      style={{
        backgroundImage: `url(${assets.Sub})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 z-50 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] text-white ">
        <div className="flex lg:item-center flex-col-reverse lg:flex-row w-11/12 mx-auto lg:h-[95%]">
          <div className="w-full lg:w-1/2 p-3 lg:flex items-center">
            <h2 className="clip lg:w-5/6  lg:text-4xl text-2xl text-center lg:text-left">
              You're now part of our community! Expect exclusive updates, news,
              and more
            </h2>
          </div>
          <div className=" w-full lg:my-0 lg:w-1/2 py-3 px-2 lg:flex lg:items-center mt-20">
            <form
              action=""
              className=" flex items-center w-full px-2 lg:w-5/6 justify-between py-4 rounded-full gap-4 h-20 border-color "
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="lg:text-xl text-sm sm:text-2xl px-2  w-full h-full clip  placeholder-shown:uppercase outline-none"
                placeholder="someone@email.com"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
              />
              <Button
                text="subscribe"
                className=" border-color py-2 px-6  lg:py-3 lg:px-6 text-sm lg:text-base text-center whitespace-nowrap rounded-full bg-green-300 clip capitalize font-semibold"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subcribtion;
