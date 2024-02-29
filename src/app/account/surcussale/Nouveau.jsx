import { postData } from '@/app/fcts/helper';
import { getVilles } from '@/app/utils/data';
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { Modal, notification } from 'antd';
import React, { useEffect, useState } from 'react'

const Nouveau = ({callBack}) => {
    const [isLoading,setIsLoading]=useState(false);
    const [api,contextHolder]=notification.useNotification();
    const [villes,setVilles]=useState([]);
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        let f=Object.fromEntries(new FormData(e.target));
        Modal.confirm({
            title:"Surcussale",
            content:"Voulez-vous vraiment enregistré ?",
            okText:"Oui",
            cancelText:"Annuler",
            onOk:()=>{
                setIsLoading(true);
                postData("surcussale",f).then((r)=>{
                    if(r.success){
                        api.open({
                            type:"success",
                            message:"surcussale",
                            description:"Bien enregistré"
                        });
                        document.getElementById("f").reset();
                        callBack();
                    }else{
                        api.open({
                            type:"error",
                            message:"surcussale",
                            description:"Echec d'enregistrement"
                        })
                    }
                   
                }).finally(()=>{
                    setIsLoading(false);
                });
            }
        })
    }
    useEffect(()=>{
        getVilles().then((r)=>{
            console.log(r);
            setVilles(r.data)
        });
       
    },[]);
  return (
    <>
    {contextHolder}
        <form onSubmit={handleSubmit} id='f'>
            <div className='flex flex-col gap-5 p-6'>
                <div className='flex gap-3'>
                    <Select isRequired name='ville' size='sm' label="Ville/Commune" defaultSelectedKeys={""} labelPlacement='outside'>
                        <SelectItem key={""} value={""}>--Selectionner</SelectItem>
                        {
                            villes?.map((ville) =>(
                                <SelectItem key={ville.id} value={ville.id}>{ville.ville}</SelectItem>
                            ))
                        }
                    </Select>
                    <Input name='adresse' size='sm' label="Adresse" labelPlacement='outside' />
                </div>
                <div className='flex gap-3'>
                    <Input name='telephone' size='sm' label="Téléphone" labelPlacement='outside' />
                    <Input name='telephone2' size='sm' label="Téléphone 2" labelPlacement='outside' />
                </div>
                <div className='flex gap-3'>
                    <Input name='emailAdresse' size='sm' label="Email" labelPlacement='outside' />
                    <div>&nbsp;</div>
                </div>
                <div className='justify-center flex'>
                    <Button isLoading={isLoading} type='submit' color='primary'>Enregistrer</Button>
                </div>
            </div>
        </form>
    </>
  )
}

export default Nouveau