"use client"
import {useEffect, useState} from "react"
import {Result} from "antd"
import {Button} from "@nextui-org/react"
import {useRouter} from "next/navigation"
import Link from "next/link"
import Cookies from "js-cookie"
const page=()=>{
    // const [profil,setProfil]=useState(JSON.parse(Cookies.get("profil")));
    const [profil,setProfil]=useState(null);
    const router=useRouter();
    // const {nom,emailAdresse}=JSON.parse(localStorage.getItem("profil")?localStorage.getItem("profil") : "[{'nom':'','emailAdresse':''}]")[0];
//    try {
//        const {nom,emailAdresse}=JSON.parse(Cookies.get("profil"));
//     } catch (error) {
//        const {nom,emailAdresse}={nom:"",emailAdresse:""};
//    }
    const message=`${profil?.nom?.toUpperCase()} votre inscription s'est bien faite`;
    useEffect(()=>{
        // Cookies.get("profil") && router.push("/home");
        setProfil(JSON.parse(Cookies.get("profil")));
    },[])
    return(
        <div className="bg-white pb-6">
            <Result
                status="success"
                title={message}
                subTitle={`Un email vous est envoyé sur votre adresse : ${profil?.emailAdresse}, veuillez l'ouvrir pour confirmer`}
                extra={[
                <Link href="/home">
                    <Button color="primary">
                        continuer
                    </Button>
                </Link>
                
                // <Button key="buy">Buy Again</Button>,
                ]}
            />
        </div>
    )
}
export default page
