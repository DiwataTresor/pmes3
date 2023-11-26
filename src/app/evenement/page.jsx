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

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
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


export default function Component() {
  const evnts=[
    {
      dt:"05/12/2023",
      titre:"Rencontre des entrepreneurs kinois",
      lieu:"Kinshasa",
      img:"https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:"Donec id justo. Morbi vestibulum volutpat enim.Morbi nec metus. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.Phasellus viverra nulla ut metus varius laoreet. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc."
    },
    {
      dt:"24/11/2023",
      titre:"Business Exposition ",
      lieu:"Goma",
      img:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3",
      description:"Donec id justo. Morbi vestibulum volutpat enim.Morbi nec metus. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.Phasellus viverra nulla ut metus varius laoreet. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc."
    },
    {
      dt:"10/11/2023",
      titre:"Makutano Junior",
      lieu:"Kisangani",
      img:"https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:"Donec id justo. Morbi vestibulum volutpat enim.Morbi nec metus. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.Phasellus viverra nulla ut metus varius laoreet. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc."

    },
    {
      dt:"10/10/2023",
      titre:"Rencontre des entrepreneurs kinois",
      lieu:"Lubumbashi",
      img:"https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:"Donec id justo. Morbi vestibulum volutpat enim.Morbi nec metus. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.Phasellus viverra nulla ut metus varius laoreet. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc."

    }
  ];
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
                        " flex flex-col items-center justify-center text-white pt-[160px]"
                    }
                    >
                        <h1 className={`text-[30px] `}>Découvrez nos événements Business</h1>
                        <h1 className="text-[14px] border border-white rounded-full px-3 py-1 mt-6">{"Accueil >> événements"}</h1>
                    
                    </div>
                </ParallaxBannerLayer>
            </ParallaxBanner>
        </ParallaxProvider>

      <div className={myContainer + " py-[30px]"}>
          <p className="items-center justify-between py-3 flex pr-6">
              <div className="flex gap-6 w-full">
                {/* <span>Trouver par ville : </span> */}
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
          </p>
          <div className="grid grid-cols-2 gap-3">
             {
              evnts.map((e,i)=>{
                return(
                  <div key={i} className="">
                    <Card dt={e.dt} img={e.img} titre={e.titre} lieu={e.lieu} description={e.description} />
                  </div>
                )
              })
             }
          </div>
      </div>
    </div>
  );
}
