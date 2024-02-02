"use client"
import {useState,useEffect} from "react"
import NavigationComponent from "@/app/components/NavigationComponent"
import { myContainerDashboard } from "@/app/style/global";
import {Input,Button,Chip,Select,SelectItem} from "@nextui-org/react"
import {postData,getData,updateData} from "@/app/fcts/helper"
import {Modal,Alert,Divider,notification, Tabs} from "antd"
import {Delete} from "@/app/components/icons/Delete"
import {getProvinces} from "@/app/utils/data"
import Layout from "@/app/components/layouts/LayoutDashboard"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
import Liste from "./Liste";
import Nouveau from "./Nouveau";

const page = () => {
    const [surcussales,setSurcussales] =useState([]);
    const [isLoaded,setIsLoaded] =useState(false);
    const getSurcussales = () =>{
        setIsLoaded(false);
        getData("surcussalesByOrganisation").then(r=>{
            setSurcussales(r.data);
            setIsLoaded(true);
          });
    }
    const reload=()=>{
       getSurcussales();
    }
      useEffect(() => {
       getSurcussales();
      }, []);

      const items = [
        {
          key: '1',
          label: 'Surcussales enregistrées',
          children: <Liste data={surcussales} isLoaded={isLoaded} reload={reload} />
        },
        {
          key: '2',
          label: 'Nouveau',
          children: <Nouveau callBack={getSurcussales} />
        }
      ];
  return (
    <MainLayout>
       <Layout titre={"Gestion surcussale"}>
        <Tabs defaultActiveKey="1" items={items} />
        </Layout>
    </MainLayout>
  )
}

export default page