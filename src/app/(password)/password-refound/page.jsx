"use client"
import React, { useState } from 'react'
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
import Layout from "@/app/components/layouts/LayoutClient"
import TitrePage from '../../components/TitrePage'
import { MailIcon } from 'lucide-react'
import { Button, Input } from '@nextui-org/react'
import { Alert, message } from 'antd'
import { getData, postData } from '../../fcts/helper'
import { useRouter } from 'next/navigation'
import emailjs from "@emailjs/browser"

const page = () => {
    const [isLoading,setIsLoading] =useState(false)
    const [showError,setShowError] =useState(false)
    const router=useRouter();
    const handleSubmit=(e)=>{
        e.preventDefault();
        setIsLoading(true)
        let f=Object.fromEntries(new FormData(e.target));
        getData("checkEmail&email="+f.email).then(r=>{
            if(r.success==false)
            {
                setShowError(true);
            }else
            {
                emailjs.init("gj6VvoIttF-GEaPON");
                emailjs.send("service_eubyldc","template_3ky32ie",{
                    objet: "Reinitialisation de votre mot de passe",
                    message: `Votre code code pour reinitialiser votre mot de passe est : ${r.code}`,
                    destinataire: f.email
                    }).then((r) => {
                        router.push("/newpassword?email="+f.email);
                       console.log("bien envoyé");
                      
                    }).catch((err)=>{
                        message.error("oops, desolé, nous corrigeons une pétite erreur dans le système, ressayez dans quelques instants")
                        console.log("Erreur mail"+err.message);
                        setIsLoading(false);
                    }).finally(()=>{
                        console.log("quelque chose ne va pas");
                        // setIsSending(false);
                    });
                
            }
        }).catch(r=>{
            setIsLoading(false)
        }).finally(()=>{
            
        });
    }
    return (
        <Layout hideHeader={true} cls={"bg-gray-200"}>
            <div className='text-center pt-5 pb-9 mb-9'>
                <TitrePage titre={"Recuperer votre mot de passe"} />
                <form onSubmit={handleSubmit}>
                    <div className='justify-center items-center flex flex-col gap-3 mt-10'>
                        <Input
                            type="email"
                            label="Votre Email"
                            name='email'
                            placeholder="moi@exemple.com"
                            labelPlacement="outside"
                            isRequired
                            className='max-w-[500px]'
                            color='default'
                            startContent={
                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />
                        <Button isLoading={isLoading} type='submit' color='primary'>Enregistrer</Button>
                        <div className='mt-5  max-w-[500px] w-full'>
                            {
                                showError &&
                                    <Alert message="Cette adresse ne se trouve pas dans notre base de données, veuillez bien la verifier" type="error" showIcon />
                            }
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default page