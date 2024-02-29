"use client"
import {useState,useEffect} from "react"
import Layout from "@/app/components/layouts/LayoutClient"
import {getSecteurBySlug} from "@/app/utils/data";
import {GlobalOutlined,HomeOutlined} from "@ant-design/icons"
import Link from "next/link"
import {Button,Avatar} from "@nextui-org/react"
import {MailIcon} from "@/app/components/icons/MailIcon"
import Entreprise from "@/app/components/profil/Entreprise"
import Section from "@/app/components/section/Section"
import Section2 from "@/app/components/section/Section2"
import { BACKEND_URL } from "@/app/fcts/helper";

const page=({params})=>{
    const [secteurs,setSecteurs]=useState([]);

    useEffect(()=>{
        getSecteurBySlug(params.secteur).then(r=>{
           
            setSecteurs(r.data);
        }).catch(err=>{
          
        })
    },[]);
    
    return(
        <Layout
            header={
                <div className="flex flex-col gap-3 justify-center items-center h-[250px] w-full" style={{backgroundSize:"cover", backdropFilter:30,backgroundPosition:"bottom", backgroundImage:`url(https://images.unsplash.com/photo-1652170226044-711dff674316?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk2fHxsaXN0fGVufDB8fDB8fHww)`}}>
                    {
                        secteurs[0]?.img?
                        <>
                            <Avatar src={BACKEND_URL+secteurs[0]?.img} size="lg" className="w-[100px] h-[100px]"  />
                        </>:
                        <svg width="31px" height="31px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.375 7.875C7.375 6.94039 7.375 6.47308 7.57596 6.125C7.70761 5.89697 7.89697 5.70762 8.125 5.57596C8.47308 5.375 8.94038 5.375 9.875 5.375L18.875 5.375C19.8096 5.375 20.2769 5.375 20.625 5.57596C20.853 5.70761 21.0424 5.89697 21.174 6.125C21.375 6.47308 21.375 6.94038 21.375 7.875C21.375 8.80962 21.375 9.27692 21.174 9.625C21.0424 9.85303 20.853 10.0424 20.625 10.174C20.2769 10.375 19.8096 10.375 18.875 10.375L9.875 10.375C8.94038 10.375 8.47308 10.375 8.125 10.174C7.89697 10.0424 7.70761 9.85303 7.57596 9.625C7.375 9.27692 7.375 8.80962 7.375 7.875Z" fill="#1C274C"></path> <path d="M7.375 16.875C7.375 15.9404 7.375 15.4731 7.57596 15.125C7.70761 14.897 7.89697 14.7076 8.125 14.576C8.47308 14.375 8.94038 14.375 9.875 14.375H15.875C16.8096 14.375 17.2769 14.375 17.625 14.576C17.853 14.7076 18.0424 14.897 18.174 15.125C18.375 15.4731 18.375 15.9404 18.375 16.875C18.375 17.8096 18.375 18.2769 18.174 18.625C18.0424 18.853 17.853 19.0424 17.625 19.174C17.2769 19.375 16.8096 19.375 15.875 19.375H9.875C8.94038 19.375 8.47308 19.375 8.125 19.174C7.89697 19.0424 7.70761 18.853 7.57596 18.625C7.375 18.2769 7.375 17.8096 7.375 16.875Z" fill="#1C274C"></path> <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M3.375 23.125C3.78921 23.125 4.125 22.7892 4.125 22.375L4.125 2.375C4.125 1.96079 3.78921 1.625 3.375 1.625C2.96079 1.625 2.625 1.96079 2.625 2.375L2.625 22.375C2.625 22.7892 2.96079 23.125 3.375 23.125Z" fill="#1C274C"></path> </g></svg>
                    }
                    <span className="text-indigo-500">{secteurs[0]?.secteur}</span>
                </div>
            }
        >
            <div className="px-[0%] mb-9 pb-9 bg-slate-100 h-full">
                <div className="flex flex-col justify-center mt-8">
                    <div className="flex flex-row gap-2 justify-center items-center">
                        <svg width="41px" height="41px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M12.5007 7.40986V21.9999H4.0807C2.9207 21.9999 1.9707 21.0699 1.9707 19.9299V5.08986C1.9707 2.46986 3.9307 1.27986 6.3207 2.44986L10.7507 4.63986C11.7107 5.10986 12.5007 6.35986 12.5007 7.40986Z" fill="#292D32"></path> <path d="M8.97 9.75H5.5C5.09 9.75 4.75 9.41 4.75 9C4.75 8.59 5.09 8.25 5.5 8.25H8.97C9.38 8.25 9.72 8.59 9.72 9C9.72 9.41 9.39 9.75 8.97 9.75Z" fill="#292D32"></path> <path d="M8.97 13.75H5.5C5.09 13.75 4.75 13.41 4.75 13C4.75 12.59 5.09 12.25 5.5 12.25H8.97C9.38 12.25 9.72 12.59 9.72 13C9.72 13.41 9.39 13.75 8.97 13.75Z" fill="#292D32"></path> <path opacity="0.6" d="M22 15.0499V19.4999C22 20.8799 20.88 21.9999 19.5 21.9999H12.5V10.4199L12.97 10.5199L17.01 11.4199L17.49 11.5299L19.53 11.9899C20.02 12.0899 20.47 12.2599 20.86 12.5099C20.86 12.5199 20.87 12.5199 20.87 12.5199C20.97 12.5899 21.07 12.6699 21.16 12.7599C21.62 13.2199 21.92 13.8899 21.99 14.8699C21.99 14.9299 22 14.9899 22 15.0499Z" fill="#292D32"></path> <path d="M12.5 10.4199V16.4199C12.96 17.0299 13.68 17.4199 14.5 17.4199C15.89 17.4199 17.01 16.2999 17.01 14.9199V11.4299L12.97 10.5299L12.5 10.4199Z" fill="#292D32"></path> <path d="M21.9898 14.8699C21.9198 13.8899 21.6198 13.2199 21.1598 12.7599C21.0698 12.6699 20.9698 12.5899 20.8698 12.5199C20.8698 12.5199 20.8598 12.5199 20.8598 12.5099C20.4698 12.2599 20.0198 12.0899 19.5298 11.9899L17.4898 11.5299L17.0098 11.4199V14.9199C17.0098 16.2899 18.1198 17.4199 19.5098 17.4199C20.8498 17.4199 21.9198 16.3699 21.9998 15.0599V15.0499C21.9998 14.9899 21.9898 14.9299 21.9898 14.8699Z" fill="#292D32"></path> </g></svg>
                        <span className="font-bold -mt-6">
                            {secteurs[0]?.utilisateurNom===null? <div className="mt-10">Aucune entreprise trouvée</div>:
                            <div>{secteurs.length} entreprise(s) trouvée(s)</div>
                                // secteurs?.length+" entreprise"+secteurs?.length>1 && "s  trouvée "+secteurs?.length>1 && "s"
                            } 
                              
                        </span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 justify-center items-center">
                        {
                            secteurs[0]?.utilisateurNom!==null && secteurs?.map(entreprise=>{
                                return(
                                    <Entreprise detail={entreprise} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default page