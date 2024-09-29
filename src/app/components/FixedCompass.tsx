"use client";
import { Assets, position } from "@/utils/constants";
import Image from "next/image";
import { useMap } from "react-leaflet";

const FixedCompass = () => {
  const map = useMap();
  return (
    <div
      className="fixed top-20 right-5 flex flex-col gap-2 items-center"
      style={{ zIndex: "1000" }}
    >
      {/* North indicator */}
      <div className="text-black text-4xl font-bold">N</div>
      {/* Compass icon */}
      <div
        onClick={() => map.flyTo(position, 10)}
        className="p-4 bg-white rounded-lg shadow-lg"
        role="button"
      >
        <Image src={Assets.arrowUp} alt="Compass Icon" width={30} height={30} />
      </div>
    </div>
  );
};

export default FixedCompass;
