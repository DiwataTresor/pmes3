"use client"
import { useState, useEffect, useRef } from "react"

import { Textarea, Button, Input, Checkbox, Image, Badge } from "@nextui-org/react"
import { postData, getData, updateData, API_URL, BACKEND_URL } from "@/app/fcts/helper"
import { Modal, Alert, Divider, notification } from "antd"
import { Delete } from "@/app/components/icons/Delete"
import { Upload } from "@/app/components/icons/Upload"
import LayoutDashboard from "@/app/components/layouts/LayoutDashboard"
import LayoutDashboardMain from "@/app/components/layouts/LayoutDashboardMain"
import NextImage from "next/image";
import { Notification } from "@/app/components/icons//Notification";
import { LineChartOutlined } from "@ant-design/icons"

const page = () => {
  const [feedBack, setFeedBack] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogo, setIsLoadingLogo] = useState(false);
  const [logo, setLogo] = useState("");
  const [associationsaffiliees, setAssociationsAffiliees] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const [profil, setProfil] = useState({});
  const [values, setValues] = useState({
    nom: "",
    rccm: "",
    idnat: ""
  });




  useEffect(() => {
    getData("propreProfil").then(r => {
      setValues({ nom: r.data.nom, rccm: r.data.rccm, idnat: r.data.idnat });
      setProfil(r.data);
      getAssociationAffiliees(r.data.id);
    }).catch(e => {

    });
  }, []);
  const card = "bg-white rounded-md flex-1 w-full shadow-md py-3 px-2 h-full"

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
      <LayoutDashboardMain showNavigation navigationBar="Information">
        <LayoutDashboard titre="Statistique profil" titreIcone={<LineChartOutlined twoToneColor="#eb2f96" style={{ fontSize: 30 }} />}>

          <div className={"w-full flex flex-row gap-4 items-center justify-center"}>
            <div className="w-1/3 flex flex-col gap-3 justify-center items-center border rounded-md py-4">
              <span>Vus du jour </span>
              {/* <span>Vus du jour : {profil.typecompte==="E"?"Entreprise":"Personnel"}</span> */}
              <Badge content="00" shape="circle" color="danger">
                
                  <Notification size={24} />
              
              </Badge>
            </div>
           
            <div className="w-1/3 flex flex-col gap-3 items-center justify-center border rounded-md py-4">

              <span>Vues mois en cours  </span>
              {/* <span>Vues mois en cours  : {profil.typeabonnement}</span> */}
              <Badge content="00" shape="circle" color="danger">
               
                  <Notification size={24} />
               
              </Badge>
            </div>
           
            <div className="w-1/3 flex flex-col gap-3 items-center justify-center border rounded-md py-4">
              <span>Vues année en cours  </span>
              {/* <span>Vues année en cours  : {profil.typeabonnement}</span> */}
              <Badge content="00" shape="circle" color="danger">
               
                  <Notification size={24} />
               
              </Badge>
            </div>
            {/* <hr />
            <div className="flex flex-row gap-7 w-full">

            </div> */}
          </div>

        </LayoutDashboard>

      </LayoutDashboardMain>
    </>
  )
}
export default page



