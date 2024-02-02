"use client";
import {useEffect,useState} from "react"
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
import TitrePage from "@/app/components/TitrePage"

const Formulaire=()=>{
    const [contact,setContact]=useState({});
    const fContainer="flex flex-col mb-4";
    const fInput="w-[100%] border-0 border-gray-300 py-2 px-4 rounded-sm";
    const fLabel="text-gray-700 font-400 pl-3"
    const { TextArea } = Input;
    const onChange = (e) => {};
    useEffect(()=>{
       
    },[]);
    return (
  <>
    <div className="flex flex-row gap-5 px-[20px] lg:px-[80px] mx-auto">
        <div className={fContainer + " flex-1"}>
            <label htmlFor='nom' className={fLabel}>Nom *</label>
            <input id="nom" className={fInput} placeholder="Votre Nom" allowClear onChange={onChange} />
        </div>
        <div className={fContainer + " flex-1"}>
            <label htmlFor='email' className={fLabel}>E-mail *</label>
            <input id="email" className={fInput} placeholder="Votre E-mail" allowClear onChange={onChange} />
        </div>
    </div>
    <div className="flex flex-row gap-5 px-[20px] lg:px-[80px]">
        <div className={fContainer + " flex-1"}>
            <label htmlFor='telephone' className={fLabel}>Téléphone</label>
            <input id="telephone" className={fInput} placeholder="Votre téléphone" allowClear onChange={onChange} />
        </div>
        <div className={fContainer + " flex-1"}>
            <label htmlFor='sujet' className={fLabel}>Sujet</label>
            <input id="sujet" className={fInput} placeholder="Sujet de votre message" allowClear onChange={onChange} />
        </div>
    </div>
    <div className="flex flex-row gap-5 px-[20px] lg:px-[80px]">
        <div className={fContainer + " flex-1"}>
            <label htmlFor='message' className={fLabel}>Message *</label>
            <textarea id="message" className={fInput} rows={5} placeholder="Saisissez votre message" allowClear onChange={onChange}></textarea>
        </div>
    </div>
    <div className="flex flex-row items-end justify-end pr-[80px]">
        <button className={`${bgPrimaryColor}  w-[200px] py-3 text-white font-300 hover:border hover:border-white mt-7`}>ENVOYER</button>
    </div>

  </>
    );
}
export default function Component() {
  return (
    <div>
        <div className="hidden lg:block">
            <ParallaxProvider>
                <ParallaxBanner style={{ aspectRatio: "7 / 1" }}>
                    <ParallaxBannerLayer
                        speed={-20}
                        image="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        
                    />
                    <ParallaxBannerLayer speed={-4}>
                        <div
                        className={
                            myContainer +
                            " flex flex-col items-center justify-center text-white pt-[40px]"
                        }
                        >
                            <h1 className={`text-[30px] `}>Nous contacter</h1>
                            <h1 className="text-[14px] border border-white rounded-full px-3 py-1 mt-6">{"Accueil >> Contact"}</h1>
                        
                        </div>
                    </ParallaxBannerLayer>
                </ParallaxBanner>
            </ParallaxProvider>
        </div>
        <div className="block lg:hidden">
            <ParallaxProvider>
                <ParallaxBanner style={{ aspectRatio: "3 / 1" }}>
                    <ParallaxBannerLayer
                        speed={-20}
                        image="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        
                    />
                    <ParallaxBannerLayer speed={-4}>
                        <div
                        className={
                            myContainer +
                            " flex flex-col items-center justify-center text-white pt-[40px]"
                        }
                        >
                            <h1 className={`text-[30px] `}>Nous contacter</h1>
                            <h1 className="text-[14px] border border-white rounded-full px-3 py-1 mt-6">{"Accueil >> Contact"}</h1>
                        
                        </div>
                    </ParallaxBannerLayer>
                </ParallaxBanner>
            </ParallaxProvider>
        </div>

      <div className={ " py-[40px]"}>
              <div className="flex flex-col gap-8 ">
                <div className="flex-1 px-[20px] lg:px-[100px]">
                    <Divider><TitrePage titre="Nos coordonnées" /></Divider>
                    <p className="font-bold text-gray-800 mb-6 text-center">
                        Avec un service client permanenent, nous repondons à tous vos messages dans le 24H.
                    </p>
                    <div className="flex flex-col lg:flex-row gap-6 mt-8 mx-[10px] lg:mx-[90px] bg-white rounded-md py-[40px] px-4">
                        <p className="w-1/1 lg:w-1/3 flex flex-row gap-2 items-center">
                            <svg width="42px" height="42px" strokeWidth="1.4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fb6a09"><path d="M22 5h-6m0 0l3-3m-3 3l3 3M18.118 14.702L14 15.5c-2.782-1.396-4.5-3-5.5-5.5l.77-4.13L7.815 2H4.064c-1.128 0-2.016.932-1.847 2.047.42 2.783 1.66 7.83 5.283 11.453 3.805 3.805 9.286 5.456 12.302 6.113 1.165.253 2.198-.655 2.198-1.848v-3.584l-3.882-1.479z" stroke="#fb6a09" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            {telephone}
                        </p>
                        <p className="w-1/1 lg:w-1/3 flex flex-row gap-2 items-center">
                            <svg width="42px" height="42px" viewBox="0 0 24 24" strokeWidth="1.4" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fb6a09"><path d="M9 9l4.5 3L18 9M3 13.5h2M1 10.5h4" stroke="#fb6a09" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5 7.5V7a2 2 0 012-2h13a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2v-.5" stroke="#fb6a09" strokeWidth="1.4" strokeLinecap="round"></path></svg>
                            {email}
                        </p>
                        <p className="w-1/1 lg:w-1/3 flex flex-row gap-2 items-center">
                            <svg width="72px" height="72px" strokeWidth="1.4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fb6a09"><path d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1116 0z" stroke="#fb6a09" strokeWidth="1.4"></path><path d="M12 11a1 1 0 100-2 1 1 0 000 2z" fill="#fb6a09" stroke="#fb6a09" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            {adresse}
                        </p>
                    </div>
                </div>
                <div className="flex-1  rounded-md pb-2 ">
                    <Divider><TitrePage titre="Ecrivez-nous" /></Divider>
                    <div className="px-[10px] lg:px-[100px]">
                        <Formulaire />
                    </div>
                </div>
              </div>
      </div>
    </div>
  );
}
