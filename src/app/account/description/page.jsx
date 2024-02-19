"use client"
import {useState,useEffect} from "react"
import NavigationComponent from "@/app/components/NavigationComponent"
import { myContainerDashboard } from "@/app/style/global";
import {Textarea,Button} from "@nextui-org/react"
import {postData,getData,updateData} from "@/app/fcts/helper"
import {Modal,Alert,Divider,notification} from "antd"
import {Delete} from "@/app/components/icons/Delete"
import Layout from "@/app/components/layouts/LayoutDashboard"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"


const page=()=>{
    const [feedBack,setFeedBack]=useState("");
    const [api, contextHolder] = notification.useNotification();
    const [profil,setProfil]=useState({});
    const [isLoading,setIsLoading]=useState(false)
    const [nbreCaracteres,setNbreCaracteres]=useState(0);
    const handleSubmit=(e)=>{
        e.preventDefault();
       
        Modal.confirm({
            title:"Description de l'organisation",
            content:"Confirmez-vous cet enregistrement ?",
            okText:"Oui, enregistrer",
            cancelText:"Annuler",
            onOk:()=>{
                setIsLoading(true);
                let form=Object.fromEntries(new FormData(e.target));
                updateData("description",form).then(r=>{
                    if(r.success)
                    {
                        openNotification();
    
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

    useEffect(()=>{
        getData("propreProfil").then(r=>{
            setProfil(r.data);

        }).catch(e=>{
            alert("erreur");
        });
    },[]);
    const card="bg-white rounded-md flex-1 w-full shadow-md py-3 px-2 h-full"

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

  return (
    <>
        {contextHolder}
        <MainLayout navigationBar="Description">
            <Layout headerBg={"bg-black"} center titre="Description de votre organisation" titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>}>
                <form onSubmit={handleSubmit}>
                    <div className="items-center text-center">
                        <Textarea
                            name="description"
                            isRequired
                            label="Description"
                            labelPlacement="outside"
                            defaultValue={profil?.description}
                            className="w-[100%] lg:w-[800px]"
                            placeholder="Description de votre organisation...."
                            rows={4}
                            maxLength={500}
                            onChange={(e)=>setNbreCaracteres(e.target.value.length)}
                        />
                        <span className="text-sm">{500-nbreCaracteres} caractères restant</span>
                        <p>&nbsp;</p>
                        <Button isLoading={isLoading} color={"primary"} type="submit">Mettre à jour</Button>
                    </div>
                </form>
            </Layout>
        </MainLayout> 
    </>
  )
}
export default page
