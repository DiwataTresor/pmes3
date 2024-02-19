"use client"
import {useState,useEffect} from "react"
import NavigationComponent from "@/app/components/NavigationComponent"
import { myContainerDashboard } from "@/app/style/global";
import {Input,Button,Chip} from "@nextui-org/react"
import {postData,getData,deleteData} from "@/app/fcts/helper"

import {Modal,Alert,Divider,notification} from "antd"
import {Delete} from "@/app/components/icons/Delete"
import Layout from "@/app/components/layouts/LayoutDashboard"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
import {Toaster,toast} from "sonner"

const page=()=>{
    const [isLoading,setIsLoading]=useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [feedBack,setFeedBack]=useState("");
    const [liste,setListe]=useState([]);
    const [nbreCaractere,setNbreCaractere]=useState(0);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(liste.length>14)
        {
            api.error({
                message: 'Mot clé',
                description:
                  'Vous avez atteint le nombre limite des mots clés que vous pouvez associer à votre compte',
                duration: 4,
              });
        }else
        {
       
            Modal.confirm({
                title:"Mot clé",
                content:"Confirmez-vous cet enregistrement ?",
                okText:"Oui, enregistrer",
                cancelText:"Annuler",
                onOk:()=>{
                    setIsLoading(true);
                    let form=Object.fromEntries(new FormData(e.target));
                    postData("keyword",form).then(r=>{
                        if(r.success)
                        {
                            toast.success("Bien enregistré");
                            document.querySelector("#f").reset();
                            getKeywords();
                        }else
                        {
                            setFeedBack(<Alert message="Echec d'enregistrement" type="error" showIcon />)
                        }
                    }).catch(r=>{
                        setFeedBack(<Alert message="Echec d'enregistrement" type="error" showIcon />)
                    }).finally(()=>setIsLoading(false));
                        
                }
            })
        }
    }

    const getKeywords=()=>{
        getData("getKeywordsByUser").then(r=>{
            setListe(r.data);
        })
    }
    const deleteKeyword=(id)=>{
        Modal.confirm({
            title:"Suppression",
            content:"Voulez-vous vraiment supprimer ?",
            okText:"Oui",
            onOk:()=>{
                deleteData("keyword",{id:id}).then(r=>{
                    toast.success("Bien supprimé");
                    getKeywords();
                }).catch(e=>{
                    alert("error")
                })
            }
        })
    }
    useEffect(()=>{
        getKeywords();
    },[]);
  return (
    <>
         {contextHolder}
    <MainLayout navigationBar="Mots clés">
        <Toaster position="bottom-center" />
            <Layout titre={<h2>Les mots clés liés à votre organisation</h2>} center>
                
                <div className="w-[40%] pt-9">
                    <form id="f" onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3">
                        <Input onChange={(e)=>setNbreCaractere(e.target.value.length)} isRequired name="v" type="text" label="Votre mot clé" labelPlacement="outside" 
                                maxLength={"30"} />
                                <div className="text-sm">{30-nbreCaractere} caracteres restants</div>
                        <Button isLoading={isLoading} color="primary" type="submit">Enregistrer</Button>
                    </form>
                    <div className="mt-5">{feedBack}</div>
                </div>
                <div className="w-[40%] pt-9">
                    <h3 className="flex flex-row justify-between">
                        Mot clés enregistrés
                        <Chip color="danger">{liste?.length}/15</Chip>
                    </h3>
                    <Divider />
                    <div className="flex flex-col gap-3">
                        {
                            liste.map(r=>{
                                return(
                                    <form className="flex gap-2" onSubmit={(e)=>e.preventDefault()}>
                                        <Input isRequired type="text" value={r.keyword} maxLength={30}  />
                                        
                                        <Button type="button" isIconOnly color="danger" variant="faded" aria-label="Supprimer" onPress={()=>deleteKeyword(r.id)}>
                                            <Delete />
                                        </Button>
                                    </form>
                                )
                                    
                            })
                        }
                    </div>
                </div>
            </Layout>
      
    </MainLayout> 
    </>
  )
}
export default page
