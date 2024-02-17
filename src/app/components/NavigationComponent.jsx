"use client"
import Cookies from "js-cookie";
import { User } from "lucide-react";
import Link from "next/link"
import { useEffect, useState } from "react";


const NavigationComponent=({titre})=>{
    // const profil=JSON.parse(localStorage.getItem("profil")) || {};
    const [profil,setProfil] = useState(null);
    useEffect(()=>{
        setProfil(JSON.parse(Cookies.get("profil")));
    },[])
    return (
        <div className="flex flex-row justify-between rounded-md bg-yellow-50 py-3 px-4 text-black border border-yellow-400 mb-4">
                    <h1 className="flex flex-row gap-2">
                        <div>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><line x1="5.99" y1="6" x2="6" y2="6" stroke-linecap="round" stroke-width="2"></line><line x1="11.99" y1="6" x2="12" y2="6" stroke-linecap="round" stroke-width="2"></line><line x1="17.99" y1="6" x2="18" y2="6" stroke-linecap="round" stroke-width="2"></line><line x1="5.99" y1="12" x2="6" y2="12" stroke-linecap="round" stroke-width="2"></line><line x1="11.99" y1="12" x2="12" y2="12" stroke-linecap="round" stroke-width="2"></line><line x1="17.99" y1="12" x2="18" y2="12" stroke-linecap="round" stroke-width="2"></line><line x1="5.99" y1="18" x2="6" y2="18" stroke-linecap="round" stroke-width="2"></line><line x1="11.99" y1="18" x2="12" y2="18" stroke-linecap="round" stroke-width="2"></line><line x1="17.99" y1="18" x2="18" y2="18" stroke-linecap="round" stroke-width="2"></line></g></svg>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Link href="/account/dashboard" className="hover:bg-yellow-100  rounded-md px-2 hover:border-gray-500">Tableau de Bord</Link>
                            {">"}
                            <span>{titre}</span>
                        </div>
                    </h1>
                    <h1 className="font-bold flex flex-row gap-2 hidden lg:block line-clamp-1">
                        <span className="flex gap-3 justify-center items-center"><User /> {profil?.nom?.toUpperCase()}</span>
                    </h1>
               </div>
    )
}
export default NavigationComponent