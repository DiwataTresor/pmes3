"use client";

import {useState,useEffect,useRef} from "react"
import Image from "next/image";
import Link from "next/link";
import { myContainer, titrePrincipal } from "@/app/style/global";

import book2 from "@/assets/book2.png";
import success from "@/assets/success.png";
import who from "@/assets/who.png";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import connexion1 from "@/assets/connexion1.jpg";
import connexion2 from "@/assets/connexion2.jpg";
import connexion3 from "@/assets/connexion3.jpg";
import connexion4 from "@/assets/connexion4.jpg";

import {Button,Card,Row,Text,Input,Tabs,Tab,Chip,Select,SelectItem,Textarea} from "@nextui-org/react";
import {titre} from "./../../app/style/global"
import {Divider} from "antd"
import {BankOutlined} from "@ant-design/icons"
import {getSecteurs,getProvinces} from "./../utils/data"
import {postData} from "@/app/fcts/helper"
import {Modal,notification} from "antd"
import { telephone } from '@/app/utils/helper';
import { useRouter } from 'next/navigation'
import Layout from "@/app/components/layouts/LayoutClient"
import LayoutDashboard from "@/app/components/layouts/LayoutDashboard"
import ReCAPTCHA from "react-google-recaptcha"
import Cookies from "js-cookie";


const page=()=> {
    const [isLoading,setIsLoading]=useState(false);
    const [secteurs,setSecteurs]=useState([]);
    const [provinces,setProvinces]=useState([]);
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter()
    const captcha=useRef();
    const handleSubmitEntreprise=async (e)=>{
        e.preventDefault();
        const token = await captcha.current.getValue();
        let form=Object.fromEntries(new FormData(e.target));
        form.typeCompte="E";
        let error=false;
        let errorDetail="";
        if(token===""){error=true; errorDetail="Veuillez completer correctement le Captcha"}
        if(form.password!==form.passwordRepeat){error=true; errorDetail="Veuillez verifier vos 2 mots de passe"}
        if(form?.password?.trim()?.length<8){error=true; errorDetail="Le mot de passe doit avoir au moins 8 caracteres"}

        if(error)
        {
            api.error({
                message: `Inscription`,
                description:errorDetail,
                duration:3
              });
        }else
        {
            Modal.confirm({
                title:"Inscription",
                content:"Confirmez-vous vraiment votre inscription ?",
                okText:"S'inscrire",
                cancelText:"Annuler",
                onOk:()=>{
                    setIsLoading(true);
                    postData("utilisateur",form)
                    .then(r=>{
                        if(r.success)
                        {
                            localStorage.setItem("profil",JSON.stringify(r.profil));
                            Cookies.set("profil",JSON.stringify(r.profil))
                            localStorage.setItem("connected","yes");
                            window.location.href="confirminscription";
                            // router.push('/confirminscription', { scroll: false })
                        }else
                        {
                            api.warning({
                                message: `Inscription`,
                                description:"Impossible de s'inscrire pour le moment, il y a un problème vers serveur",
                                duration:3
                              });
                        }
                    })
                    .catch(r=>{
                        console.log("Echec "+r);
                    })
                }
            })
        }
    }
    const handleSubmitIndependant=(e)=>{
        e.preventDefault();
    }   
    const handleCaptcha=(v)=>{
        console.log(v);
    }
    useEffect(()=>{
        getSecteurs()
        .then(r=>{
            
            setSecteurs(r.data)
        });
        getProvinces()
        .then(r=>{
            
            setProvinces(r.data)
        });
    },[])
  return (
    <Layout  
     header={<div>
            <Divider>
            <h1 className={`${titre} flex flex-col`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Inscription
            </h1>
            </Divider>
        </div>
        }
        hideHeader
    >
        <div>
        {contextHolder}
        <div className="pb-8 pt-9">
            <LayoutDashboard titre="Inscription">
                {/* <div className="flex flex-row gap-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="none" stroke-width="1.4" viewBox="0 0 24 24" color="#0d0c0d"><path stroke="#0d0c0d" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M2.5 9.5 12 4l9.5 5.5"></path><path stroke="#0d0c0d" stroke-width="1.4" d="M7 21v-1a5 5 0 0 1 10 0v1"></path><path stroke="#0d0c0d" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg>
                    Votre Profil
                </div> */}
                {/* <Divider /> */}
                {/* <div className="flex flex-col gap-7 mt-8">
                    <Input className="w-full" label="Votre nom" labelPlacement="outside" />
                    <div className="flex flex-row gap-6">
                        <Input className="w-full" label="Votre E-mail" labelPlacement="outside" />
                        <Input className="w-full" label="Votre E-mail" labelPlacement="outside" />
                    </div>
                </div> */}
                <div className="flex w-full flex-col mt-2">
                    {/* <h2>Veuillez selectionner le type de votre compte</h2> */}
                    <Tabs 
                        aria-label="Options" 
                        color="primary" 
                        variant="underlined"
                        classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                        cursor: "w-full bg-[#22d3ee]",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                        }}
                    >
                        <Tab
                        key="photos"
                        title={
                            <div className="flex items-center space-x-2">
                                <span><BankOutlined /> Organisation / Entreprise </span>
                            </div>
                        }
                        >
                            <form onSubmit={handleSubmitEntreprise}>
                                <div className="flex flex-col gap-8 mt-5">
                                    <div className="flex flex-row gap-6">
                                        <Select name="secteur" isRequired className="w-full" label="Secteur Activité" labelPlacement="outside">
                                           {
                                            secteurs?.sort((a,b)=>a.secteur>b.secteur).map((s)=>{return<SelectItem key={s.id} value={s.id}>{s.secteur}</SelectItem>})
                                           }
                                            
                                        </Select>
                                        <Input name="nom"  className="w-full" label="Nom de l'organisation" labelPlacement="outside" />
                                    </div>
                                    <div className="flex flex-row gap-6">
                                        <Input type="text" name="rccm" className="w-full" label="RCCM" labelPlacement="outside" />
                                        <Input type="text" name="idnat" className="w-full" label="Id-Nat" labelPlacement="outside" />
                                    </div>
                                    <Input name="email"  className="w-full" label="E-mail" labelPlacement="outside" />
                                    <div className="flex flex-row gap-6">
                                        <Input type="password" name="password" isRequired className="w-full" label="Mot de passe" labelPlacement="outside" />
                                        <Input type="password" name="passwordRepeat" isRequired className="w-full" label="Retaper mot de passe" labelPlacement="outside" />
                                    </div>
                                    <div className="flex flex-row gap-6">
                                        <Select name="province" isRequired className="w-full" label="Province" labelPlacement="outside">
                                            {
                                            provinces?.sort((a,b)=>a.province>b.province).map((s)=>{return<SelectItem key={s.id} value={s.id}>{s.province}</SelectItem>})
                                           }
                                        </Select>
                                        <Input name="territoire" className="w-full" label="Territoire" labelPlacement="outside" />
                                        <Input name="ville" className="w-full" label="Ville" labelPlacement="outside" />
                                    </div>
                                    <div className="flex flex-row gap-6">
                                        <Input type="text" name="adresse" className="w-full" label="Adresse" labelPlacement="outside" />
                                        <Input type="telephone" name="telephone" className="w-full" label="Téléphone" labelPlacement="outside" />
                                    </div>
                                    <Input type="url" name="siteweb" className="w-full" label="Votre site web (URL)" labelPlacement="outside" />
                                    <Textarea name="description" isRequired minRows={3} className="w-full" label="Decrivez votre organisation" labelPlacement="outside" />
                                    <div className="flex items-center justify-center">
                                        <ReCAPTCHA ref={captcha} sitekey={"6LdTJMIoAAAAAL74aT4mOU3uJhEjuhHNXU8Asp11"} 
                                        onChange={handleCaptcha} />
                                    </div>
                                    <div className="flex flex-row gap-4 items-end justify-end">
                                        <Button type="submit" color="primary" isLoading={isLoading}>
                                            Enregistrer
                                        </Button>
                                        <Button type="button" color="danger" variant="light">
                                            Annuler
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Tab>
                        <Tab
                        key="music"
                        title={
                            <div className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <span>Compte indépedant</span>
                            </div>
                        }
                        >
                            <form onSubmit={handleSubmitIndependant}>
                                <div className="flex flex-col gap-8 mt-5">
                                    <div className="flex flex-row gap-6">
                                        
                                        <Input name="nom"  className="w-full" label="Nom" labelPlacement="outside" />
                                        <Input name="posnom"  className="w-full" label="Postnom" labelPlacement="outside" />
                                        <Input name="prenom"  className="w-full" label="Prénom" labelPlacement="outside" />
                                    </div>
                                    
                                    <Input name="email"  className="w-full" label="E-mail" labelPlacement="outside" />
                                    <Input name="telephone" className="w-full" label="Téléphone" labelPlacement="outside" />
                                    <Input name="adresse" className="w-full" label="Adresse" labelPlacement="outside" />
                                    
                                    <div className="flex flex-row gap-6">
                                        <Select name="province" isRequired className="w-full" label="Province" labelPlacement="outside">
                                            {
                                            provinces?.sort((a,b)=>a.province>b.province).map((s)=>{return<SelectItem key={s.id} value={s.id}>{s.province}</SelectItem>})
                                           }
                                        </Select>
                                        <Input name="ville" className="w-full" label="Ville" labelPlacement="outside" />
                                    </div>
                                    <div className="flex flex-row gap-6">
                                        <Input type="text" name="adresse" className="w-full" label="Adresse" labelPlacement="outside" />
                                    </div>
                                    <div className="flex flex-row gap-6">
                                        <Input type="file" startContent={" "} name="photo" className="w-full" label="Votre photo de Profil"  />
                                        <Input type="file" startContent={" "} name="cv" className="w-full" label="Votre CV" />
                                    </div>
                                    <div className="flex flex-row gap-6">
                                        <Input type="password" name="password" isRequired className="w-full" label="Mot de passe" labelPlacement="outside" />
                                        <Input type="password" name="passwordRepeat" isRequired className="w-full" label="Retaper mot de passe" labelPlacement="outside" />
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <ReCAPTCHA ref={captcha} sitekey={"6LdTJMIoAAAAAL74aT4mOU3uJhEjuhHNXU8Asp11"} 
                                        onChange={handleCaptcha} />
                                    </div>
                                    <div className="flex flex-row gap-4 items-end justify-end">
                                        <Button type="submit" color="primary" isLoading={isLoading}>
                                            Enregistrer
                                        </Button>
                                        <Button type="button" color="danger" variant="light">
                                            Annuler
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Tab>
                       
                    </Tabs>
                </div> 
            </LayoutDashboard>
            {/* <Card css={{ mw: "330px" }}>
                <Card.Header>
                    Test
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ py: "$10" }}>
                    
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                   
                </Card.Body>
                <Card.Divider />
                <Card.Footer>
                    <Row justify="flex-end">
                    <Button size="sm" light>
                        Share
                    </Button>
                    <Button size="sm" color="secondary">
                        Learn more
                    </Button>
                    </Row>
                </Card.Footer>
            </Card> */}
            </div>
        </div>
    </Layout>
  );
}
export default page
