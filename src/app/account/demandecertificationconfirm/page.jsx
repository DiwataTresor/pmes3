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

    const message=`${profil?.nom?.toUpperCase()} votre demande est bien envoyée`;
    useEffect(()=>{
        setProfil(JSON.parse(Cookies.get("profil")));
    },[])
    return(
        <div className="bg-white pb-6">
            <Result
                status="success"
                title={message}
                subTitle={`Un email vous sera envoyé après le traitement de votre demande pour confirmation`}
                extra={[
                <Link href="/account/dashboard">
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
