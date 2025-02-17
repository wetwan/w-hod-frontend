import { assets } from "../assets";

const Footer = () => {
  return (
    <footer className="w-full py-10">
      <div className="w-5/6 bg-blue-300 mx-auto">
        <div className="w-full flex flex-col lg:flex-row mx-auto  py-5 px-10 justify-between items-start">
          <div className="w-32 ">
            <img src={assets.Logo} alt="" />
          </div>
          <div className="">
            <h4> services</h4>
            <ul className="capitalize">
              <li> hospital</li>
              <li> doctor</li>
              <li>Appointments</li>
            </ul>
          </div>
          <div className="">
            <h4>socails</h4>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
        <div className="">
          <hr className="h-0.5 bg w-5/6 mx-auto" />
          <p className="text-center capitalize text-xl font-bold py-5 clip ">copyright &copy; w-Hos {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
