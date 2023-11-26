import React from "react";
import Titre from "@/app/components/small/Titre";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { titrePrincipal,bgPrimary,bgSecondary, colorSecondary, borderSecondary } from "../style/global";
import { inter, lora, michroma,pignon } from '@/app/style/fonts'
import Link from "next/link"


const SectionActu = () => {
  const data = [
    {
      img: "https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg",
      titre: "Installation du DG",
      dt: "01/08/2023",
      contenu:
        "Provident cupiditate voluptatem et in.  In deleniti eaque aut repudiandae",
    },
    {
      img: "https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg",
      titre: "Inauguration Aeroport de Kindu",
      dt: "01/08/2023",
      contenu:
        "Provident cupiditate voluptatem et in.  In deleniti eaque aut repudiandae",
    },
    {
      img: "https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg",
      titre: "Nouveau partenariat RVA-FPI",
      dt: "01/08/2023",
      contenu:
        "Provident cupiditate voluptatem et in.  In deleniti eaque aut repudiandae",
    },
    {
      img: "https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg",
      titre: "Visite comité OACI",
      dt: "01/08/2023",
      contenu:
        "Provident cupiditate voluptatem et in.  In deleniti eaque aut repudiandae",
    },
  ];
  return (
    <div>
      <p className={`${titrePrincipal} text-start flex flex-row gap-1 md:gap-4 lg:gap-4`} style={michroma.style}>
        <svg width="54px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fb6a09"><path d="M12 19c0-4.2-2.8-7-7-7M19 19c0-8.4-5.6-14-14-14M5 19.01l.01-.011" stroke={`${bgSecondary}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        <span>Actualités</span>
      </p>
      <div className="flex flex-col md:flex-row lg-flex-row gap-4 border-0 border-gray-400 pb-5 mb-3">
        {data.map((d, i) => {
          return (
            <div className="flex flex-col rounded overflow-hidden bg-gray-0 w-full  justify-center items-start flex-wrap">
              <Image
                src="https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg"
                className="w-full rounded-tr-md rounded-tl-md"
              />

              <div className="hero-content text-start text-neutral-content px-3 py-2 bg-gradient-to-b from-slate-200 to-white  ">
                <div className="max-w-md">
                  <h1 className="mb-2 text-[15px] font-bold mt-4">{d.titre}</h1>
                  <div className="text-red-600 text-[13px] mb-4">Publié le : {d.dt}</div>
                  <p className="mb-5">
                    Provident cupiditate voluptatem et in. In deleniti eaque aut
                    repudiandae
                  </p>
                  <p className="text-center">
                  <Link  href="/actualites/1" className={`rounded-full px-3 py-1 border ${borderSecondary} ${colorSecondary} hover:bg-blue-800 hover:text-white hover:border-white text-[12px]`} style={{backgroundColor:`${colorSecondary}`}}>
                    Lire Article
                  </Link>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="justify-center text-center flex flex-row w-full">
        <>&nbsp;</>
        <div>
          <Link href="/actualites" style={{backgroundColor:bgSecondary}} className="text-white py-3 px-7 rounded-full flex flex-row hover:cursor-pointer"> 
            <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fb6a09"><path d="M3 5h8M3 12h13M3 19h18" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>  
            Lire tous les articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionActu;
