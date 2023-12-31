"use client"
import {useState,useEffect} from "react"
import {Textarea,Button,Input} from "@nextui-org/react"
import {postData,getData,updateData, deleteData} from "@/app/fcts/helper"
import {Modal,Alert,Divider,notification} from "antd"
import {Delete} from "@/app/components/icons/Delete"
import Layout from "@/app/components/layouts/LayoutDashboard"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
import Link from "next/link"
import Cookies from "js-cookie"

const page=()=>{
  const [_profil, set_profil] = useState(Cookies.get("profil"));
  
  useEffect(() => {
    set_profil(JSON.parse(Cookies.get("profil")));
   console.log(_profil);
  }, [])
  
  return (
    <>
    <MainLayout navigationBar="Suppression compte">
        <Layout titre="Suppression de votre compte" 
        footer={
          <div className="flex flex-row justify-center items-center gap-3">
            <Link href="/account/dashboard"><Button color="primary" variant="flat">Annuler</Button></Link>
            <Button color="danger" onPress={()=>{
              Modal.confirm({
                title: "Suppression",
                content:"Confirmez-vous la suppression de votre compte ?",
                okText:"Oui, supprimer",
                cancelText:"Annuler",
                onOk:()=>{
                 
                  deleteData("utilisateur",{id:_profil?.id}).then((r)=>{
                    if(r.success){
                      Cookies.remove("profil");
                      Cookies.remove("connected");
                      window.location.href="/";
                    }
                  })
                }
              })
            }}><Delete /> J'accepte et supprime mon compte</Button>
          </div>
        }
        >
            <Alert
                message="Avertissement"
                description="Cette operation est irreversible et très dangereuse, nous pensons que vous avez pris toutes les precautions necessaire pour la sauvegarde de vos données.  En supprimant votre compte, vous ne pourrez plus le recuperer ni recuperer vos données."
                type="error"
                showIcon
            />
        </Layout>
    </MainLayout> 
    </>
  )
}
export default page
