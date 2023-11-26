"use client"
import {useState,useEffect} from "react"
import Layout from "@/app/components/layouts/LayoutClient"
import {getSecteurBySlug} from "@/app/utils/data";
import {GlobalOutlined,HomeOutlined} from "@ant-design/icons"
import Link from "next/link"
import {Button,Image} from "@nextui-org/react"
import {MailIcon} from "@/app/components/icons/MailIcon"
import {BACKEND_URL,VisiteSiteOfUserFromLink} from "@/app/fcts/helper"
import Section from "@/app/components/section/Section"
import Section2 from "@/app/components/section/Section2"
const Entreprise=({detail})=>{ 

    const handleVisiteSiteweb=(id,site)=>{
        VisiteSiteOfUserFromLink(id,site);
    }
       
    return (
        <Section titre={
            <div className="w-full flex flex-row gap-2 justify-between items-end text-white font-bold ">
                <h2 className="text-xl text-blue-400 flex-1 font-bold">
                    {detail.utilisateurNom || detail.nom}
                </h2>
                
               
            </div>
        }>
            <h2 className="text-sm  flex gap-2 text-start justify-start border-b">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                </svg>

                {detail.utilisateurVille || detail.ville}
            </h2>
            <div className="py-2 flex flex-row">

                <div className="mr-7 px-6 border-r border-white">
                    {
                        detail.logo!==null ?
                            <Image isZoomed width={300} className="h-full min-h-[220px]" src={BACKEND_URL+detail.logo}  />:
                            <Image isZoomed width={300} className="h-full min-h-[220px]" src={"https://cdn.dribbble.com/users/2063813/screenshots/5934965/media/e6338ab02e83c112c5127f321aff0e09.png"}  />

                    }
                    <div className='mt-2 items-center w-full justify-center flex'>
                        <Link href={`/${detail.utilisateurSlug || detail.slug}`}>
                            <Button color="primary" size="sm" variant="light">visiter</Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-1 justify-between w-full border-l-0 pl-7">
                    
                    <div className=" border-b border-white">
                        <div className="font-bold text-lg text-slate-500"><>Adresse : </></div>
                        <div className="text-sm">{detail.utilisateurAdresse || detail.adresse}</div>
                    </div>
                    <div className="flex-1 text-justify py-5 text-sm pr-3">
                        <h2 className="font-bold text-lg text-slate-500"><>A Propos</></h2>
                        <div className="text-md">{detail.description || detail.description}</div>
                    </div>
                    <div className="flex-col gap-1">
                        <h2 className="font-bold text-lg text-slate-500"><>Contact</></h2>
                        <div className="border-t border-white text-sm w-full flex gap-1">
                            <span className="mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </span>
                            <Link href={`mailto:${detail?.emailAdresse}`}><Button color="primary" size="sm" variant="light">{"Email : "+detail.emailAdresse}</Button></Link>
                        </div>
                        <div className="border-t border-white text-sm w-full py-2 flex gap-1">
                            <span className="mt-1"><GlobalOutlined style={{height:2}} /></span>
                            <Button onPress={()=>handleVisiteSiteweb(detail.id,detail.siteweb)} color="primary" size="sm" variant="light">{"site web : "+detail.siteweb}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}
export default Entreprise