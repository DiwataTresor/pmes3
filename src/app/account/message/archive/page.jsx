"use client"
import {useEffect,useState} from "react";
import { myContainerDashboard, titrePrincipal } from "@/app/style/global";
import Layout from "@/app/components/layouts/LayoutDashboard"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
import {MessageOutlined} from "@ant-design/icons"
import {postData,getData} from "@/app/fcts/helper"
import {Divider,Alert,Modal,Spin} from "antd"
import Tableau from "@/app/components/table/Tableau"
import {LockOutlined,UnlockOutlined} from "@ant-design/icons"
import {Button} from "@nextui-org/react"
import {Edit} from "@/app/components/icons/Edit"
import {Delete} from "@/app/components/icons/Delete"
import {Eye} from "@/app/components/icons/Eye"
import {MailIcon} from "@/app/components/icons/MailIcon"
import moment from "moment"
import Link from "next/link"
import { Toaster,toast } from 'sonner';
import Cookies from "js-cookie";

const page=()=>{
    const [msgNL,setMsgNL]=useState(0);
    const [msgArchive,setMsgArchive]=useState(0);
    const [data,setData]=useState([]); 
    const [spinning,setSpinning]=useState(false);
    // POUR TABLEAU
    const colones = [
       
        {name: "DATE ENV", uid: "dateMsg" },
        {name: "EXPED", uid: "nom",sortable: true},
        {name: "OBJET", uid: "objet",sortable: true},
        {name: "MESSAGE", uid: "message", sortable: true},
        {name: "ACTIONS", uid: "actions"},
      ];
      const INITIAL_VISIBLE_COLUMNS = ["dateMsg", "nom","objet","message", "actions"];
      const cellule=(ligne,colone)=>{
        const cellValue=ligne[colone];
        const nl="bg-slate-100 px-1 py-1";
        switch(colone)
        {
            case "dateMsg":
                return(
                    <div className={`${ligne.statut==="NL" && nl}`}>
                        {moment(ligne[colone]).format("DD/MM/YYYY")}
                    </div>
                )
            break;
            case "nom":
                return(
                    <div>
                        {ligne?.nom}
                    </div>
                )
            break;
            case "actions":
                return (<div className="flex flex-row gap-3 justify-center items-center">
                    <Button alt="Mettre aux archives" onPress={()=>{
                        Modal.confirm({
                            title:"Archivage",
                            content:"Confirmez-vous la mise aux archives de ce message",
                            okText:"Archiver",
                            cancelText:"Annuler",
                            onOk:()=>{
                                setSpinning(true);
                                postData("archiver",{idMsg:ligne?.id}).then(r=>{
                                    if(r.success)
                                    {
                                        toast.success("Message bien archivé");
                                    }else
                                    {
                                        toast.error("Echec d'archiver le message");
                                    }
                                }).catch(err=>{
                                    toast.error("Echec d'archiver le message");
                                }).finally(()=>setSpinning(false));
                            }
                        })
                    }} isIconOnly size="md" color={"primary"} variant="light">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                        </svg>

                    </Button>
                    <Link href={`/account/message/${ligne.messageCrypte}`}><Button isIconOnly size="md" color={"success"} variant="light"><Eye /></Button></Link>
                    <Link href={`/message/${ligne?.idUser}`}><Button isIconOnly size="md" color={"success"} variant="light"><MailIcon /></Button></Link>
                    <Button onPress={()=>{
                       Modal.confirm({
                        title:"Suppression",
                        content:"Voulez-vous vraiment supprimer ce message ?",
                        okText:"Oui",
                        cancelText:"Annuler",
                        onOk:()=>{

                        }
                       })
                    }} isIconOnly size="md" color={"danger"} variant="light"><Delete /></Button>
                </div>);
            break;
            default:
                return <div className="text-center items-center justify-center">{cellValue}</div>
        }

      }
      const openNotification = () => {
        api.success({
        message: 'Mise à jour',
        description:
            'Modification bien éffectuée',
        duration: 4,
        });
    };
    const openNotificationError = () => {
        api.error({
        message: 'Mise à jour',
        description:
            'Echec de mise à jour, veuillez reessayer plutard',
        duration: 4,
        });
    };
      const handleBtnNouveau=()=>{
        alert("test");
      }
    // TABLEAU


    const getMessages=()=>{
        try
        {
            let profil=JSON.parse(Cookies.get("profil"));
        }catch(e){
            let profil={}
        }
        getData("messageUser&id="+profil?.id)
      .then(r=>{
        // setData(r.msgRecus);
       
        setMsgNL(r?.msgRecus?.filter((m)=>{return m.statut=='NL'})?.length);
        setMsgArchive(r?.msgArchives);
        setData(r?.msgArchives);
        
      }).catch(err=>console.log(err));
      }
    useEffect(()=>{
        getMessages();
    },[])
    return (
        <Spin spinning={spinning}>
            <Toaster />
        <MainLayout navigationBar="Archives message">
            <Layout titre={"Mes archives"} titreIcone={<MessageOutlined />}>
                {msgNL<1 ? 
                <div className="flex flex-row gap-3 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                    </svg>
                    Vous avez ({msgNL}) messages dans votre archivage
                </div>:
                <Alert message={
                    <div className="flex justify-between">
                        <div>
                            {
                                msgArchive?.length>0?
                                    msgArchive?.length +" Message(s) aux archives":
                                    "Aucun message archivé"
                            }
                        </div>
                        <div >
                            <Link href="/account/message" className="flex gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                                </svg>
                                Vous avez ({msgNL}) messages non lu(s)
                            </Link>
                        </div>
                    </div>
                }>
                </Alert>

                }

                {msgNL>0 && <Divider />}
                {
                    msgNL>0 && 
                    <Tableau 
                        hideBtnNouveau={false} 
                        handleBtnNouveau={handleBtnNouveau} 
                        btnnouveauText=""
                        coloneSearch={"nom"} 
                        columns={colones} 
                        // datas={[{"dateMsg":"2023-02-02 12:00:00","nom":"diwata","id":1,message:"ok",objet:"rien"}]} 
                        datas={data} 
                        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS} 
                        emptyMsg={"Aucun message pour l'instant"}
                        cellule={cellule} />
                }

            </Layout>
        </MainLayout>
        </Spin>
    )
}
export default page