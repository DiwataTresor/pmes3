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
import Card from "./Card"


export default function Component() {
  const dataAbonnement=[
    {
      type:"Gratuit",
      cout:"0.00",
      periode:"12 mois",
      detail:[
        "Description de l’entreprise (Nom, Logo, Description, adresse, Téléphone…)",
        "30 Jours d'expiration",
        "2 Secteurs d’activités",
        "1 Soumission d'annonces",
        "3 Photos",
        "0 Vidéos",
        "0 Liste en vedettes",
        "0 Actualités"
      ]
    },
    {
      type:"Advanced",
      cout:"0.00",
      periode:"12 mois",
      detail:[
        "Description de l’entreprise (Nom, Logo, Description, adresse, Téléphone…)",
        "60 Jours d'expiration",
        "12 Secteurs d’activités",
        "5 Soumission d'annonces",
        "6 Photos",
        "2 Vidéos",
        "4 Liste en vedettes",
        "3 Actualités"
      ]
    },
    {
      type:"Professionnel",
      cout:"0.00",
      periode:"12 mois",
      detail:[
        "Description de l’entreprise (Nom, Logo, Description, adresse, Téléphone…)",
        "120 Jours d'expiration",
        "21 Secteurs d’activités",
        "8 Soumission d'annonces",
        "9 Photos",
        "7 Vidéos",
        "4 Liste en vedettes",
        "6 Actualités"
      ]
    }
  ];
  return (
    <div>
        <ParallaxProvider>
            <ParallaxBanner style={{ aspectRatio: "7 / 1" }}>
                <ParallaxBannerLayer
                    speed={-20}
                    image="https://images.unsplash.com/photo-1503551723145-6c040742065b-v2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    
                />
                <ParallaxBannerLayer speed={-4}>
                    <div
                    className={
                        myContainer +
                        " flex flex-col items-center justify-center text-white pt-[40px]"
                    }
                    >
                        <h1 className={`text-[30px] `}>Nos plans d'abonnement</h1>
                        <h1 className="text-[14px] border border-white rounded-full px-3 py-1 mt-6">{"Accueil >> plans"}</h1>
                    
                    </div>
                </ParallaxBannerLayer>
            </ParallaxBanner>
        </ParallaxProvider>

      <div className={myContainer + " py-[30px]"}>
        <p className="mt-4 text-center h-content mb-4">
          <span className="bg-green-500 text-white px-4 py-4 animate-pulse rounded-full">
            Promo, c’est Gratuit jusque 31.12.2023
          </span>
          </p>
        <div className="flex flex-row gap-3">
              <div className="flex-1 text-center items-center justify-center text-xl px-[80px]">
                Pour tout type de budget, grande ou petite entreprise nous sommes là pour vous du début à la fin. Vous payez uniquement pour les ressources dont vous avez besoin.
              </div>
              {/* <div className="flex-1">
                <Image width={300} height={300} src="https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80"  />
              </div> */}
        </div>
          <div className="grid grid-cols-3 gap-2">
             {
                dataAbonnement.map((a,i)=>{
                  return(
                    <Card cout={a.cout} type={a.type} periode={a.periode} detail={a.detail} />
                  )
                })
             }
          </div>
      </div>
    </div>
  );
}
