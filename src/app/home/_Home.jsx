"use client";
import { useState, useEffect } from "react"
import { Inter, Poppins, Poiret_One, Nunito } from 'next/font/google'
import { Parallax } from "react-scroll-parallax";
import {
  ParallaxProvider,
  ParallaxBanner,
  ParallaxBannerLayer,
} from "react-scroll-parallax";
import Image from "next/image";
import Link from "next/link";
import { myContainer, titrePrincipal } from "@/app/style/global";
import fond2 from "@/assets/fond2.jpg";
import book2 from "@/assets/book2.png";
import success from "@/assets/success.png";
import who from "@/assets/who.png";
import {
  colorPrimary,
  borderSecondary,
  colorSecondary,
} from "@/app/style/global";
import Marquee from "react-fast-marquee";
import logo from "@/assets/logo.png";
import zoom from "@/assets/zoom.jpg";
import kinshasa from "@/assets/kinshasa.jpeg";
import kinshasa4 from "@/assets/kinshasa4.jpeg";
import kinshasa3 from "@/assets/kinshasa3.jpeg";
import Typewriter from "typewriter-effect";
// import ScrollAnimation from "react-animate-on-scroll";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import connexion1 from "@/assets/connexion1.jpg";
import connexion2 from "@/assets/connexion2.jpg";
import connexion3 from "@/assets/connexion3.jpg";
import connexion4 from "@/assets/connexion4.jpg";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { Button, Divider, Badge, Card as CardN, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { titre } from "./../../app/style/global"
import { Modal } from "antd"
import Layout from "@/app/components/layouts/LayoutClient"
import LayoutDashboard from "@/app/components/layouts/LayoutDashboard"
import { getSecteurs } from "@/app/utils/data"
import Section from "@/app/components/section/Section"
import Section2 from "@/app/components/section/Section2"
import { BACKEND_URL, getData } from "../fcts/helper";
import { nl2br } from "react-js-nl2br";
import { User } from "../components/icons/User";
import { Eye, Rss, User2Icon, Telescope } from "lucide-react";
import SectionActu from "./components/SectionActu";
import Slide from "../components/slide/modele_slide_1/Slide";
import { Fade,Slide as SlideAwesome } from "react-awesome-reveal";


const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: "300" })
const poiret = Poiret_One({ subsets: ['latin'], weight: "400" })
const nunito = Nunito({ subsets: ['latin'], weight: "400" })

const partenaires = [
  {
    nom: "AtonProxy",
  },
  {
    nom: "Copemeko",
  },
  {
    nom: "Anadec",
  },
  {
    nom: "Crafod",
  },
  {
    nom: "Frenk Consulting",
  },
  {
    nom: "Crdc",
  },
];


export const Card = ({ titre, contenu, img }) => {
  return (
    <div className="card w-full rounded-md overflow-hidden min-h-[400px] shadow-sm bg-white">
      <div className="text-center text-white py-4 px-2 bg-indigo-500 text-xl">
        {titre}
      </div>
      <div className="px-3 py-2">
        <Image src={img} className="rounded-full w-[60%] mx-auto bg-black" />
        <p className="text-justify mt-3 ">
          {contenu}
        </p>
      </div>
    </div>
  )
}
export const SlideItem = ({ text, img }) => {
  return (
    <div className="relative min-h-[300px] h-[300px] overflow-hidden bg-gray-200  shadow-sm flex flex-col items-center justify-center " style={{ backgroundImage: `url(${img})` }}>
      <Image src={img} classname="w-full h-full" />
      <p className="absolute mt-[0%] text-center bg-white bg-opacity-75 rounded-full px-5 py-3 text-2xl">{text}</p>
    </div>
  )
}
export const SecteurItem = ({ item, v, slug }) => {
  return (
    <Link href={`/secteurbtb/${slug}`} className="flex gap-2 text-white">
      {/* <Badge content={v} color="primary"> */}
        {/* <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"> */}
        <div className="border-l-3 border-blue-900 bg-slate-200 rounded-none text-blue-800 px-6 hover:underline hover:border transition  shadow-sm py-3">
          <div className="text-sm hover:underline">{item}</div>
          {/* <div className="text-sm">{v}</div> */}
        </div>
      {/* </Badge> */}
    </Link>
  )
}
export const ProduitItem = ({ id, adresse, lien, text, img, description, proprietaire }) => {
  return (
    <CardN>
      <CardHeader>
        <h2 className="font-bold text-center items-center justify-center flex">
          {text}
        </h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <img src={BACKEND_URL + img} className="w-[100%] h-[220px] rounded-md" />
        <p className="mt-4 font-bold text-medium flex items-center justify-center gap-3"><User2Icon size={14} />{proprietaire}</p>
        <p className="mt-[0%] rounded-full px-5 py-3 text-[12px] text-justify line-clamp-3">{description}</p>
        <p className="text-center flex justify-center">
          <Link href={`/produit/${id}`} className="border text-[12px] px-3 py-2 rounded-full hover:bg-blue-300 hover:text-white hover:border-0 flex gap-3 items-center">
            <Eye size={14} />
            Plus de detail
          </Link>
        </p>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-center flex-col">
        <p className="text-md rounded-full px-5 py-3 font-bold flex gap-2 justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="none" strokeWidth="1.4" viewBox="0 0 24 24" color="#0d0c0d"><path stroke="#0d0c0d" strokeWidth="1.4" d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1 1 16 0Z"></path><path fill="#0d0c0d" stroke="#0d0c0d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" d="M12 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path></svg>
          {adresse}
        </p>
        {
          lien !== null &&
          <p className="text-sm flex"><a href={lien} className="ml-2 underline text-sm text-blue-400">{lien}</a></p>
        }
      </CardFooter>
    </CardN>
  )
}

const metadata = {
  title: "Accueil"
}
const Component = () => {
  const [produits, setProduits] = useState([]);
  const [secteurs, setSecteurs] = useState([]);
  const [slides,setSlides]=useState([]); 
  const getProduits = () => {
    getData("produitsValable").then(r => {
      setProduits(r.data);
    })
  }
  useEffect(() => {
    getData("slides").then((r)=>{
      setSlides(r.data)
    });
    getSecteurs().then(r => setSecteurs(r.data));
    getProduits();
  }, []);
  return (
    <Layout hideHeader={true}
    //   header={
    //     <div className="h-[250px] lg:h-[500px] overflow-hidden relative bg-black" >
    //       <Image src={kinshasa4} style={{ opacity: 0.2 }} className="w-screen bg-gradient-to-tr z-3" alt="Kinshasa-centre-ville" loading="lazy" />

    //       <p
    //         className={`font-bold text-xl text-center text-white lg:top-[302px] top-[42px] lg:ml-[40%] ml-[10%] absolute`}
    //       >
    //         <Typewriter
    //           options={{
    //             strings: [
    //               '"Explorer et trouver en un click"',
    //               "Le sourire aux lèvres près de votre emplacement",
    //               " les meilleurs hôtels, magasins, salles de sport, etc. à votre portée",
    //             ],
    //             autoStart: true,
    //             loop: true,
    //           }}
    //           className="text-black"
    //         />
    //       </p>
    //     </div>
    // }
    >
      <div className="mt-3">


        <div className="mt-4 z-2">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {
              slides?.map((slide, index) =>(
                <SwiperSlide>
                  {/* <SlideItem text="Nous vous connectons à des milliers d'entrepises et Businessman du pays" img={connexion4} /> */}
                  <Slide idSlide={slide.id} typeSlide={slide.typeSlide} mode={"live"} />
                </SwiperSlide>
              ))
            }
            {/* <SwiperSlide><SlideItem text="Index RDC donne une plus large référence à votre entreprise à travers le pays" img={connexion1} /></SwiperSlide>
            <SwiperSlide><SlideItem text="Elargissez votre visibilité" img={connexion3} /></SwiperSlide>
            <SwiperSlide><SlideItem text="Nous sommes un repertoire de business en RDC" img={connexion2} /></SwiperSlide> */}

          </Swiper>
        </div>

        {/* <div className="h-[250px] lg:h-[500px] overflow-hidden relative bg-black" >
          <Image src={kinshasa4} style={{ opacity: 0.2 }} className="w-screen bg-gradient-to-tr z-3" alt="Kinshasa-centre-ville" loading="lazy" />
          
          <p
            className={`font-bold text-xl text-center text-white lg:top-[302px] top-[42px] lg:ml-[40%] ml-[10%] absolute`}
          >
           
            <Typewriter
              options={{
                strings: [
                  '"Explorer et trouver en un click"',
                  "Le sourire aux lèvres près de votre emplacement",
                  " les meilleurs hôtels, magasins, salles de sport, etc. à votre portée",
                ],
                autoStart: true,
                loop: true,
              }}
              className="text-black"
            />
          </p>
        </div> */}
        <Section2
          titre={
            <h3 className="text-center font-bold text-xl ">
              <span className={inter.className}>Explorez nos {secteurs?.length || 0} secteurs BTB</span>
            </h3>
          }
          titreIcone={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-telescope"><path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"/><path d="m13.56 11.747 4.332-.924"/><path d="m16 21-3.105-6.21"/><path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"/><path d="m6.158 8.633 1.114 4.456"/><path d="m8 21 3.105-6.21"/><circle cx="12" cy="13" r="2"/></svg>}
        >
            {/* <SlideAwesome damping={4} direction="right"> */}
          <div className={`w-full overflow-x-hidden ${secteurs?.length > 1 ? "flex flex-row gap-5 flex-wrap justify-start items-start " : "justify-center items-center flex"}  py-2 px-3 rounded`}>

            {
              secteurs?.map((s, i) => {
                return (
                  <SecteurItem key={i} item={s.secteur} v={s.secteurNb} slug={s.slug} className="flex-1" />
                )
              })
            }

          </div>
          {/* </SlideAwesome> */}

          {/* <div className="w-[30%]">
            <Image src={zoom} className="rounded-md h-[180px]" />
          </div> */}

        </Section2>

        <Section2
          titre={<p>Actualités d'entreprises</p>}
          titreIcone={<Rss size={30} />}
        >
          <div className="bg-white py-2 px-2">
            <SectionActu />
          </div>
        </Section2>
        <Section2 titre={
          <div className="flex gap-4 justify-center">
            <h1 className="text-2xl font-bold">Pourquoi adhérer à Index RDC</h1>
          </div>
        }
          titreIcone={<svg width="32px" strokeWidth="1.4" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fb6a09"><path d="M4 19V5a2 2 0 012-2h13.4a.6.6 0 01.6.6v13.114" stroke="#fb6a09" strokeWidth="1.4" strokeLinecap="round"></path><path d="M8 3v8l2.5-1.6L13 11V3" stroke="#fb6a09" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6 17h14M6 21h14" stroke="#fb6a09" strokeWidth="1.4" strokeLinecap="round"></path><path d="M6 21a2 2 0 110-4" stroke="#fb6a09" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          }
        >
          {/* <SlideAwesome direction="down"> */}
          <div className={"grid grid-cols-1 lg:grid-cols-3 gap-3"}>
            <Card img={book2} titre={"Annuaire des PMES"} contenu={"Il est un référentiel décrivant l’ensemble de ressources des entreprises, synchronisées au sein d’un système d’information."} />
            <Card img={who} titre={"Pour qui ? "} contenu={"Entreprises, Entrepreneurs, Start up, Organisations des financements, Médias, Hommes et Femmes d’affaires, structures internationales."} />
            <Card img={success} titre={"Pour quels avantages ?"} contenu={"Service marketing pour l’accès des Informations économiques et financières en relation aux partenaires."} />
          </div>
          {/* </SlideAwesome> */}
        </Section2>
      </div>

      <Section2

        titre={<h1>Découvrez une sélection de produits</h1>}
        titreIcone={<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="none" strokeWidth="1.4" viewBox="0 0 24 24" color="#fb6a09"><g stroke="#fb6a09" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#bright-star_svg__a)"><path d="m9.952 9.623 1.559-3.305a.535.535 0 0 1 .978 0l1.559 3.305 3.485.533c.447.068.625.644.302.974l-2.522 2.57.595 3.631c.077.467-.391.822-.791.602L12 16.218l-3.117 1.715c-.4.22-.868-.135-.791-.602l.595-3.63-2.522-2.571c-.323-.33-.145-.906.302-.974l3.485-.533ZM22 12h1M12 2V1M12 23v-1M20 20l-1-1M20 4l-1 1M4 20l1-1M4 4l1 1M1 12h1"></path></g><defs><clipPath id="bright-star_svg__a"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>}
      >
        {/* <TitrePrincipal /> */}
        <div className="pb-8">
          <div className="hidden lg:block">
            <Swiper
              spaceBetween={20}
              slidesPerView={4}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: false,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {/* <SwiperSlide><ProduitItem adresse="Adresse 1" text="produit 1" description="Nam at tortor in tellus interdum sagittis. Quisque rutrum. Etiam feugiat lorem non metus.Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Pellentesque auctor neque nec urna. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum." img={connexion4} /></SwiperSlide>
              <SwiperSlide><ProduitItem adresse="Adresse 2" text="Produit 2" description="Nam at tortor in tellus interdum sagittis. Quisque rutrum. Etiam feugiat lorem non metus.Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Pellentesque auctor neque nec urna. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum." img={connexion1} /></SwiperSlide>
              <SwiperSlide><ProduitItem adresse="Adresse 3" text="Produit 3" description="Nam at tortor in tellus interdum sagittis. Quisque rutrum. Etiam feugiat lorem non metus.Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Pellentesque auctor neque nec urna. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum." img={connexion3} /></SwiperSlide>
              <SwiperSlide><ProduitItem adresse="Adresse 4" text="Produit 4" description="Nam at tortor in tellus interdum sagittis. Quisque rutrum. Etiam feugiat lorem non metus.Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Pellentesque auctor neque nec urna. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum." img={connexion2} /></SwiperSlide>
              <SwiperSlide><ProduitItem adresse="Adresse 5" text="Produit 5" description="Nam at tortor in tellus interdum sagittis. Quisque rutrum. Etiam feugiat lorem non metus.Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Pellentesque auctor neque nec urna. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum." img={connexion2} /></SwiperSlide> */}
              {
                produits?.map((p, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="px-0.5 py-1">
                        <ProduitItem
                          id={p.id}
                          lien={p.lien}
                          adresse={p?.lieu}
                          text={p.nom}
                          description={nl2br(p?.description.substr(0, 100))}
                          proprietaire={p?.proprietaire}
                          img={p?.img}
                        />
                      </div>
                    </SwiperSlide>
                  )
                })
              }

            </Swiper>
          </div>
          <div className="block lg:hidden">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: false,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {/* <SwiperSlide><ProduitItem adresse="Adresse 1" text="produit 1" description="Nam at tortor in tellus interdum sagittis. Quisque rutrum. Etiam feugiat lorem non metus.Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Pellentesque auctor neque nec urna. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum." img={connexion4} /></SwiperSlide>
              <SwiperSlide><ProduitItem adresse="Adresse 2" text="Produit 2" description="Nam at tortor in tellus interdum sagittis. Quisque rutrum. Etiam feugiat lorem non metus.Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Pellentesque auctor neque nec urna. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum." img={connexion1} /></SwiperSlide>
              <SwiperSlide><ProduitItem adresse="Adresse 3" text="Produit 3" description="Nam at tortor in tellus interdum sagittis. Quisque rutrum. Etiam feugiat lorem non metus.Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Pellentesque auctor neque nec urna. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum." img={connexion3} /></SwiperSlide>
              <SwiperSlide><ProduitItem adresse="Adresse 4" text="Produit 4" description="Nam at tortor in tellus interdum sagittis. Quisque rutrum. Etiam feugiat lorem non metus.Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Pellentesque auctor neque nec urna. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum." img={connexion2} /></SwiperSlide>
              <SwiperSlide><ProduitItem adresse="Adresse 5" text="Produit 5" description="Nam at tortor in tellus interdum sagittis. Quisque rutrum. Etiam feugiat lorem non metus.Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Pellentesque auctor neque nec urna. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum." img={connexion2} /></SwiperSlide> */}
              {
                produits?.map((p, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="px-0.5 py-1">
                        <ProduitItem
                          id={p?.id}
                          lien={p.lien}
                          adresse={p?.lieu}
                          text={p.nom}
                          description={nl2br(p?.description.substr(0, 100))}
                          proprietaire={p?.proprietaire}
                          img={p?.img}
                        />
                      </div>
                    </SwiperSlide>
                  )
                })
              }

            </Swiper>
          </div>

        </div>
      </Section2>
    </Layout>

  );
}
export default Component