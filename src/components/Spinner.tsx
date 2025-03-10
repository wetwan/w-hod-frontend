import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface SpinnerProps {
  loading: boolean; 
}

const override = {
  display: "block", 
  margin: "100px auto", 
};

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <ClipLoader
      color="#2563eb"
      loading={loading}
      cssOverride={override} 
      size={150}
    />
  );
};

export default Spinner;
