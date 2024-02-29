"use client"
import { useState, useEffect } from "react"
import NavigationComponent from "@/app/components/NavigationComponent"
import { myContainerDashboard } from "@/app/style/global";
import { Input, Button, Chip } from "@nextui-org/react"
import { postData, getData, deleteData } from "@/app/fcts/helper"

import { Modal, Alert, Divider, notification } from "antd"
import { Delete } from "@/app/components/icons/Delete"
import Layout from "@/app/components/layouts/LayoutDashboard"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
import { Toaster, toast } from "sonner"
import Cookies from "js-cookie";

const page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [feedBack, setFeedBack] = useState("");
    const [liste, setListe] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        Modal.confirm({
            title: "Mot clé",
            content: "Confirmez-vous cet enregistrement ?",
            okText: "Oui, enregistrer",
            cancelText: "Annuler",
            onOk: () => {
                setIsLoading(true);
                let form = Object.fromEntries(new FormData(e.target));
                postData("service", form).then(r => {
                    if (r.success) {
                        toast.success("Bien enregistré");
                        document.querySelector("#f").reset();
                        getKeywords();
                    } else {
                        setFeedBack(<Alert message="Echec d'enregistrement" type="error" showIcon />)
                    }
                }).catch(r => {
                    setFeedBack(<Alert message="Echec d'enregistrement" type="error" showIcon />)
                }).finally(() => setIsLoading(false));

            }
        })

    }

    const getKeywords = () => {
        getData("getServicesByUser&idUtilisateur="+JSON.parse(Cookies.get("profil")).id).then(r => {
            setListe(r.data);
        })
    }
    const deleteService = (id) => {
        Modal.confirm({
            title: "Suppression",
            content: "Voulez-vous vraiment supprimer ?",
            okText: "Oui",
            onOk: () => {
                deleteData("service", { id: id }).then(r => {
                    toast.success("Bien supprimé");
                    getKeywords();
                }).catch(e => {
                    alert("error")
                })
            }
        })
    }
    useEffect(() => {
        getKeywords();
    }, []);
    return (
        <>
            {contextHolder}
            <MainLayout navigationBar="Services/produits">
                {/* <Toaster position="bottom-center" /> */}
                <Layout titre={<h2 className="text-black">Services / Produits</h2>} center>

                    <div className="w-[40%] pt-9">
                        <form id="f" onSubmit={handleSubmit} className="flex flex-row justify-center items-center gap-3">
                            <Input isRequired name="v" autoComplete="off" type="text" label="Nom service ou produit" labelPlacement="outside"
                                maxLength={"300"} />
                            <Button isLoading={isLoading} color="primary" type="submit">Enregistrer</Button>
                        </form>
                        <div className="mt-5">{feedBack}</div>
                    </div>
                    <div className="w-[40%] pt-9">
                        <h3 className="flex flex-row justify-between">
                            Services/produits enregistrés
                            {/* <Chip color="danger">{liste?.length}/15</Chip> */}
                        </h3>
                        <Divider />
                        <div className="flex flex-col gap-3">
                            {
                                liste.map(r => {
                                    return (
                                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                                            <Input isRequired type="text" value={r.service} maxLength={300} />
                                            <Button type="button" isIconOnly color="danger" variant="faded" aria-label="Supprimer" onPress={() => deleteService(r.id)}>
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
