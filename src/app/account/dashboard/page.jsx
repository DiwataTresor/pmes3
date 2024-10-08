"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import { myContainerDashboard } from "@/app/style/global";
import { Divider as dv } from "antd"
import Link from "next/link"
import { Card, CardBody, CardFooter, Button, Switch, Image, Divider, Avatar, Select, SelectItem } from "@nextui-org/react"
import NavigationComponent from "@/app/components/NavigationComponent"
import { Delete } from "@/app/components/icons/Delete";
import { BACKEND_URL, getData, postData } from "@/app/fcts/helper"
import moment from "moment"
import { toast, Toaster } from "sonner"
import Layout from "@/app/components/layouts/LayoutDashboard"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
import Cookies from "js-cookie";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import { getProvinces, getSecteurs, typeAbonnement } from "@/app/utils/data";
import { ArrowRight, BadgeCheck, BadgeMinus, CheckCheck, RefreshCw } from "lucide-react";

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';



const SectionOneItem = ({ t, icone, lien }) => {
    return (
        <div className="border rounded-md py-3 px-2 w-full bg-white hover:shadow-md">
            <Link href={lien}>
                <div className="flex flex-row gap-2 items-center lg:items-center justify-start lg:justify-center">
                    <div>
                        {icone}
                    </div>
                    <div>{t}</div>
                </div>
            </Link>
        </div>
    );
}
const SectionTwoItem = ({ t, icone, lien }) => {
    return (
        <div className="border rounded-md py-3 px-2 w-full bg-white hover:shadow-md">
            <Link href={lien}>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div>
                        {icone}
                    </div>
                    <div>{t}</div>
                </div>
            </Link>
        </div>
    );
}
const SectionTreeItem = ({ t, icone, lien }) => {
    return (
        <div className="border rounded-md py-2 px-2 w-full bg-white hover:shadow-md">
            <Link href={lien}>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div>
                        {icone}
                    </div>
                    <div>{t}</div>
                </div>
            </Link>
        </div>
    );
}

const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#my-table' });
    doc.save('indexrdc-repertoire.pdf');
};


// const data = [
//     { name: 'John', age: 28 },
//     { name: 'Jane', age: 22 },
//     { name: 'Doe', age: 35 },
// ];

const page = () => {
    const [_profil, set_profil] = useState(Cookies.get("profil"));
    const [data, setData] = useState([]);
    const [dataFromApi, setDataFromApi] = useState([])
    const [optionSuspendre, setOptionSuspendre] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [profil, setProfil] = useState(null);
    const [typeCompte, setTypeCompte] = useState(null);
    const [role, setRole] = useState(null);
    const [secteurs, setSecteurs] = useState([])
    const [provinces, setProvinces] = useState([])
    const [territoires, setTerritoires] = useState([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [suspendedStatus, setSuspendedStatus] = useState(_profil?.enabledUser == "A" ? "B" : "L")
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false)
    const [resultat, setResultat] = useState('')
    const router = useRouter();

    useEffect(() => {
        set_profil(JSON.parse(Cookies.get("profil")));
        try {
            getData("propreProfil",
                { "id": _profil.id })
                .then(r => {
                    setProfil(r.data);
                    setOptionSuspendre(r?.data?.enabledUser == "A" ? false : true);
                })
        } catch (e) {
        }
    }, []);

    const changeStatusCompte = () => {
        setIsLoading(true);
        if (suspendedStatus == "L") {
            postData("blockCompte", { "id": _profil.id })
                .then(r => {

                    if (r.success) {
                        toast.success("Compte bien suspendu");
                        setOptionSuspendre(true);
                        document.querySelector("#btnAnnuler").click();
                    } else {
                        setOptionSuspendre(false);
                        toast.error("Echec d'operation");
                    }
                }).finally(() => {
                    setIsLoading(false);

                })
        } else {

            postData("unblockCompte", { "id": _profil.id })
                .then(r => {
                    console.log(r);
                    if (r.success) {
                        toast.success("Compte bien reactivé");
                        setOptionSuspendre(false);
                        document.querySelector("#btnAnnuler").click();
                    } else {
                        setOptionSuspendre(false);
                        toast.error("Echec d'operation");
                    }
                }).finally(() => {
                    setIsLoading(false);
                })
        }

        // onClose();
    };

    useEffect(() => {
        let detailProf = JSON.parse(Cookies.get("profil"));
        detailProf?.role ? setTypeCompte("ad-") : setTypeCompte("client");

        getSecteurs().then(r => { setSecteurs(r.data) });
        getProvinces().then(r => setProvinces(r.data));
        getData("territoires").then(r => setTerritoires(r.data))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSearching(true)
        let d = Object.fromEntries(new FormData(e.target))
        postData("findProfils", d).then(r => {
            console.log(r.data)
            setDataFromApi(r.data)
            let don=[]
            r?.data?.forEach(e => {
                    don.push({
                        Nom:e.nom,
                        Telephone:e.telephone,
                        Email:e.emailAdresse,
                        RCCM:e.rccm,
                        Activite:e.nomSecteur,
                        Ville:e.nomVille,
                        Province:e.nomProvince,
                    })
            });
            setData(don)
        }).finally(() => {
            setIsSearching(false)
        })
    }

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'indexrdc.xlsx');
    };

    return (
        <>
            <MainLayout showNavigation navigationBar="">
                {/* <Toaster position="bottom-center" /> */}
                {
                    typeCompte == "client" ?
                        <>
                            <Layout headerBg={"bg-black"} titre={`Votre Abonnement | ${_profil?.nom}`} titreIcone={<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.5 13.5H7.5M10.5 13.5V16.5M10.5 13.5L7 17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.5 10.5H16.5M13.5 10.5V7.5M13.5 10.5L17 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.5 10.5H7.5M10.5 10.5V7.5M10.5 10.5L7 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.5 13.5H16.5M13.5 13.5V16.5M13.5 13.5L17 17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" stroke-width="1.5"></path> </g></svg>}>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-row gap-4 justify-between">
                                        <div className="flex flex-row gap-4 text-gray-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                            </svg>
                                            ID : <span className="text-blue-400 hover:underline">{_profil?.idUser}</span>

                                        </div>
                                        <div className={`flex flex-col gap-3 items-center justify-between`}>
                                            <span className={`flex gap-4 ${profil?.certification == "Y" ? "text-green-800" : "text-red-500"}`}>
                                                {profil?.certification == "Y" ? <><BadgeCheck />Compte  certifié</> :
                                                    <><BadgeMinus />Compte  non certifié</>
                                                }
                                            </span>
                                            {
                                                profil?.certification == "N" &&
                                                <div>
                                                    <Link href={"/account/demandecertification"}>
                                                        <Button className="" size="sm" variant="ghost" color="success">Demande de certification</Button>
                                                    </Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-4 text-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                        </svg>
                                        Votre compte : <Link className="text-blue-400 hover:underline" href={`/${_profil?.slug}`}>{_profil?.slug} </Link>

                                    </div>
                                    <div className="flex flex-row gap-4 text-gray-800 items-center justify-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                        </svg>
                                        <span>Votre secteur :</span>
                                        <Avatar size="md" src={BACKEND_URL + _profil?.secteurIcone} />
                                        <span>{profil?.secteurDetail}</span>

                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <svg width="22px" height="22px" viewBox="0 0 1024 1024" fill="#000000" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M110.4 923.2c-56.8 0-102.4-48-102.4-106.4V285.6c0-58.4 45.6-106.4 102.4-106.4h800.8c56.8 0 102.4 48 102.4 106.4V816c0 58.4-45.6 106.4-102.4 106.4H110.4z m0-701.6c-34.4 0-61.6 28.8-61.6 64V816c0 35.2 28 64 61.6 64h800.8c34.4 0 61.6-28.8 61.6-64V285.6c0-35.2-28-64-61.6-64H110.4z" fill=""></path><path d="M541.6 392c-12.8 0-23.2-10.4-23.2-24s10.4-24 23.2-24h328c12.8 0 23.2 10.4 23.2 24s-10.4 24-23.2 24h-328zM541.6 511.2c-12.8 0-23.2-10.4-23.2-24s10.4-24 23.2-24h328c12.8 0 23.2 10.4 23.2 24s-10.4 24-23.2 24h-328zM541.6 638.4c-12.8 0-23.2-10.4-23.2-24s10.4-24 23.2-24h276.8c12.8 0 23.2 10.4 23.2 24s-10.4 24-23.2 24H541.6zM58.4 886.4c-2.4 0-4.8 0-7.2-0.8-12.8-4-20-18.4-16-32 23.2-78.4 77.6-142.4 148-176l16-8-13.6-12c-40-34.4-63.2-85.6-63.2-139.2 0-100 78.4-180.8 173.6-180.8 96 0 173.6 80.8 173.6 180.8 0 53.6-23.2 104.8-63.2 139.2l-13.6 12 16 8c68 32 132.8 112 157.6 194.4 16 52.8-16.8 36-1.6 16-3.2 4.8-16.8-5.6-32-5.6-12.8 0-19.2 24.8-19.2 22.4-31.2-104-120.8-203.2-217.6-203.2-99.2 0-186.4 67.2-216 166.4-1.6 11.2-11.2 18.4-21.6 18.4z m239.2-498.4c-69.6 0-126.4 58.4-126.4 130.4s56.8 130.4 126.4 130.4c69.6 0 126.4-58.4 126.4-130.4-0.8-72-56.8-130.4-126.4-130.4z" fill=""></path></g></svg>
                                        Type abonnement :
                                        <span className="bg-green-600 text-white rounded-md flex flex-col justify-center items-center px-3">
                                            {typeAbonnement[_profil?.typeabonnement]}
                                        </span>

                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <h2 className="flex flex-row gap-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                            </svg>
                                            Debut de votre abonnement actuel : {moment(_profil?.dateabonnement).format("DD/MM/YYYY")}
                                        </h2>
                                        <h2 className="flex flex-row gap-4 mt-6 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                            </svg>
                                            Fin abonnement:
                                        </h2>
                                    </div>

                                    <div className="flex flex-row gap-3 justify-center items-center mt-4">
                                        <Link href="/account/abonnement">
                                            <Button color="primary" size="sm" onClick={() => { openModule("abonChange") }} startContent={<CheckCheck />}>Changer mon abonnement</Button>
                                        </Link>
                                        <Link href="/account/renouvellement">
                                            <Button color="success" size="sm" className="text-white" startContent={<RefreshCw />}> Renouveller abonnement</Button>
                                        </Link>
                                    </div>
                                </div>
                            </Layout>
                            <Layout titre="A Propos de votre organisation" titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" /></svg>}>
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                                    {/* <SectionOneItem lien="#" t="Theme de votre page" icone={<svg width="64px" height="64px" viewBox="0 0 1024.00 1024.00" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="0.01024" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.048"></g><g id="SVGRepo_iconCarrier"><path d="M509.8 139.7l190.5 109.6 0.2 196.5 173.2 99.7 0.2 219.8-190.2 110.1-172.4-99.2-171.5 99.2-190.5-109.6-0.2-219.9 170.7-98.8-0.3-197.3z" fill="#FFFFFF"></path><path d="M520 527.5V365l-10 5.8-10-5.8v162.2l10.3 5.9zM339.5 666.9l-10-5.7v162.1l10.3 5.9 9.7-5.6V661.2zM693.4 823.6V661.2l-2 1.1c-1.6 0.9-3.3 1.3-5 1.3-3.5 0-6.8-1.8-8.7-5-2.5-4.3-1.4-9.6 2.2-12.7-3.8 1.4-6.6 5.1-6.6 9.4v167.9l10.3 5.9 9.8-5.5z" fill="#06F3FF"></path><path d="M825.1 563.7l8.4 4.8c-1.9-3.1-5.1-4.8-8.4-4.8zM833.7 568.9v9.5c1.6-2.9 1.7-6.5 0-9.5zM656.7 628.5l-8.7-5c-4.8-2.8-10.9-1.1-13.7 3.7-2.8 4.8-1.1 10.9 3.7 13.7l8.7 5c1.6 0.9 3.3 1.3 5 1.3 3.5 0 6.8-1.8 8.7-5 2.7-4.8 1.1-10.9-3.7-13.7zM613.3 603.6l-8.7-5c-4.8-2.8-10.9-1.1-13.7 3.7-2.8 4.8-1.1 10.9 3.7 13.7l8.7 5c1.6 0.9 3.3 1.3 5 1.3 3.5 0 6.8-1.8 8.7-5 2.8-4.8 1.1-10.9-3.7-13.7z" fill="#005BFF"></path><path d="M833.6 568.7c0-0.1-0.1-0.1-0.1-0.2l-8.4-4.8c-1.8 0-3.5 0.4-5.2 1.3l-8.7 5c-4.8 2.8-6.4 8.9-3.7 13.7 1.9 3.2 5.2 5 8.7 5 1.7 0 3.4-0.4 5-1.3l8.7-5c1.7-1 2.9-2.3 3.8-3.9V569c0-0.2-0.1-0.3-0.1-0.3zM690 640l-8.7 5c-0.5 0.3-1 0.6-1.4 1-3.7 3.1-4.7 8.4-2.2 12.7 1.9 3.2 5.2 5 8.7 5 1.7 0 3.4-0.4 5-1.3l2-1.1 6.7-3.9c4.8-2.8 6.4-8.9 3.7-13.7-2.9-4.8-9-6.5-13.8-3.7zM570 578.7l-8.7-5c-4.8-2.8-10.9-1.1-13.7 3.7-2.8 4.8-1.1 10.9 3.7 13.7l8.7 5c1.6 0.9 3.3 1.3 5 1.3 3.5 0 6.8-1.8 8.7-5 2.7-4.8 1-11-3.7-13.7zM776.6 590l-8.7 5c-4.8 2.8-6.4 8.9-3.7 13.7 1.9 3.2 5.2 5 8.7 5 1.7 0 3.4-0.4 5-1.3l8.7-5c4.8-2.8 6.4-8.9 3.7-13.7-2.8-4.8-8.9-6.5-13.7-3.7zM733.3 615l-8.7 5c-4.8 2.8-6.4 8.9-3.7 13.7 1.9 3.2 5.2 5 8.7 5 1.7 0 3.4-0.4 5-1.3l8.7-5c4.8-2.8 6.4-8.9 3.7-13.7-2.8-4.8-8.9-6.5-13.7-3.7z" fill="#005BFF"></path><path d="M873.7 545.5l-173.2-99.7-0.2-196.5-190.5-109.6-190.3 110.1 0.2 197.3L149 546l0.3 219.8 190.5 109.7 171.4-99.3 172.4 99.3 190.2-110.1-0.1-219.9zM509.8 185.9l140.4 80.8-140.3 81L369.5 267l140.3-81.1zM339.3 482l140.4 80.8-140.3 81L199 563.1 339.3 482z m10.2 341.6l-9.7 5.6-10.3-5.9-140.2-80.7-0.2-162.1 140.4 80.7 10 5.8 10-5.8 140.4-81 0.2 162.1-140.6 81.3z m160.8-290.5l-10.3-5.9-140.2-80.7-0.2-162.1L500 365l10 5.8 10-5.8 140.4-81 0.2 162.1L520 527.5l-9.7 5.6z m323.6 209.1l-140.6 81.4-9.7 5.6-10.3-5.9-140.2-80.7L533 569l150.3-87 141.9 81.7c3.3 0.1 6.6 1.8 8.4 4.8l0.2 0.1v0.3c1.7 3.1 1.6 6.7 0 9.5l0.1 163.8z" fill="#005BFF"></path></g></svg>} /> */}
                                    <SectionOneItem lien="/account/information" t={"Informations de votre organisation"} icone={<svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M594.7 800.4H272.4c-10.7 0-19.4 8.7-19.4 19.4s8.7 19.4 19.4 19.4h322.3c10.7 0 19.4-8.7 19.4-19.4 0-10.8-8.7-19.4-19.4-19.4z" fill="#005BFF"></path><path d="M912.9 771.4v39H968c-8.1-22.7-29.7-39-55.1-39z" fill="#E6E6E6"></path><path d="M815.6 675.9V235.2c0-16.1-13.1-29.1-29.1-29.1H80.6c-16.1 0-29.1 13.1-29.1 29.1v440.7c0 16.1 13.1 29.1 29.1 29.1h705.9c16.1 0.1 29.1-13 29.1-29.1z m-43.9-42c0 16-13.1 29.1-29.1 29.1h-618c-16 0-29.1-13.1-29.1-29.1V277.3c0-16 13.1-29.1 29.1-29.1h618c16 0 29.1 13.1 29.1 29.1v356.6z" fill="#FFFFFF"></path><path d="M742.6 248.2h-618c-16 0-29.1 13.1-29.1 29.1v356.6c0 16 13.1 29.1 29.1 29.1h618c16 0 29.1-13.1 29.1-29.1V277.3c0-16-13.1-29.1-29.1-29.1z m-523.3 32.2c0-1.6 1.3-2.8 2.8-2.8h61.3c1.6 0 2.8 1.3 2.8 2.8v17.5c0 1.6-1.3 2.8-2.8 2.8h-61.3c-1.6 0-2.8-1.3-2.8-2.8v-17.5z m-30.3-3.5c6.6 0 11.9 5.3 11.9 11.9s-5.3 11.9-11.9 11.9c-6.6 0-11.9-5.3-11.9-11.9s5.4-11.9 11.9-11.9z m-39 0c6.6 0 11.9 5.3 11.9 11.9s-5.3 11.9-11.9 11.9c-6.6 0-11.9-5.3-11.9-11.9s5.3-11.9 11.9-11.9z m237.3 181.7c0 67.8-55.2 123-123 123s-123-55.2-123-123 55.2-123 123-123h9.7v113.3h113.3v9.7z m-90.1-38.7v-94.7c52.3 0 94.7 42.4 94.7 94.7h-94.7z m373.6 148.9H530.1c-5.4 0-9.7-4.3-9.7-9.7 0-5.4 4.3-9.7 9.7-9.7h140.7c5.4 0 9.7 4.3 9.7 9.7 0 5.3-4.3 9.7-9.7 9.7z m0-73.3H525.2c-5.4 0-9.7-4.3-9.7-9.7s4.3-9.7 9.7-9.7h145.6c5.4 0 9.7 4.3 9.7 9.7s-4.3 9.7-9.7 9.7z m0-73.4H461.2c-5.4 0-9.7-4.3-9.7-9.7s4.3-9.7 9.7-9.7h209.7c5.4 0 9.7 4.3 9.7 9.7s-4.4 9.7-9.8 9.7z m0-73.3H461.2c-5.4 0-9.7-4.3-9.7-9.7s4.3-9.7 9.7-9.7h209.7c5.4 0 9.7 4.3 9.7 9.7s-4.4 9.7-9.8 9.7z" fill="#E6E6E6"></path><path d="M254.6 355.5c-52.6 4.9-93.9 49.3-93.9 103.1 0 57.1 46.5 103.6 103.6 103.6 53.8 0 98.2-41.3 103.1-93.9H254.6V355.5z" fill="#FFFFFF"></path><path d="M274 335.6h-9.7c-67.8 0-123 55.2-123 123s55.2 123 123 123 123-55.2 123-123v-9.7H274V335.6z m93.4 132.8c-4.9 52.6-49.3 93.9-103.1 93.9-57.1 0-103.6-46.5-103.6-103.6 0-53.8 41.3-98.2 93.9-103.1v112.8h112.8z" fill="#005BFF"></path><path d="M297.2 325.2v94.7h94.7c0-52.3-42.4-94.7-94.7-94.7z" fill="#005BFF"></path><path d="M150 288.8m-11.9 0a11.9 11.9 0 1 0 23.8 0 11.9 11.9 0 1 0-23.8 0Z" fill="#FFFFFF"></path><path d="M189 288.8m-11.9 0a11.9 11.9 0 1 0 23.8 0 11.9 11.9 0 1 0-23.8 0Z" fill="#FFFFFF"></path><path d="M222.1 300.7h61.3c1.6 0 2.8-1.3 2.8-2.8v-17.5c0-1.6-1.3-2.8-2.8-2.8h-61.3c-1.6 0-2.8 1.3-2.8 2.8v17.5c0 1.6 1.3 2.8 2.8 2.8z" fill="#FFFFFF"></path><path d="M912.9 732.5c-47 0-86.3 33.5-95.3 77.8H701.9c-11.7 0-20.2-2.3-23.2-6.3-2-2.7-2-7-2-9v-51.1h109.9c37.5 0 67.9-30.5 67.9-67.9V235.2c0-37.5-30.5-67.9-67.9-67.9h-706c-37.5 0-67.9 30.5-67.9 67.9v440.7c0 37.5 30.5 67.9 67.9 67.9h557.2V795c0 4.8 0 19.3 9.9 32.4 10.9 14.4 29.1 21.7 54.2 21.7h308.2v-19.4c0-53.6-43.6-97.2-97.2-97.2zM80.6 705.1c-16.1 0-29.1-13.1-29.1-29.1V235.2c0-16.1 13.1-29.1 29.1-29.1h705.9c16.1 0 29.1 13.1 29.1 29.1v440.7c0 16.1-13.1 29.1-29.1 29.1H80.6z m832.3 105.2h-55.1c8-22.7 29.7-39 55.1-39s47.1 16.3 55.1 39h-55.1z" fill="#005BFF"></path><path d="M670.8 329.4H461.2c-5.4 0-9.7 4.3-9.7 9.7s4.3 9.7 9.7 9.7h209.7c5.4 0 9.7-4.3 9.7-9.7s-4.4-9.7-9.8-9.7z" fill="#005BFF"></path><path d="M670.8 402.7H461.2c-5.4 0-9.7 4.3-9.7 9.7s4.3 9.7 9.7 9.7h209.7c5.4 0 9.7-4.3 9.7-9.7s-4.4-9.7-9.8-9.7zM670.8 476.1H525.2c-5.4 0-9.7 4.3-9.7 9.7s4.3 9.7 9.7 9.7h145.6c5.4 0 9.7-4.3 9.7-9.7s-4.3-9.7-9.7-9.7z" fill="#06F3FF"></path><path d="M670.8 549.4H530.1c-5.4 0-9.7 4.3-9.7 9.7 0 5.4 4.3 9.7 9.7 9.7h140.7c5.4 0 9.7-4.3 9.7-9.7 0-5.4-4.3-9.7-9.7-9.7z" fill="#005BFF"></path></g></svg>} />
                                    <SectionOneItem lien="/account/service" t={"Vos services ou produits"} icone={<svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M594.7 800.4H272.4c-10.7 0-19.4 8.7-19.4 19.4s8.7 19.4 19.4 19.4h322.3c10.7 0 19.4-8.7 19.4-19.4 0-10.8-8.7-19.4-19.4-19.4z" fill="#005BFF"></path><path d="M912.9 771.4v39H968c-8.1-22.7-29.7-39-55.1-39z" fill="#E6E6E6"></path><path d="M815.6 675.9V235.2c0-16.1-13.1-29.1-29.1-29.1H80.6c-16.1 0-29.1 13.1-29.1 29.1v440.7c0 16.1 13.1 29.1 29.1 29.1h705.9c16.1 0.1 29.1-13 29.1-29.1z m-43.9-42c0 16-13.1 29.1-29.1 29.1h-618c-16 0-29.1-13.1-29.1-29.1V277.3c0-16 13.1-29.1 29.1-29.1h618c16 0 29.1 13.1 29.1 29.1v356.6z" fill="#FFFFFF"></path><path d="M742.6 248.2h-618c-16 0-29.1 13.1-29.1 29.1v356.6c0 16 13.1 29.1 29.1 29.1h618c16 0 29.1-13.1 29.1-29.1V277.3c0-16-13.1-29.1-29.1-29.1z m-523.3 32.2c0-1.6 1.3-2.8 2.8-2.8h61.3c1.6 0 2.8 1.3 2.8 2.8v17.5c0 1.6-1.3 2.8-2.8 2.8h-61.3c-1.6 0-2.8-1.3-2.8-2.8v-17.5z m-30.3-3.5c6.6 0 11.9 5.3 11.9 11.9s-5.3 11.9-11.9 11.9c-6.6 0-11.9-5.3-11.9-11.9s5.4-11.9 11.9-11.9z m-39 0c6.6 0 11.9 5.3 11.9 11.9s-5.3 11.9-11.9 11.9c-6.6 0-11.9-5.3-11.9-11.9s5.3-11.9 11.9-11.9z m237.3 181.7c0 67.8-55.2 123-123 123s-123-55.2-123-123 55.2-123 123-123h9.7v113.3h113.3v9.7z m-90.1-38.7v-94.7c52.3 0 94.7 42.4 94.7 94.7h-94.7z m373.6 148.9H530.1c-5.4 0-9.7-4.3-9.7-9.7 0-5.4 4.3-9.7 9.7-9.7h140.7c5.4 0 9.7 4.3 9.7 9.7 0 5.3-4.3 9.7-9.7 9.7z m0-73.3H525.2c-5.4 0-9.7-4.3-9.7-9.7s4.3-9.7 9.7-9.7h145.6c5.4 0 9.7 4.3 9.7 9.7s-4.3 9.7-9.7 9.7z m0-73.4H461.2c-5.4 0-9.7-4.3-9.7-9.7s4.3-9.7 9.7-9.7h209.7c5.4 0 9.7 4.3 9.7 9.7s-4.4 9.7-9.8 9.7z m0-73.3H461.2c-5.4 0-9.7-4.3-9.7-9.7s4.3-9.7 9.7-9.7h209.7c5.4 0 9.7 4.3 9.7 9.7s-4.4 9.7-9.8 9.7z" fill="#E6E6E6"></path><path d="M254.6 355.5c-52.6 4.9-93.9 49.3-93.9 103.1 0 57.1 46.5 103.6 103.6 103.6 53.8 0 98.2-41.3 103.1-93.9H254.6V355.5z" fill="#FFFFFF"></path><path d="M274 335.6h-9.7c-67.8 0-123 55.2-123 123s55.2 123 123 123 123-55.2 123-123v-9.7H274V335.6z m93.4 132.8c-4.9 52.6-49.3 93.9-103.1 93.9-57.1 0-103.6-46.5-103.6-103.6 0-53.8 41.3-98.2 93.9-103.1v112.8h112.8z" fill="#005BFF"></path><path d="M297.2 325.2v94.7h94.7c0-52.3-42.4-94.7-94.7-94.7z" fill="#005BFF"></path><path d="M150 288.8m-11.9 0a11.9 11.9 0 1 0 23.8 0 11.9 11.9 0 1 0-23.8 0Z" fill="#FFFFFF"></path><path d="M189 288.8m-11.9 0a11.9 11.9 0 1 0 23.8 0 11.9 11.9 0 1 0-23.8 0Z" fill="#FFFFFF"></path><path d="M222.1 300.7h61.3c1.6 0 2.8-1.3 2.8-2.8v-17.5c0-1.6-1.3-2.8-2.8-2.8h-61.3c-1.6 0-2.8 1.3-2.8 2.8v17.5c0 1.6 1.3 2.8 2.8 2.8z" fill="#FFFFFF"></path><path d="M912.9 732.5c-47 0-86.3 33.5-95.3 77.8H701.9c-11.7 0-20.2-2.3-23.2-6.3-2-2.7-2-7-2-9v-51.1h109.9c37.5 0 67.9-30.5 67.9-67.9V235.2c0-37.5-30.5-67.9-67.9-67.9h-706c-37.5 0-67.9 30.5-67.9 67.9v440.7c0 37.5 30.5 67.9 67.9 67.9h557.2V795c0 4.8 0 19.3 9.9 32.4 10.9 14.4 29.1 21.7 54.2 21.7h308.2v-19.4c0-53.6-43.6-97.2-97.2-97.2zM80.6 705.1c-16.1 0-29.1-13.1-29.1-29.1V235.2c0-16.1 13.1-29.1 29.1-29.1h705.9c16.1 0 29.1 13.1 29.1 29.1v440.7c0 16.1-13.1 29.1-29.1 29.1H80.6z m832.3 105.2h-55.1c8-22.7 29.7-39 55.1-39s47.1 16.3 55.1 39h-55.1z" fill="#005BFF"></path><path d="M670.8 329.4H461.2c-5.4 0-9.7 4.3-9.7 9.7s4.3 9.7 9.7 9.7h209.7c5.4 0 9.7-4.3 9.7-9.7s-4.4-9.7-9.8-9.7z" fill="#005BFF"></path><path d="M670.8 402.7H461.2c-5.4 0-9.7 4.3-9.7 9.7s4.3 9.7 9.7 9.7h209.7c5.4 0 9.7-4.3 9.7-9.7s-4.4-9.7-9.8-9.7zM670.8 476.1H525.2c-5.4 0-9.7 4.3-9.7 9.7s4.3 9.7 9.7 9.7h145.6c5.4 0 9.7-4.3 9.7-9.7s-4.3-9.7-9.7-9.7z" fill="#06F3FF"></path><path d="M670.8 549.4H530.1c-5.4 0-9.7 4.3-9.7 9.7 0 5.4 4.3 9.7 9.7 9.7h140.7c5.4 0 9.7-4.3 9.7-9.7 0-5.4-4.3-9.7-9.7-9.7z" fill="#005BFF"></path></g></svg>} />
                                    <SectionOneItem lien="/account/keywords" t={"Vos mots-clés"} icone={<svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M854.7 828.1H169.9c-38.9 0-70.5-31.6-70.5-70.5v-499c0-38.9 31.6-70.5 70.5-70.5h684.7c38.9 0 70.5 31.6 70.5 70.5v499c0.1 38.9-31.5 70.5-70.4 70.5z" fill="#FFFFFF"></path><path d="M885.2 258.1c0-16.5-13.5-30-30-30H169.4c-16.5 0-30 13.5-30 30v120.1h745.7V258.1z m-649.7 96.1c-28.2 0-51.2-23-51.2-51.2s23-51.2 51.2-51.2 51.2 23 51.2 51.2-22.9 51.2-51.2 51.2z m281.8-6.8H374.7c-24.1 0-43.7-19.6-43.7-43.7s19.6-43.7 43.7-43.7h142.6c24.1 0 43.7 19.6 43.7 43.7s-19.6 43.7-43.7 43.7z" fill="#E6E6E6"></path><path d="M213.3 752.8h298.8c5.5 0 10-4.5 10-10s-4.5-10-10-10H213.3c-8.5 0-15.4-6.9-15.4-15.4V524.6c0-5.5-4.5-10-10-10s-10 4.5-10 10v192.9c0.1 19.4 15.9 35.3 35.4 35.3z" fill="#06F3FF"></path><path d="M235.5 271.8c-17.2 0-31.2 14-31.2 31.2s14 31.2 31.2 31.2 31.2-14 31.2-31.2-14-31.2-31.2-31.2z" fill="#FFFFFF"></path><path d="M235.5 251.8c-28.2 0-51.2 23-51.2 51.2s23 51.2 51.2 51.2 51.2-23 51.2-51.2-22.9-51.2-51.2-51.2z m0 82.4c-17.2 0-31.2-14-31.2-31.2s14-31.2 31.2-31.2 31.2 14 31.2 31.2-14 31.2-31.2 31.2z" fill="#005BFF"></path><path d="M517.3 280.1H374.7c-13 0-23.7 10.6-23.7 23.7s10.6 23.7 23.7 23.7h142.6c13 0 23.7-10.6 23.7-23.7s-10.7-23.7-23.7-23.7z" fill="#FFFFFF"></path><path d="M517.3 260.1H374.7c-24.1 0-43.7 19.6-43.7 43.7s19.6 43.7 43.7 43.7h142.6c24.1 0 43.7-19.6 43.7-43.7s-19.6-43.7-43.7-43.7z m0 67.3H374.7c-13 0-23.7-10.6-23.7-23.7s10.6-23.7 23.7-23.7h142.6c13 0 23.7 10.6 23.7 23.7s-10.7 23.7-23.7 23.7z" fill="#005BFF"></path><path d="M855.2 188.1H169.4c-38.6 0-70 31.4-70 70v500c0 38.6 31.4 70 70 70h685.7c38.6 0 70-31.4 70-70v-500c0.1-38.6-31.3-70-69.9-70z m30 570c0 16.5-13.5 30-30 30H169.4c-16.5 0-30-13.5-30-30V398.2h745.7v359.9z m0-379.9H139.5V258.1c0-16.5 13.5-30 30-30h685.7c16.5 0 30 13.5 30 30v120.1z" fill="#005BFF"></path><path d="M459.9 624.6l-114.3-45.3 114.3-43.7v-46.5L296.1 560v39.5l163.8 71.2zM568.7 454.8h-34.4L475.1 702h33.8zM747.9 560.3l-164-70.9v45.8l114.4 44.5-114.4 45v46.2l164-71.4z" fill="#005BFF"></path></g></svg>} />
                                    <SectionOneItem lien="/account/actualite" t={"Actualités de votre organisation"} icone={<svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M262.8 139.5l497.4-2.5v219.2s59.7 25.8 66.9 30.5c21.6 14.3 53.6 20 53.6 92.3v323.7c0 41.2-33.4 74.5-74.5 74.5H216.4c-41.2 0-74.5-33.4-74.5-74.5V497c0-5.4 0.6-15.2 0-27-1.3-25.8 3.7-51.1 29.7-70.2 15.1-11.1 34.5-18.5 51-25.9 22.4-10.1 40.2-17.9 40.2-17.9V139.5z" fill="#FFFFFF"></path><path d="M262.8 399.8l-38.7 17.3-0.4 0.2c-16.2 6.4-26.4 12.4-32.6 18.5l71.8 38.8v-74.8zM797.8 416.7L760.2 400v74.4l70.6-38.2c-6.5-5.6-16.9-11.5-33-19.5z" fill="#E6E6E6"></path><path d="M252.6 753.6V560.7c0-5.5-4.5-10-10-10s-10 4.5-10 10v192.9c0 19.5 15.9 35.4 35.4 35.4h298.8c5.5 0 10-4.5 10-10s-4.5-10-10-10H267.9c-8.4-0.1-15.3-7-15.3-15.4z" fill="#06F3FF"></path><path d="M302.8 368.6zM878 437.7c0 0.2 0.1 0.3 0.1 0.4 0-0.1-0.1-0.3-0.1-0.4zM607.2 475.5c15.4-8.5 27.6-20.2 35.1-33.4 2.4-2.2 3.8-5.1 4-8.3 0.3-0.8 0.7-1.7 1-2.5h-1c-0.2-6.8-5.9-12.2-12.8-12.2-6.6 0-12.1 5-12.7 11.6h-0.2c-9.9 12.4-23 21.1-39.2 27.3-16.2 6.2-35.6 10.2-58.2 10.2-23.4 0-42.8-4.6-61-12-17.9-7.2-33-19.9-43.2-36.2-10-16.1-15-33.3-15-53 0-20.2 5.1-39.6 14.1-58.3 8.7-18.3 22.8-33.4 40.4-43.4 17.8-10.3 38.2-15.6 63.7-15.6 30.1 0 53.6 7.9 70.4 23.3 16.8 15.4 21.8 34.6 21.8 57.5 0 12.8-1.6 25.1-7.5 37-5.9 11.9-11.7 18.4-21.3 25.5-7.1 5.4-23.1 11.7-27.7 11.7-1.5 0-2.8-0.6-3.9-1.8-1.1-1.1-1.6-2.9-1.6-5.2 0.3-4.3 1-8.6 2-12.9l21-80.3c1-1.8 1.8-3.7 1.8-5.9l-0.1-0.6 0.1-0.4h-0.1v-0.1c0-6.7-5.6-12.2-12.4-12.2-3.3 0-6.4 1.2-8.8 3.5-2.3 2.3-3.7 5.4-3.7 8.7l0.1 1.1c0 0.8 0.3 1.5 0.5 2.2l-1.3 4.7c-8-12.7-26.8-20.5-43.7-20.5-14.3 0-35.7 9.9-50.3 32.2-10.8 17.1-17 36.7-17.8 56.8-0.6 17.7 4.7 33.4 15 44 10.3 10.6 23 13.7 30.9 13.7 14.5 0 27.4-5.3 38.5-15.9 1.1 4.8 3.9 9 7.9 11.8 3.9 2.7 9.8 4.1 17.7 4.1 29.1 0 55.9-15.2 70.7-35.6 12.7-17.3 19.8-40.6 19.8-64.3 0-19.9-3.2-38.3-13-55.1-9.8-16.8-22.4-29.8-40.9-38.9-18.5-9.1-39.6-13.7-63.4-13.7-28 0-53 5.7-74.8 17-21.8 11.3-39 28.3-51.5 50.8-12.6 22.6-18.9 46.9-18.9 73.1-0.2 23.1 5.5 45.8 16.6 66.1 11.2 20.9 29 37.4 50.6 47.2 22.7 10.4 49.5 15.6 80.7 15.6 32 0 59.3-6.1 81.6-18.4zM530 368.6c-3.7 10.9-8 19.2-13 24.9-3.5 4-7.1 6.9-10.6 8.8-4.7 2.6-8.2 4.6-13.6 4.6-7.2 0-16.3-2.8-21.1-8.4-4.9-5.6-7.3-14.3-7.3-26.1 0-8.8 4.6-19 8.1-30.4 3.5-11.4 8.7-17.2 15.6-23.4 6.9-6.2 13.2-7.9 21.3-7.9 7.6 0 15.6 2.2 20.5 7.8 5 5.6 8.1 10 8.1 20.5 0.1 9.3-4.4 18.7-8 29.6z" fill="#005BFF"></path><path d="M878.1 438.1c0-0.2-0.1-0.3-0.1-0.4-8.7-30.2-37.2-44.3-62.8-57l-0.4-0.2-54.6-24.4V137l-497.4 2.5V356l-54.2 24.2c-31.1 12.3-66.7 32.3-66.7 77.5v345.1c0 41 33.4 74.4 74.4 74.4h590c41 0 74.4-33.4 74.4-74.4V457.7c0-7.2-0.9-13.7-2.6-19.6zM760.2 400l37.6 16.8c16.2 8 26.5 13.9 33 19.4l-70.6 38.2V400z m-457.4-31.4V179.3l417.4-2.1V496l-199 107.7c-6.1 3.3-13.5 3.3-19.6 0L302.8 496.2V368.6z m-40 31.2v74.8L191 435.7c6.2-6.1 71.8-35.9 71.8-35.9z m577.9 403c0 19-15.4 34.4-34.4 34.4h-590c-19 0-34.4-15.4-34.4-34.4V476.3L482.4 639c9 4.9 18.9 7.3 28.9 7.3 9.9 0 19.8-2.4 28.9-7.3l300.5-162.7v326.5z" fill="#005BFF"></path></g></svg>} />
                                    <SectionOneItem lien="/account/evenement" t={"Vos évènements"} icone={<svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M792.8 360c-1 0-2.1-0.2-3.1-0.5-5.3-1.7-8.1-7.3-6.4-12.6 11.4-35.1 4.8-78.8-17.7-116.9-22.6-38.5-58-65.5-94.5-72.3-5.4-1-9-6.2-8-11.7 1-5.4 6.2-9 11.7-8 42.1 7.9 82.5 38.4 108 81.8 25.3 43 32.6 92.7 19.4 133.2-1.3 4.3-5.2 7-9.4 7z" fill="#06F3FF"></path><path d="M349.2 886.1c-1.3 0-2.6-0.1-3.9-0.4-44.5-8.7-87-41-113.7-86.4-27-45.8-34.5-99-20-142.4 3.5-10.5 14.8-16.1 25.3-12.6 10.5 3.5 16.1 14.8 12.6 25.3-10.8 32.5-4.7 73.4 16.5 109.4 21 35.7 53.5 60.9 86.9 67.4 10.8 2.1 17.9 12.6 15.8 23.5-1.8 9.6-10.1 16.2-19.5 16.2z" fill="#005BFF"></path><path d="M352.4 329.4c-0.6 0-1.1 0-1.7 0.1h-0.1c-0.5 0-1.1 0.1-1.6 0.2-2.7 0.4-5.3 1.3-7.7 2.8L192.6 420l22.4 38 148.7-87.5c3.1-1.8 5.7-4.3 7.5-7.3 0.2-0.3 0.3-0.6 0.5-0.8 0.2-0.3 0.3-0.6 0.5-0.9 0.1-0.2 0.2-0.5 0.3-0.7 0 0 0-0.1 0.1-0.1 0.2-0.4 0.3-0.7 0.5-1.1 0.1-0.2 0.2-0.5 0.3-0.7 0.2-0.6 0.4-1.2 0.6-1.9 1.5-5.7 0.6-11.6-2.3-16.7-4.4-7-11.7-10.9-19.3-10.9z" fill="#E6E6E6"></path><path d="M350.7 329.5s-0.1 0 0 0c-0.1 0 0 0 0 0zM372.9 359.5c0.1-0.2 0.2-0.5 0.3-0.7-0.1 0.3-0.2 0.5-0.3 0.7zM371.1 363.1c0.2-0.3 0.3-0.6 0.5-0.8-0.1 0.3-0.3 0.5-0.5 0.8zM372.5 360.6s0 0.1-0.1 0.1l0.1-0.1z" fill="#005BFF"></path><path d="M650.2 656.8c-1.5 5.7-0.6 11.6 2.3 16.7 6.2 10.5 19.7 14 30.1 7.8l148.7-87.5-22.3-38-148.7 87.5c-5 3.1-8.6 7.8-10.1 13.5z" fill="#E6E6E6"></path><path d="M912.2 520.7c-8.4-14.3-21.9-24.4-37.9-28.6-16-4.2-32.7-1.8-47 6.6L640.1 608.9c-14.3 8.4-24.4 21.9-28.6 37.9-2.4 9.3-2.6 18.9-0.7 28.1l-167.6 98.7c-20.1 11.8-43.7 15.2-66.3 9.3-22.6-5.9-41.6-20.2-53.4-40.3-24.5-41.5-10.6-95.2 31-119.7l323.1-190.3c1.3-0.8 2.6-1.7 3.6-2.8l7.4-4.4c29.3-17.3 50.2-44.9 58.7-77.9 8.5-33 3.7-67.3-13.6-96.6-35.7-60.5-113.9-80.8-174.5-45.2l-166.8 98.2c-7-6-15.4-10.3-24.5-12.7-16-4.1-32.7-1.8-47 6.6L133.8 408.2c-14.3 8.4-24.4 21.9-28.6 37.9s-1.8 32.7 6.6 47c8.4 14.3 21.9 24.4 37.9 28.6 5.2 1.3 10.4 2 15.6 2 10.9 0 21.7-2.9 31.4-8.6l187.2-110.2c14.3-8.4 24.4-21.9 28.6-37.9 2.5-9.5 2.6-19.3 0.6-28.6l166.5-98.1c41.5-24.5 95.2-10.6 119.7 31 11.8 20.1 15.2 43.7 9.3 66.3-5.9 22.6-20.2 41.6-40.3 53.4l-323 190.3c-1.3 0.8-2.6 1.7-3.6 2.8l-7.4 4.4c-60.5 35.7-80.8 113.9-45.2 174.5 23.7 40.3 66.3 62.7 110 62.7 22 0 44.2-5.7 64.4-17.6l167.6-98.7c11.3 9.7 25.8 15 40.5 15 10.7 0 21.5-2.8 31.4-8.6l187.2-110.2c14.3-8.4 24.4-21.9 28.6-37.9 4.1-16.1 1.8-32.8-6.6-47z m-735.8-40.1c-10.5 6.2-24 2.7-30.1-7.8-3-5.1-3.8-11-2.3-16.7 1.5-5.7 5.1-10.5 10.1-13.5l21.3-12.5 22.3 37.9-21.3 12.6zM373.8 357c-0.2 0.6-0.4 1.3-0.6 1.9-0.1 0.2-0.2 0.5-0.3 0.7-0.1 0.4-0.3 0.7-0.5 1.1 0 0 0 0.1-0.1 0.1-0.2 0.5-0.5 1.1-0.8 1.6-0.2 0.3-0.3 0.6-0.5 0.8-1.9 3-4.4 5.5-7.5 7.3L215 458l-22.4-38 148.7-87.5c2.5-1.4 5.1-2.4 7.7-2.8 0.5-0.1 1.1-0.1 1.6-0.2 0.6-0.1 1.2-0.1 1.8-0.1 7.5 0 14.9 3.9 19 10.8 3 5.1 3.9 11.1 2.4 16.8z m308.9 324.3c-2.8 1.7-5.9 2.6-8.9 2.9-8.3 0.8-16.7-3.1-21.2-10.7-3-5.1-3.8-11-2.3-16.7 0.7-2.6 1.8-4.9 3.3-7.1 1.8-2.6 4.1-4.8 6.9-6.4L809 555.8l22.3 37.9-148.6 87.6z m187.2-110.2l-21.3 12.5-22.3-37.9 21.3-12.5c3.4-2 7.3-3.1 11.1-3.1 1.9 0 3.7 0.2 5.6 0.7 5.7 1.5 10.5 5.1 13.5 10.1 6.1 10.5 2.6 24-7.9 30.2z" fill="#005BFF"></path></g></svg>} />
                                    <SectionOneItem lien="/account/contact" t={"Votre identification"} icone={<svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M686.4 361.9c-48 0-171.3-40.2-186.6-45.2-36.6-10.9-138-39.1-171.9-39.1-31.6 0-118.9 22.5-164.1 35.1v465.1c42.9-11.9 125.7-33.5 161.7-33.5 46.6 0 171.9 36.6 186 40.8l0.3 0.1c39.2 12.3 149.3 44 187.3 43.4 29.3-0.5 107.5-24.9 148.2-38.6V324.9c-42.7 13.3-123.9 37-160.9 37z" fill="#FFFFFF"></path><path d="M887.4 269.9l-26.3 8.7c-36.5 12-139.1 43.3-174.7 43.3-35.5 0-137.8-31.3-174.3-43.3l-0.5-0.2c-13.9-4.2-137.6-40.8-183.7-40.8-47.5 0-175.2 36.6-189.6 40.8l-14.4 4.2V831l25.6-7.5c37.1-10.9 141.2-39.2 176.1-39.2 34.5 0 137.5 28.2 174.5 39.1 15.7 4.9 145.9 45.2 198.2 45.2h1.6c45.3-0.8 161.1-40.9 174.2-45.4l13.4-4.7-0.1-548.6zM511.8 785.2l-0.3-0.1c-14.1-4.2-139.4-40.8-186-40.8-36 0-118.8 21.6-161.7 33.5V312.7c45.2-12.6 132.5-35.1 164.1-35.1 34 0 135.4 28.1 171.9 39.1 15.3 5 138.6 45.2 186.6 45.2 36.9 0 118.2-23.6 160.9-36.9v465c-40.8 13.7-118.9 38.1-148.2 38.6-38 0.6-148.1-31.1-187.3-43.4z" fill="#005BFF"></path><path d="M721.7 168.6c-87.3 0-158.4 71-158.4 158.4 0 67.8 43.1 128.1 107.3 149.9 7.3 2.5 18.5 8.8 40.6 36 3.5 4.3 6.9 8.7 10 12.8 30.1-41.9 43.6-46.2 48.5-47.8 66.5-21.1 110.8-82.3 110.3-152.1-0.6-86.7-71.7-157.2-158.3-157.2z" fill="#FFFFFF"></path><path d="M861.5 186c-37.3-37.1-87-57.5-139.8-57.5-109.4 0-198.4 89-198.4 198.4 0 84.8 53.9 160.2 134 187.7 6.5 3.4 25.6 24.9 46.5 55.3 4 5.9 10.7 9.3 17.8 9.3h0.3c7.2-0.1 13.9-3.8 17.8-9.8 19-29.2 36.5-50 42.8-53.7 39.2-12.6 74.3-37.9 98.9-71.2 25.6-34.7 39-75.9 38.6-119.1-0.4-52.8-21.1-102.3-58.5-139.4zM670.6 476.9C606.4 455 563.3 394.8 563.3 327c0-87.3 71-158.4 158.4-158.4 86.7 0 157.7 70.5 158.4 157.2 0.5 69.9-43.8 131-110.3 152.1-4.9 1.6-18.5 5.9-48.5 47.8-3.1-4.1-6.5-8.5-10-12.8-22.2-27.2-33.4-33.5-40.7-36z" fill="#005BFF"></path><path d="M797.4 405.3c-2.4 0-4.8-0.9-6.7-2.6-4.1-3.7-4.4-10-0.7-14.1 15.5-17.1 23.9-39.3 23.8-62.5-0.4-50.4-41.7-91.4-92.1-91.4-12.8 0-25.2 2.6-36.8 7.6-5.1 2.2-11-0.1-13.2-5.2-2.2-5.1 0.1-11 5.2-13.2 14.2-6.2 29.2-9.3 44.8-9.3 29.9 0 57.9 11.5 79 32.5 21.1 20.9 32.8 48.9 33.1 78.8 0.2 28.2-10.1 55.2-28.9 76-2.1 2.3-4.8 3.4-7.5 3.4z" fill="#06F3FF"></path><path d="M221 601.6c-0.5 0-1 0-1.6-0.1-5.5-0.9-9.2-6-8.3-11.4 0-0.1 0.3-2 0.9-5.3 1-5.4 6.3-9 11.7-7.9 5.4 1 9 6.3 7.9 11.7-0.6 2.9-0.8 4.5-0.8 4.6-0.7 4.9-5 8.4-9.8 8.4zM691.3 764.7h-3c-2.6 0-5.2-0.2-7.7-0.4-5.5-0.4-9.6-5.2-9.2-10.7 0.4-5.5 5.2-9.6 10.7-9.2 2.2 0.2 4.4 0.3 6.5 0.3h2.7c5.5 0 10 4.5 9.9 10.1 0.1 5.5-4.4 9.9-9.9 9.9z m39.6-4.3c-4.5 0-8.6-3.1-9.7-7.6-1.3-5.4 2-10.8 7.4-12.1 3-0.7 6-1.6 8.9-2.5 5.3-1.7 10.9 1.2 12.6 6.4 1.7 5.3-1.2 10.9-6.4 12.6-3.3 1.1-6.8 2.1-10.3 2.9-1 0.2-1.8 0.3-2.5 0.3z m-88.1-5.7c-1.3 0-2.7-0.3-4-0.8-3.2-1.4-6.5-3-9.7-4.7-4.9-2.6-6.7-8.7-4.1-13.5 2.6-4.9 8.7-6.7 13.5-4.1 2.7 1.5 5.5 2.8 8.3 4 5.1 2.2 7.4 8.1 5.2 13.2-1.7 3.7-5.3 5.9-9.2 5.9z m132.9-15.4c-3 0-5.9-1.3-7.9-3.8-3.4-4.3-2.6-10.6 1.7-14 2.4-1.8 4.6-3.8 6.8-5.9 4-3.8 10.3-3.7 14.1 0.3s3.7 10.3-0.3 14.1c-2.6 2.5-5.4 4.9-8.3 7.2-1.8 1.4-4 2.1-6.1 2.1z m-173.9-12.6c-2.5 0-5-0.9-7-2.8-2.5-2.4-5-5-7.4-7.6-3.7-4.1-3.5-10.4 0.6-14.1 4.1-3.7 10.4-3.5 14.1 0.6 2.1 2.3 4.3 4.6 6.5 6.7 4 3.8 4.1 10.2 0.2 14.1-1.8 2.1-4.4 3.1-7 3.1z m204.1-26.5c-1.3 0-2.7-0.3-4-0.9-5.1-2.2-7.3-8.1-5.1-13.2 1.2-2.7 2.3-5.6 3.3-8.5 1.8-5.2 7.4-8 12.7-6.3 5.2 1.8 8 7.4 6.3 12.7-1.2 3.4-2.5 6.9-3.9 10.1-1.8 3.9-5.5 6.1-9.3 6.1z m-234.5-12.8c-3.5 0-6.8-1.8-8.7-5-1.8-3.1-3.4-6.2-5-9.3-2.5-4.9-0.4-10.9 4.5-13.4s10.9-0.4 13.4 4.5c1.4 2.8 2.9 5.6 4.4 8.3 2.7 4.8 1.1 10.9-3.7 13.6-1.5 0.8-3.2 1.3-4.9 1.3z m-17.6-46.6c-4.5 0-8.5-3-9.7-7.5-0.8-3-1.6-6.2-2.5-9.4-1.5-5.3 1.6-10.8 6.9-12.3 5.3-1.5 10.8 1.6 12.3 6.9 1 3.4 1.8 6.7 2.7 9.9 1.4 5.4-1.9 10.8-7.2 12.2-0.8 0.1-1.6 0.2-2.5 0.2z m-14.9-47.7c-4.1 0-7.9-2.5-9.4-6.6-1.1-3.1-2.3-6.1-3.5-9.2-2-5.1 0.5-10.9 5.7-13 5.1-2 10.9 0.5 13 5.7 1.2 3.1 2.4 6.4 3.6 9.5 1.9 5.2-0.8 10.9-5.9 12.8-1.2 0.6-2.3 0.8-3.5 0.8z m-307.1-35c-1 0-2-0.2-3-0.5-5.3-1.7-8.2-7.3-6.5-12.6 1-3.3 2.1-6.5 3.3-9.7 1.8-5.2 7.5-8 12.7-6.1 5.2 1.8 8 7.5 6.1 12.7-1.1 3-2.1 6.1-3.1 9.2-1.3 4.3-5.2 7-9.5 7z m287.5-11c-3.7 0-7.2-2-9-5.6-1.4-2.9-2.9-5.8-4.4-8.7-2.6-4.9-0.7-10.9 4.2-13.5 4.9-2.6 10.9-0.7 13.5 4.2 1.6 3 3.1 6.1 4.6 9.1 2.4 5 0.4 10.9-4.5 13.4-1.4 0.8-2.9 1.1-4.4 1.1z m-268.8-35.3c-1.5 0-3.1-0.3-4.5-1.1-4.9-2.5-6.9-8.5-4.4-13.4 1.6-3.1 3.2-6.2 4.9-9.2 2.7-4.8 8.8-6.6 13.6-3.9 4.8 2.7 6.6 8.8 3.9 13.6-1.5 2.7-3 5.6-4.5 8.5-1.8 3.5-5.4 5.5-9 5.5z m243.8-7.8c-3.2 0-6.3-1.5-8.3-4.3-1.8-2.7-3.7-5.3-5.6-7.9-3.3-4.4-2.3-10.7 2.1-14 4.4-3.3 10.7-2.3 14 2.1 2 2.7 4 5.6 6 8.4 3.1 4.6 2 10.8-2.6 13.9-1.7 1.2-3.7 1.8-5.6 1.8z m-216.7-33.9c-2.3 0-4.6-0.8-6.5-2.4-4.2-3.6-4.7-9.9-1.2-14.1 2.3-2.7 4.7-5.4 7.1-7.9 3.8-4 10.2-4.1 14.1-0.3 4 3.8 4.1 10.2 0.3 14.1-2.1 2.2-4.2 4.5-6.3 6.9-1.8 2.5-4.6 3.7-7.5 3.7z m184.6-4.3c-2.5 0-4.9-0.9-6.9-2.7-2.3-2.2-4.7-4.3-7-6.3-4.2-3.6-4.7-9.9-1.1-14.1 3.6-4.2 9.9-4.7 14.1-1.1 2.6 2.2 5.3 4.6 7.8 7 4 3.8 4.2 10.1 0.4 14.1-2 2.1-4.7 3.1-7.3 3.1z m-146.4-27.4c-3.6 0-7-1.9-8.8-5.3-2.6-4.9-0.8-10.9 4.1-13.5 3.2-1.7 6.5-3.3 9.8-4.7 5.1-2.2 11 0.2 13.1 5.3s-0.2 11-5.3 13.1c-2.7 1.2-5.5 2.5-8.2 3.9-1.5 0.8-3.1 1.2-4.7 1.2z m105.7-1c-1.4 0-2.9-0.3-4.3-1-2.8-1.3-5.6-2.5-8.5-3.6-5.2-2-7.8-7.7-5.8-12.9s7.7-7.8 12.9-5.8c3.3 1.3 6.6 2.7 9.9 4.2 5 2.4 7.1 8.3 4.8 13.3-1.7 3.7-5.3 5.8-9 5.8z m-48-11.9h-1.3c-2.7-0.1-5.6-0.1-8.3 0-5.5 0.2-10.2-4.1-10.4-9.6-0.2-5.5 4.1-10.2 9.6-10.4 3.3-0.1 6.6-0.1 9.8 0h0.9c5.5 0.2 9.8 4.9 9.6 10.4-0.2 5.4-4.6 9.6-9.9 9.6zM816.1 651.8h-0.3c-5.5-0.2-9.9-4.8-9.7-10.3 0-1.5 0.1-3.1 0.1-4.7 0-5.5 4.4-10 10-10 5.5 0 10 4.5 10 10 0 1.8 0 3.6-0.1 5.3-0.1 5.4-4.6 9.7-10 9.7z" fill="#005BFF"></path><path d="M221 632.4c-13.2 0-24 10.8-24 24s10.8 24 24 24 24-10.8 24-24-10.8-24-24-24z" fill="#E6E6E6"></path><path d="M221 612.4c-24.2 0-44 19.7-44 44s19.7 44 44 44 44-19.7 44-44-19.8-44-44-44z m0 67.9c-13.2 0-24-10.8-24-24s10.8-24 24-24 24 10.8 24 24-10.8 24-24 24z" fill="#005BFF"></path><path d="M527.4 535.7c-18.3 0-33.1 14.9-33.1 33.1s14.9 33.1 33.1 33.1c18.3 0 33.1-14.9 33.1-33.1s-14.8-33.1-33.1-33.1z" fill="#E6E6E6"></path><path d="M527.4 515.7c-29.3 0-53.1 23.8-53.1 53.1s23.8 53.1 53.1 53.1 53.1-23.8 53.1-53.1-23.8-53.1-53.1-53.1z m0 86.3c-18.3 0-33.1-14.9-33.1-33.1s14.9-33.1 33.1-33.1c18.3 0 33.1 14.9 33.1 33.1S545.7 602 527.4 602z" fill="#005BFF"></path></g></svg>} />
                                    <SectionOneItem lien="/account/description" t={"Description de votre organisation"} icone={<svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M854.7 828.1H169.9c-38.9 0-70.5-31.6-70.5-70.5v-499c0-38.9 31.6-70.5 70.5-70.5h684.7c38.9 0 70.5 31.6 70.5 70.5v499c0.1 38.9-31.5 70.5-70.4 70.5z" fill="#FFFFFF"></path><path d="M885.2 258.1c0-16.5-13.5-30-30-30H169.4c-16.5 0-30 13.5-30 30v120.1h745.7V258.1z m-649.7 96.1c-28.2 0-51.2-23-51.2-51.2s23-51.2 51.2-51.2 51.2 23 51.2 51.2-22.9 51.2-51.2 51.2z m281.8-6.8H374.7c-24.1 0-43.7-19.6-43.7-43.7s19.6-43.7 43.7-43.7h142.6c24.1 0 43.7 19.6 43.7 43.7s-19.6 43.7-43.7 43.7z" fill="#E6E6E6"></path><path d="M213.3 752.8h298.8c5.5 0 10-4.5 10-10s-4.5-10-10-10H213.3c-8.5 0-15.4-6.9-15.4-15.4V524.6c0-5.5-4.5-10-10-10s-10 4.5-10 10v192.9c0.1 19.4 15.9 35.3 35.4 35.3z" fill="#06F3FF"></path><path d="M235.5 271.8c-17.2 0-31.2 14-31.2 31.2s14 31.2 31.2 31.2 31.2-14 31.2-31.2-14-31.2-31.2-31.2z" fill="#FFFFFF"></path><path d="M235.5 251.8c-28.2 0-51.2 23-51.2 51.2s23 51.2 51.2 51.2 51.2-23 51.2-51.2-22.9-51.2-51.2-51.2z m0 82.4c-17.2 0-31.2-14-31.2-31.2s14-31.2 31.2-31.2 31.2 14 31.2 31.2-14 31.2-31.2 31.2z" fill="#005BFF"></path><path d="M517.3 280.1H374.7c-13 0-23.7 10.6-23.7 23.7s10.6 23.7 23.7 23.7h142.6c13 0 23.7-10.6 23.7-23.7s-10.7-23.7-23.7-23.7z" fill="#FFFFFF"></path><path d="M517.3 260.1H374.7c-24.1 0-43.7 19.6-43.7 43.7s19.6 43.7 43.7 43.7h142.6c24.1 0 43.7-19.6 43.7-43.7s-19.6-43.7-43.7-43.7z m0 67.3H374.7c-13 0-23.7-10.6-23.7-23.7s10.6-23.7 23.7-23.7h142.6c13 0 23.7 10.6 23.7 23.7s-10.7 23.7-23.7 23.7z" fill="#005BFF"></path><path d="M855.2 188.1H169.4c-38.6 0-70 31.4-70 70v500c0 38.6 31.4 70 70 70h685.7c38.6 0 70-31.4 70-70v-500c0.1-38.6-31.3-70-69.9-70z m30 570c0 16.5-13.5 30-30 30H169.4c-16.5 0-30-13.5-30-30V398.2h745.7v359.9z m0-379.9H139.5V258.1c0-16.5 13.5-30 30-30h685.7c16.5 0 30 13.5 30 30v120.1z" fill="#005BFF"></path><path d="M459.9 624.6l-114.3-45.3 114.3-43.7v-46.5L296.1 560v39.5l163.8 71.2zM568.7 454.8h-34.4L475.1 702h33.8zM747.9 560.3l-164-70.9v45.8l114.4 44.5-114.4 45v46.2l164-71.4z" fill="#005BFF"></path></g></svg>} />
                                    <SectionOneItem lien="/account/surcussale" t={"Gestion des surcussales"} icone={<svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M854.7 828.1H169.9c-38.9 0-70.5-31.6-70.5-70.5v-499c0-38.9 31.6-70.5 70.5-70.5h684.7c38.9 0 70.5 31.6 70.5 70.5v499c0.1 38.9-31.5 70.5-70.4 70.5z" fill="#FFFFFF"></path><path d="M885.2 258.1c0-16.5-13.5-30-30-30H169.4c-16.5 0-30 13.5-30 30v120.1h745.7V258.1z m-649.7 96.1c-28.2 0-51.2-23-51.2-51.2s23-51.2 51.2-51.2 51.2 23 51.2 51.2-22.9 51.2-51.2 51.2z m281.8-6.8H374.7c-24.1 0-43.7-19.6-43.7-43.7s19.6-43.7 43.7-43.7h142.6c24.1 0 43.7 19.6 43.7 43.7s-19.6 43.7-43.7 43.7z" fill="#E6E6E6"></path><path d="M213.3 752.8h298.8c5.5 0 10-4.5 10-10s-4.5-10-10-10H213.3c-8.5 0-15.4-6.9-15.4-15.4V524.6c0-5.5-4.5-10-10-10s-10 4.5-10 10v192.9c0.1 19.4 15.9 35.3 35.4 35.3z" fill="#06F3FF"></path><path d="M235.5 271.8c-17.2 0-31.2 14-31.2 31.2s14 31.2 31.2 31.2 31.2-14 31.2-31.2-14-31.2-31.2-31.2z" fill="#FFFFFF"></path><path d="M235.5 251.8c-28.2 0-51.2 23-51.2 51.2s23 51.2 51.2 51.2 51.2-23 51.2-51.2-22.9-51.2-51.2-51.2z m0 82.4c-17.2 0-31.2-14-31.2-31.2s14-31.2 31.2-31.2 31.2 14 31.2 31.2-14 31.2-31.2 31.2z" fill="#005BFF"></path><path d="M517.3 280.1H374.7c-13 0-23.7 10.6-23.7 23.7s10.6 23.7 23.7 23.7h142.6c13 0 23.7-10.6 23.7-23.7s-10.7-23.7-23.7-23.7z" fill="#FFFFFF"></path><path d="M517.3 260.1H374.7c-24.1 0-43.7 19.6-43.7 43.7s19.6 43.7 43.7 43.7h142.6c24.1 0 43.7-19.6 43.7-43.7s-19.6-43.7-43.7-43.7z m0 67.3H374.7c-13 0-23.7-10.6-23.7-23.7s10.6-23.7 23.7-23.7h142.6c13 0 23.7 10.6 23.7 23.7s-10.7 23.7-23.7 23.7z" fill="#005BFF"></path><path d="M855.2 188.1H169.4c-38.6 0-70 31.4-70 70v500c0 38.6 31.4 70 70 70h685.7c38.6 0 70-31.4 70-70v-500c0.1-38.6-31.3-70-69.9-70z m30 570c0 16.5-13.5 30-30 30H169.4c-16.5 0-30-13.5-30-30V398.2h745.7v359.9z m0-379.9H139.5V258.1c0-16.5 13.5-30 30-30h685.7c16.5 0 30 13.5 30 30v120.1z" fill="#005BFF"></path><path d="M459.9 624.6l-114.3-45.3 114.3-43.7v-46.5L296.1 560v39.5l163.8 71.2zM568.7 454.8h-34.4L475.1 702h33.8zM747.9 560.3l-164-70.9v45.8l114.4 44.5-114.4 45v46.2l164-71.4z" fill="#005BFF"></path></g></svg>} />
                                </div>
                            </Layout>
                            <Layout titre="Vos statistiques" titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>}>
                                <div className="flex flex-row justify-between gap-3">
                                    <SectionTwoItem lien="/account/statistique/profil" t="Vues profil" icone={<svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M878.3 192.9H145.7c-16.5 0-30 13.5-30 30V706c0 16.5 13.5 30 30 30h732.6c16.5 0 30-13.5 30-30V222.9c0-16.5-13.5-30-30-30z" fill="#FFFFFF"></path><path d="M145.7 736h732.6c16.5 0 30-13.5 30-30v-22.1H115.7V706c0 16.6 13.5 30 30 30z" fill="#E6E6E6"></path><path d="M878.3 152.9H145.7c-38.6 0-70 31.4-70 70V706c0 38.6 31.4 70 70 70h732.6c38.6 0 70-31.4 70-70V222.9c0-38.6-31.4-70-70-70z m30 531V706c0 16.5-13.5 30-30 30H145.7c-16.5 0-30-13.5-30-30V222.9c0-16.5 13.5-30 30-30h732.6c16.5 0 30 13.5 30 30v461zM678 871.1H346c-11 0-20-9-20-20s9-20 20-20h332c11 0 20 9 20 20s-9 20-20 20z" fill="#005BFF"></path><path d="M127.1 662.7c-2.7 0-5.4-1.1-7.3-3.2-3.7-4.1-3.5-10.4 0.6-14.1l236.5-219.6L463 541.9l258.9-290.7 183.7 196.3c3.8 4 3.6 10.4-0.4 14.1-4 3.8-10.3 3.6-14.1-0.4L722.3 280.8l-259 290.9L355.7 454 133.9 660c-2 1.8-4.4 2.7-6.8 2.7z" fill="#06F3FF"></path><path d="M156.4 541.9a82.7 82.8 0 1 0 165.4 0 82.7 82.8 0 1 0-165.4 0Z" fill="#D7E7FF"></path><path d="M179.8 541.9a59.3 59.3 0 1 0 118.6 0 59.3 59.3 0 1 0-118.6 0Z" fill="#B5CFF4"></path><path d="M208.9 541.9a30.2 30.3 0 1 0 60.4 0 30.2 30.3 0 1 0-60.4 0Z" fill="#005BFF"></path><path d="M580.9 329.9a82.7 82.8 0 1 0 165.4 0 82.7 82.8 0 1 0-165.4 0Z" fill="#D7E7FF"></path><path d="M604.3 329.9a59.3 59.3 0 1 0 118.6 0 59.3 59.3 0 1 0-118.6 0Z" fill="#B5CFF4"></path><path d="M633.4 329.9a30.2 30.3 0 1 0 60.4 0 30.2 30.3 0 1 0-60.4 0Z" fill="#005BFF"></path><path d="M719.3 539.6a46.3 46.4 0 1 0 92.6 0 46.3 46.4 0 1 0-92.6 0Z" fill="#D7E7FF"></path><path d="M732.4 539.6a33.2 33.2 0 1 0 66.4 0 33.2 33.2 0 1 0-66.4 0Z" fill="#B5CFF4"></path><path d="M748.7 539.6a16.9 17 0 1 0 33.8 0 16.9 17 0 1 0-33.8 0Z" fill="#005BFF"></path><path d="M436.8 720.1H275.2c-5 0-9-4-9-9s4-9 9-9h161.6c5 0 9 4 9 9 0 4.9-4.1 9-9 9zM220.6 720.1h-26.5c-5 0-9-4-9-9s4-9 9-9h26.5c5 0 9 4 9 9 0 4.9-4.1 9-9 9z" fill="#FFFFFF"></path></g></svg>} />
                                    <SectionTwoItem lien="/account/statistique/siteweb" t={"Click sur site web"} icone={<svg width="64px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512.4 507.9m-232.1 0a232.1 232.1 0 1 0 464.2 0 232.1 232.1 0 1 0-464.2 0Z" fill="#FFFFFF"></path><path d="M513.8 874.9c-5.5 0-10-4.4-10-9.9s4.4-10 9.9-10.1c3.2 0 6.5-0.1 9.7-0.2 5.5-0.2 10.1 4.1 10.3 9.7 0.2 5.5-4.1 10.1-9.7 10.3-3.2 0.1-6.7 0.2-10.2 0.2 0.1 0 0.1 0 0 0z m-39.9-1.9c-0.3 0-0.7 0-1.1-0.1l-10.2-1.2c-5.5-0.7-9.3-5.8-8.6-11.2 0.7-5.5 5.8-9.3 11.2-8.6 3.2 0.4 6.4 0.8 9.6 1.1 5.5 0.6 9.5 5.5 8.9 11-0.4 5.2-4.7 9-9.8 9z m89.7-1.8c-4.9 0-9.2-3.6-9.9-8.6-0.8-5.5 3-10.5 8.5-11.3l9.6-1.5c5.4-0.9 10.6 2.7 11.6 8.1s-2.7 10.6-8.1 11.6c-3.4 0.6-6.8 1.1-10.2 1.6-0.5 0.1-1 0.1-1.5 0.1z m-138.8-6.9c-0.8 0-1.6-0.1-2.4-0.3-3.3-0.8-6.6-1.7-9.9-2.6-5.3-1.5-8.4-7-6.9-12.3 1.5-5.3 7-8.4 12.3-6.9 3.1 0.9 6.3 1.7 9.4 2.5 5.4 1.3 8.6 6.8 7.3 12.1-1.3 4.5-5.4 7.5-9.8 7.5z m187.6-3.8c-4.3 0-8.3-2.8-9.6-7.2-1.6-5.3 1.5-10.9 6.8-12.4 3.1-0.9 6.2-1.9 9.3-2.9 5.3-1.7 10.9 1.2 12.6 6.4 1.7 5.3-1.2 10.9-6.4 12.6-3.2 1.1-6.6 2.1-9.8 3-1 0.4-1.9 0.5-2.9 0.5z m-235.2-11.7c-1.3 0-2.5-0.2-3.8-0.7-3.2-1.3-6.4-2.6-9.5-4-5.1-2.2-7.4-8.1-5.1-13.2 2.2-5.1 8.1-7.4 13.2-5.1 3 1.3 6 2.6 9 3.8 5.1 2.1 7.6 7.9 5.5 13-1.6 3.9-5.3 6.2-9.3 6.2z m282.1-5.6c-3.8 0-7.4-2.2-9.1-5.9-2.3-5-0.1-11 5-13.2 2.9-1.3 5.9-2.7 8.8-4.1 5-2.4 11-0.4 13.4 4.6 2.4 5 0.4 11-4.6 13.4-3.1 1.5-6.2 3-9.3 4.4-1.5 0.5-2.9 0.8-4.2 0.8z m-327-16.4c-1.7 0-3.4-0.4-5-1.4-2.9-1.7-5.9-3.5-8.8-5.3-4.7-2.9-6.2-9.1-3.2-13.8 2.9-4.7 9.1-6.2 13.8-3.2 2.8 1.7 5.6 3.4 8.3 5 4.8 2.8 6.4 8.9 3.6 13.7-1.9 3.3-5.2 5-8.7 5z m370.9-7.4c-3.3 0-6.5-1.6-8.5-4.6-3-4.7-1.6-10.8 3.1-13.8 2.7-1.7 5.4-3.5 8.1-5.3a9.99 9.99 0 0 1 13.9 2.7 9.99 9.99 0 0 1-2.7 13.9c-2.8 1.9-5.7 3.8-8.6 5.6-1.7 1-3.5 1.5-5.3 1.5zM291 798.8c-2.2 0-4.3-0.7-6.2-2.1-2.7-2.1-5.4-4.3-8-6.5-4.2-3.5-4.8-9.8-1.3-14.1 3.5-4.2 9.8-4.8 14.1-1.3 2.5 2.1 5 4.1 7.6 6.1 4.3 3.4 5.1 9.7 1.7 14-2 2.6-5 3.9-7.9 3.9z m452.3-9c-2.8 0-5.6-1.2-7.6-3.5-3.6-4.2-3.1-10.5 1.1-14.1 2.5-2.1 4.9-4.2 7.3-6.4 4.1-3.7 10.4-3.4 14.1 0.7 3.7 4.1 3.4 10.4-0.7 14.1-2.5 2.3-5.1 4.6-7.7 6.8-1.9 1.6-4.2 2.4-6.5 2.4z m-489.4-24.5c-2.6 0-5.2-1-7.2-3.1-2.4-2.4-4.7-5-7-7.5-3.7-4.1-3.4-10.4 0.7-14.1 4.1-3.7 10.4-3.4 14.1 0.7 2.2 2.4 4.4 4.8 6.6 7.1 3.8 4 3.7 10.3-0.3 14.1-1.9 1.9-4.4 2.8-6.9 2.8zM779 754.9c-2.4 0-4.7-0.8-6.6-2.5-4.1-3.7-4.5-10-0.8-14.1 2.1-2.4 4.3-4.9 6.4-7.4 3.6-4.2 9.9-4.8 14.1-1.2s4.8 9.9 1.2 14.1c-2.2 2.6-4.5 5.2-6.7 7.8-2.1 2.1-4.8 3.3-7.6 3.3zM221.9 727c-3.1 0-6.1-1.4-8.1-4.1-2-2.8-4-5.6-5.9-8.4-3.1-4.6-2-10.8 2.6-13.9 4.6-3.1 10.8-2 13.9 2.6 1.8 2.7 3.7 5.3 5.6 7.9 3.2 4.5 2.2 10.7-2.2 14-1.8 1.3-3.9 1.9-5.9 1.9z m587.7-11.7c-1.9 0-3.8-0.5-5.5-1.7-4.6-3.1-5.8-9.3-2.8-13.9 1.8-2.7 3.6-5.4 5.3-8.2 2.9-4.7 9.1-6.1 13.8-3.2 4.7 2.9 6.1 9.1 3.2 13.8-1.8 2.9-3.7 5.8-5.6 8.6-2 3.1-5.2 4.6-8.4 4.6z m-614.2-30.6c-3.6 0-7-1.9-8.8-5.3-1.6-3-3.2-6.1-4.7-9.1-2.5-4.9-0.4-10.9 4.5-13.4 5-2.5 10.9-0.4 13.4 4.5 1.4 2.9 2.9 5.8 4.4 8.6 2.6 4.9 0.7 10.9-4.1 13.5-1.5 0.8-3.1 1.2-4.7 1.2z m638.9-12.8c-1.5 0-2.9-0.3-4.3-1-5-2.4-7.1-8.4-4.7-13.3 1.4-2.9 2.8-5.9 4.1-8.8 2.3-5 8.2-7.3 13.2-5.1 5 2.3 7.3 8.2 5.1 13.2-1.4 3.1-2.8 6.3-4.3 9.3-1.8 3.6-5.4 5.7-9.1 5.7zM175.2 639c-4.1 0-7.9-2.5-9.4-6.6-1.2-3.2-2.3-6.5-3.4-9.7-1.7-5.2 1.1-10.9 6.4-12.6 5.2-1.7 10.9 1.1 12.6 6.4 1 3.1 2.1 6.2 3.2 9.2 1.9 5.2-0.8 10.9-6 12.8-1.1 0.4-2.3 0.5-3.4 0.5z m677.5-13.6c-1 0-2-0.2-3-0.5-5.3-1.7-8.2-7.3-6.5-12.6 1-3.1 1.9-6.2 2.8-9.3 1.5-5.3 7.1-8.4 12.4-6.9 5.3 1.5 8.4 7.1 6.9 12.4-0.9 3.3-1.9 6.6-3 9.8-1.4 4.4-5.3 7.1-9.6 7.1zM161.5 591c-4.6 0-8.8-3.2-9.8-7.9-0.7-3.3-1.4-6.7-2-10.1-1-5.4 2.6-10.6 8.1-11.6 5.4-1 10.6 2.6 11.6 8.1 0.6 3.2 1.2 6.4 1.9 9.5 1.1 5.4-2.3 10.7-7.7 11.8-0.7 0.1-1.4 0.2-2.1 0.2z m702.9-14.1c-0.5 0-1.1 0-1.7-0.1-5.4-0.9-9.1-6.1-8.2-11.5l1.5-9.6c0.8-5.5 5.8-9.3 11.3-8.5 5.5 0.8 9.3 5.8 8.5 11.3-0.5 3.4-1 6.8-1.6 10.2-0.7 4.7-5 8.2-9.8 8.2z m-709.7-35.4c-5.2 0-9.6-4-10-9.3-0.2-3.4-0.4-6.9-0.5-10.3-0.2-5.5 4.1-10.2 9.6-10.4 5.5-0.2 10.2 4.1 10.4 9.6 0.1 3.2 0.3 6.5 0.5 9.7 0.4 5.5-3.8 10.3-9.3 10.6-0.3 0.1-0.5 0.1-0.7 0.1z m714.6-14.3h-0.3c-5.5-0.2-9.9-4.7-9.7-10.3 0.1-3.2 0.1-6.5 0.1-9.7 0-5.5 4.5-10 10-10s10 4.5 10 10c0 3.4 0 6.9-0.1 10.3-0.2 5.4-4.6 9.7-10 9.7z m-714.5-35.6h-0.7c-5.5-0.4-9.7-5.2-9.3-10.7 0.2-3.4 0.5-6.8 0.9-10.2 0.5-5.5 5.4-9.5 10.9-9s9.5 5.4 9 10.9c-0.3 3.2-0.6 6.5-0.8 9.7-0.4 5.3-4.8 9.3-10 9.3z m712.5-13c-5 0-9.4-3.8-9.9-8.9-0.3-3.2-0.7-6.4-1.2-9.6-0.7-5.5 3.1-10.5 8.6-11.3 5.5-0.7 10.5 3.1 11.3 8.6 0.5 3.4 0.9 6.8 1.2 10.2 0.6 5.5-3.4 10.4-8.9 11h-1.1z m-705.5-36.5c-0.7 0-1.4-0.1-2.1-0.2-5.4-1.2-8.8-6.5-7.7-11.9 0.7-3.4 1.5-6.7 2.3-10 1.3-5.4 6.7-8.7 12.1-7.4 5.4 1.3 8.7 6.7 7.4 12.1-0.8 3.1-1.5 6.3-2.2 9.5-1.1 4.7-5.2 7.9-9.8 7.9z m696.7-12.7c-4.5 0-8.5-3-9.7-7.6-0.8-3.1-1.6-6.3-2.5-9.4-1.5-5.3 1.6-10.8 6.9-12.3 5.3-1.5 10.8 1.6 12.3 6.9l2.7 9.9c1.4 5.4-1.9 10.8-7.3 12.1-0.7 0.3-1.5 0.4-2.4 0.4z m-682.9-35.3c-1.1 0-2.3-0.2-3.4-0.6-5.2-1.9-7.8-7.6-5.9-12.8 1.2-3.2 2.4-6.4 3.7-9.6 2-5.1 7.9-7.6 13-5.6s7.6 7.9 5.6 13c-1.2 3-2.4 6.1-3.5 9.1-1.6 4-5.4 6.5-9.5 6.5zM843 382c-3.9 0-7.7-2.3-9.3-6.2-1.2-3-2.5-6-3.8-8.9-2.2-5.1 0.1-11 5.1-13.2 5.1-2.2 11 0.1 13.2 5.1 1.4 3.1 2.7 6.3 4 9.4 2.1 5.1-0.4 11-5.5 13-1.2 0.5-2.5 0.8-3.7 0.8z m-646.9-33.5c-1.6 0-3.2-0.4-4.7-1.2-4.9-2.6-6.7-8.7-4.1-13.5 1.6-3 3.3-6.1 5-9 2.7-4.8 8.9-6.5 13.6-3.7 4.8 2.7 6.5 8.9 3.7 13.6-1.6 2.8-3.2 5.7-4.7 8.5-1.8 3.4-5.3 5.3-8.8 5.3z m624.8-11.3c-3.4 0-6.8-1.8-8.6-5-1.6-2.8-3.3-5.6-5-8.3-2.9-4.7-1.5-10.9 3.2-13.8 4.7-2.9 10.9-1.5 13.8 3.2 1.8 2.9 3.6 5.8 5.3 8.8 2.8 4.8 1.2 10.9-3.6 13.7-1.6 1-3.4 1.4-5.1 1.4z m-598.2-31c-2 0-4.1-0.6-5.9-1.9-4.5-3.3-5.4-9.5-2.2-14 2-2.8 4.1-5.5 6.2-8.2 3.4-4.4 9.7-5.2 14-1.8 4.4 3.4 5.2 9.7 1.8 14-2 2.5-3.9 5.1-5.8 7.8-2 2.7-5 4.1-8.1 4.1z m570.1-10.3c-3 0-5.9-1.3-7.9-3.8s-4-5.1-6.1-7.5c-3.5-4.2-3-10.5 1.3-14.1 4.2-3.5 10.5-3 14.1 1.3 2.2 2.6 4.4 5.3 6.5 8 3.4 4.3 2.7 10.6-1.7 14-1.8 1.4-4 2.1-6.2 2.1zM254.9 268c-2.5 0-5-0.9-7-2.8-4-3.8-4.1-10.2-0.2-14.1 2.4-2.4 4.8-4.9 7.3-7.3 4-3.9 10.3-3.8 14.1 0.2 3.9 4 3.8 10.3-0.2 14.1L262 265c-1.9 2-4.5 3-7.1 3z m504.3-9c-2.5 0-5-0.9-6.9-2.8-2.3-2.2-4.7-4.5-7.1-6.6-4.1-3.7-4.4-10-0.7-14.1s10-4.4 14.1-0.7c2.5 2.3 5.1 4.7 7.5 7 4 3.8 4.1 10.2 0.3 14.1-1.9 2-4.5 3.1-7.2 3.1z m-467.1-24.3c-3 0-5.9-1.3-7.9-3.9-3.4-4.4-2.6-10.6 1.7-14 2.7-2.1 5.4-4.2 8.2-6.2 4.5-3.3 10.7-2.3 14 2.1 3.3 4.5 2.3 10.7-2.1 14-2.6 1.9-5.2 3.9-7.7 5.9-1.9 1.4-4.1 2.1-6.2 2.1z m428.8-7.7c-2 0-4.1-0.6-5.8-1.9-2.6-1.9-5.3-3.8-8-5.6-4.6-3.1-5.7-9.3-2.6-13.9s9.3-5.7 13.9-2.6c2.8 1.9 5.7 3.9 8.4 5.9 4.5 3.2 5.5 9.5 2.3 14-2.1 2.6-5.1 4.1-8.2 4.1z m-387.4-20.2c-3.5 0-6.8-1.8-8.7-5-2.8-4.8-1.1-10.9 3.7-13.7 3-1.7 6-3.4 9-5 4.9-2.6 10.9-0.8 13.5 4.1 2.6 4.9 0.8 10.9-4.1 13.5-2.8 1.5-5.7 3.1-8.5 4.7-1.5 1-3.2 1.4-4.9 1.4z m344.9-6.2c-1.6 0-3.2-0.4-4.7-1.2-2.9-1.5-5.8-3-8.7-4.4-5-2.4-7-8.4-4.6-13.4 2.4-5 8.4-7 13.4-4.6 3.1 1.5 6.1 3.1 9.2 4.7 4.9 2.6 6.8 8.6 4.2 13.5-1.7 3.5-5.2 5.4-8.8 5.4z m-300-15.5c-4 0-7.7-2.4-9.3-6.3-2.1-5.1 0.4-10.9 5.6-13 3.2-1.3 6.4-2.5 9.6-3.7 5.2-1.9 10.9 0.7 12.8 5.9 1.9 5.2-0.7 10.9-5.9 12.8-3 1.1-6.1 2.3-9.1 3.5-1.2 0.5-2.4 0.8-3.7 0.8z m254.3-4.7c-1.1 0-2.3-0.2-3.4-0.6-3.1-1.1-6.2-2.2-9.2-3.2-5.2-1.7-8.1-7.4-6.4-12.6 1.7-5.2 7.4-8.1 12.6-6.4 3.2 1.1 6.5 2.2 9.8 3.4 5.2 1.9 7.9 7.6 6 12.8-1.5 4.1-5.3 6.6-9.4 6.6zM426 169.7c-4.5 0-8.6-3.1-9.7-7.6-1.3-5.4 2-10.8 7.3-12.1 3.3-0.8 6.7-1.6 10-2.3 5.4-1.2 10.7 2.3 11.9 7.7 1.2 5.4-2.3 10.7-7.7 11.9-3.1 0.7-6.3 1.4-9.5 2.2-0.7 0.2-1.6 0.2-2.3 0.2z m158.6-2.8c-0.7 0-1.4-0.1-2-0.2-3.1-0.7-6.4-1.3-9.5-1.8-5.4-1-9.1-6.2-8.1-11.6 1-5.4 6.2-9.1 11.6-8.1 3.4 0.6 6.8 1.3 10.1 1.9 5.4 1.1 8.9 6.4 7.8 11.8-1.1 4.7-5.3 8-9.9 8z m-109.4-5.6c-5.1 0-9.4-3.8-9.9-9-0.6-5.5 3.4-10.4 8.9-11l10.2-0.9c5.5-0.4 10.3 3.7 10.7 9.2s-3.7 10.3-9.2 10.7c-3.2 0.2-6.5 0.5-9.7 0.8-0.4 0.1-0.7 0.2-1 0.2z m59.9-1.1h-0.7c-3.2-0.2-6.5-0.4-9.7-0.5-5.5-0.2-9.8-4.8-9.6-10.4 0.2-5.5 4.8-9.8 10.4-9.6 3.4 0.1 6.9 0.3 10.3 0.5 5.5 0.4 9.7 5.1 9.3 10.6-0.4 5.3-4.8 9.4-10 9.4z" fill="#005BFF"></path><path d="M776.3 244.9c-14.9 0-27 12.1-27 27s12.1 27 27 27 27-12.1 27-27-12.1-27-27-27z" fill="#E6E6E6"></path><path d="M776.3 224.9c-25.9 0-47 21.1-47 47s21.1 47 47 47 47-21.1 47-47-21.1-47-47-47z m-27.1 47c0-14.9 12.1-27 27-27s27 12.1 27 27-12.1 27-27 27-27-12.1-27-27z" fill="#005BFF"></path><path d="M722.2 408H301c-3.1 6.5-5.9 13.2-8.3 20h437.9c-2.5-6.8-5.3-13.5-8.4-20z" fill="#06F3FF"></path><path d="M704.5 314.3c-51.5-51.5-120-79.9-192.9-79.9s-141.4 28.4-192.9 79.9-79.9 120-79.9 192.9 28.4 141.4 79.9 192.9c51.5 51.5 120 79.9 192.9 79.9s141.4-28.4 192.9-79.9c51.5-51.5 79.9-120 79.9-192.9s-28.3-141.4-79.9-192.9zM303.6 611.5h87.1c1.1 3.2 2.3 6.4 3.5 9.6 11 28.4 26.3 55.6 45.4 80.8 10.2 13.4 20.3 24.8 29.5 34.1-72.5-13.4-133.3-60.5-165.5-124.5z m198 127.7c-12-10.4-29.4-27.2-46.6-50-14.7-19.5-30.9-45.6-43-77.8h89.6v127.8z m20 0V611.5h89.6c-12.1 32.1-28.3 58.3-43 77.8-17.2 22.8-34.6 39.5-46.6 49.9z m32.6-3.1c9.2-9.4 19.3-20.7 29.5-34.1 19.2-25.3 34.5-52.4 45.4-80.8 1.2-3.2 2.4-6.4 3.5-9.6h87.1c-32.2 63.9-93 111-165.5 124.5z m174.4-144.6h-89.8c7.3-26.5 11-53.9 11-81.8 0-27.7-3.7-55.1-10.9-81.8H618c7.2 24.6 11.7 51.9 11.7 81.8 0 30-4.6 57.4-11.8 81.8h-96.3V428h-20v163.5h-96.3c-7.2-24.4-11.8-51.7-11.8-81.8 0-29.8 4.6-57.2 11.7-81.8h-20.9c-7.2 26.7-10.9 54.1-10.9 81.8 0 27.9 3.7 55.2 11 81.8h-89.8c-10.2-26.2-15.8-54.6-15.8-84.3 0-27.8 4.9-54.5 13.9-79.2 2.5-6.8 5.3-13.5 8.3-20 31.7-67 94.5-116.6 169.7-130-9.6 10.1-20.4 22.4-31.2 37.1-19.1 26-34.4 53.8-45.4 82.5-1.3 3.4-2.5 6.9-3.7 10.4h21.3c12.2-33 28.6-60.2 43.4-80.5 17.2-23.4 34.5-40.8 46.5-51.7V408h20V275.8c12 10.9 29.3 28.4 46.5 51.7 14.9 20.3 31.3 47.4 43.4 80.5h21.3c-1.2-3.5-2.4-6.9-3.7-10.4-11-28.8-26.2-56.5-45.4-82.5-10.7-14.7-21.5-27.1-31.1-37.1 75.2 13.4 138 63 169.7 130 3.1 6.5 5.9 13.2 8.3 20 9 24.7 13.9 51.4 13.9 79.2-0.1 29.7-5.7 58.2-15.9 84.3z" fill="#005BFF"></path></g></svg>} />
                                    {/* <SectionTwoItem lien="#" t={"Favoris"} icone={<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C15.866 16 19 12.866 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 12.866 8.13401 16 12 16ZM12 6C11.7159 6 11.5259 6.34084 11.1459 7.02251L11.0476 7.19887C10.9397 7.39258 10.8857 7.48944 10.8015 7.55334C10.7173 7.61725 10.6125 7.64097 10.4028 7.68841L10.2119 7.73161C9.47396 7.89857 9.10501 7.98205 9.01723 8.26432C8.92945 8.54659 9.18097 8.84072 9.68403 9.42898L9.81418 9.58117C9.95713 9.74833 10.0286 9.83191 10.0608 9.93531C10.0929 10.0387 10.0821 10.1502 10.0605 10.3733L10.0408 10.5763C9.96476 11.3612 9.92674 11.7536 10.1565 11.9281C10.3864 12.1025 10.7318 11.9435 11.4227 11.6254L11.6014 11.5431C11.7978 11.4527 11.8959 11.4075 12 11.4075C12.1041 11.4075 12.2022 11.4527 12.3986 11.5431L12.5773 11.6254C13.2682 11.9435 13.6136 12.1025 13.8435 11.9281C14.0733 11.7536 14.0352 11.3612 13.9592 10.5763L13.9395 10.3733C13.9179 10.1502 13.9071 10.0387 13.9392 9.93531C13.9714 9.83191 14.0429 9.74833 14.1858 9.58118L14.316 9.42898C14.819 8.84072 15.0706 8.54659 14.9828 8.26432C14.895 7.98205 14.526 7.89857 13.7881 7.73161L13.5972 7.68841C13.3875 7.64097 13.2827 7.61725 13.1985 7.55334C13.1143 7.48944 13.0603 7.39258 12.9524 7.19887L12.8541 7.02251C12.4741 6.34084 12.2841 6 12 6Z" fill="#1C274C"></path> <path opacity="0.5" d="M6.71424 17.323L7.35111 15L8 13H16L16.6489 15L17.2858 17.323C17.9141 19.6148 18.2283 20.7607 17.809 21.3881C17.6621 21.6079 17.465 21.7844 17.2363 21.9008C16.5837 22.2331 15.576 21.7081 13.5607 20.658C12.8901 20.3086 12.5548 20.1339 12.1986 20.0959C12.0665 20.0818 11.9335 20.0818 11.8014 20.0959C11.4452 20.1339 11.1099 20.3086 10.4393 20.658L10.4393 20.658C8.42401 21.7081 7.41635 22.2331 6.76372 21.9008C6.535 21.7844 6.3379 21.6079 6.19097 21.3881C5.77173 20.7607 6.0859 19.6148 6.71424 17.323Z" fill="#1C274C"></path> </g></svg>} /> */}
                                </div>
                            </Layout>
                            <Layout className="flex flex-col gap-3" titre="Paramètres" titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}>
                                <Card className="mb-3">
                                    <CardBody>
                                        <div className="flex justify-between items-center">
                                            <div className="pl-5 flex gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                </svg>
                                                Susprendre mon compte provisoirement
                                            </div>
                                            <div>
                                                <Switch isSelected={optionSuspendre} onValueChange={
                                                    (e) => {
                                                        // setOptionSuspendre(true);
                                                        if (e) {
                                                            setSuspendedStatus("L");
                                                            onOpen();
                                                        } else {
                                                            setSuspendedStatus("U");
                                                            onOpen();
                                                        }
                                                    }
                                                }>

                                                </Switch>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="mb-3">
                                    <CardBody>
                                        <div className="flex justify-between items-center">
                                            <div className="pl-5  flex gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                                </svg>
                                                Ne pas recevoir des messages
                                            </div>
                                            <div>
                                                <Switch isSelected={isSelected} onValueChange={() => {
                                                    setIsSelected(isSelected ? false : true);
                                                    !isSelected ?
                                                        toast.success("Vous n'allez plus recevoir des messages")
                                                        :
                                                        toast.error("Vous pouvez de nouveau commencer à recevoir des messages")
                                                }}>

                                                </Switch>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <Link href="/account/suppressioncompte" className="flex gap-4 py-2 px-2">
                                        <Delete />
                                        Supprimer mon compte
                                    </Link>
                                </Card>

                            </Layout>
                        </> :

                        <>
                            <Layout titre="Tableau de Bord partenaire" titreIcone={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" /></svg>}>
                                <div>
                                    <div className="text-center font-bold text-2xl">Liste des PMES</div><Divider />
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-4 gap-5 mx-[120px] items-center justify-center">
                                            <Select name="province" label="Province" isRequired labelPlacement="outside">
                                                {
                                                    provinces?.map((p, i) => (<SelectItem key={p.id} value={p.id}>{p.province}</SelectItem>))
                                                }
                                            </Select>
                                            <Select name="secteur" label="Secteur" labelPlacement="outside">
                                                <SelectItem key={"*"} value={"*"}>Tous les secteurs</SelectItem>
                                                {
                                                    secteurs?.map((p, i) => (<SelectItem key={p.id} value={p.id}>{p.secteur}</SelectItem>))
                                                }
                                            </Select>
                                            <Select name="territoire" label="Territoire" labelPlacement="outside">
                                                <SelectItem key={"*"} value={"*"}>Tous les territoires</SelectItem>
                                                {
                                                    territoires?.map((p, i) => (<SelectItem key={p.id} value={p.id}>{p.territoire}</SelectItem>))
                                                }
                                            </Select>
                                            <div className="flex flex-row items-center pt-5">
                                                <Button type="submit" color="primary">Afficher</Button>
                                            </div>
                                        </div>
                                    </form>
                                    <div>
                                        {
                                            isSearching ? <div>Recherche en cours...</div> :
                                                <div className="mx-[20px] mt-12">
                                                    {
                                                        dataFromApi.length>0 &&
                                                        <>
                                                        <div className="mb-6 flex flex-row justify-center items-center gap-4">
                                                            <Button color="primary" startContent={<ArrowRight/> } onPress={exportToExcel}> Exporter vers Excel</Button>
                                                            <Button color="primary" startContent={<ArrowRight/> } onPress={exportToPDF}>Exporter vers PDF</Button>
                                                        </div>
                                                        <div className="font-bold text-2xl">
                                                            Total enregistrements : {dataFromApi.length}
                                                        </div>
                                                        </>
                                                    }
                                                    <table className="w-full " id="my-table">
                                                        <thead>
                                                            <tr className="bg-blue-300 border-b">
                                                                <th className="h-12">Nom</th>
                                                                <th>Telephone</th>
                                                                <th>Email</th>
                                                                <th>RCCM</th>
                                                                <th>Activité</th>
                                                                <th>Ville</th>
                                                                <th>province</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                dataFromApi?.map((d, i) => (
                                                                    <tr className="border-b">
                                                                        <td className="text-center py-3 border-l">{d.nom}</td>
                                                                        <td className="text-center">{d.telephone}</td>
                                                                        <td className="text-center">{d.emailAdresse}</td>
                                                                        <td className="text-center">{d.rccm}</td>
                                                                        <td className="text-center">{d.nomSecteur}</td>
                                                                        <td className="text-center">{d.nomVille}</td>
                                                                        <td className="text-center border-r">{d.nomProvince}</td>
                                                                    </tr>
                                                                ))
                                                            }

                                                        </tbody>
                                                    </table>
                                                </div>
                                        }

                                        {/* <div>
                                            <table id="my-table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Age</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{row.name}</td>
                                                            <td>{row.age}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <button onClick={exportToPDF}>Export to PDF</button>
                                            <button onClick={exportToExcel}>Export to Excel</button>
                                        </div> */}
                                    </div>
                                </div>
                            </Layout>
                        </>
                }
            </MainLayout>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Suspension compte</ModalHeader>
                            <ModalBody>
                                {
                                    suspendedStatus == "L" ?
                                        <>
                                            <p>
                                                Cette action va mettre votre compte en suspend, vous ne serez plus accessible jusqu'à ce que vous allez reactiver votre compte.
                                            </p>
                                            <p>
                                                Confirmez-vous cette operation ?
                                            </p>
                                        </> :
                                        <>
                                            <p>
                                                Par cette action, Vous allez reactiver votre compte
                                            </p>
                                            <p>
                                                Confirmez-vous cette operation ?
                                            </p>
                                        </>
                                }

                            </ModalBody>
                            <ModalFooter>
                                <Button id="btnAnnuler" color="danger" variant="light" onPress={() => {
                                    onClose();
                                }}>
                                    Annuler
                                </Button>
                                <Button isLoading={isLoading} color="primary" onPress={() => {
                                    // suspendedStatus =="L"?setOptionSuspendre(true):setOptionSuspendre(false);
                                    suspendedStatus == "L" ? changeStatusCompte("L") : changeStatusCompte("U");

                                }}>
                                    {
                                        suspendedStatus == "L" ?
                                            "Suspendre" : "Reactiver"
                                    }
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
export default page