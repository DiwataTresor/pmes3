"use client"
import LayoutDashboard from '@/app/components/layouts/LayoutDashboard'
import LayoutDashboardMain from '@/app/components/layouts/LayoutDashboardMain'
import { getData, postData } from '@/app/fcts/helper'
import { Button, Input } from '@nextui-org/react'
import { Modal, Spin } from 'antd'
import { CheckCircle, Info, RefreshCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import {In}

import React, { useState } from 'react'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const page = () => {
  const [spinning,setSpinning]=useState(false)
  const [nbreAnnee,setNbreAnnee]=useState(1);
  const [affichable,setAffichable]=useState(true);
  const [msg,setMsg]=useState("");
  const router=useRouter();
  const handleSubmit=() => {
    Modal.confirm({
      title:"Reabonnement",
      content: "Confirmez-vous cette demande de reabonnement ?",
      okText: "Oui",
      cancelText:"Annuler",
      onOk: () => {
        setSpinning(true);
        postData("demandeReabonnement",{nbreAnnee:nbreAnnee}).then((r)=>{
          if(r.success){
            setSpinning(true);
            router.push("/account/renouvellement/confirmdemande")
          }else
          {
            toast.error("Echec d'enregistrement de la demande");
          }
        }).finally(() => {
          setSpinning(false)
        })
      }
    })
  }
  useEffect(()=>{
    getData("statutDemandeReabonnement").then((r)=>{
      if(r.success){
        setAffichable(false);
        setMsg(r.msg);
      }else
      {
        setAffichable(true);
      }
    })
  },[])
  return (
    <LayoutDashboardMain showNavigation={true} navigationBar={"Reabonnement"}>
      <Toaster position='bottom-center' />
      <Spin spinning={spinning}>
      <LayoutDashboard titre={"Reabonnement"} titreIcone={<RefreshCcw />}>
        {
          affichable?
          <div className='flex flex-col items-center justify-center gap-4 w-full font-thin'>
            <div className='text-center font-normal flex gap-3'>
              <Info />Cher partenaire, Vous allez reconduire votre reabonnement
            </div>
            <div>Veuillez indiquez le temps de votre nouvel abonnement</div>
            <div className='w-full px-72'>
              <Input type='number' className='w-full' size='sm' min={1} max={5} defaultValue='1' label="Nombre Année" value={nbreAnnee} onChange={(e)=>setNbreAnnee(e.target.value)} />
            </div>
            <div>
              <Button onPress={handleSubmit} color='success' variant='flat' size='md'  startContent={<CheckCircle />}>Envoyer</Button>
            </div>
          </div>:
          <div className='flex flex-col items-center justify-center gap-4 w-full font-thin'>
              <div className='text-xl'>
                <div>Desolé,</div>
                {msg}
                </div>
          </div>
        }
      </LayoutDashboard>
      </Spin>
    </LayoutDashboardMain>
  )
}

export default page