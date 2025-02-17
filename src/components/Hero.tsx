import heroImage from "../assets/hero.jpg";

const Hero = () => {
  return (
    <div
      className="lg:w-5/6 w-full sm:h-[70vh] h-[50vh] py-20 leading-loose mx-auto before:-z-10 mt-3 relative before:top-0 left-0 before:w-full before:absolute  bg-slate-800 before:h-full"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.4)] z-40 py-20 lg:py-24 leading-loose">
         <h2 className="sm:w-4/5 mx-auto sm:text-5xl  sm:leading-relaxed lg:w-[64%] lg:leading-normal w-5/6 text-3xl lg:text-6xl 2xl:w-[40%] font-bold  clip text-center">
        Discover Top <span className="text-blue-600">Doctors </span> and{" "}
        <span className="text-blue-600">Hospitals</span> Near You — Book{" "}
        <span className="text-blue-600"> Appointments</span> Today
      </h2>
      </div>
     
    </div>
  );
};

export default Hero;
