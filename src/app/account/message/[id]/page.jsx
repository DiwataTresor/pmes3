"use client"
import {useState,useEffect} from "react"
import Section from "@/app/components/section/Section"
import Section2 from "@/app/components/section/Section2"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
import {postData,getData} from "@/app/fcts/helper"
import {Button,Input,Textarea} from "@nextui-org/react"

const page=({params})=>{
    const [data,setData]=useState({});
    useEffect(()=>{
        getData("messageOne&idMsg="+params.id).then(r=>{
            setData(r.data);
        });
    },[])
    return(
        <MainLayout navigationBar="Message">
            <Section2 titre="Message entrant">
                <div className="flex gap-4 border-b py-3">
                    <Button size="sm" color="primary" startContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                      </svg>
                      
                    }>Repondre</Button>
                    <Button size="sm" color="primary" startContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                      
                    }>Mettre aux archives</Button>
                    <Button size="sm" color="danger" startContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      
                    }>Supprimer</Button>
                </div>
                <Section titre="Detail message">
                
                <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                        <div  className="w-[10%]">
                            Expediteur :
                        </div>
                        <div  className="w-[30%] rounded-md py-2 px-2">
                            <Input
                            isReadOnly
                            type="text"
                            name="destinataire"
                            label=""
                            labelPlacement={"outside-left"}
                            isReadOnly
                            value={data?.nom}
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div  className="w-[10%]">
                            Objet message :
                        </div>
                        <div  className="w-[30%] rounded-md py-2 px-2">
                            <Input
                            isReadOnly
                            name="objet"
                            type="text"
                            label=""
                            labelPlacement={"outside-left"}
                            placeholder="Votre objet"
                            isRequired
                            value={data?.objet}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        
                        <div  className="w-full rounded-md py-2 px-2">
                            <Textarea
                                isReadOnly
                                name="message"
                                isRequired
                                label="Message"
                                labelPlacement="outside"
                                placeholder="Enter your description"
                                className="max-w-full"
                                minRows={8}
                                value={data?.message}
                            />
                        </div>
                    </div>
                    
                </div>

               
                </Section>
            </Section2>
        </MainLayout>
    )
}
export default page