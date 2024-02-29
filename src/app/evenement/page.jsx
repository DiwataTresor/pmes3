"use client";
import { Parallax } from "react-scroll-parallax";
import {
  ParallaxProvider,
  ParallaxBanner,
  ParallaxBannerLayer,
} from "react-scroll-parallax";
import Image from "next/image"
import { bgPrimaryColor, myContainer,titrePrincipal } from "@/app/style/global";
import { telephone,email,adresse } from "@/app/utils/helper";
import fond2 from "@/assets/fond2.jpg"
import {colorPrimary,borderSecondary,colorSecondary} from "@/app/style/global"
import Marquee from "react-fast-marquee"
import logo from "@/assets/logo.png"
import Typewriter from 'typewriter-effect';
// import ScrollAnimation from 'react-animate-on-scroll';
import { Input } from 'antd';
import SortIcon from '@mui/icons-material/Sort';

import Card from "./Card"
import {Card as CardNext, Skeleton} from "@nextui-org/react";

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useEffect, useState } from "react";
import { BACKEND_URL, getData } from "../fcts/helper";
import moment from "moment";
const items = [
  {
    label: 'Kinshasa',
    key: '1',
  },
  {
    label: 'Lubumbashi',
    key: '2',
  },
  {
    label: 'Goma',
    key: '3',
  },
];

export function SkeletonComponent() {
  return (
    <CardNext className="w-[300px] space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">  
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </CardNext>
  );
}


export default function Component() {
  const [evnts,setEvnts]=useState([]);
  const [dataLoaded,setDataLoaded]=useState(false);
  useEffect(()=>{
    let d=[];
    getData("adminEvenement").then((data)=>{
      data.data.forEach(element => {
        d.push({
          id: element.id,
          dt:moment(element.dateDebut).format("DD/MM/YYYY"),
          dtFin:moment(element.dateFin).format("DD/MM/YYYY"),
          dtStartUnformated:element.dateDebut,
          dtEndUnformated:element.dateFin,
          titre:element.nom,
          lieu:element.lieu,
          img:BACKEND_URL+element.img,
          description:element.description,
          organisateur:element.organisateur
        })
      });
      setEvnts(d);
      // console.log(data);
    }).finally(()=>{
      setDataLoaded(true);
    });
  },[])
  return (
    <div>
        <ParallaxProvider>
            <ParallaxBanner style={{ aspectRatio: "4 / 1" }}>
                <ParallaxBannerLayer
                    speed={-20}
                    image="https://images.pexels.com/photos/1181360/pexels-photo-1181360.jpeg"
                    className="opacity-700"
                />
                <ParallaxBannerLayer speed={-4}>
                    <div
                    className={
                        myContainer +
                        " flex flex-col items-center justify-center text-white pt-[80px] lg:pt-[160px]"
                    }
                    >
                        <h1 className={`text-[20px] lg:text-[30px] `}>Top événements</h1>
                        <h1 className="text-[14px] border border-white rounded-full px-3 py-1 mt-6">{"Accueil >> événements"}</h1>
                    
                    </div>
                </ParallaxBannerLayer>
            </ParallaxBanner>
        </ParallaxProvider>

      <div className={myContainer + " py-[30px]"}>
          {/* <p className="items-center justify-between py-3 flex pr-6">
              <div className="flex gap-6 w-full">
              
                <Dropdown.Button
                  icon={<DownOutlined />}
                  menu={{
                    items,
                  }}
                  onClick={() => {}}
                >
                  Trouver par ville 
                </Dropdown.Button>
              </div>
              <div className="flex w-[140px]">
                <SortIcon size="small" />
                Filtrer par : 
              </div>
          </p> */}
          <div className="flex flex-row flex-wrap gap-3 h-fit justify-center">
             {
              dataLoaded?
                evnts?.map((e,i)=>{
                  return(
                    <div key={i} className="">
                      <Card 
                        id={e.id}
                        dtStartUnformated={e.dtStartUnformated} 
                        dtEndUnformated={e.dtEndUnformated} 
                        dt={e.dt} dtFin={e.dtFin} 
                        img={e.img} 
                        titre={e.titre} 
                        lieu={e.lieu} 
                        description={e.description} />
                    </div>
                  )
                }):
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <SkeletonComponent />
                  <SkeletonComponent />
                  <SkeletonComponent />
                </div>
             }
          </div>
      </div>
    </div>
  );
}
