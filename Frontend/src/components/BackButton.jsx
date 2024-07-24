import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ link }) => {
  console.log(link);
  return (
    <>
      <Link
        className="absolute right-3 top-3 text-white font-bold"
        to={`/${link}`}
      >
        Back
      </Link>
    </>
  );
};

export default BackButton;
