"use client"
import React, { useEffect, useState } from 'react'
import Layout from "@/app/components/layouts/LayoutClient"
import { BACKEND_URL, getData } from '@/app/fcts/helper';
import { Image } from '@nextui-org/react';
import { MapPin } from 'lucide-react';

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
                        <div>
                            <div className='font-bold text-2xl mb-4 text-blue-950'>{produit.nom}</div>
                            <div className='flex gap-2 italic text-sm'><MapPin />{produit.proprietaire} - {produit.lieu}</div>
                            <div>{produit?.lien && <a href={produit?.lien}>Lien de l'article</a>}</div>
                            <hr className='my-3' />
                            <div className='text-justify'>
                                {produit.description}
                            </div>
                            
                        </div>
                    </div>
            }
        </Layout>
    )
}

export default page