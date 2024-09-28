"use client";
import { Assets, selectedState } from "@/utils/constants";

export default function Navbar({
  tab: activeTab,
  setActiveTab,
}: {
  tab: string;
  setActiveTab: (params: string) => void;
}) {
  // const [activeTab, setActiveTab] = useState("All");

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      {/* Left Section: Icon and Title */}
      <div className="flex items-center">
        <button className="p-2 rounded-md bg-blue-50 text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div className="ml-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 20l-5.447-2.724A2 2 0 013 15.382V7.618a2 2 0 011.553-1.894L9 3m0 17l6-3m-6 3V3m6 17l5.447-2.724A2 2 0 0021 15.382V7.618a2 2 0 00-1.553-1.894L15 3m0 17V3m0 17l-6-3"
            />
          </svg>
          <h1 className="ml-2 text-2xl font-semibold text-gray-700">
            Mapmenders
          </h1>
        </div>
      </div>

      {/* Center Section: Tabs */}
      <div className="flex items-center">
        <span className="text-gray-500 mr-2">
          Healthcare Facilities map for:
        </span>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
          {["all", "public", "private"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-full capitalize text-sm ${
                activeTab === tab ? "bg-blue-600 text-white" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Right Section: State Indicator */}
      <div className="flex items-center">
        <div className="rounded-full w-6 h-6 mr-2">
          <img src={Assets.naijaFlagIcon} alt="Nigeria flag" />
        </div>
        <span className="text-gray-700 capitalize">{selectedState} State</span>
      </div>
    </nav>
  );
}
