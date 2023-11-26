"use client"
import {useEffect,useState} from "react"
import Layout from "@/app/components/layouts/LayoutClient"
import Dashboard from "@/app/components/layouts/LayoutDashboard"
import {Avatar,Tabs, Tab, Chip,Divider,Skeleton,Card,Button} from "@nextui-org/react"
import {HomeOutlined} from "@ant-design/icons"
import homeIcon from "@/app/components/icons/homeIcon.png"
import Image from "next/image"
import {postData,getData, API_URL,BACKEND_URL,VisiteSiteOfUserFromLink} from "@/app/fcts/helper"
import Link from "next/link"
import {CheckOutlined} from "@ant-design/icons"
import {Alert} from "antd"
import connexion1 from "@/assets/connexion1.jpg"
import moment from "moment"
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Section from "@/app/components/section/Section"
import Section2 from "@/app/components/section/Section2"



const page=({params})=>{
    const [profil,setProfil]=useState(null);
    const [motscles,setMotscles]=useState([])
    const [associationsaffiliees,setAssociationsaffiliees]=useState([])
    const [actualites,setActualites]=useState([])
    const [evenements,setEvenements]=useState([])

    const getMotscles=async(utilisateur)=>{
        await getData("getKeywordsByUser&id="+utilisateur).then(r=>{
            setMotscles(r.data);
        });
    }
    const getAssociationsaffiliees=async(utilisateur)=>{
        await getData("getAssociationsaffiliees&id="+utilisateur).then(r=>{
            setAssociationsaffiliees(r.data[0]);
            
        });
    }
    const getActualites=async(utilisateur)=>{
        await getData("actualites&id="+utilisateur).then(r=>{
            setActualites(r.data);
            
        });
    }
    const getEvenements=async(utilisateur)=>{
        await getData("evenements&id="+utilisateur).then(r=>{
            setEvenements(r.data);
            
        });
    }
    useEffect(()=>{
        let slug= params.profil;
        getData(`profil&colone=slug&v=${slug}`).then(r=>{
            setProfil(r.data);
            r.data?.id && getMotscles(r.data.id);
            r.data?.id && getAssociationsaffiliees(r.data.id);
            r.data?.id && getActualites(r.data.id);
            r.data?.id && getEvenements(r.data.id);
            

            if(localStorage.getItem("visiteJournalier"))
            {
                if(localStorage.getItem("visiteJournalier")!==moment().format("YYYY-MM-DD"))
                {
                    localStorage.setItem('visiteJournalier',`${moment().format("YYYY-MM-DD")}`);
                    postData("visiteProfil",{"profil":r.data.id}).then(r=>{

                    }).catch(r=>{
                        
                    })
                }
            }else
            {
                localStorage.setItem('visiteJournalier',`${moment().format("YYYY-MM-DD")}`);
                    postData("visiteProfil",{"profil":r.data.id}).then(r=>{

                    }).catch(r=>{
                        
                    });
            }
            
        }).catch(err=>{

        });
        
    },[]);
    return(
        <div className="bg-gray-100">
        <Layout 
            header={
            <div className="w-full bg-gray-100">
                {/* <div className="bg-slate-400 h-[200px] w-full text-sm">
                </div> */}
                <Image src={connexion1} className="h-[200px] w-full" />
                <div className="flex flex-col justify-center items-center bg-gray-100">
                    <h2 className="flex items-center justify-center -mt-[250px] text-white font-bold text-5xl">
                        {/* <Skeleton className="h-3 w-[200px] rounded-lg"/> */}
                        {profil?.nom || "[Organisation]"}
                    </h2>
                    {
                        profil?.logo!==null?
                        <div className="w-[150px] h-[150px] bg-gray-300 rounded-full absolute -mt-5 overflow-hidden border-2 shadow-sm">
                            <Zoom><img src={`${BACKEND_URL}${profil?.logo}`} className="w-[150px] h-[150px] rounded-ful overflow-hidden" /></Zoom>
                            {/* <Avatar isBordered icon={<Image src={BACKEND_URL + profil?.logo} />}  className="w-[100px] h-[100px] absolute" /> */}
                        </div>
                        :
                        <Avatar isBordered icon={<Image src={homeIcon} />}  className="w-[100px] h-[100px] absolute" />
                    }
                    {/* <Avatar isBordered icon={profil?.logo!==""?<img src={`${BACKEND_URL}${profil?.logo}`} />:<Image src={homeIcon} />}  className="w-[100px] h-[100px] absolute" /> */}
                </div>
                <div className="mt-[70px] bg-gray-100">
                    
                    <h4 className="flex items-center justify-center text-[10px]">
                    {profil?.description? <div className="text-[12px]">{profil?.description}</div> : 
                        <div>
                            <Skeleton className="w-full" />
                            <Skeleton className="w-full" />
                        </div>
                    }
                    </h4>
                </div>
            </div>
        }>
            <div className="flex flex-row gap-5 py-4">
            <div className="w-[400px]">
                {/* <Dashboard titre={<span className="font-bold text-red-500">Contact</span>} titreIcone={<div className="text-red-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg></div>}> */}
                <Section2 titre={<span className="font-bold">Contact</span>} titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>}>
                        {
                            profil ? 
                            <div className="flex flex-col gap-3">
                                <p>
                                    Adresse : <span className="text-sm text-blue-400">{profil?.adresse}</span>
                                </p>
                                <p>
                                    Téléhone : 
                                    {(!profil?.telephone && !profil?.telephone2) ? " : Aucun" :
                                        <span className="text-sm text-blue-400">
                                            {profil?.telephone}  
                                            {profil?.telephone2 && " / "+ profil.telephone2}
                                        </span>
                                    }
                                </p>
                                <p>
                                    Email : {profil?.emailAdresse?<Link href={`mailto:${profil?.emailAdresse}`} className="text-sm text-blue-400">{profil?.emailAdresse}</Link>:" Aucun"}
                                </p>
                                <p>
                                    Site Web : 
                                    <div>
                                        {profil?.siteweb?<Button color="primary" variant="light" onClick={()=>{VisiteSiteOfUserFromLink(profil?.id,profil?.siteweb)}} className="text-sm text-blue-400">{profil?.siteweb}</Button>:" Aucun"}
                                    </div>
                                    {profil?.siteweb2 && 
                                        <div>{profil?.siteweb2?<Button color="primary" variant="light" className="text-sm text-blue-400">{profil?.siteweb2}</Button>:" Aucun"}
                                        </div>
                                    }
                                </p>
                            </div>:
                            <div>
                                <Skeleton className="rounded-lg">
                                    <div className="h-24 rounded-lg bg-default-300"></div>
                                </Skeleton>
                                <div className="space-y-3">
                                    <Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-2/5 rounded-lg">  
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                    </Skeleton>
                                </div>
                            </div>
                        }
                </Section2>
                <Section2 titre="Localisation" titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>}>
                    <div className="flex flex-col gap-3">
                        <p>
                            Province : <span className="text-sm">{profil?.provincenom}</span>
                        </p>
                        <p>
                            Territoire : <span className="text-sm">{profil?.territoire}</span>
                        </p>
                        <p>
                            Ville : <span className="text-sm">{profil?.ville}</span>
                        </p>
                        
                    </div>
                </Section2>
                <Section2 titre="Réseaux sociaux" titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>}>
                    <div className="flex flex-col gap-3">
                        <p>
                            whatsapp : {profil?.whatsapp?<span className="text-sm">{profil.whatsapp}</span>:<span className="text-sm">Aucun</span>}
                        </p>
                        <p>
                            Facebook : {profil?.Facebook?<span className="text-sm">{profil.Facebook}</span>:<span className="text-sm">Aucun</span>}
                        </p>
                        <p>
                            linkedin : {profil?.linkedin?<span className="text-sm">{profil.linkedin}</span>:<span className="text-sm">Aucun</span>}
                        </p>
                        <p>
                            x : {profil?.twitter?<span className="text-sm">{profil.twitter}</span>:<span className="text-sm">Aucun</span>}
                        </p>
                        <p>
                            youtube : {profil?.youtube?<span className="text-sm">{profil.youtube}</span>:<span className="text-sm">Aucun</span>}
                        </p>
                        <p>
                            tiktok : {profil?.tiktok?<span className="text-sm">{profil.tiktok}</span>:<span className="text-sm">Aucun</span>}
                        </p>
                    </div>
                </Section2>
            </div>
            <div className="w-full">
                <Section titre="Informations">
                    <div className="flex flex-col gap-3">
                        {profil!==null?
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row gap-7">
                                    <p>
                                        RCCM : {profil.rccm?<Chip className="text-sm font-bold">{profil.rccm}</Chip>:<span>Aucun</span>}
                                    </p>
                                    <p>
                                        IDNAT : {profil.idnat?<Chip className="text-sm font-bold">{profil.idnat}</Chip>:<span>Aucun</span>}
                                    </p>
                                </div>
                            
                                <div>
                                    <p>Associations / organisation affilliées</p>
                                    <div className="flex gap-4 mt-4">
                                        {(associationsaffiliees && associationsaffiliees!=={})?
                                            <div>
                                                {
                                                associationsaffiliees?.fec==="true" && <Chip color="success" className="font-bold text-white"><CheckOutlined style={{color:"white"}} /> FEC</Chip>
                                                }
                                                {
                                                associationsaffiliees?.copemeco==="true" && <Chip color="success" className="font-bold text-white"><CheckOutlined style={{color:"white"}} /> COPEMECO</Chip>
                                                }
                                                {
                                                associationsaffiliees?.fenapec==="true" && <Chip color="success" className="font-bold text-white"><CheckOutlined style={{color:"white"}} /> FENAPEC</Chip>
                                                }
                                                {
                                                associationsaffiliees?.fnje==="true" && <Chip color="success" className="font-bold text-white"><CheckOutlined style={{color:"white"}} /> FNJE</Chip>
                                                }
                                                {
                                                associationsaffiliees?.autre!=="" && <Chip color="success" className="font-bold text-white"><CheckOutlined style={{color:"white"}} /> {associationsaffiliees?.autre}</Chip>
                                                }
                                            </div>:
                                            <div className="flex items-center justify-center">Aucun enregistré</div>
                                        }
                                    </div>
                                </div>
                                
                            </div>:
                            
                            <div className="space-y-3">
                                <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-2/5 rounded-lg">  
                                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                </Skeleton>
                            </div>
                        }
                    </div>
                </Section>
                <Section titre="Actualités / Evénements">
                    <div className="flex flex-col gap-3">
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
                                
                                <span>Actualités</span>
                                <Chip size="sm" variant="faded">{actualites?.length}</Chip>
                                </div>
                            }
                            >
                                <div>
                                    {
                                        actualites?.length<1?
                                        <div>Aucune actualité trouvée pour le moment</div>:
                                        actualites?.map((e)=>{
                                            return(
                                                <Alert className="w-full h-full mb-5" message={<div className="flex gap-2 mb-2 ">
                                                    <img src={BACKEND_URL+e.img} className="w-[150px] h-[150px] rounded-md" />
                                                    <div className="flex-1">
                                                        <div className="flex justify-end items-end w-full">
                                                            <Chip color="primary" className="text-sm">Publiée le {moment(e.dateEnr).format("DD/MM/YYYY")}</Chip>
                                                        </div>
                                                        <h1 className="text-center ietms-center font-bold justify-center flex">{e.titre}</h1>
                                                        <div className="w-full h-full">{e.description}</div>
                                                    </div>
                                                </div>} />
                                            )
                                        })
                                    }
                                </div>
                            </Tab>
                            <Tab
                            key="music"
                            title={
                                <div className="flex items-center space-x-2">
                                
                                <span>Evènements</span>
                                <Chip size="sm" variant="faded">{evenements?.length}</Chip>
                                </div>
                            }
                            >
                                <div>
                                    {
                                        evenements?.length<1?
                                        <div>Aucune événement trouvé pour le moment</div>:
                                        evenements?.map((e)=>{
                                            return(
                                                <Alert className="w-full h-full mb-5" message={
                                                    <div className="flex gap-2 mb-2 ">
                                                    <img src={BACKEND_URL+e.img} className="w-[150px] h-[150px] rounded-md" />
                                                    <div className="flex-1">
                                                        <div className="flex justify-center items-center w-full">
                                                            <Chip color="primary" className="text-sm">Du {moment(e?.dateDebut).format("DD/MM/YYYY")} - {moment(e?.dateFin).format("DD/MM/YYYY")}</Chip>
                                                        </div>
                                                        <h1 className="text-center ietms-start font-bold justify-start flex">{e?.nom}</h1>
                                                        <div className="w-full h-full">{e?.description}</div>
                                                    </div>
                                                </div>} />
                                            )
                                        })
                                    }
                                </div>
                            </Tab>
                            <Tab
                            key="videos"
                            title={
                                <div className="flex items-center space-x-2">
                                
                                <span>Autres publications</span>
                                {/* <Chip size="sm" variant="faded">1</Chip> */}
                                </div>
                            }
                            />
                        </Tabs>
                    </div>
                </Section>
            </div>
            </div>
        </Layout>
        </div>
    )
}
export default page