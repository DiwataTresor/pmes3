"use client"
import {useState,useEffect} from "react"
import NavigationComponent from "@/app/components/NavigationComponent"
import { myContainerDashboard } from "@/app/style/global";
import {Textarea,Button,Input,Checkbox,Tabs,Tab,Image,Chip} from "@nextui-org/react"
import {postData,getData,updateData,deleteData, API_URL,BACKEND_URL} from "@/app/fcts/helper"
import {Modal as ModalAnt,Modal,Alert,Divider,notification,Spin} from "antd"
import {Delete} from "@/app/components/icons/Delete"
import Layout from "@/app/components/layouts/LayoutDashboard"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
import moment from "moment"
import Cookies from "js-cookie";
import Link from "next/link";


const page=()=>{
    const [imgActu,setImgActu]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const [spinning,setSpinning]=useState(false)
    const [actusLoading,setActusLoading]=useState(true);
    const [actus,setActus]=useState([]);
    const [api, contextHolder] = notification.useNotification();
   
    const handleSubmit=(e)=>{
        e.preventDefault();
        ModalAnt.confirm({
            title:"Enregistrer",
            content:"Voulez-vous vraiment enregistrer ?",
            okText:"Enregistrer",
            cancelText:"Annuler",
            onOk:()=>{
                try
                {
                    let pr=JSON.parse(Cookies.get("profil"));
                }catch(e) {
                    let pr={}
                }
                let fichier=document.querySelector("#img");
                const formData = new FormData();
                formData.append("add","evenement");
                formData.append('file', fichier.files[0]); 
                formData.append("data",JSON.stringify(Object.fromEntries(new FormData(e.target))))
                formData.append('id',pr.id);
                const options = {
                    method: 'POST',
                    body: formData,
                    // headers: {
                    //   // Ajouter les en-têtes nécessaires, par exemple pour spécifier le type de contenu
                    //   'Content-Type': 'multipart/form-data'
                    // }
                };
                setIsLoading(true);
                fetch(API_URL, options)
                    .then(r=>r.json()).then(response => {
                        openNotification();
                        document.querySelector("#f").reset();
                        setImgActu("");
                        getEvenements();
                    })
                    .catch(error => {
                        // Gérer les erreurs de la requête
                        openNotificationError();
                    }).finally(()=>{
                        setIsLoading(false);
                    })
            }
        });
        
    }

    const selectImg=(e)=>{
        
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load', (event) => {
            const imageProperties = {
            name: file.name,
            type: file.type,
            size: file.size,
            dataURL: event.target.result
            };
            setImgActu(imageProperties.dataURL);
            // console.log(logo);

            // Ajoutez l'élément image à votre page HTML où vous le souhaitez
        });

        reader.readAsDataURL(file);
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

    const getEvenements=()=>{
        getData("evenements").then(r=>{
            setActusLoading(false);
            setActus(r.data);
        }).catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getEvenements();
    },[])

  return (
    <>
    {contextHolder}
    <MainLayout navigationBar="Gestion des évènements">
        <Layout titre="Publication d'un évènement pour votre organisation">
            <Tabs 
                aria-label="Options" 
                color="primary" 
                variant="underlined"
                classNames={{
                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-[#22d3ee]",
                tab: "max-w-full w-full px-0 h-12",
                tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                }}
                fullWidth={true}
            >
                <Tab
                    key="new"
                    title={
                        <div className="flex items-center space-x-2">
                            <span>Publier un évènement</span>
                        </div>
                    }
                >
                    <form onSubmit={handleSubmit} id="f">
                    <input onChange={selectImg} id="img" type="file" className="hidden" name="img" />
                    <div className="items-center justify-center  rounded-md py-4 px-3">
                        <h1 className="font-bold text-center text-2xl flex flex-row gap-3 mb-4 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                            </svg>
                            Création d'un évènement
                        </h1>
                        <div className="border-0 shadow-sm rounded-md flex px-4 py-7 bg-white">
                            <div className="w-[40%] items-center justify-center flex flex-col">
                                {
                                    imgActu!==""?
                                        <Image isZoomed width="200" height="200" src={imgActu} />:
                                        <svg width="160px" height="160px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M432.718512 194.015006H916.517638c21.847665 0 39.559857 17.522773 39.559857 39.134945v564.763883c0 21.616267-17.712192 39.132897-39.559857 39.132897H105.718208c-21.847665 0-39.561905-17.51663-39.561906-39.132897v-564.764907c0-21.612171 17.71424-39.134945 39.561906-39.134945h327.000304z" fill="#FFFFFF"></path><path d="M916.516614 220.416913c7.255251 0 13.15795 5.712256 13.15795 12.732014v564.763883c0 7.019758-5.902699 12.73099-13.15795 12.73099H105.718208c-7.256275 0-13.158974-5.711232-13.158975-12.73099V233.148927c0-7.020782 5.902699-12.732014 13.158975-12.732014h810.798406m0-26.401907H105.718208c-21.847665 0-39.561905 17.522773-39.561906 39.133921v564.763883c0 21.616267 17.71424 39.132897 39.561906 39.132897h810.798406c21.847665 0 39.560881-17.51663 39.560881-39.132897V233.148927c0-21.611148-17.713216-39.133921-39.560881-39.133921z" fill="#4E6DC4"></path><path d="M934.895356 796.822372c0 12.132017-13.619723 21.96746-30.421681 21.96746H120.391508c-16.800934 0-30.421681-9.835442-30.421681-21.96746v-83.544947s98.066713-164.881373 169.187835-161.261939c33.551698 1.707841 152.003968 87.402947 238.010335 87.402947 84.053818 0 123.329035-179.371398 237.161534-179.371398 61.054282 0 200.564801 109.915114 200.564801 109.915113v226.860224z" fill="#DCE5F7"></path><path d="M904.478794 831.996928H120.391508c-24.468811 0-43.625706-15.444286-43.625706-35.168413v-83.55109c0-2.372342 0.645048-4.705777 1.856304-6.742285 10.339194-17.404003 104.976915-171.982018 181.206201-167.702177 15.276369 0.773033 39.048939 12.801638 71.948422 29.444894 48.331483 24.449358 114.529765 57.941671 165.388197 57.94167 32.319964 0 59.920841-36.109364 89.146623-74.340217 37.617547-49.233526 80.276705-105.035276 148.023102-105.035277 63.788056 0 194.084631 101.205945 208.730286 112.744109a13.230646 13.230646 0 0 1 5.027277 10.370935v226.868414c-0.001024 19.725151-19.157918 35.169437-43.61342 35.169437zM103.167709 716.938839v79.889676c0 3.493497 6.871294 8.766506 17.223799 8.766506h784.087286c10.352505 0 17.210488-5.273009 17.210489-8.766506V576.405459c-41.614795-32.106996-142.969203-103.159518-187.355656-103.159519-54.70005 0-91.480058 48.124658-127.047787 94.664342-33.299822 43.561201-64.755627 84.711152-110.120914 84.711152-57.16147 0-126.596253-35.129505-177.312365-60.783976-25.409762-12.852832-51.670373-26.144912-61.36452-26.640472l-1.650503-0.038908c-50.819524 0-126.325947 106.691923-153.669829 151.780761z" fill="#4E6DC4"></path><path d="M290.78548 382.564513m-65.512279 0a65.512279 65.512279 0 1 0 131.024558 0 65.512279 65.512279 0 1 0-131.024558 0Z" fill="#FFFFFF"></path><path d="M290.806982 461.276721l-1.250164-0.006143c-21.026509-0.328667-40.660534-8.823844-55.29288-23.927176-14.632345-15.096165-22.509095-34.994353-22.186571-56.014719 0.670645-42.716496 35.968068-77.472283 78.690707-77.472283 22.276673 0.334811 41.910698 8.831011 56.543043 23.93332 14.632345 15.096165 22.495784 34.988209 22.173261 56.008575-0.669621 42.721615-35.967044 77.478426-78.677396 77.478426z m0.786344-131.012271c-29.225783 0-52.675828 23.088614-53.114052 51.476859-0.219111 13.975011 5.01499 27.195418 14.748045 37.224375 9.720767 10.036124 22.767114 15.682852 36.741101 15.901963l0.837538 13.207097v-13.200954c28.387221 0 51.837266-23.095781 52.275489-51.489145 0.219111-13.967844-5.01499-27.188251-14.734734-37.224375-9.720767-10.029981-22.767114-15.676708-36.741101-15.89582h-0.012286z" fill="#4E6DC4"></path></g></svg>
                                }
                                
                                <Button color="primary" onClick={()=>{
                                    document.getElementById("img").click(); 
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                    </svg>
                                    Selectionner une image/Affiche
                                </Button>
                            </div>

                            <div className="flex flex-col gap-6 flex-1">
                                <Input name="nom" type="text" label="Nom évènement" isRequired />
                                <div className="flex flex-col gap-3">
                                    <Checkbox name="typePublication" defaultSelected={false}>Publier instantanement</Checkbox>
                                    <Input name="datePublication" type="date"  label="Date publication" onChange={(e)=>{

                                    }} value={moment().format("YYYY-MM-DD")} />
                                </div>
                                <div className="flex flex-row gap-3">
                                    <Input isRequired name="du" type="date"  label="Du" value={moment().format("YYYY-MM-DD")} />
                                    <Input isRequired name="au" type="date"  label="Au" value={moment().format("YYYY-MM-DD")} />
                                </div>
                               
                                <Textarea
                                    name="description"
                                    label="Description"
                                    labelPlacement="outside"
                                    placeholder="Saisissez le contenu de votre actualités"
                                    // className="max-w-xs"
                                    isRequired
                                    minRow={5}
                                    />
                                <Input name="lieu" type="text" label="Lieu" isRequired />
                                <div className="items-center justify-center flex gap-3">
                                    <Button isLoading={isLoading} color="success" className="text-white max-w-xs" type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                        </svg>
                                        Publier
                                    </Button>
                                    <Button color="danger" variant="light" className="max-w-xs" >
                                        
                                        Annuler
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </Tab> 
                <Tab
                    key="liste"
                    title={
                        <div className="flex items-center space-x-2">
                        
                        <span>Liste des évènements</span>
                        
                        </div>
                    }
                >
                        <Spin spinning={spinning}>
                        <div>
                            {
                                actusLoading &&
                                <div className="flex items-center justify-center h-full">Chargement des données en cours...</div>
                            }
                            {
                                actus?.map(ac=>{
                                    return(
                                        <div className="flex flex-col gap-3 shadow-md border mb-4 rounded-md px-2 py-2 bg-slate-100">
                                            <div className="text-sm mt-3 justify-end items-end flex"><Chip color="primary">Publié le {moment(ac.dateEnr).format("DD/MM/YYYY")}</Chip></div>
                                            <div className="flex-1 flex gap-3  mb-2 ">
                                                <img src={BACKEND_URL+ac.img} className="w-[200px] h-[200px] rounded-md"  />
                                                <div className="flex-1">
                                                        <h1 className="text-center text-xl font-bold">{ac.nom}</h1>
                                                        <Alert message={<div className="flex gap-3">
                                                            <span>Du {moment(ac.dateDebut).format("DD/MM/YYYY")}</span>
                                                            <span> - {moment(ac.dateFin).format("DD/MM/YYYY")}</span>
                                                        </div>} />
                                                        
                                                        <div className="">{ac.description}</div>
                                                        {/* <div>
                                                            <Link href={`/evenement/${ac}`}>Detail</Link>
                                                        </div> */}
                                                </div>
                                            </div>
                                            <div className="flex items-end justify-end border-t py-2">
                                                <Button onPress={()=>{
                                                    ModalAnt.confirm({
                                                        title:"Suppression",
                                                        content:"Voulez-vous vraiment supprimer cet evenement ?",
                                                        okText:"Supprimer",
                                                        cancelText:"Annuler",
                                                        onOk:()=>{
                                                            setSpinning(true);
                                                            deleteData(`evenement`,{id:ac.id}).then(r=>{
                                                                openNotification();
                                                                getEvenements();
                                                            }).catch(err=>{
                                                                openNotificationError();
                                                            }).finally(()=>{
                                                                setSpinning(false);
                                                            })
                                                        }
                                                    });
                                                }} color="primary" variant="flat">Supprimer</Button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    </Spin>
                </Tab>
            </Tabs>  
        </Layout>
    </MainLayout> 
    </>
  )
}
export default page
