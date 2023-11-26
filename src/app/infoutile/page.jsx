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
import { Input,Divider } from 'antd';
import Layout from "@/app/components/layouts/LayoutClient"
import {Tabs,Tab} from "@nextui-org/react"
import Section from "@/app/components/section/Section"
import Section2 from "@/app/components/section/Section2"


export default function Component() {
  return (
    <Layout header={
        <ParallaxProvider>
            <ParallaxBanner style={{ aspectRatio: "7 / 1" }}>
                <ParallaxBannerLayer
                    speed={-20}
                    image="https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    
                />
                <ParallaxBannerLayer speed={-4}>
                    <div
                    className={
                        myContainer +
                        " flex flex-col items-center justify-center text-white pt-[40px]"
                    }
                    >
                        <h1 className={`text-[30px] `}>Infos et documents utiles</h1>
                        <h1 className="text-[14px] border border-white rounded-full px-3 py-1 mt-6">{"Accueil >> plans"}</h1>
                    
                    </div>
                </ParallaxBannerLayer>
            </ParallaxBanner>
        </ParallaxProvider>
    }>

      <Section2 cl="mt-2" titre="Decouvez des informations utiles">
          <div className="flex flex-wrap gap-4 justify-between pt-0">
            <div className="items-center justify-center content-center">
              {/* <Divider /> */}
              <Tabs key={1} radius={"full"} color="danger" aria-label="Tabs radius" className="itens-center justify-center flex">
                <Tab key="photos" title="infos utiles">
                  
                </Tab>
                <Tab key="music" title="Documents">

                </Tab>
                
              </Tabs>
            </div>
            
          </div>
      </Section2>
    </Layout>
  );
}
