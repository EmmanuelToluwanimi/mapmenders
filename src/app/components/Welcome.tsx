import { Assets } from "@/utils/constants";
import React from "react";
// import { X, Menu, ChevronRight, ArrowUp } from "lucide-react";

const MapmendersOverlay = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      style={{ zIndex: 1001 }}
    >
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <div>X</div>
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">
          Welcome to Mapmenders
        </h2>

        {/* Title */}
        <h2 className="text-sm font-semibold text-blue-500 mb-6 text-center">
          A Quick Tutorial
        </h2>

        <div className="text-sm">
          {/* Mapmenders box */}
          <div className=" flex items-center mb-6">
            <img src={Assets.welcome} alt="welcome banner" />
          </div>

          {/* Instructions */}
          <p className="text-gray-600 mb-4">
            Click on &ldquo;Our Story&ldquo; to see more information about
            healthcare infrastructural across Nigeria and places of need
          </p>

          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <p className="text-gray-600">
                Click on state name to show a quick information about each
                states
              </p>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <p className="text-gray-600">
                This map uses cluster representation for each state. Click on
                &ldquo;view health care facilities&ldquo; to show various
                healthcare infrastructure points across the selected state.
              </p>
            </li>
          </ul>

          {/* Back to default view button */}
          <div className="mt-6 flex items-center">
            <div className="mr-1">
              <img src={Assets.resetIcon} alt="" className="w-[80%]" />
            </div>
            <p className="text-gray-600">
              Click on this arrow to go back to default view.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapmendersOverlay;
