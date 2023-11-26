import React from 'react'
import { lora,pignon,michroma,inter } from '../style/fonts'
import { titrePrincipal } from '../style/global'
import nouvelleTour  from '@/assets/nouvelleTour.jpg';
import Image from "next/image"
import DoubleImage from '../components/DoubleImage';
import {bgSecondary,bgPrimary} from "@/app/style/global.jsx"
import fond from "@/assets/fond.png"

import avion  from '@/assets/avion.jpeg';
import HomeProgrammeVolDetail from '../components/HomeProgrammeVolDetail';

const SectionVols = () => {
  return (
    <div className="pb-4" style={{backgroundImage:`url('${fond})'`}}>
        <h2 className={`${titrePrincipal} text-center flex justify-center mb-10`} style={michroma.style}>
          <svg width="94px" height="34px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={bgSecondary}><path d="M10.5 4.5v4.667a.6.6 0 01-.282.51l-7.436 4.647a.6.6 0 00-.282.508v.9a.6.6 0 00.746.582l6.508-1.628a.6.6 0 01.746.582v2.96a.6.6 0 01-.205.451l-2.16 1.89c-.458.402-.097 1.151.502 1.042l3.256-.591a.6.6 0 01.214 0l3.256.591c.599.11.96-.64.502-1.041l-2.16-1.89a.6.6 0 01-.205-.452v-2.96a.6.6 0 01.745-.582l6.51 1.628a.6.6 0 00.745-.582v-.9a.6.6 0 00-.282-.508l-7.436-4.648a.6.6 0 01-.282-.509V4.5a1.5 1.5 0 00-3 0z" stroke={bgSecondary} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          Programme des vols
        </h2>
        <div className='flex flex-col md:flex-row lg:flex-row  gap-2 mt-8'>
          <HomeProgrammeVolDetail titre={"Kinshasa"} />
          <HomeProgrammeVolDetail titre={"Lubumbashi"} />
          <HomeProgrammeVolDetail titre={"Goma"} />
          <HomeProgrammeVolDetail titre={"Kisangani"} />
        </div>
    </div>
  );
};

export default SectionVols;
