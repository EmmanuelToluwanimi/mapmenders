"use client"
import { Assets } from "@/utils/constants";
import Image from "next/image";

const FixedCompass = () => {
  return (
    <div className="fixed top-20 right-5 flex flex-col gap-2 items-center" style={{zIndex: "1000"}}>
      {/* North indicator */}
      <div className="text-black text-4xl font-bold">N</div>
      {/* Compass icon */}
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <Image src={Assets.arrowUp} alt="Compass Icon" width={30} height={30} />
      </div>
    </div>
  );
};

export default FixedCompass;
