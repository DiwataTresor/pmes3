"use client"

import React, { useEffect, useState } from 'react'
import { deleteData, getData } from '@/app/fcts/helper'
import { DeleteFilled, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Divider, Modal, Skeleton, Switch,notification } from 'antd';
import { Mail, Map, Phone } from 'lucide-react';



const { Meta } = Card;
const Detail = ({data,callBack}) => {
   const [api,contextHolder]=notification.useNotification();
    const [loading, setLoading] = useState(true);
    const onChange = (checked) => {
        setLoading(!checked);
    };
    return (
        <>
        {contextHolder}
            <Card
                style={{
                    width: 300,
                    marginTop: 8,
                }}
                actions={[
                    <EditOutlined key="edit" />,
                    <div onClick={()=>Modal.confirm(
                        {
                            title:"Surcussale",
                            content:"Voulez-vous vraiment supprimer ces données ?",
                            okText:"Oui",
                            cancelText:"Annuler",
                            onOk:()=>{
                                deleteData("surcussale",{id:data.surcussaleId}).then(r=>{
                                    if(r.success)
                                    {
                                        api.success({
                                            message:"Suppression",
                                            description:"Données bien supprimées"
                                        })
                                        callBack();
                                    }else
                                    {
                                        api.error({
                                            message:"Suppression",
                                            description:"Echec de suppression des données"
                                        })
                                    }
                                });
                            }
                        }
                    )}><DeleteFilled key="ellipsis" /></div>,
                ]}
            >
                    {
                        data!==undefined?
                        <div>
                            <p className='text-center'>{data?.ville}</p> <Divider />
                            <div className='flex flex-col gap-3'>
                                <p className='flex gap-2 text-[12px] items-center'><Map size={11} />Adresse : {data?.adresse}</p>
                                <p className='flex gap-2 text-[12px] items-center'><Phone size={11} />Téléphone : {data?.telephone} - {data?.telephone2} </p>
                                <p className='flex gap-2 text-[12px] items-center'><Mail size={11} />Email : {data?.emailAdresse}</p>
                            </div>
                        </div>:
                        <Skeleton loading={loading} avatar active>
                                <Meta
                                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                        </Skeleton>
                    }
            </Card>
        </>
    );
}
const Liste = ({ data,isLoaded,reload }) => {
   const _callBack=()=>{
    reload()
   }
    return (
        <div className='flex gap-2'>
            {
                  !isLoaded && <Detail />
            }
            {
                data?.length>0 && data?.map((surcussale) => (
                    <Detail data={surcussale} reload={reload} callBack={_callBack} />
                ))
            }
        </div>
    )
}

export default Liste