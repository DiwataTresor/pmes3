"use client";
import React from 'react'
import Section2 from '../components/section/Section2'
import LayoutClient from '../components/layouts/LayoutClient';
import { BACKEND_URL, getData } from '../fcts/helper';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { Image } from '@nextui-org/react';
import Link from 'next/link';
import moment from 'moment';

const CardActualite=({data})=>{
  console.log(data);
  return(<div className='w-full '>
    <Link href={`/actualite/detail/${data?.slug}`}>
    <div>
      <div className='text-[13px] text-center line-clamp-1 mb-3'>{data?.titre}</div>
      <Image src={BACKEND_URL+data.img} />
    </div>
    <div className='flex flex-col gap-3'>
      <div className='text-sm text-justify line-clamp-2 font-thin'>{data?.contenu}</div>
      <div className=' line-clamp-2 font-thin text-[10px] italic text-center'>Publié le {moment(data?.datePub).format("DD/MM/YYYY HH:mm:SS")}</div>
      </div>
      </Link>
  </div>)
}
const page = () => {
  const [actualites, setActualites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getData("adminActualite").then(r => {
      setIsLoading(false);
      setActualites(r.data);
    })
  }, [])

  return (
    <LayoutClient
      header={<div className='h-[250px]  pt-[80px] text-center w-full flex-1 bg-cover' style={{ backgroundSize: "cover", backgroundPosition: "bottom", backgroundImage: `url(https://images.unsplash.com/photo-1597212720428-ec423c8612ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG5ld3MlMjBibGFja3xlbnwwfHwwfHx8MA%3D%3D)` }}>
        <span className='text-3xl text-indigo-500 font-bold'>Actualités du Business</span>
      </div>}>
      <Spin spinning={isLoading}>
        <Section2
          displayIcon={false}
          titre={""}
        >
          {
            actualites?.length<1?
              <div className='items-center justify-center flex '>Aucune actualité pour l'instant</div>:
              <div className='grid grid-cols-4 gap-3'>
                {
                  actualites?.map((actualite,i)=>(
                    <CardActualite key={i} data={actualite} />
                  ))
                }
              </div>
          }
        </Section2>
      </Spin>
    </LayoutClient>
  )
}

export default page