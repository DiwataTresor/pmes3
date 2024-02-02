"use client"
import { Tabs, Slider, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
// Pour slide coté Backoffice
// import Section from '../../components/layouts/section/Section'

// POur slide coté client
import Section from '../section/Section'
import thumb1 from "./modele_slide_1/thumb.png"
import user1 from "./modele_slide_1/user.png"
import thumb2 from "./modele_slide_1/thumb2.png"
import thumb3 from "./modele_slide_1/thumb3.png"

import Image from 'next/image'
import { Delete, Edit2Icon, PencilIcon } from 'lucide-react'
import { Button, Checkbox, Input } from '@nextui-org/react'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import Slide1 from "./modele_slide_1/Slide";
import { deleteData, getData } from '../../fcts/helper'
import Slide from './modele_slide_1/Slide'
import Link from 'next/link'
import {Modal as ModalAnt} from "antd"

// Pour backoffice
// import { postData } from '../utils/helper'

// Pour cote client
import { postData } from '../../fcts/helper'
import { Toast,Toaster,toast } from 'react-hot-toast'


const Nouveau = () => {
    const [slides,setSlides]=useState([]);
    const [newId,setNewId] = useState(null);
    const [spinning,setSpinning] =useState(false);
    
    const getDatas=()=>{
        getData("slides&ordre=id").then((data) => {
            setSlides(data.data);
            //console.log(data.data.length);
            let lastId=data.data.slice(-1);
            setNewId(lastId[0]?.id+1);
        })
    }
    useEffect(() => {
       getDatas();
    },[]);
    const addSlide=(typeSlide=1,id) => {
        ModalAnt.confirm({
            title:"Ajout slide",
            content:"Voulez-vous vraiment ajouter",
            okText:"Oui",
            cancelText:"Annuler",
            onOk: () => {
                let slidesCopy=[...slides];
                slidesCopy.push({id:newId,typeSlide:typeSlide,mode:"new"})
                setSlides(slidesCopy);
            }
        })
    }
    const deleteSlide=(id) => {
        ModalAnt.confirm({
            title:"Suppression",
            content:"Voulez-vous vraiment supprimer",
            okText:"Oui",
            cancelText:"Annuler",
            onOk: () => {
                deleteData("slide",{"id":id}).then(r=>{
                    console.clear()
                    console.log(r);
                    if(r.success) {
                        getDatas();
                        toast.success("Bien supprimé");
                    }
                });
            }
        })
        
    }
    return (
        <div>
            {/* <Toaster /> */}
            <div className='flex flex-col gap-3 px-3'>
                <p className='text-start text-xl'>Modeles</p>
                <div className='w-full flex gap-3 overflow-x-scroll py-3'>
                    <Image alt='' className='hover:cursor-pointer hover:border rounded-md' onClick={() => addSlide(1,1)} src={thumb1} width={230} height={150} />
                    <Image alt='' className='hover:cursor-pointer hover:border rounded-md' onClick={() => addSlide(2,3)} src={thumb2} width={230} height={150} />
                    <Image alt='' className='hover:cursor-pointer hover:border rounded-md' onClick={() => addSlide(3,3)} src={thumb3} width={230} height={150} />

                </div>
                <div className='flex flex-col gap-3 pr-3'>
                
                       <Spin spinning={spinning}>
                        {
                            slides.map((slide, index) =>
                            (
                                <div className='bg-gray-100 rounded-md mb-3 p-3'>
                                    <div className='flex justify-end items-end gap-4'>
                                        <Button color='primary'>
                                            <Link href={`slide/edit/${slide.id}`} className='text-end items-end justify-end flex w-fit  rounded-full px-3 py-1 gap-1 '>
                                                <Edit2Icon size={14} /> Editer
                                            </Link>
                                        </Button>
                                        <Button color='primary' onPress={()=>deleteSlide(slide.id)}>
                                            <Delete size={14} /> Supprimer
                                        </Button>
                                    </div>
                                    <Slide key={index} idSlide={slide.id} typeSlide={slide.typeSlide} mode={slide.mode||null} />
                                </div>
                            ))
                        }
                    </Spin>
                </div>
            </div>
           
        </div>
    )
}
const Liste = () => {
    return (
        <div>Liste</div>
    )
}
const page = () => {
    const items = [
        {
            label: "Nouveau",
            children: <Nouveau />,
            key: "nouveau"
        },
        {
            label: "Liste",
            children: <Liste />,
            key: "liste"
        }
    ];
    return (
        <Section titre={"Gestion slide"}>
            <Tabs items={items} />
        </Section>
    )
}

export default page