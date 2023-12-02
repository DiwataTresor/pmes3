"use client"
import { useEffect, useState } from "react";
import { myContainerDashboard, titrePrincipal } from "@/app/style/global";
import Layout from "@/app/components/layouts/LayoutDashboard"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
import { MessageOutlined } from "@ant-design/icons"
import { postData, getData } from "@/app/fcts/helper"
import { Divider, Alert, Modal, Spin } from "antd"
import Tableau from "@/app/components/table/Tableau"
import { LockOutlined, UnlockOutlined } from "@ant-design/icons"
import { Button } from "@nextui-org/react"
import { Edit } from "@/app/components/icons/Edit"
import { Delete } from "@/app/components/icons/Delete"
import { Eye } from "@/app/components/icons/Eye"
import { MailIcon } from "@/app/components/icons/MailIcon"
import moment from "moment"
import Link from "next/link"
import { Toaster, toast } from 'sonner';
import Cookies from "js-cookie";

const page = () => {
    const [msgNL, setMsgNL] = useState(0);
    const [msgArchive, setMsgArchive] = useState(0);
    const [data, setData] = useState([]);
    const [spinning, setSpinning] = useState(false);
    const [profil, setProfil] = useState(null);
    // POUR TABLEAU
    const colones = [

        { name: "DATE ENV", uid: "dateMsg" },
        { name: "EXPED", uid: "nom", sortable: true },
        { name: "OBJET", uid: "objet", sortable: true },
        { name: "MESSAGE", uid: "message", sortable: true },
        { name: "ACTIONS", uid: "actions" },
    ];
    const INITIAL_VISIBLE_COLUMNS = ["dateMsg", "nom", "objet", "message", "actions"];
    const cellule = (ligne, colone) => {
        const cellValue = ligne[colone];
        const nl = "bg-slate-100 px-1 py-1";
        switch (colone) {
            case "dateMsg":
                return (
                    <div className={`${ligne.statut === "NL" && nl}`}>
                        {moment(ligne[colone]).format("DD/MM/YYYY")}
                    </div>
                )
                break;
            case "nom":
                return (
                    <div>
                        {ligne?.nom}
                    </div>
                )
                break;
            case "actions":
                return (<div className="flex flex-row gap-3 justify-center items-center">
                    <Button alt="Mettre aux archives" onPress={() => {
                        Modal.confirm({
                            title: "Archivage",
                            content: "Confirmez-vous la mise aux archives de ce message",
                            okText: "Archiver",
                            cancelText: "Annuler",
                            onOk: () => {
                                setSpinning(true);
                                postData("archiver", { idMsg: ligne?.id }).then(r => {
                                    if (r.success) {
                                        toast.success("Message bien archivé");
                                    } else {
                                        toast.error("Echec d'archiver le message");
                                    }
                                }).catch(err => {
                                    toast.error("Echec d'archiver le message");
                                }).finally(() => setSpinning(false));
                            }
                        })
                    }} isIconOnly size="md" color={"primary"} variant="light">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    </Button>
                    <Link href={`/account/message/${ligne.messageCrypte}`}><Button isIconOnly size="md" color={"success"} variant="light"><Eye /></Button></Link>
                    <Link href={`/message/${ligne?.idUser}`}><Button isIconOnly size="md" color={"success"} variant="light"><MailIcon /></Button></Link>
                    <Button onPress={() => {
                        Modal.confirm({
                            title: "Suppression",
                            content: "Voulez-vous vraiment supprimer ce message ?",
                            okText: "Oui",
                            cancelText: "Annuler",
                            onOk: () => {

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
    const handleBtnNouveau = () => {
        alert("test");
    }
    // TABLEAU


    const getMessages = () => {
       
        getData("messageUser&id=" + profil?.id)
            .then(r => {
                // setData(r.msgRecus);
                console.log(r.msgRecus);
                setMsgNL(r?.msgRecus?.filter((m) => { return m.statut == 'NL' })?.length);
                setMsgArchive(r?.msgArchives);
                setData(r?.msgRecus.sort((a, b) => { return a.statut < b.statut }));

            }).catch(err => console.log(err));
    }
    useEffect(() => {
        setProfil(JSON.parse(Cookies.get("profil")));
        getMessages();
    }, [])
    return (
        <Spin spinning={spinning}>
            <Toaster />
            <MainLayout navigationBar="Message">
                <Layout titre={"Mes messages"} titreIcone={<MessageOutlined />}>
                    {msgNL < 1 ?
                        <div className="flex flex-row gap-3 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                            </svg>
                            Vous avez ({msgNL}) messages non lu(s)
                        </div> :
                        <Alert message={
                            <div className="flex justify-between">
                                <div className="flex gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                                    </svg>
                                    Vous avez ({msgNL}) messages non lu(s)
                                </div>
                                <div>
                                    {
                                        msgArchive?.length > 0 ?
                                            <Link href="/account/message/archive">{`${msgArchive?.length} Message(s) aux archives`}</Link> :
                                            "Aucun message archivé"
                                    }

                                </div>
                            </div>
                        }>
                        </Alert>

                    }

                    {msgNL > 0 && <Divider />}
                    {
                        msgNL > 0 &&
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