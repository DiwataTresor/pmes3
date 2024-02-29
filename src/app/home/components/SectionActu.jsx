import React, { useState, useEffect } from 'react'
import { Button, Radio, Space, Tabs } from 'antd';
import { BACKEND_URL, getData } from '@/app/fcts/helper';
import { nl2br } from 'react-js-nl2br';

import {Card, CardBody, Image, Slider} from "@nextui-org/react";


const SectionActu = () => {
    const [tabPosition, setTabPosition] = useState('right');
    const [actualites, setActualites] = useState([]);
    const changeTabPosition = (e) => {
        setTabPosition(e.target.value);
    };

    const DetailActu = ({ a }) => {
        return (
            <div className='flex gap-3 px-3 py-2'>
                {/* <div>
                    <img 
                        className='rounded-md shadow-md w-[45%]' 
                        src={BACKEND_URL+a.img} />
                </div>
                <div className='line-clamp-6'>{nl2br(a.contenu)}</div>
                <div>
                    <Button>Lire article </Button>
                </div> */}
                <Card
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 h-full max-w-[100%]"
                    shadow="sm"
                >
                    <CardBody>
                        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                            <div className="relative col-span-6 md:col-span-4">
                                <Image
                                    alt=""
                                    className="object-cover"
                                    height={200}
                                    shadow="md"
                                    src={BACKEND_URL+a.img}
                                    width="100%"
                                />
                            </div>
                          
                                <div className="flex flex-col col-span-6 md:col-span-8">
                                    <p className='font-bold mb-5'>{a.titre}</p>
                                    <p className='line-clamp-6 font-thin text-justify'>{nl2br(a.contenu)}</p>
                                    <div className='w-full justify-center items-center flex pt-4'>
                                        <Button href={`/actualite/detail/${a.slug}`}>Lire article</Button>
                                    </div>
                                </div>
                         
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }
    const setData = (data) => {
        let acts = [];
        data.map((a, i) => {
            acts.push({
                label: 
                <div>
                    <div className='flex gap-2'>
                        <Image src={BACKEND_URL+a.img} className='rounded-none' width="60" height={70} />
                        <div className='font-light text-sm'>{a.titre?.substr(0,40)}</div>
                    </div>
                    {/* <div className='line-clamp-1 text-sm flex-wrap flex-1'>{a.contenu}</div> */}
                </div>,
                key: i,
                children: <DetailActu a={a} />
            })
        })
        setActualites(acts);
        console.log(actualites);
    }
    useEffect(() => {
        getData("adminActualite&limit=5").then(r => {
            // setActualites(r.data);
            setData(r.data);
        });
    }, [])

    // let

    return (
        <div className='h-fit overflow-auto'>
            <Tabs items={actualites}
                tabPosition={'right'}
            // items={new Array(18).fill(null).map((_, i) => {
            //   const id = String(i + 1);
            //   return {
            //     label: <div>Merci  jkjskjkjska</div>,
            //     key: id,
            //     children: `Content of Tab ${id}`,
            //   };
            // })}
            />
        </div>
    )
}

export default SectionActu