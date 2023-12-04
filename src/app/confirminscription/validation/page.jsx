"use client"
import LayoutClient from '@/app/components/layouts/LayoutClient'
import React, { useEffect, useState } from 'react'
import { Result } from 'antd'
import { Button, Spinner } from '@nextui-org/react'
import { SITEWEB_URL, postData } from '@/app/fcts/helper'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'


const page = () => {
    const paths=useSearchParams();
    const [isChecking,setIsChecking]=useState(true);
    const [valide,setValide]=useState(false);

    useEffect(()=>{
        let u=paths.get("u");
        postData("valideInscription",{"id":u}).then(r=>{
           
            if(r.success){
                if(r.row==0)
                {
                    setValide(false);
                }else
                {
                    Cookies.set("profil", JSON.stringify(r.profil));
                    Cookies.set("connected", "true");
                    setValide(true);
                }
            }else{
                setValide(false);
            }
        }).catch(err=>{
            setValide(false);
        }).finally(()=>{
            setIsChecking(false);
        })
    },[])
  return (
    <LayoutClient
        header={"Validation"} hideHeader={true}
    >
        {/* <h2>Felicition, </h2>
        <h2>Votre validation est acceptée, vous pouvez mantenant acceder à votre compte et parametrage </h2> */}
        {
            isChecking?
                <div className='flex items-center justify-center pt-28'>
                    <Spinner />
                </div>:
                    valide?
                        <Result
                                status="success"
                                title="Votre compte est bien validé"
                                subTitle="Votre validation est acceptée, vous pouvez mantenant acceder à votre compte et parametrage"
                                extra={[
                                <a href={SITEWEB_URL}>
                                    Retourner au site
                                </a>
                                ]}
                            />:
                            <Result
                            status="error"
                            title="Echec de validation"
                            subTitle="Une erreur s'est produite pendant la validation, veuillez recliquer au lien qui vous a été envoyé dans le mail de confirmation"
                            extra={null}
                          />
                
        }
    </LayoutClient>
  )
}

export default page