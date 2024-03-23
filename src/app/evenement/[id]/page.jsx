"use client"
import LayoutClient from '@/app/components/layouts/LayoutClient'
import { BACKEND_URL, getData } from '@/app/fcts/helper';
import { Image } from '@nextui-org/react';
import { CalendarCheck, Info, User2Icon } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const [detail, setDetail] = useState();
    useEffect(() => {
        getData(`admEvenement&evenementId=${params.id}`)
            .then((d) => {
                console.clear()
                console.log(d);
                setDetail(d.data);
            })
    }, []);
    return (
        <LayoutClient hideHeader={true}>
            <div className='mt-4 mb-10'>
                <div className='border-b mb-4'>
                    <div className='flex justify-center items-center gap-4 text-black font-bold text-xl mb-4 text-center'>
                        {/* <User2Icon />  */}
                        {/* Organisateur : */}
                        <div className='text-center flex gap-3 justify-center items-center'>
                            <span>{detail?.nom}</span>
                            
                        </div>
                    </div>
                </div>
                <div className='flex gap-3'>
                    
                    <div>
                        <div>
                            <div className='flex gap-4 text-blue-800 font-bold text-xl mb-4'>
                                <User2Icon /> Organisateur :
                                <div className='text-center flex gap-3'>
                                    <span>{detail?.organisateur}</span>
                                    
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-4 text-blue-800 font-bold text-xl mb-4'>
                                <CalendarCheck /> Date :
                                <div className='text-center flex gap-3'>
                                    <span>{moment(detail?.dateDebut).format("DD/MM/YYYY")}</span>
                                    <span>{moment(detail?.dateFin).format("DD/MM/YYYY")}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-4 text-blue-800 text-xl mb-4 '>
                                <Info /> Description
                            </div>
                            <div className='flex gap-4'>
                                <div className=''>
                                    <Image src={BACKEND_URL+detail?.img} width={"1300px"} height={"1300px"} />
                                </div>
                                <div className='text-justify' dangerouslySetInnerHTML={{__html:detail?.description}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutClient>
    )
}

export default page