"use client"
import Titre from '@/app/components/Titre'
import LayoutClient from '@/app/components/layouts/LayoutClient'
import { getData } from '@/app/fcts/helper'
import React, { useState,useEffect } from 'react'
import { nl2br } from 'react-js-nl2br'

const page = ({ params }) => {
    const [info, setInfo] = useState(null);
    useEffect(() => {

        getData(`getInfoutile&idInfo=${params.id}`).then((i) => {
            setInfo(i.data);
        })
    }, [])
    return (
        <LayoutClient hideHeader={true}>
            <div className='mt-5'>
                {/* <div className='bg-blue-500 py-2'>sjdjsk {params.id}</div> */}
                <Titre titre={info?.titre} cls={"font-bold text-2xl text-center"} />
                <div className='text-start mb-5 font-bold text-xl underline'>Concerne : {info?.concerne}</div>
                <div className='text-justify'>
                    {nl2br(info?.description)}
                </div>
                {/* <div>
                    Par {info?.}
                </div> */}
            </div>
        </LayoutClient>
    )
}

export default page