"use client";
import {useState,useEffect} from "react"
import { Parallax } from "react-scroll-parallax";
import {
  ParallaxProvider,
  ParallaxBanner,
  ParallaxBannerLayer,
} from "react-scroll-parallax";
import Image from "next/image"
import { myContainer,titrePrincipal } from "@/app/style/global";
import fond2 from "@/assets/fond2.jpg"
import {colorPrimary,borderSecondary,colorSecondary} from "@/app/style/global"
import Marquee from "react-fast-marquee"
import logo from "@/assets/logo.png"
import Typewriter from 'typewriter-effect';
// import ScrollAnimation from 'react-animate-on-scroll';
import {Divider} from "antd"
import {Tabs, Tab} from "@nextui-org/react"; 
import Layout from "@/app/components/layouts/LayoutClient";
const partenaires=[
    {
        "nom":"AtonProxy"
    },
    {
        "nom":"Copemeko"

    },
    {
        "nom":"Anadec"

    },
    {
        "nom":"Crafod"

    },
    {
        "nom":"Frenk Consulting"
    },
    {
        "nom":"Crdc"
    }
];
const radiusList = [
  "full",
  "lg",
  "md",
  "sm",
  "none",
];


export default function Component() {
  return (
    <Layout
      header={<ParallaxProvider>
        <ParallaxBanner style={{ aspectRatio: "4 / 1" }}>
          <ParallaxBannerLayer
            speed={-20}
            image="https://images.unsplash.com/photo-1695031060519-270c2128a5c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            // image="https://images.unsplash.com/photo-1695031060519-270c2128a5c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            
          />
          <ParallaxBannerLayer speed={-4}>
            <div
              className={
                myContainer +
                " flex flex-col items-center justify-center text-white pt-[140px]"
              }
            >
                <h1 className="text-[30px]">A Propos</h1>
                <h1 className="text-[14px] border border-white rounded-full px-3 py-1 mt-6">{"Accueil >> A Propos"}</h1>
                <p className={`font-bold text-xl text-center mb-8 text-white mt-[32px] mx-auto`}>
                {/* " Nous vous aidons à développer votre entreprise partant de nos meilleurs services et en économisez du temps et de l'argent partout où vous pouvez vous retrouver." */}
                <Typewriter
                options={{
                    strings: ['" Nous vous aidons à développer votre entreprise partant de nos meilleurs services et en économisez du temps et de l\'argent partout où vous pouvez vous retrouver."'],
                    autoStart: true,
                    loop: true,
                }}
                />
                </p>
            </div>
          </ParallaxBannerLayer>
        </ParallaxBanner>
      </ParallaxProvider>}
    >
      <div className={myContainer + " py-[30px] bg-white"}>
        
        <div className="flex flex-row gap-9 justify-between">
            <div className="w-full text-justify items-center flex flex-col gap-5">
                <div animateIn="fadeIn">
                    <div className={`flex flex-col gap-2 text-gray-600 items-center justify-center`}>
                    <Divider><h3 className={"text-lg font-bold"}>Qui sommes-nous ?</h3></Divider>
                        <p className="items-center">
                        Index RDC est une entreprise des annuaires des pmes de droit congolais ;
                        enregistrée au tribunal de commerce de la République Démocratique du
                        Congo. Nous vous offrons des solutions pour booster vos grandes et
                        petites entreprises dans l'échelle international. </p>
                        <p>Un personnel efficace,
                        avec des compétences et expérience requise pour répondre aux attentes de
                        nos clients, entreprises et individus à travers la fourniture de nos
                        services.</p> 
                        <p>Nos annonces font leur preuve sur le marché actuel bien en
                        raison du fait qu'elles apportent des solutions durables aux personnels  
                        des entreprises clientes en général ainsi qu'aux hommes et femmes
                        d'affaires en particulier en rendant leur rendement efficace.</p>
                        
                        <p>Faite vous
                        plaisir et soyer rassuré que vos attentent sur votre entreprise peuvent
                        être réalisé grâce à toutes les opportunités offertes près de votre
                        localité. </p>
                    </div>
                </div>
            </div>
            <div className="pt-[40px] flex flex-row justify-center items-center">
              {/* <div className="bg-white py-[30px] rounded-md shadow-md h-full px-30"> */}
              <Image src={logo} width={600} alt="Logo"  />
              {/* </div> */}
                {/* <Image src={fond2} width={600} height={300} className="rounded-md " /> */}
                {/* <img src={`${fond2}`} width={400} height={300} /> */}
            </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-between pt-10">
          <div className="items-center justify-center content-center">
            {/* <Divider /> */}
            <Tabs key={1} radius={"full"} color="danger" aria-label="Tabs radius">
              <Tab key="photos" title="Notre vision">
                Description de la vision à completer
              </Tab>
              <Tab key="music" title="Notre Mission">
              Description de la Mission à completer
              </Tab>
              <Tab key="videos" title="Nos réalisations">
              Description de la vision à completer
              </Tab>
            </Tabs>
          </div>
          <div>

          </div>

        </div>
        <div className="pt-3 w-[60%]">
          <Divider><h1 className={"font-bold text-lg"}>Nos partenaires</h1></Divider>
        </div>
        <div>
                <Marquee gradient={true} className="pt-8 overflow-hidden">
                  {
                      partenaires.map((p,i)=>{
                          return(
                              <h2 key={i} className={`border rounded-md px-3 py-3 mr-3 ${colorPrimary} bg-white my-4`}>
                                  {p.nom}
                              </h2>
                          )
                      })
                  }
                </Marquee>
        </div>
      </div>
    </Layout>
  );
}
