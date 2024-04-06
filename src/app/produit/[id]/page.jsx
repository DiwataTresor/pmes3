"use client"
import React, { useEffect, useState } from 'react'
import Layout from "@/app/components/layouts/LayoutClient"
import { BACKEND_URL, getData } from '@/app/fcts/helper';
import { Image } from '@nextui-org/react';
import { Globe, MapPin } from 'lucide-react';
import { nl2br } from 'react-js-nl2br';


const page = ({ params }) => {
    const id = params.id;
    const [produit, setProduit] = useState(null);
    useEffect(() => {
        getData(`produit&produitId=${id}`).then(r => setProduit(r.data));
    }, []);
    return (
        <Layout hideHeader={true}>
            {
                produit == null ?
                    <div className='text-center text-lg pt-36'>Traitement en cours...</div> :
                    <div className='flex flex-row gap-5 p-9'>
                        <div>
                            <Image isZoomed src={BACKEND_URL + produit?.img} className='object-center max-w-[300px]' />
                        </div>
                        <div className='flex flex-col gap-4 justify-center items-center w-full'>
                            <div className='font-bold text-2xl mb-4 text-blue-950'>{produit.nom}</div>
                            <div className='flex gap-2 italic text-sm'><MapPin />{produit.proprietaire} - {produit.lieu}</div>
                            <div>{produit?.lien && <a href={produit?.lien} className='flex gap-3'><Globe size={18} /> Lien de l'article</a>}</div>
                            <hr className='my-3' />
                            <div className='text-justify'>
                                {nl2br(produit.description)}
                            </div>
                            
                        </div>
                    </div>
            }
        </Layout>
    )
}

export default page