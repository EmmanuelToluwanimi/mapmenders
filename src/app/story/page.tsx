import { Assets } from "@/utils/constants";
import Link from "next/link";
import React from "react";

export default function StoryPage() {
  const textData = [
    [
      {
        title: "North West Zone",
        subs: [
          {
            title: "Severely Underserved",
            subsub: [
              "Kaduna, Jigawa, Kano: 1 to 2 facilities per 10,000 residents",
            ],
          },
          {
            title: "Underserved",
            subsub: [
              "Zamfara, Sokoto: 2.1 to 3 facilities per 10,000 residents",
            ],
          },
        ],
      },
      {
        title: "North East Zone",
        subs: [
          {
            title: "Underserved",
            subsub: ["Borno, Yobe: 2.1 to 3 facilities per 10,000 residents"],
          },
          {
            title: "Moderately Served",
            subsub: ["Gombe, Bauchi: 3.1 to 4 facilities per 10,000 residents"],
          },
        ],
      },
    ],
    [
      {
        title: "North Central Zone",
        subs: [
          {
            title: "Well-Served",
            subsub: [
              "Niger, Nasarawa: 5.1 to 7 facilities per 10,000 residents",
            ],
          },
          {
            title: "Adequately Served",
            subsub: [
              "Kogi, Plateau, FCT: 4.1 to 5 facilities per 10,000 residents",
            ],
          },
        ],
      },
      {
        title: "South West Zone",
        subs: [
          {
            title: "Underserved",
            subsub: [
              "Lagos, Ekiti, Ondo: 2.1 to 3 facilities per 10,000 residents",
            ],
          },
          {
            title: "Moderately Served",
            subsub: ["Oyo: 3.1 to 4 facilities per 10,000 residents"],
          },
        ],
      },
    ],
    [
      {
        title: "South East Zone",
        subs: [
          {
            title: "Moderately Served",
            subsub: ["Anambra, Abia: 3.1 to 4 facilities per 10,000 residents"],
          },
          {
            title: "Adequately Served",
            subsub: ["Imo and Ebonyi: 4.1 to 5.0 facilities per residents"],
          },
          {
            title: "Well-Served",
            subsub: ["Ebonyi: 5.1 to 7 facilities per 10,000 residents"],
          },
        ],
      },
      {
        title: "South South Zone",
        subs: [
          {
            title: "Severely Underserved",
            subsub: ["Rivers: 1 to 2 facilities per 10,000 residents"],
          },
          {
            title: "Underserved",
            subsub: [
              "Bayelsa, Akwa Ibom, Delta: 2.1 to 3 facilities per 10,000 residents",
            ],
          },
          {
            title: "Well-Served",
            subsub: ["Cross River: 5.1 to 7 facilities per 10,000 residents"],
          },
        ],
      },
    ],
  ];

  return (
    <main className="bg-gray-100">
      <nav
        className="flex justify-between items-center py-4 px-6 bg-white shadow-md sticky top-0 left-0"
        style={{ zIndex: 1000 }}
      >
        {/* Left Section: Icon and Title */}
        <div className="flex items-center gap-2">
          <Link href={"/"} className="px-3 py-2 rounded-lg bg-blue-100">
            <img src={Assets.leftchevron} alt="left chevron" />
          </Link>
          <h1 className="font-semibold text-blue-500 text-sm">Back to map</h1>
        </div>

        {/* Right Section: State Indicator */}
        <div className="flex items-center">
          <div className="rounded-full w-6 h-6 mr-2">
            <img src={Assets.naijaFlagIcon} alt="Nigeria flag" />
          </div>
          <span className="text-gray-700 capitalize">Nigeria</span>
        </div>
      </nav>

      <section className="p-8 grid grid-cols-2 gap-8">
        <section className="space-y-4">
          <div className="p-4 rounded bg-blue-500 text-white">
            This model provides a framework for evaluating healthcare
            accessibility in Nigeria. By using a standardized approach of 3
            facilities per 10,000 residents based on global health
            recommendations to ensure that populations have sufficient access to
            medical services, stakeholders can identify gaps in healthcare
            provision, assess current infrastructure, and formulate strategies
            to enhance healthcare access for the entire population.
          </div>
          <div className="flex gap-2 items-center p-4">
            <div className="text-blue-500">Facility per 10,000 Residents</div>
            <div>= </div>

            <div className="">
              <div className="flex flex-col gap-1 text-center">
                <div>Number of Healthcare facilities in a state</div>
                <hr />
                <div>Population</div>
              </div>
            </div>
            <div>x 10,000</div>
          </div>
          <div className="p-4">
            <div className="text-blue-500">
              Map for Healthcare Facility Distribution in Nigeria{" "}
            </div>
            <div>Facility per 10,000 residents</div>
            <div className="w-[90%]">
              <img
                src={Assets.heatmap}
                alt="Nigeria healthcare facilites heatmap"
                className="w-full object-fill"
              />
            </div>
          </div>
          <div className="bg-white rounded text-blue-500 p-4">
            <p>
              In retrospect, the analysis reveals significant healthcare
              disparities across Nigeria. States like Kaduna, Jigawa, Kano,
              Rivers, and Lagos are severely underserved, with fewer than 3
              facilities per 10,000 residents, despite their large populations.{" "}
            </p>
            <p>
              Meanwhile, North Central and parts of the South East are better
              served, though rural areas may still face access issues. Expanding
              healthcare infrastructure, especially in underserved regions, is
              crucial for improving healthcare access and outcomes across the
              country.
            </p>
          </div>
        </section>
        <section className="space-y-4">
          <div className="text-blue-500">
            Summary of some states and there healthcare facilities distribution
          </div>
          {textData.map((_, i) => {
            return (
              <div key={i} className="grid grid-cols-2 gap-4 ">
                {_.map((data, idx) => {
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded text-gray-700 py-3 px-2 shadow"
                    >
                      <div className="text-blue-500">{data.title}</div>
                      {data.subs.map((sub, idd) => {
                        return (
                          <div className="p-1 text-sm" key={idd}>
                            <div className="font-medium">
                              &#183; {sub.title}
                            </div>
                            <ol>
                              <li className="pl-2">
                                {sub.subsub.map((text, ind) => {
                                  return (
                                    <div key={ind}>&#183; {text}</div>
                                  );
                                })}
                              </li>
                            </ol>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>
      </section>
    </main>
  );
}
