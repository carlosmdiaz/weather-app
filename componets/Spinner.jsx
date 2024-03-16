import React from "react";
import spinner from "../public/assets/spinner.gif";
import Image from "next/image";

function Spinner() {
  return (
    <>
      <Image
        className="w-[200px] m-auto block"
        src={spinner}
        alt="loading..."
      />
    </>
  );
}

export default Spinner;
