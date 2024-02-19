"use client"
import {useState,useEffect} from "react"
import NavigationComponent from "@/app/components/NavigationComponent"
import { myContainerDashboard } from "@/app/style/global";
import {Input,Button,Chip,Select,SelectItem} from "@nextui-org/react"
import {postData,getData,updateData} from "@/app/fcts/helper"
import {Modal,Alert,Divider,notification} from "antd"
import {Delete} from "@/app/components/icons/Delete"
import {getProvinces, getVilles} from "@/app/utils/data"
import Layout from "@/app/components/layouts/LayoutDashboard"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"

const page=()=>{
    const [feedBack,setFeedBack]=useState("");
    const [api, contextHolder] = notification.useNotification();
    const [provinces,setProvinces]=useState([]);
    const [villes,setVilles]=useState([]);
    const [communes,setCommunes]=useState([]);
    const [communesSorted,setCommunesSorted]=useState([]);
    const [liste,setListe]=useState([]);
    const [profil,setProfil]=useState({
        adresse:null,
        email:null,
        email2:null,
        telephone:null,
        telephone2:null,
        ville:null,
        villeDetail:null,
        commune:null,
        communeDetail:false,
        siteweb:null,
        siteweb2:null,
        whatsapp:null,
        facebook:null,
        linkedin:null,
        x:null,
        youtube:null,
        tiktok:null,
        instagram:null
    });
    const [isLoading,setIsLoading]=useState({
        ville:null,
        commune:null,
        adresse:false,
        email:false,
        social:false,
        telephone:false,
        geolocalisation:false,
        siteweb:false
    })
    const handleSubmit=(e)=>{
        e.preventDefault();
       
        Modal.confirm({
            title:"Mot clé",
            content:"Confirmez-vous cet enregistrement ?",
            okText:"Oui, enregistrer",
            cancelText:"Annuler",
            onOk:()=>{
                setIsLoading(true);
                let form=Object.fromEntries(new FormData(e.target));
                postData("keyword",form).then(r=>{
                    if(r.success)
                    {
                        setFeedBack(<Alert message="Bien enregistré" type="success" showIcon  />);
                        document.querySelector("#f").reset();
                        getKeywords();
                    }else
                    {
                        setFeedBack(<Alert message="Echec d'enregistrement" type="error" showIcon />)
                    }
                }).catch(r=>{
                    setFeedBack(<Alert message="Echec d'enregistrement" type="error" showIcon />)
                }).finally(()=>setIsLoading(false));
                    
            }
        })
    }

    let prov=null;
   
    useEffect(()=>{
       
        getProvinces().then(r=>{
            setProvinces(r.data);
        });
        getVilles().then(r=>{
            setVilles(r.data);
        });
        getData("communes").then(r=>{
            setCommunes(r.data);
        });
        getData("propreProfil").then(r=>{
            const data=r.data;
            setProfil({
                adresse:data.adresse,
                ville:data.ville,
                villeDetail:data.villeDetail,
                commune:data.commune,
                communeDetail:data.communeDetail,
                email:data.emailAdresse,
                email2:data.emailAdresse2,
                siteweb:data.siteweb,
                siteweb2:data.siteweb2,
                facebook:data.facebook,
                whatsapp:data.whatsapp,
                instagram:data.instagram,
                linkedin:data.linkedin,
                twitter:data.twitter,
                youtube:data.youtube,
                tiktok:data.tiktok,

                telephone:data.telephone,
                telephone2:data.telephone2
            });
            // console.clear()
            // console.log(r.data.ville);
            prov=r.data.province;
        }).catch(e=>{
            alert("erreur");
        });
    },[]);
    const card="bg-white rounded-md flex-1 w-full shadow-md py-3 px-2 h-full"

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

    const handleSubmitAdresse=(e)=>{
        e.preventDefault();
        Modal.confirm({
            title:"Adresse",
            content:"Voulez-vous vraiment mettre à jour vos adresses ?",
            okText:"Oui",
            cancelText:"Annuler",
            onOk:()=>{
                setIsLoading({...isLoading,adresse:true});
                const d=Object.fromEntries(new FormData(e.target));
                updateData("adresseUtilisateur",d).then(r=>{
                    if(r.success)
                    {
                        openNotification();
                    }else
                    {
                        openNotificationError()
                    }
                }).catch(r=>{
                    openNotificationError()
                }).finally(()=>{
                    setIsLoading({...isLoading,adresse:false});
                })
            }
        });
    }
    const handleSubmitEmail=(e)=>{
        e.preventDefault();
        Modal.confirm({
            title:"Email",
            content:"Voulez-vous vraiment mettre à jour votre email ?",
            okText:"Oui",
            cancelText:"Annuler",
            onOk:()=>{
                setIsLoading({...isLoading,email:true});
                const d=Object.fromEntries(new FormData(e.target));
                updateData("emailUtilisateur",d).then(r=>{
                    if(r.success)
                    {
                        openNotification();
                    }else
                    {
                        openNotificationError()
                    }
                }).catch(r=>{
                    openNotificationError();
                }).finally(()=>{
                    setIsLoading({...isLoading,email:false});
                })
            }
        });
    }
    const handleSubmitTelephone=(e)=>{
        e.preventDefault();
        Modal.confirm({
            title:"Téléphone",
            content:"Voulez-vous vraiment mettre à jour vos numeros téléphones ?",
            okText:"Oui",
            cancelText:"Annuler",
            onOk:()=>{
                setIsLoading({...isLoading,telephone:true});
                const d=Object.fromEntries(new FormData(e.target));
                updateData("telephoneUtilisateur",d).then(r=>{
                    if(r.success)
                    {
                        openNotification();
                    }else
                    {
                        openNotificationError()
                    }
                }).catch(r=>{
                    openNotificationError();
                }).finally(()=>{
                    setIsLoading({...isLoading,telephone:false});
                })
            }
        });
    }
    const handleSubmitSocial=(e)=>{
        e.preventDefault();
        Modal.confirm({
            title:"Réseaux sociaux",
            content:"Voulez-vous vraiment mettre à jour vos réseaux sociaux ?",
            okText:"Oui",
            cancelText:"Annuler",
            onOk:()=>{
                setIsLoading({...isLoading,social:true});
                const d=Object.fromEntries(new FormData(e.target));
                updateData("reseauxSociauxUtilisateur",d).then(r=>{
                    if(r.success)
                    {
                        openNotification();
                    }else
                    {
                        openNotificationError()
                    }
                }).catch(r=>{
                    openNotificationError();
                }).finally(()=>{
                    setIsLoading({...isLoading,social:false});
                })
            }
        });
    }
    const handleSubmitSiteweb=(e)=>{
        e.preventDefault();
        Modal.confirm({
            title:"Site Web",
            content:"Voulez-vous vraiment mettre à jour votre adresse du site web?",
            okText:"Oui",
            cancelText:"Annuler",
            onOk:()=>{
                setIsLoading({...isLoading,siteweb:true});
                const d=Object.fromEntries(new FormData(e.target));
                updateData("sitewebUtilisateur",d).then(r=>{
                    if(r.success)
                    {
                        openNotification();
                    }else
                    {
                        openNotificationError()
                    }
                }).catch(r=>{
                    openNotificationError();
                }).finally(()=>{
                    setIsLoading({...isLoading,siteweb:false});
                })
            }
        });
    }
    const handleSubmitGeolocalisation=(e)=>{
        e.preventDefault();
        Modal.confirm({
            title:"Géolocalisation",
            content:"Voulez-vous vraiment mettre à jour votre adresse de géolocalisation ?",
            okText:"Oui",
            cancelText:"Annuler",
            onOk:()=>{
                setIsLoading({...isLoading,geolocalisation:true});
                const d=Object.fromEntries(new FormData(e.target));
                updateData("geolocalisationUtilisateur",d).then(r=>{
                    if(r.success)
                    {
                        openNotification();
                    }else
                    {
                        openNotificationError()
                    }
                }).catch(r=>{
                    openNotificationError();
                }).finally(()=>{
                    setIsLoading({...isLoading,geolocalisation:false});
                })
            }
        });
    }
    // let d=[`"${profil?.province}"`];
    let a=profil?.province;
    
    let d=[`${a}`];
  return (
    <>
    {contextHolder}
    <MainLayout navigationBar="Contacts">
        
        <Layout titre="Nos contacts">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-center justify-center rounded-md py-4 px-3">
                <div className={card}>
                        <div className="flex flex-row gap-4">
                            <svg width="25px" height="25px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#555" fill-rule="evenodd" d="M14.0195274,13.9969614 C14.5722317,13.9969614 15.0202871,14.4450168 15.0202871,14.997721 L15.0202871,16.9992403 C15.0202871,17.5519446 14.5722317,18 14.0195274,18 L1.00075965,18 C0.448055357,18 2.66453526e-14,17.5519446 2.66453526e-14,16.9992403 L2.66453526e-14,14.997721 C2.66453526e-14,14.4450168 0.448055357,13.9969614 1.00075965,13.9969614 L14.0195274,13.9969614 Z M18.9992403,8.0077783 C19.5519446,8.0077783 20,8.45583366 20,9.00853795 L20,11.0100573 C20,11.5627615 19.5519446,12.0108169 18.9992403,12.0108169 L1.00075965,12.0108169 C0.448055357,12.0108169 1.12265752e-12,11.5627615 1.12265752e-12,11.0100573 L1.12265752e-12,9.00853795 C1.12265752e-12,8.45583366 0.448055357,8.0077783 1.00075965,8.0077783 L18.9992403,8.0077783 Z M11.0310808,2 C11.5837851,2 12.0318404,2.44805536 12.0318404,3.00075965 L12.0318404,5.00227895 C12.0318404,5.55498325 11.5837851,6.0030386 11.0310808,6.0030386 L1.00108033,6.0030386 C0.448376035,6.0030386 0.00032067799,5.55498325 0.00032067799,5.00227895 L0.00032067799,3.00075965 C0.00032067799,2.44805536 0.448376035,2 1.00108033,2 L11.0310808,2 Z"></path> </g></svg>
                            Adresse :
                        </div>
                        <Divider />
                        <form onSubmit={handleSubmitAdresse}>
                        <div className="flex flex-col gap-4">
                            {
                                
                                <Select name="ville"  
                                    label={`Ville (${profil?.villeDetail})`}
                                    defaultSelectedKeys={[`${profil?.ville}`]} 
                                    isRequired 
                                    startContent={<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M6.5 1.75C6.5 1.33579 6.16421 1 5.75 1C5.33579 1 5 1.33579 5 1.75V21.75C5 22.1642 5.33579 22.5 5.75 22.5C6.16421 22.5 6.5 22.1642 6.5 21.75V13.6V3.6V1.75Z" fill="#1C274C"></path> <path d="M13.3486 3.78947L13.1449 3.70801C11.5821 3.08288 9.8712 2.9258 8.22067 3.25591L6.5 3.60004V13.6L8.22067 13.2559C9.8712 12.9258 11.5821 13.0829 13.1449 13.708C14.8385 14.3854 16.7024 14.5119 18.472 14.0695L18.6864 14.0159C19.3115 13.8597 19.75 13.298 19.75 12.6538V5.28673C19.75 4.50617 19.0165 3.93343 18.2592 4.12274C16.628 4.53055 14.9097 4.41393 13.3486 3.78947Z" fill="#1C274C"></path> </g></svg>}
                                    onChange={(e)=>{
                                        setCommunesSorted(communes.filter((f)=>f.id==e.target.value))

                                    }}
                                >
                                    {villes?.sort((a,b)=>a.ville>b.ville)?.map(r=>{return(<SelectItem  key={r.id} value={r.id}>{r.ville}</SelectItem>)})}
                                </Select>
                            }
                            {
                                
                                <Select 
                                    name="commune"  
                                    label={`Commune ${profil?.communeDetail && <>(${profil?.communeDetail})</>}`} defaultSelectedKeys={[`${profil?.commune}`]} isRequired startContent={<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M6.5 1.75C6.5 1.33579 6.16421 1 5.75 1C5.33579 1 5 1.33579 5 1.75V21.75C5 22.1642 5.33579 22.5 5.75 22.5C6.16421 22.5 6.5 22.1642 6.5 21.75V13.6V3.6V1.75Z" fill="#1C274C"></path> <path d="M13.3486 3.78947L13.1449 3.70801C11.5821 3.08288 9.8712 2.9258 8.22067 3.25591L6.5 3.60004V13.6L8.22067 13.2559C9.8712 12.9258 11.5821 13.0829 13.1449 13.708C14.8385 14.3854 16.7024 14.5119 18.472 14.0695L18.6864 14.0159C19.3115 13.8597 19.75 13.298 19.75 12.6538V5.28673C19.75 4.50617 19.0165 3.93343 18.2592 4.12274C16.628 4.53055 14.9097 4.41393 13.3486 3.78947Z" fill="#1C274C"></path> </g></svg>}>
                                    {communesSorted
                                    ?.sort((a,b)=>a.commune>b.commune)
                                    ?.map(r=>{return(<SelectItem key={r.id} value={r.id}>{r.commune}</SelectItem>)})
                                    }
                                </Select>
                            }
                            
                            <div className="flex flex-row gap-3">
                                {/* <Input name="territoire" type="text" label="Territoire" isRequired defaultValue={profil?.territoire} startContent={<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M6.5 1.75C6.5 1.33579 6.16421 1 5.75 1C5.33579 1 5 1.33579 5 1.75V21.75C5 22.1642 5.33579 22.5 5.75 22.5C6.16421 22.5 6.5 22.1642 6.5 21.75V13.6V3.6V1.75Z" fill="#1C274C"></path> <path d="M13.3486 3.78947L13.1449 3.70801C11.5821 3.08288 9.8712 2.9258 8.22067 3.25591L6.5 3.60004V13.6L8.22067 13.2559C9.8712 12.9258 11.5821 13.0829 13.1449 13.708C14.8385 14.3854 16.7024 14.5119 18.472 14.0695L18.6864 14.0159C19.3115 13.8597 19.75 13.298 19.75 12.6538V5.28673C19.75 4.50617 19.0165 3.93343 18.2592 4.12274C16.628 4.53055 14.9097 4.41393 13.3486 3.78947Z" fill="#1C274C"></path> </g></svg>} /> */}
                                {/* <Input name="ville" type="text" label="Ville" isRequired defaultValue={profil?.ville} startContent={<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M6.5 1.75C6.5 1.33579 6.16421 1 5.75 1C5.33579 1 5 1.33579 5 1.75V21.75C5 22.1642 5.33579 22.5 5.75 22.5C6.16421 22.5 6.5 22.1642 6.5 21.75V13.6V3.6V1.75Z" fill="#1C274C"></path> <path d="M13.3486 3.78947L13.1449 3.70801C11.5821 3.08288 9.8712 2.9258 8.22067 3.25591L6.5 3.60004V13.6L8.22067 13.2559C9.8712 12.9258 11.5821 13.0829 13.1449 13.708C14.8385 14.3854 16.7024 14.5119 18.472 14.0695L18.6864 14.0159C19.3115 13.8597 19.75 13.298 19.75 12.6538V5.28673C19.75 4.50617 19.0165 3.93343 18.2592 4.12274C16.628 4.53055 14.9097 4.41393 13.3486 3.78947Z" fill="#1C274C"></path> </g></svg>} /> */}
                            </div>
                            <Input 
                                name="adresse" 
                                type="text" 
                                label="Adresse" 
                                isRequired 
                                defaultValue={profil?.adresse} 
                                value={profil?.adresse} 
                                onChange={(e)=>setProfil({...profil,adresse:e.target.value})}
                                startContent={<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M6.5 1.75C6.5 1.33579 6.16421 1 5.75 1C5.33579 1 5 1.33579 5 1.75V21.75C5 22.1642 5.33579 22.5 5.75 22.5C6.16421 22.5 6.5 22.1642 6.5 21.75V13.6V3.6V1.75Z" fill="#1C274C"></path> <path d="M13.3486 3.78947L13.1449 3.70801C11.5821 3.08288 9.8712 2.9258 8.22067 3.25591L6.5 3.60004V13.6L8.22067 13.2559C9.8712 12.9258 11.5821 13.0829 13.1449 13.708C14.8385 14.3854 16.7024 14.5119 18.472 14.0695L18.6864 14.0159C19.3115 13.8597 19.75 13.298 19.75 12.6538V5.28673C19.75 4.50617 19.0165 3.93343 18.2592 4.12274C16.628 4.53055 14.9097 4.41393 13.3486 3.78947Z" fill="#1C274C"></path> </g></svg>} />
                            <div className="justify-center flex">
                                <Button isLoading={isLoading.adresse} color={"primary"} type="submit">Mettre à jour</Button>
                            </div>
                        </div>
                        </form>
                </div>
                <div className={card}>
                        <div className="flex flex-row gap-4">
                            <svg width="25px" height="25px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#555" fill-rule="evenodd" d="M14.0195274,13.9969614 C14.5722317,13.9969614 15.0202871,14.4450168 15.0202871,14.997721 L15.0202871,16.9992403 C15.0202871,17.5519446 14.5722317,18 14.0195274,18 L1.00075965,18 C0.448055357,18 2.66453526e-14,17.5519446 2.66453526e-14,16.9992403 L2.66453526e-14,14.997721 C2.66453526e-14,14.4450168 0.448055357,13.9969614 1.00075965,13.9969614 L14.0195274,13.9969614 Z M18.9992403,8.0077783 C19.5519446,8.0077783 20,8.45583366 20,9.00853795 L20,11.0100573 C20,11.5627615 19.5519446,12.0108169 18.9992403,12.0108169 L1.00075965,12.0108169 C0.448055357,12.0108169 1.12265752e-12,11.5627615 1.12265752e-12,11.0100573 L1.12265752e-12,9.00853795 C1.12265752e-12,8.45583366 0.448055357,8.0077783 1.00075965,8.0077783 L18.9992403,8.0077783 Z M11.0310808,2 C11.5837851,2 12.0318404,2.44805536 12.0318404,3.00075965 L12.0318404,5.00227895 C12.0318404,5.55498325 11.5837851,6.0030386 11.0310808,6.0030386 L1.00108033,6.0030386 C0.448376035,6.0030386 0.00032067799,5.55498325 0.00032067799,5.00227895 L0.00032067799,3.00075965 C0.00032067799,2.44805536 0.448376035,2 1.00108033,2 L11.0310808,2 Z"></path> </g></svg>
                            Email :
                        </div>
                        <Divider />
                        <form onSubmit={handleSubmitEmail}>
                        <div className="flex flex-col gap-3">
                            <Input 
                                name="email" 
                                type="email" 
                                label="Votre email" 
                                defaultValue={profil?.emailAdresse} 
                                value={profil.email} 
                                onChange={(e)=>setProfil({...profil,email:e.target.value})}
                                startContent={
                               <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=bulk"> <g id="email"> <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M2.86466 4.1379C3.92465 3.15363 5.38503 2.75 7 2.75H17C18.615 2.75 20.0754 3.15363 21.1353 4.1379C22.2054 5.13152 22.75 6.60705 22.75 8.5V15.5C22.75 17.393 22.2054 18.8685 21.1353 19.8621C20.0754 20.8464 18.615 21.25 17 21.25H7C5.38503 21.25 3.92465 20.8464 2.86466 19.8621C1.79462 18.8685 1.25 17.393 1.25 15.5V8.5C1.25 6.60705 1.79462 5.13152 2.86466 4.1379Z" fill="#BFBFBF"></path> <path id="vector (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd" d="M19.3633 7.31026C19.6166 7.63802 19.5562 8.10904 19.2285 8.3623L13.6814 12.6486C12.691 13.4138 11.3089 13.4138 10.3185 12.6486L4.77144 8.3623C4.44367 8.10904 4.38328 7.63802 4.63655 7.31026C4.88982 6.98249 5.36083 6.9221 5.6886 7.17537L11.2356 11.4616C11.6858 11.8095 12.3141 11.8095 12.7642 11.4616L18.3113 7.17537C18.6391 6.9221 19.1101 6.98249 19.3633 7.31026Z" fill="#000000"></path> </g> </g> </g></svg>
                            }  />
                            {/* <div className="flex flex-row"> */}
                            <div className="justify-center justify-center flex">
                                <Button isLoading={isLoading.email} color={"primary"} type="submit">Mettre à jour</Button>
                            </div>

                        </div>
                        </form>
                </div>
                <div className={card}>
                        <div className="flex flex-row gap-4">
                            <svg width="25px" height="25px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#555" fill-rule="evenodd" d="M14.0195274,13.9969614 C14.5722317,13.9969614 15.0202871,14.4450168 15.0202871,14.997721 L15.0202871,16.9992403 C15.0202871,17.5519446 14.5722317,18 14.0195274,18 L1.00075965,18 C0.448055357,18 2.66453526e-14,17.5519446 2.66453526e-14,16.9992403 L2.66453526e-14,14.997721 C2.66453526e-14,14.4450168 0.448055357,13.9969614 1.00075965,13.9969614 L14.0195274,13.9969614 Z M18.9992403,8.0077783 C19.5519446,8.0077783 20,8.45583366 20,9.00853795 L20,11.0100573 C20,11.5627615 19.5519446,12.0108169 18.9992403,12.0108169 L1.00075965,12.0108169 C0.448055357,12.0108169 1.12265752e-12,11.5627615 1.12265752e-12,11.0100573 L1.12265752e-12,9.00853795 C1.12265752e-12,8.45583366 0.448055357,8.0077783 1.00075965,8.0077783 L18.9992403,8.0077783 Z M11.0310808,2 C11.5837851,2 12.0318404,2.44805536 12.0318404,3.00075965 L12.0318404,5.00227895 C12.0318404,5.55498325 11.5837851,6.0030386 11.0310808,6.0030386 L1.00108033,6.0030386 C0.448376035,6.0030386 0.00032067799,5.55498325 0.00032067799,5.00227895 L0.00032067799,3.00075965 C0.00032067799,2.44805536 0.448376035,2 1.00108033,2 L11.0310808,2 Z"></path> </g></svg>
                            Téléphones :
                        </div>
                        <Divider />
                        <form onSubmit={handleSubmitTelephone}>
                        <div className="flex flex-col gap-3">
                            <Input 
                                name="telephone" 
                                type="tel" 
                                label="Téléphone" 
                                defaultValue={profil.telephone} 
                                value={profil.telephone} 
                                onChange={(e)=>setProfil({...profil,telephone:e.target.value})}

                                startContent={
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M15.5562 14.5477L15.1007 15.0272C15.1007 15.0272 14.0181 16.167 11.0631 13.0559C8.10812 9.94484 9.1907 8.80507 9.1907 8.80507L9.47752 8.50311C10.1841 7.75924 10.2507 6.56497 9.63424 5.6931L8.37326 3.90961C7.61028 2.8305 6.13596 2.68795 5.26145 3.60864L3.69185 5.26114C3.25823 5.71766 2.96765 6.30945 3.00289 6.96594C3.09304 8.64546 3.81071 12.259 7.81536 16.4752C12.0621 20.9462 16.0468 21.1239 17.6763 20.9631C18.1917 20.9122 18.6399 20.6343 19.0011 20.254L20.4217 18.7584C21.3806 17.7489 21.1102 16.0182 19.8833 15.312L17.9728 14.2123C17.1672 13.7486 16.1858 13.8848 15.5562 14.5477Z" fill="#1C274C"></path> <path d="M13.2595 1.87983C13.3257 1.47094 13.7122 1.19357 14.1211 1.25976C14.1464 1.26461 14.2279 1.27983 14.2705 1.28933C14.3559 1.30834 14.4749 1.33759 14.6233 1.38082C14.9201 1.46726 15.3347 1.60967 15.8323 1.8378C16.8286 2.29456 18.1544 3.09356 19.5302 4.46936C20.906 5.84516 21.705 7.17097 22.1617 8.16725C22.3899 8.66487 22.5323 9.07947 22.6187 9.37625C22.6619 9.52466 22.6912 9.64369 22.7102 9.72901C22.7197 9.77168 22.7267 9.80594 22.7315 9.83125L22.7373 9.86245C22.8034 10.2713 22.5286 10.6739 22.1197 10.7401C21.712 10.8061 21.3279 10.53 21.2601 10.1231C21.258 10.1121 21.2522 10.0828 21.2461 10.0551C21.2337 9.9997 21.2124 9.91188 21.1786 9.79572C21.1109 9.56339 20.9934 9.21806 20.7982 8.79238C20.4084 7.94207 19.7074 6.76789 18.4695 5.53002C17.2317 4.29216 16.0575 3.59117 15.2072 3.20134C14.7815 3.00618 14.4362 2.88865 14.2038 2.82097C14.0877 2.78714 13.9417 2.75363 13.8863 2.7413C13.4793 2.67347 13.1935 2.28755 13.2595 1.87983Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4857 5.3293C13.5995 4.93102 14.0146 4.7004 14.4129 4.81419L14.2069 5.53534C14.4129 4.81419 14.4129 4.81419 14.4129 4.81419L14.4144 4.81461L14.4159 4.81505L14.4192 4.81602L14.427 4.81834L14.4468 4.8245C14.4618 4.82932 14.4807 4.8356 14.5031 4.84357C14.548 4.85951 14.6074 4.88217 14.6802 4.91337C14.8259 4.97581 15.0249 5.07223 15.2695 5.21694C15.7589 5.50662 16.4271 5.9878 17.2121 6.77277C17.9971 7.55775 18.4782 8.22593 18.7679 8.7154C18.9126 8.95991 19.009 9.15897 19.0715 9.30466C19.1027 9.37746 19.1254 9.43682 19.1413 9.48173C19.1493 9.50418 19.1555 9.52301 19.1604 9.53809L19.1665 9.55788L19.1688 9.56563L19.1698 9.56896L19.1702 9.5705C19.1702 9.5705 19.1707 9.57194 18.4495 9.77798L19.1707 9.57194C19.2845 9.97021 19.0538 10.3853 18.6556 10.4991C18.2607 10.6119 17.8492 10.3862 17.7313 9.99413L17.7276 9.98335C17.7223 9.96832 17.7113 9.93874 17.6928 9.89554C17.6558 9.8092 17.5887 9.66797 17.4771 9.47938C17.2541 9.10264 16.8514 8.53339 16.1514 7.83343C15.4515 7.13348 14.8822 6.73078 14.5055 6.50781C14.3169 6.39619 14.1757 6.32909 14.0893 6.29209C14.0461 6.27358 14.0165 6.26254 14.0015 6.25721L13.9907 6.25352C13.5987 6.13564 13.3729 5.72419 13.4857 5.3293Z" fill="#1C274C"></path> </g></svg>
                            } />
                            
                            <Input 
                                name="telephone2" 
                                type="tel" 
                                label="Téléphone 2" 
                                defaultValue={profil?.telephone2} 
                                value={profil.telephone2}
                                onChange={(e)=>setProfil({...profil,telephone2:e.target.value})}
                                startContent={
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M15.5562 14.5477L15.1007 15.0272C15.1007 15.0272 14.0181 16.167 11.0631 13.0559C8.10812 9.94484 9.1907 8.80507 9.1907 8.80507L9.47752 8.50311C10.1841 7.75924 10.2507 6.56497 9.63424 5.6931L8.37326 3.90961C7.61028 2.8305 6.13596 2.68795 5.26145 3.60864L3.69185 5.26114C3.25823 5.71766 2.96765 6.30945 3.00289 6.96594C3.09304 8.64546 3.81071 12.259 7.81536 16.4752C12.0621 20.9462 16.0468 21.1239 17.6763 20.9631C18.1917 20.9122 18.6399 20.6343 19.0011 20.254L20.4217 18.7584C21.3806 17.7489 21.1102 16.0182 19.8833 15.312L17.9728 14.2123C17.1672 13.7486 16.1858 13.8848 15.5562 14.5477Z" fill="#1C274C"></path> <path d="M13.2595 1.87983C13.3257 1.47094 13.7122 1.19357 14.1211 1.25976C14.1464 1.26461 14.2279 1.27983 14.2705 1.28933C14.3559 1.30834 14.4749 1.33759 14.6233 1.38082C14.9201 1.46726 15.3347 1.60967 15.8323 1.8378C16.8286 2.29456 18.1544 3.09356 19.5302 4.46936C20.906 5.84516 21.705 7.17097 22.1617 8.16725C22.3899 8.66487 22.5323 9.07947 22.6187 9.37625C22.6619 9.52466 22.6912 9.64369 22.7102 9.72901C22.7197 9.77168 22.7267 9.80594 22.7315 9.83125L22.7373 9.86245C22.8034 10.2713 22.5286 10.6739 22.1197 10.7401C21.712 10.8061 21.3279 10.53 21.2601 10.1231C21.258 10.1121 21.2522 10.0828 21.2461 10.0551C21.2337 9.9997 21.2124 9.91188 21.1786 9.79572C21.1109 9.56339 20.9934 9.21806 20.7982 8.79238C20.4084 7.94207 19.7074 6.76789 18.4695 5.53002C17.2317 4.29216 16.0575 3.59117 15.2072 3.20134C14.7815 3.00618 14.4362 2.88865 14.2038 2.82097C14.0877 2.78714 13.9417 2.75363 13.8863 2.7413C13.4793 2.67347 13.1935 2.28755 13.2595 1.87983Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4857 5.3293C13.5995 4.93102 14.0146 4.7004 14.4129 4.81419L14.2069 5.53534C14.4129 4.81419 14.4129 4.81419 14.4129 4.81419L14.4144 4.81461L14.4159 4.81505L14.4192 4.81602L14.427 4.81834L14.4468 4.8245C14.4618 4.82932 14.4807 4.8356 14.5031 4.84357C14.548 4.85951 14.6074 4.88217 14.6802 4.91337C14.8259 4.97581 15.0249 5.07223 15.2695 5.21694C15.7589 5.50662 16.4271 5.9878 17.2121 6.77277C17.9971 7.55775 18.4782 8.22593 18.7679 8.7154C18.9126 8.95991 19.009 9.15897 19.0715 9.30466C19.1027 9.37746 19.1254 9.43682 19.1413 9.48173C19.1493 9.50418 19.1555 9.52301 19.1604 9.53809L19.1665 9.55788L19.1688 9.56563L19.1698 9.56896L19.1702 9.5705C19.1702 9.5705 19.1707 9.57194 18.4495 9.77798L19.1707 9.57194C19.2845 9.97021 19.0538 10.3853 18.6556 10.4991C18.2607 10.6119 17.8492 10.3862 17.7313 9.99413L17.7276 9.98335C17.7223 9.96832 17.7113 9.93874 17.6928 9.89554C17.6558 9.8092 17.5887 9.66797 17.4771 9.47938C17.2541 9.10264 16.8514 8.53339 16.1514 7.83343C15.4515 7.13348 14.8822 6.73078 14.5055 6.50781C14.3169 6.39619 14.1757 6.32909 14.0893 6.29209C14.0461 6.27358 14.0165 6.26254 14.0015 6.25721L13.9907 6.25352C13.5987 6.13564 13.3729 5.72419 13.4857 5.3293Z" fill="#1C274C"></path> </g></svg>
                            } />
                            <div className="justify-center flex"><Button isLoading={isLoading.telephone} color={"primary"} type="submit">Mettre à jour</Button></div>
                        </div>
                        </form>
                </div>
                <div className={card}>
                        <div className="flex flex-row gap-4">
                            <svg width="25px" height="25px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#555" fill-rule="evenodd" d="M14.0195274,13.9969614 C14.5722317,13.9969614 15.0202871,14.4450168 15.0202871,14.997721 L15.0202871,16.9992403 C15.0202871,17.5519446 14.5722317,18 14.0195274,18 L1.00075965,18 C0.448055357,18 2.66453526e-14,17.5519446 2.66453526e-14,16.9992403 L2.66453526e-14,14.997721 C2.66453526e-14,14.4450168 0.448055357,13.9969614 1.00075965,13.9969614 L14.0195274,13.9969614 Z M18.9992403,8.0077783 C19.5519446,8.0077783 20,8.45583366 20,9.00853795 L20,11.0100573 C20,11.5627615 19.5519446,12.0108169 18.9992403,12.0108169 L1.00075965,12.0108169 C0.448055357,12.0108169 1.12265752e-12,11.5627615 1.12265752e-12,11.0100573 L1.12265752e-12,9.00853795 C1.12265752e-12,8.45583366 0.448055357,8.0077783 1.00075965,8.0077783 L18.9992403,8.0077783 Z M11.0310808,2 C11.5837851,2 12.0318404,2.44805536 12.0318404,3.00075965 L12.0318404,5.00227895 C12.0318404,5.55498325 11.5837851,6.0030386 11.0310808,6.0030386 L1.00108033,6.0030386 C0.448376035,6.0030386 0.00032067799,5.55498325 0.00032067799,5.00227895 L0.00032067799,3.00075965 C0.00032067799,2.44805536 0.448376035,2 1.00108033,2 L11.0310808,2 Z"></path> </g></svg>
                            Réseaux Sociaux :
                        </div>
                        <Divider />
                        <form onSubmit={handleSubmitSocial}>
                        <div className="flex flex-col gap-3">
                            <Input name="whatsapp" type="text" label="Whatsapp" 
                                defaultValue={profil?.whatsapp} 
                                value={profil?.whatsapp}
                                onChange={(e)=>setProfil({...profil,whatsapp:e.target.value})}
                                startContent={
                                <svg width="14px" height="14px" viewBox="0 0 24 24" id="meteor-icon-kit__regular-whatsapp" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.5129 3.4866C18.2882 1.24722 15.2597 -0.00837473 12.1032 4.20445e-05C5.54964 4.20445e-05 0.216056 5.33306 0.213776 11.8883C0.210977 13.9746 0.75841 16.0247 1.80085 17.8319L0.114014 23.9932L6.41672 22.34C8.15975 23.2898 10.1131 23.7874 12.0981 23.7874H12.1032C18.6556 23.7874 23.9897 18.4538 23.992 11.8986C24.0022 8.74248 22.7494 5.71347 20.5129 3.4866ZM12.1032 21.7768H12.0992C10.3294 21.7776 8.59195 21.3025 7.06888 20.4012L6.70803 20.1874L2.96836 21.1685L3.96713 17.52L3.73169 17.1461C2.74331 15.5709 2.22039 13.7484 2.22328 11.8889C2.22328 6.44185 6.65615 2.00783 12.1072 2.00783C14.7284 2.00934 17.2417 3.05207 19.0941 4.90662C20.9465 6.76117 21.9863 9.27564 21.9848 11.8969C21.9825 17.3456 17.5496 21.7768 12.1032 21.7768ZM17.5234 14.3755C17.2264 14.2267 15.7659 13.5085 15.4934 13.4064C15.2209 13.3044 15.0231 13.2576 14.8253 13.5552C14.6275 13.8528 14.058 14.5215 13.8847 14.7199C13.7114 14.9182 13.5381 14.9427 13.241 14.794C12.944 14.6452 11.9869 14.3316 10.8519 13.3198C9.96884 12.5319 9.36969 11.5594 9.19867 11.2618C9.02765 10.9642 9.18043 10.8057 9.32922 10.6552C9.46261 10.5224 9.62622 10.3086 9.77444 10.1348C9.92266 9.9609 9.97283 9.83776 10.0714 9.63938C10.1701 9.44099 10.121 9.26769 10.0469 9.1189C9.97283 8.97011 9.37824 7.50788 9.13083 6.9133C8.88969 6.3341 8.64513 6.4122 8.46271 6.40023C8.29169 6.39168 8.09102 6.38997 7.89264 6.38997C7.58822 6.39793 7.30097 6.53267 7.10024 6.76166C6.82831 7.05923 6.061 7.77752 6.061 9.23976C6.061 10.702 7.12532 12.1146 7.27354 12.313C7.42176 12.5114 9.36855 15.5117 12.3472 16.7989C12.9004 17.0375 13.4657 17.2468 14.0409 17.426C14.7523 17.654 15.3999 17.6204 15.9118 17.544C16.4819 17.4585 17.6694 16.8251 17.9173 16.1313C18.1653 15.4376 18.1648 14.8424 18.0884 14.7187C18.012 14.595 17.8204 14.5266 17.5234 14.3778V14.3755Z" fill="#758CA3"></path></g></svg>
                            } />
                            <Input name="facebook" type="text" label="Facebook" defaultValue={profil?.facebook}  value={profil.facebook}  onChange={(e)=>setProfil({...profil,facebook:e.target.value})} startContent={
                                <svg width="14px" height="14px" viewBox="0 0 24 24" id="meteor-icon-kit__regular-facebook" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.38823 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9165 4.6875 14.6576 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.3399 7.875 13.875 8.80001 13.875 9.74899V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="#758CA3"></path></g></svg>
                            }  />
                            <Input name="linkedin" type="text" label="Linkedin" defaultValue={profil?.linkedin} value={profil.linkedin}  onChange={(e)=>setProfil({...profil,linkedin:e.target.value})} startContent={
                                <svg width="14px" height="14px" viewBox="0 0 24 24" id="meteor-icon-kit__solid-linkedin" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.2857 0H1.70893C0.766071 0 0 0.776786 0 1.73036V22.2696C0 23.2232 0.766071 24 1.70893 24H22.2857C23.2286 24 24 23.2232 24 22.2696V1.73036C24 0.776786 23.2286 0 22.2857 0ZM7.25357 20.5714H3.69643V9.11786H7.25893V20.5714H7.25357ZM5.475 7.55357C4.33393 7.55357 3.4125 6.62679 3.4125 5.49107C3.4125 4.35536 4.33393 3.42857 5.475 3.42857C6.61071 3.42857 7.5375 4.35536 7.5375 5.49107C7.5375 6.63214 6.61607 7.55357 5.475 7.55357ZM20.5875 20.5714H17.0304V15C17.0304 13.6714 17.0036 11.9625 15.1821 11.9625C13.3286 11.9625 13.0446 13.4089 13.0446 14.9036V20.5714H9.4875V9.11786H12.9V10.6821H12.9482C13.425 9.78214 14.5875 8.83393 16.3179 8.83393C19.9179 8.83393 20.5875 11.2071 20.5875 14.2929V20.5714Z" fill="#758CA3"></path></g></svg>
                            }  />
                            <Input name="twitter" type="text" label="Twitter" defaultValue={profil?.twitter} value={profil.twitter}  onChange={(e)=>setProfil({...profil,x:e.target.value})} startContent={
                                <svg width="14px" height="14px" viewBox="0 -2 24 24" id="meteor-icon-kit__solid-twitter" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.54752 20C16.6042 20 21.5578 12.3048 21.5578 5.63156C21.5578 5.41299 21.5578 5.19541 21.5434 4.97881C22.507 4.26394 23.3389 3.37881 24 2.36484C23.1013 2.77324 22.148 3.04106 21.1718 3.15937C22.1998 2.52826 22.9691 1.53563 23.3366 0.36622C22.3701 0.95444 21.3126 1.36899 20.2099 1.59198C18.6836 -0.0725 16.2583 -0.47988 14.294 0.59826C12.3296 1.6764 11.3148 3.97194 11.8186 6.19768C7.85942 5.99412 4.1707 4.0763 1.6704 0.9215C0.363478 3.22892 1.03103 6.1808 3.19488 7.66268C2.41127 7.63886 1.64475 7.42207 0.96 7.0306C0.96 7.05128 0.96 7.07294 0.96 7.09459C0.960641 9.4985 2.61288 11.5689 4.9104 12.0449C4.18547 12.2476 3.42488 12.2773 2.68704 12.1315C3.33211 14.1887 5.18071 15.5979 7.28736 15.6385C5.54375 17.0438 3.38982 17.8068 1.17216 17.8045C0.780387 17.8037 0.388996 17.7794 0 17.7316C2.25181 19.2136 4.87192 19.9997 7.54752 19.9961" fill="#758CA3"></path></g></svg>
                            }  />
                            <Input name="youtube" type="text" label="Youtube" defaultValue={profil?.youtube} value={profil.youtube}  onChange={(e)=>setProfil({...profil,youtube:e.target.value})} startContent={
                                <svg width="14px" height="14px" viewBox="0 -3.5 24 24" id="meteor-icon-kit__regular-youtube" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.4593 2.63137C23.1843 1.59561 22.3738 0.77987 21.3447 0.50304C19.4795 0 12 0 12 0C12 0 4.52059 0 2.65529 0.50304C1.62622 0.77991 0.815739 1.59561 0.540659 2.63137C0.040863 4.50876 0.040863 8.4258 0.040863 8.4258C0.040863 8.4258 0.040863 12.3427 0.540659 14.2201C0.815739 15.2559 1.62622 16.0376 2.65529 16.3145C4.52059 16.8175 12 16.8175 12 16.8175C12 16.8175 19.4794 16.8175 21.3447 16.3145C22.3738 16.0376 23.1843 15.2559 23.4593 14.2201C23.9591 12.3427 23.9591 8.4258 23.9591 8.4258C23.9591 8.4258 23.9591 4.50876 23.4593 2.63137zM9.5538 11.9821V4.86942L15.8051 8.4258L9.5538 11.9821z" fill="#758CA3"></path></g></svg>
                            }  />
                            <Input name="tiktok" type="text" label="Tiktok" defaultValue={profil?.tiktok} value={profil.tiktok}  onChange={(e)=>setProfil({...profil,tiktok:e.target.value})} startContent={
                                <svg fill="#000000" width="14px" height="14px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M224,124a95.56424,95.56424,0,0,1-56.00043-18.01709L168,156A68,68,0,1,1,88,89.05544l-.00061,41.63941A28.0028,28.0028,0,1,0,128,156V28h40a56,56,0,0,0,56,56Z" opacity="0.2"></path> <path d="M224,76a48.05436,48.05436,0,0,1-48-48,7.99977,7.99977,0,0,0-8-8H128a7.99977,7.99977,0,0,0-8,8V156a20,20,0,1,1-28.56738-18.0791,7.99971,7.99971,0,0,0,4.56689-7.22607L96,89.05569a7.99952,7.99952,0,0,0-9.40234-7.876A76.00518,76.00518,0,1,0,176,156l-.00049-35.70752A103.32406,103.32406,0,0,0,224,132a7.99977,7.99977,0,0,0,8-8V84A7.99977,7.99977,0,0,0,224,76Zm-8,39.64356a87.21519,87.21519,0,0,1-43.32861-16.15479,7.99982,7.99982,0,0,0-12.67188,6.49414L160,156a60,60,0,1,1-80-56.6001l-.00049,26.66846A35.99955,35.99955,0,1,0,136,156V36h24.49756A64.13944,64.13944,0,0,0,216,91.50246Z"></path> </g></svg>
                            }  />
                            <Input name="instagram" type="text" label="Instagram" defaultValue={profil?.instagram} value={profil.instagram}  onChange={(e)=>setProfil({...profil,instagram:e.target.value})} startContent={
                                <svg width="14px" height="14px" viewBox="0 0 24 24" id="meteor-icon-kit__solid-instagram" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9962 0.0078125C8.73824 0.0078125 8.32971 0.021622 7.05019 0.080003C5.77333 0.138241 4.90129 0.341051 4.13824 0.637622C3.34938 0.944146 2.68038 1.35434 2.01343 2.02124C1.34652 2.68819 0.936333 3.35719 0.629809 4.14605C0.333238 4.9091 0.130429 5.78115 0.0721905 7.058C0.0138095 8.33753 0 8.74605 0 12.0041C0 15.262 0.0138095 15.6705 0.0721905 16.9501C0.130429 18.2269 0.333238 19.099 0.629809 19.862C0.936333 20.6509 1.34652 21.3199 2.01343 21.9868C2.68038 22.6537 3.34938 23.0639 4.13824 23.3705C4.90129 23.667 5.77333 23.8698 7.05019 23.9281C8.32971 23.9864 8.73824 24.0002 11.9962 24.0002C15.2542 24.0002 15.6627 23.9864 16.9422 23.9281C18.2191 23.8698 19.0911 23.667 19.8542 23.3705C20.643 23.0639 21.312 22.6537 21.979 21.9868C22.6459 21.3199 23.0561 20.6509 23.3627 19.862C23.6592 19.099 23.862 18.2269 23.9202 16.9501C23.9786 15.6705 23.9924 15.262 23.9924 12.0041C23.9924 8.74605 23.9786 8.33753 23.9202 7.058C23.862 5.78115 23.6592 4.9091 23.3627 4.14605C23.0561 3.35719 22.6459 2.68819 21.979 2.02124C21.312 1.35434 20.643 0.944146 19.8542 0.637622C19.0911 0.341051 18.2191 0.138241 16.9422 0.080003C15.6627 0.021622 15.2542 0.0078125 11.9962 0.0078125ZM7.99748 12.0041C7.99748 14.2125 9.78776 16.0028 11.9962 16.0028C14.2047 16.0028 15.995 14.2125 15.995 12.0041C15.995 9.79557 14.2047 8.00529 11.9962 8.00529C9.78776 8.00529 7.99748 9.79557 7.99748 12.0041ZM5.836 12.0041C5.836 8.60181 8.594 5.84381 11.9962 5.84381C15.3984 5.84381 18.1564 8.60181 18.1564 12.0041C18.1564 15.4062 15.3984 18.1642 11.9962 18.1642C8.594 18.1642 5.836 15.4062 5.836 12.0041ZM18.3998 7.03996C19.1949 7.03996 19.8394 6.39548 19.8394 5.60043C19.8394 4.80538 19.1949 4.16086 18.3998 4.16086C17.6048 4.16086 16.9603 4.80538 16.9603 5.60043C16.9603 6.39548 17.6048 7.03996 18.3998 7.03996Z" fill="#758CA3"></path></g></svg>                            }  />
                            <div className="justify-center flex"><Button isLoading={isLoading.social} color={"primary"} type="submit">Mettre à jour</Button></div>
                        </div>
                        </form>
                </div>
                <div className={card}>
                        <div className="flex flex-row gap-4">
                            <svg width="25px" height="25px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#555" fill-rule="evenodd" d="M14.0195274,13.9969614 C14.5722317,13.9969614 15.0202871,14.4450168 15.0202871,14.997721 L15.0202871,16.9992403 C15.0202871,17.5519446 14.5722317,18 14.0195274,18 L1.00075965,18 C0.448055357,18 2.66453526e-14,17.5519446 2.66453526e-14,16.9992403 L2.66453526e-14,14.997721 C2.66453526e-14,14.4450168 0.448055357,13.9969614 1.00075965,13.9969614 L14.0195274,13.9969614 Z M18.9992403,8.0077783 C19.5519446,8.0077783 20,8.45583366 20,9.00853795 L20,11.0100573 C20,11.5627615 19.5519446,12.0108169 18.9992403,12.0108169 L1.00075965,12.0108169 C0.448055357,12.0108169 1.12265752e-12,11.5627615 1.12265752e-12,11.0100573 L1.12265752e-12,9.00853795 C1.12265752e-12,8.45583366 0.448055357,8.0077783 1.00075965,8.0077783 L18.9992403,8.0077783 Z M11.0310808,2 C11.5837851,2 12.0318404,2.44805536 12.0318404,3.00075965 L12.0318404,5.00227895 C12.0318404,5.55498325 11.5837851,6.0030386 11.0310808,6.0030386 L1.00108033,6.0030386 C0.448376035,6.0030386 0.00032067799,5.55498325 0.00032067799,5.00227895 L0.00032067799,3.00075965 C0.00032067799,2.44805536 0.448376035,2 1.00108033,2 L11.0310808,2 Z"></path> </g></svg>
                            Site Web :
                        </div>
                        <Divider />
                        <form onSubmit={handleSubmitSiteweb}>
                        <div className="flex flex-col gap-3">
                            <Input name="siteweb" type="url" label="URL" defaultValue={profil?.siteweb} value={profil.siteweb}  onChange={(e)=>setProfil({...profil,siteweb:e.target.value})} startContent={
                                <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small"></span>
                                </div>
                            } />
                            <Input name="siteweb2" type="url" label="URL" defaultValue={profil?.siteweb2} value={profil.siteweb2}  onChange={(e)=>setProfil({...profil,siteweb2:e.target.value})} startContent={
                                <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small"></span>
                                </div>
                            } />
                            <div className="justify-center justify-center flex">
                                <Button isLoading={isLoading.siteweb} color={"primary"} type="submit">Mettre à jour</Button></div>
                        </div>
                        </form>
                </div>
                <div className={card}>
                        <div className="flex flex-row gap-4">
                            <svg width="25px" height="25px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#555" fill-rule="evenodd" d="M14.0195274,13.9969614 C14.5722317,13.9969614 15.0202871,14.4450168 15.0202871,14.997721 L15.0202871,16.9992403 C15.0202871,17.5519446 14.5722317,18 14.0195274,18 L1.00075965,18 C0.448055357,18 2.66453526e-14,17.5519446 2.66453526e-14,16.9992403 L2.66453526e-14,14.997721 C2.66453526e-14,14.4450168 0.448055357,13.9969614 1.00075965,13.9969614 L14.0195274,13.9969614 Z M18.9992403,8.0077783 C19.5519446,8.0077783 20,8.45583366 20,9.00853795 L20,11.0100573 C20,11.5627615 19.5519446,12.0108169 18.9992403,12.0108169 L1.00075965,12.0108169 C0.448055357,12.0108169 1.12265752e-12,11.5627615 1.12265752e-12,11.0100573 L1.12265752e-12,9.00853795 C1.12265752e-12,8.45583366 0.448055357,8.0077783 1.00075965,8.0077783 L18.9992403,8.0077783 Z M11.0310808,2 C11.5837851,2 12.0318404,2.44805536 12.0318404,3.00075965 L12.0318404,5.00227895 C12.0318404,5.55498325 11.5837851,6.0030386 11.0310808,6.0030386 L1.00108033,6.0030386 C0.448376035,6.0030386 0.00032067799,5.55498325 0.00032067799,5.00227895 L0.00032067799,3.00075965 C0.00032067799,2.44805536 0.448376035,2 1.00108033,2 L11.0310808,2 Z"></path> </g></svg>
                            Géolocalisation :
                        </div>
                        <Divider />
                        <form onSubmit={handleSubmitGeolocalisation}>
                        <div className="flex flex-col gap-3">
                            <Input name="longitude" type="text" label="Longitude" 
                                startContent={
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M19.7165 20.3624C21.143 19.5846 22 18.5873 22 17.5C22 16.3475 21.0372 15.2961 19.4537 14.5C17.6226 13.5794 14.9617 13 12 13C9.03833 13 6.37738 13.5794 4.54631 14.5C2.96285 15.2961 2 16.3475 2 17.5C2 18.6525 2.96285 19.7039 4.54631 20.5C6.37738 21.4206 9.03833 22 12 22C15.1066 22 17.8823 21.3625 19.7165 20.3624Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8.51464C5 4.9167 8.13401 2 12 2C15.866 2 19 4.9167 19 8.51464C19 12.0844 16.7658 16.2499 13.2801 17.7396C12.4675 18.0868 11.5325 18.0868 10.7199 17.7396C7.23416 16.2499 5 12.0844 5 8.51464ZM12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="#1C274C"></path> </g></svg>
                                }/>
                            <Input name="lattitude" type="text" label="Lattitude" 
                                startContent={
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M19.7165 20.3624C21.143 19.5846 22 18.5873 22 17.5C22 16.3475 21.0372 15.2961 19.4537 14.5C17.6226 13.5794 14.9617 13 12 13C9.03833 13 6.37738 13.5794 4.54631 14.5C2.96285 15.2961 2 16.3475 2 17.5C2 18.6525 2.96285 19.7039 4.54631 20.5C6.37738 21.4206 9.03833 22 12 22C15.1066 22 17.8823 21.3625 19.7165 20.3624Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M5 8.51464C5 4.9167 8.13401 2 12 2C15.866 2 19 4.9167 19 8.51464C19 12.0844 16.7658 16.2499 13.2801 17.7396C12.4675 18.0868 11.5325 18.0868 10.7199 17.7396C7.23416 16.2499 5 12.0844 5 8.51464ZM12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="#1C274C"></path> </g></svg>
                                }
                            />
                            <div className="justify-center justify-center flex"><Button isLoading={isLoading.geolocalisation} color={"primary"} type="submit">Mettre à jour</Button></div>
                        </div>
                        </form>
                </div>
            </div>
        </Layout>
    </MainLayout> 
    </>
  )
}
export default page
