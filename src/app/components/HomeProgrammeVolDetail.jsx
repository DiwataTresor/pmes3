import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {bgSecondary,bgPrimary,bgPrimaryColor} from "@/app/style/global.jsx"

export default function HomeProgrammeVolDetail({ titre }) {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="flex flex-col">
      <h1 className={`text-center font-bold mb-2 flex flex-grow gap-3 ${bgPrimaryColor} rounded-lg py-3 px-2 text-white`} style={{fontWeight:800}}>
        <svg
          width="24px"
          height="24px"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#fb6a09"
        >
          <path
            d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1116 0z"
            stroke="#fb6a09"
            stroke-width="1.5"
          ></path>
          <path
            d="M12 11a1 1 0 100-2 1 1 0 000 2z"
            fill="#fb6a09"
            stroke="#fb6a09"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        {titre}
      </h1>
      <div className="border border-gray-300 rounded-md w-full min-w-full bg-slate-100 flex-1">
        <Accordion defaultExpandedKeys={["1"]} variant="bordered">
          <AccordionItem key="1" aria-label="Accordion 1" title="ARRIVEE" className="border-b border-gray-500">
            {defaultContent}
          </AccordionItem>

          <AccordionItem key="3" aria-label="Accordion 3" title="DEPART" >
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
