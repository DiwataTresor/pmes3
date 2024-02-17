"use client"
import React, { useState } from 'react'
import Layout from "@/app/components/layouts/LayoutDashboard"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
import { Badge, BadgeCheckIcon } from 'lucide-react'
import Link from 'next/link'
import {Spin} from "antd"
import Cookies from 'js-cookie'
import { postData } from '@/app/fcts/helper'
import { redirect,useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

const page = () => {
    const [sendDemande,setSendDemande]=useState(false);
    const router=useRouter();
    
    const handleDemande=() => {
        // alert(JSON.parse(Cookies.get("profil")).id);
        setSendDemande(true);
        postData("demandeCertification",{profil:JSON.parse(Cookies.get("profil")).id}).then(r=>{
            if(r.success){
                router.push("/account/demandecertificationconfirm");
            }else if(r.success==false)
            {
                toast.error(r.msg);
            }
        }).catch(r=>{

        }).finally(()=>setSendDemande(false))
    }
  return (
   <MainLayout>
    <Toaster position='bottom-center' />
    <Spin spinning={sendDemande}>
        <Layout titre={"Demande de certification"} titreIcone={<BadgeCheckIcon /> }>
            <div className='text-center font-normal pt-10'>
                <p className='text-lg'>Vous êtes sur le point de faire une demande de certification pour votre compte, <br />vos données seront envoyées  auprès
                de nos services pour traitement, et vous serez contacté pour plus des details.</p>
                <p className='mt-7'>Veuillez cliquer sur le lien : 
                    <Link href="#" className='underline ml-3' onClick={handleDemande}>CONFIRMER MA DEMANDE</Link>
                </p>
            </div>
        </Layout>
    </Spin>
   </MainLayout>
  )
}

export default page