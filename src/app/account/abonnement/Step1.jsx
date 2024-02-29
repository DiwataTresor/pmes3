import { CheckCircleFilled, GoldFilled } from '@ant-design/icons'
import { Chip } from '@nextui-org/react';
import { ArrowRight, Award, Check } from 'lucide-react'
import React, { useState } from 'react'
import { typeAbonnement as ta } from '@/app/utils/data';
const Step1 = ({ selected, setSelected }) => {
    const [abonnementSelected, setAbonnementSelected] = useState(selected);


    const Card = ({ children, bgHeader, description, devise, montant, unite, typeAbonnement }) => {
        return (
            <div onClick={() => setSelected(typeAbonnement)} className={`${typeAbonnement == selected && " relative border-2 border-green-700"} hover:border-blue-500 hover:cursor-pointer rounded-md min-h-[350px] border w-[340px]  overflow-hidden ${typeAbonnement == selected ? "shadow-xl" : "shadow-md"}`}>
                <div className=''>
                    <div className='rounded-b-[130%/130%] bg-blue-300  h-[150px] text-white gap-2 flex flex-col items-center justify-center'>
                        <div className='flex items-center justify-center'>
                            <span className='font-bold text-lg'>{devise && devise}</span>
                            <span className='font-bold text-3xl'>{montant}</span>
                            <span className='font-bold text-lg'>{unite && "/" + unite}</span>
                        </div>
                        <div className='text-2xl flex gap-4'>
                        <Chip className='text-white' color={typeAbonnement==selected?"success":"danger"} size='lg'> {ta[typeAbonnement]}</Chip>
                        </div>
                    </div>
                    <div className='h-[80px] border-b font-thin text-gray-400 mx-7 text-[14px] text-center pt-3'>
                       {description}
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        {children}
                    </div>
                </div>
            </div>
            // <div onClick={()=>setSelected(typeAbonnement)} className={`${typeAbonnement==selected && " relative border-2 border-blue-500"} hover:border-blue-500 hover:cursor-pointer rounded-md min-h-[400px] border w-[340px]  overflow-hidden ${typeAbonnement==selected?"shadow-xl":"shadow-md"}`}>
            //     <div className={`${typeAbonnement==selected && "border-b-blue-500 text-blue-500"} ${bgHeader || "border-b "} h-[50px] font-bold text-xl justify-center items-center flex`}>
            //         <span className='flex gap-4 justify-center items-center'>
            //             {typeAbonnement==selected && <ArrowRight size={15} />}
            //             {titre}
            //         </span>
            //     </div>
            //     <div className='p-3 text-center mt-4 flex flex-col justify-between items-center'>
            //         {children}
            //     </div>
            // </div>
        )
    }
    const titre = "font-extrabold text-xl text-orange-400";
    return (
        <div>
            <p className='text-center border-b py-3 mb-4 rounded-md bg-gray-200'>
                Selectionner votre nouveau type d'abonnement
            </p>
            <div className='flex gap-4 lg:flex-row flex-col' bgHeader={"transparent"}>
                <Card titre={<div>Pack Free</div>} montant={"Gratuit"} typeAbonnement={"F"} description={"Faites connaitre votre organisation en un seul click"}>
                    <div className='flex gap-3 justify-center mt-4'>
                        {/* <CheckCircleFilled color='green' /> <span>Inscritpion surcussaless</span> */}
                    </div>
                </Card>
                <Card titre={<div>Pack Pro</div>} unite={"An"} devise={"$"} montant={24.00} typeAbonnement={"P"} description={"Faites connaitre votre organisation en un seul click"}>
                <div className='flex gap-3 justify-center mt-4'>
                        {/* <CheckCircleFilled color='green' /> <span>Inscritpion surcussale</span> */}
                    </div>
                </Card>
                <Card titre={<div>Pack Konzo</div>} unite={"An"} devise={"$"} montant={76.00} typeAbonnement={"K"} description={"Faites connaitre votre organisation en un seul click"}>
                    <div className='flex gap-3 justify-center mt-4'>
                        {/* <CheckCircleFilled color='green' /> <span>Inscritpion surcussale</span> */}
                    </div>
                </Card>
                <Card titre={<div>Pack Premium</div>} unite={"Devis sur demande"} typeAbonnement={"X"} description={"Faites connaitre votre organisation en un seul click"}>
                    <div className='flex gap-3 justify-center mt-4'>
                        {/* <CheckCircleFilled color='green' /> <span>Inscritpion surcussale</span> */}
                    </div>
                </Card>
            </div>
            <p className='mt-5 text-center text-xl'>
                Vous pouvez telecharger un fichier qui detaille chaque package sur <a href='/packages.pdf' target='_blank' className='text-blue-400 font-bold'>le lien suivant</a>:  
            </p>
        </div>
    )
}

export default Step1