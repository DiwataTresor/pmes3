"use client";
import { useState, useEffect } from "react"
import { Parallax } from "react-scroll-parallax";
import {
  ParallaxProvider,
  ParallaxBanner,
  ParallaxBannerLayer,
} from "react-scroll-parallax";

import { myContainer, titrePrincipal } from "@/app/style/global";
import fond2 from "@/assets/fond2.jpg"
import { colorPrimary, borderSecondary, colorSecondary } from "@/app/style/global"
import Marquee from "react-fast-marquee"
import logo from "@/assets/logo.png"
import Typewriter from 'typewriter-effect';
// import ScrollAnimation from 'react-animate-on-scroll';
import { Divider } from "antd"
import { Tabs, Tab,Image } from "@nextui-org/react";
import Layout from "@/app/components/layouts/LayoutClient";
import { BACKEND_URL, getData } from "../fcts/helper";
import Link from "next/link";
import { LinkIcon } from "lucide-react";




// image="https://images.unsplash.com/photo-1695031060519-270c2128a5c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
export default function page() {
  const [partenaires, setPartenanires] = useState([
    // {
    //   "nom": "AtonProxy"
    // },
    // {
    //   "nom": "Copemeko"

    // },
    // {
    //   "nom": "Anadec"

    // },
    // {
    //   "nom": "Crafod"

    // },
    // {
    //   "nom": "Frenk Consulting"
    // },
    // {
    //   "nom": "Crdc"
    // }
  ]);

  useEffect(() => {
    getData("partenaires").then((data) => {
      console.clear();
      console.log(data);
      setPartenanires(data?.data)
    });
  }, [])
  return (
    <Layout
      header={
        <div className='h-[250px] font-bold text-2xl pt-[80px] text-center w-full flex-1 bg-cover' style={{ backgroundSize: "cover", backgroundPosition: "bottom", backgroundImage: `url(https://images.unsplash.com/photo-1695031060519-270c2128a5c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}>
          <span className='text-3xl text-indigo-500'>A Propos de nous</span>
        </div>
      }
    >
      <div className={"px-[20px] lg:px-[80px] py-[30px] bg-white"}>

        <div className="flex flex-col lg:flex-row gap-9 justify-between">
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
          <div className="pt-[40px] flex flex-row justify-center items-center order-1">
            {/* <div className="bg-white py-[30px] rounded-md shadow-md h-full px-30"> */}
            <img src={"/logo_sans_fond.png"} width={600} alt="Logo" />
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
              Un outil de mise en relation, des conseils de gestion, de présentation des opportunités d’affaires <br /><br />

              Avec une interface intuitive et conviviale. Cela permettra aux utilisateurs de trouver rapidement les informations dont ils ont besoin.
              </Tab>
              <Tab key="music" title="Notre Mission">
                <div className="text-justify mt-2">
              Index RDC en tant qu'annuaire des PME (Petites et Moyennes Entreprises), sa mission est de fournir une plateforme où les entreprises de ce segment de marché peuvent se faire connaître, échanger des informations et des ressources, et créer des opportunités de collaboration.  <br /><br />
                1.	Mise en relation des entreprises : Permettre aux PME de se connecter entre elles pour discuter de partenariats commerciaux, d'échanges de services ou de conseils professionnels. <br /><br />

                2.	Promotion des entreprises : En offrant un espace où les PME peuvent présenter leurs produits et services, nous les aidons à se faire connaître auprès d'un plus grand public et à trouver de nouveaux clients. <br /><br />

                3.	Fourniture d'informations utiles : Nous fournissons des informations utiles sur la gestion d'entreprise, les dernières tendances du marché, les opportunités de financement, les changements de réglementation, etc. <br /><br />

                4.	Création d'une communauté : En facilitant les interactions entre les PME, vous pouvez contribuer à créer une communauté où les membres peuvent partager leurs expériences, s'entraider et se soutenir mutuellement. <br /><br />

                5.	Soutien aux PME dans leurs démarches : De commun accord avec la COPEMECO, nous pouvons également fournir des ressources pour aider les PME à naviguer dans les aspects administratifs, fiscaux et juridiques de leur activité. copemeco@indexrdc.com <br /><br /><br />

                En résumé, notre mission en tant qu'annuaire des PME est de créer une plateforme qui facilite la croissance, le développement et la réussite des petites et moyennes entreprises en mettant à leur disposition des ressources, des informations et des opportunités pour se connecter, apprendre et collaborer. <br />
                </div>
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
          <Marquee gradient={false} className="pt-8 overflow-hidden">
            {
              partenaires.map((p, i) => {
                return (
                  // <h2 key={i} className={`${p?.lien !== null && "hover:bg-slate-900 hover:text-white"} shadow-sm w-[350px] h-[200px] py-5 px-10 border rounded-md items-center justify-center flex flex-col mr-3 ${colorPrimary} bg-white my-4`}>

                  //   {
                  //     p?.lien !== null ?
                  //       <div className="flex flex-col justify-center items-center">
                  //         {p?.logo !== null && <Image src={BACKEND_URL + p?.logo} className="w-[100px] " />}
                  //         <Link href={p?.lien} className="w-full text-center">{p?.nom}</Link>
                  //       </div> :
                  //       <div className="flex flex-col items-center justify-center">
                  //         {p?.logo !== null && <Image src={BACKEND_URL + p?.logo} className="" />}
                  //         {p?.nom}
                  //       </div>
                  //   }
                  // </h2>
                  <div className='shadow-md rounded-md w-[300px] h-[350px] flex flex-col items-center justify-center gap-3 mr-2 mb-3'>
                  {p?.logo!==null && <div className='w-full h-[200px]'><img className='w-full h-full rounded-sm' src={BACKEND_URL+p?.logo} /></div>}
                  <div className='font-bold text-center'>{p.nom}</div>
                  {p.lien!==null && <div><Link target='_blank' href={p?.lien} className='flex gap-3 items-center'><LinkIcon size={12} /> {p.lien}</Link></div>}
                  <div className='flex py-2 gap-4'>
                      
                  </div>
              </div>
                )
              })
            }
          </Marquee>
        </div>
      </div>
    </Layout>
  );
}
