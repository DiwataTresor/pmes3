"use client"
import React, { useEffect, useState } from 'react';
import { message, Modal, Spin, Steps, theme } from 'antd';
import LayoutDashboardMain from '@/app/components/layouts/LayoutDashboardMain';
import LayoutDashboard from '@/app/components/layouts/LayoutDashboard';
import { ArrowLeft, ArrowLeftFromLine, ArrowRight, BadgePlusIcon, CheckCheck, FileWarningIcon } from 'lucide-react';
import { Button } from '@nextui-org/react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { getData, postData } from '@/app/fcts/helper';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



const page = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [abonnementSelected,setAbonnementSelected] = useState(null);
    const [nbreAnnee,setNbreAnnee] = useState(1);
    const [isLoading,setIsLoading] = useState(false);
    const [spinning,setSpinning]=useState(true);
    const [processDemand,setProcessDemand] = useState(true);
    const [modalOpened,setModalOpened] = useState(false);
    const [modalContent,setModalContent] = useState("");
    const router=useRouter();

    const setSelected = (v) =>{
        setAbonnementSelected(v);
    }
    const setNewNbreAnnee = (v) =>{
        
        setNbreAnnee(parseInt(v));
    }

    const steps = [
        {
            title: 'Etape 1',
            content: <Step1 selected={abonnementSelected} setSelected={setSelected} />,
        },
        {
            // title: 'Durée abonnement',
            title: 'Etape 2',
            content: <Step2 nbreAnnee={nbreAnnee} setNewNbreAnnee={setNewNbreAnnee} />,
        },
        {
            title: 'Confirmation',
            content: <Step3 />,
        },
    ];


    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    const handleSubmit=()=>{
        setIsLoading(true);
        postData("demandeAbonnement",{profil:JSON.parse(Cookies.get("profil")).id,"nbreAnnee":nbreAnnee,"typeAbonnement":abonnementSelected})
        .then(r=>{
            setIsLoading(true);
            if(r.success)
            {
                message.success("Votre demamde est bien envoyée");
                router.replace("/account/dashboard");

            }else
            {
                message.error("Votre demande ne peut être envoyée pour l'instant")
            }
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const init=()=>{
       
        getData("abonnementNewInit").then(r=>{
            
            if(r.data){
                setProcessDemand(false);
               
            }else
            {
                setProcessDemand(true)
            }
        }).finally(()=>{
            setSpinning(false)
        });
    }
    const abortDemand=()=>{
        Modal.confirm({
            title:"Demande abonnement",
            content:"Voulez-vous vraiment annuler votre demande en cours ?",
            okText:"Oui",
            cancelText:"Annuler",
            onOk:()=>{
                setSpinning(true);
                postData("abonnementAbort").then((r)=>{
                    if(r.success){
                        setModalContent(<div className='flex flex-col text-xl justify-center items-center'>
                            <div><Image src={"/check.png"} width={70} height={70} /></div>
                            {r.msg}
                        </div>)
                        setModalOpened(true);
                    }else{
                        setModalContent(r.msg);
                        setModalOpened(true);
                    }
                }).finally(()=>{
                    setSpinning(false);
                })
            }
        })
    }
    useEffect(()=>{
        setAbonnementSelected(JSON.parse(Cookies.get("profil")).typeabonnement=="B"?"F":JSON.parse(Cookies.get("profil")).typeabonnement);
        init()
    },[]);
    
    return (
        <LayoutDashboardMain>
            {/* <Image src={"/check_gif.gif"} width={100} height={100} /> */}
            <Spin spinning={spinning}>
            <LayoutDashboard titre={"Nouvel Abonnement"} titreIcone={<BadgePlusIcon />}>
            {
                processDemand?
                <>
                    <Steps current={current} items={items} />
                    <div className='w-full min-h-[140px] bg-white pt-8 px-3'>{steps[current].content}</div>
                    <div
                        style={{
                            marginTop: 24,
                        }}
                        className='flex items-center justify-center'
                    >
                        {current < steps.length - 1 && (
                            <Button color="primary" startContent={<ArrowRight />} onPress={() => next()}>
                                Suivant
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button isLoading={isLoading} color="primary" startContent={<CheckCheck />} onPress={()=>{handleSubmit()}}>
                                Terminer
                            </Button>
                        )}
                        {current > 0 && (
                            <Button
                                style={{
                                    margin: '0 8px',
                                }}
                                onPress={() => prev()}
                                color='primary'
                                startContent={<ArrowLeft />}
                            >
                                Precedent
                            </Button>
                        )}
                    </div>
                </>:
                <>
                    <div className='flex flex-col items-center justify-center text-justify'>
                        <FileWarningIcon />
                        <p className='mt-3'>Desolé, vous avez déjà une demande d'abonnement en cours, attendez que cela soit traitée.</p>
                        <p className='mt-4'>
                            Soit vous pouvez annuler la demande en cours
                        </p>
                        <div className='mt-3'><Button color='success' className='text-white' size='md' variant='solid' onPress={()=>{
                            abortDemand();
                        }}>Annuler la demande en cours</Button></div>
                    </div>
                </>
               }
            </LayoutDashboard>
            </Spin>
            <Modal open={modalOpened} closable={false} footer={false}>
                {modalContent}
                <div className='flex items-center justify-center mt-6'>
                    <Button color='primary' onPress={()=>setModalOpened(false)}>Continuer</Button>
                </div>
            </Modal>
        </LayoutDashboardMain>
    );
};
export default page;