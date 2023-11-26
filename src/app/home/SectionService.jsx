import React from "react";
import Titre from "@/app/components/small/Titre";
import { Card, CardHeader, CardBody, CardFooter, Button} from "@nextui-org/react";
import avion from "@/assets/avion.jpeg";
import parking from "@/assets/parking.jpeg";
import service from "@/assets/service.jpeg";
import securite from "@/assets/securite.jpeg";
import Image from "next/image"

const SectionService = () => {
  return (
    <div className="mt-5 text-white">
        {/* <Titre text="Nos principaux services" /> */}
        <h1 className="text-start text-blue-400 text-3xl mb-[20px] mt-8 bg-white">Nos principaux services</h1>
        <div className="px-5 bg-blue-500 h-content py-4">
        {/* <div className="flex flex-row gap-5 mt-8 ">
            <div className="w-1/2 flex flex-row shadow-lg bg-white">
                <div className="flex-1 p-7">
                  <div className="text-blue-400 text-lg mb-5">
                    Vols et voyage
                  </div>
                  <div className="border-l-4 border-blue-400 pl-8">
                    <h2>Tous vos vols </h2>
                    <h2>Provenance</h2>
                    <h2>Destinantion</h2>
                  </div>
                </div>
                <Image className="flex-1 h-full" src={avion} alt="text" />
            </div>
            <div className="w-1/2 flex flex-row shadow-md">
                <div className="flex-1 p-3 bg-white">
                  <div className="text-blue-400 text-lg mb-5">
                      Parking
                    </div>
                    <div className="border-l-4 border-white-400 pl-8">
                      <h2>Parking</h2>
                      <h2>Location vehicule</h2>
                      <h2>contact Taxi</h2>
                    </div>
                </div>
                <Image className="flex-1 h-full" src={parking} alt="text" />
            </div>
        </div>
        <div className="flex flex-row gap-5 mt-[55px]">
            <div className="w-1/2 flex flex-row shadow-lg ">
                <div className="flex-1 p-7 bg-white">
                  <div className="text-blue-400 text-lg mb-5">
                    Guide pratique
                  </div>
                  <div className="border-l-4 border-blue-400 pl-8">
                    <h2>Formalités  de voyage</h2>
                    <h2>Bagage</h2>
                    <h2>Enregistrement</h2>
                    <h2>Controle</h2>
                    <h2>Assistance specifique</h2>
                  </div>
                </div>
                <Image className="flex-1 h-full" src={service} alt="text" />
            </div>
            <div className="w-1/2 flex flex-row shadow-md">
                <div className="flex-1 p-3">
                <div className="text-blue-400 text-lg mb-5">
                    Securité
                  </div>
                </div>
                <Image className="flex-1 h-full" src={securite} alt="text" />
            </div>
        </div> */}
        </div>
    </div>
  );
};

export default SectionService;
