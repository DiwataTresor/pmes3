import React from 'react'
import dg from "@/assets/dg.jpeg"
import Image from "next/image"
import { poiret,pignon,lora,michroma } from '../style/fonts'
import { bgPrimary,bgPrimaryColor,bgSecondaryColor } from '../style/global'



const SectionMotDg = () => {
  return (
    <div className="flex lg:flex-row gap-2 flex-col pl-30 h-auto mt-10">
        <div><Image src={dg} className="rounded-lg w-[600px] " /></div>
        <div className={`shadow-sm ml-[0px]  md:ml-[530px]  lg:ml-[10px]  border-0 border-gray-100 ${bgSecondaryColor} h-[390px] font-light rounded-lg w-full md:w-[600px] lg:w-[600px] p-4 text-[13px] md:text-[20px] lg:text-[20px] flex flex-col justify-between text-white`} style={michroma.style}>
            <p className="text-center">Mot du Directeur Général</p>
            <p style={poiret.style} className="text-lg text-center">SHUNGU MAHUNGU A, Directeur Général</p>
        </div>
    </div>
  )
}

export default SectionMotDg