"use client"
import React, { useState } from 'react'
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
import Layout from "@/app/components/layouts/LayoutClient"
import TitrePage from '../../components/TitrePage'
import { Key, Lock, MailIcon } from 'lucide-react'
import { Button, Input, user } from '@nextui-org/react'
import { Alert, message } from 'antd'
import { getData, postData } from '../../fcts/helper'
import { useSearchParams,useRouter } from 'next/navigation'

const page = () => {
    const [isLoading,setIsLoading] =useState(false)
    const [showError,setShowError] =useState(false)
    const parametres=useSearchParams();
    const router=useRouter();
    const handleSubmit=(e)=>{
        e.preventDefault();
        setIsLoading(true)
        let f=Object.fromEntries(new FormData(e.target));
        f.emailAdresse=parametres?.get("email");
        if(f.pwd!==f.pwd2)
        {
            message.error("Veuillez verifier vos 2 mot de passe");
        }else
        {
            postData("resetPwd",f).then(r=>{
                if(r.success==false)
                {
                    message.error("une erreur s'est produite pendant le traitement, veuillez reeesayer pluatrd");
                }else
                {
                    router.push("/reset-password")
                }
            }).finally(()=>{
                setIsLoading(false)
            });
        }
    }
    return (
        <Layout hideHeader={true} cls={"bg-gray-200"}>
            <div className='text-center pt-5 pb-9 mb-9'>
                <TitrePage titre={"Entrer votre nouveau mot de passe"} />
                <div>{parametres.get("email")}</div>
                <div className='mt-4'>Un code pour reinitialiser votre mot de passe vous est envoyé dans votre adresse mail, veuillez le recuperer et le saisir</div>
                <form onSubmit={handleSubmit}>
                    <div className='justify-center items-center flex flex-col gap-3 mt-10'>
                        <Input
                            type="text"
                            label="Code"
                            name='code'
                            placeholder=""
                            labelPlacement="outside"
                            isRequired
                            className='max-w-[500px]'
                            color='default'
                            startContent={
                                <Key className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />
                        <Input
                            type="password"
                            label="Nouveau mot de pase"
                            name='pwd'
                            placeholder=""
                            labelPlacement="outside"
                            isRequired
                            className='max-w-[500px]'
                            color='default'
                            startContent={
                                <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />
                        <Input
                            type="password"
                            label="Retaper nouveau mot de passe"
                            name='pwd2'
                            placeholder=""
                            labelPlacement="outside"
                            isRequired
                            className='max-w-[500px]'
                            color='default'
                            startContent={
                                <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />
                        <Button isLoading={isLoading} type='submit' color='primary'>Enregistrer</Button>
                        
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default page