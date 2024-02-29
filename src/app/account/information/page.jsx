"use client"
import {useState,useEffect, useRef} from "react"

import {Textarea,Button,Input,Checkbox,Image, Select, SelectItem, Chip} from "@nextui-org/react"
import {postData,getData,updateData, API_URL,BACKEND_URL} from "@/app/fcts/helper"
import {Modal,Alert,Spin,Divider,notification} from "antd"
import {Delete} from "@/app/components/icons/Delete"
import {Upload} from "@/app/components/icons/Upload"
import LayoutDashboard from "@/app/components/layouts/LayoutDashboard"
import LayoutDashboardMain from "@/app/components/layouts/LayoutDashboardMain"
import NextImage from "next/image";
import Cookies from "js-cookie"
import connexion1 from "@/assets/connexion1.jpg"
import { BoxSelect, ImageIcon, Save } from "lucide-react"

export const AssociationComp=({id,association})=>{
    const [changing,setChanging]=useState(false);
    const [status,setStatus]=useState(false);

    const setStatut=()=>{
        setChanging(true);
        getData("affiliation&association="+id).then(r=>{
            setStatus(r.success);
        }).finally(()=>{
            setChanging(false);
        });
    }
    useEffect(()=>{
        setStatut();
    },[]);

    const handleChange=(e)=>{
        setChanging(true);
        postData(e.target.checked?"addAffiliation":"removeAffiliation",{id:id}).then(r=>{
            setStatut();
            
        }).finally(()=>{
            setChanging(false);
        })
    }
    return (
        <Spin spinning={changing}>
            <Checkbox  isSelected={status} onChange={handleChange} size="lg">{association}</Checkbox>
        </Spin>
    )

}

const page=()=>{
    const [feedBack,setFeedBack]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const [isLoadingLogo,setIsLoadingLogo]=useState(false);
    const [logo,setLogo]=useState("");
    const [bg,setBg]=useState("/connexion1.jpg");
    const [associations,setAssociations]=useState([]);
    const [associationsToSelect,setAssociationsToSelect]=useState([]);
    const [associationsSelected,setAssociationsSelected]=useState([]);

    const [isLoadingBg,setIsLoadingBg]=useState(false);
  
    const [api, contextHolder] = notification.useNotification();
    const [profil,setProfil]=useState({});
    const [values,setValues]=useState({
        nom:"",
        rccm:"",
        idnat:""
    });

    let ass=[{}];

    const selectLogo=(e)=>{
        
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load', (event) => {
            const imageProperties = {
            name: file.name,
            type: file.type,
            size: file.size,
            dataURL: event.target.result
            };
            setLogo(imageProperties.dataURL);

            // Ajoutez l'élément image à votre page HTML où vous le souhaitez
        });

        reader.readAsDataURL(file);
    }
    const selectBg=(e)=>{
        
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load', (event) => {
            const imageProperties = {
            name: file.name,
            type: file.type,
            size: file.size,
            dataURL: event.target.result
            };
            setBg(imageProperties.dataURL);

            // Ajoutez l'élément image à votre page HTML où vous le souhaitez
        });

        reader.readAsDataURL(file);
    }
    const saveLogo=(e)=>{
        try
        {
            let pr=JSON.parse(Cookies.get("profil"));
        }catch(e) {
            let pr={}
        }
        let fichier=document.querySelector("#logo");
        const formData = new FormData();
        formData.append("add","logo");
        formData.append('file', fichier.files[0]); 
        formData.append('utilisateur',JSON.parse(Cookies.get("profil")).id);
        const options = {
            method: 'POST',
            body: formData,
            // headers: {
            //   // Ajouter les en-têtes nécessaires, par exemple pour spécifier le type de contenu
            //   'Content-Type': 'multipart/form-data'
            // }
        };
        setIsLoadingLogo(true);
        fetch(API_URL, options)
            .then(r=>r.json()).then(response => {
                openNotification();
            })
            .catch(error => {
                // Gérer les erreurs de la requête
                openNotificationError();
            }).finally(()=>{
                setIsLoadingLogo(false);
            })
    }
    const saveBg=(e)=>{
        try
        {
            let pr=JSON.parse(Cookies.get("profil"));
        }catch(e) {
            let pr={}
        }
        let fichier=document.querySelector("#bg");
        const formData = new FormData();
        formData.append("add","bg");
        formData.append('file', fichier.files[0]); 
        formData.append('utilisateur',JSON.parse(Cookies.get("profil")).id);
        const options = {
            method: 'POST',
            body: formData,
            // headers: {
            //   // Ajouter les en-têtes nécessaires, par exemple pour spécifier le type de contenu
            //   'Content-Type': 'multipart/form-data'
            // }
        };
        setIsLoadingBg(true);
        fetch(API_URL, options)
            .then(r=>r.json()).then(response => {
                openNotification();
            })
            .catch(error => {
                // Gérer les erreurs de la requête
                openNotificationError();
            }).finally(()=>{
                setIsLoadingBg(false);
            })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
       
        Modal.confirm({
            title:"Profil",
            content:"Confirmez-vous cette mise à jour ?",
            okText:"Oui, enregistrer",
            cancelText:"Annuler",
            onOk:()=>{
                setIsLoading(true);
                let form=Object.fromEntries(new FormData(e.target));
               
                updateData("profil",form).then(r=>{
                    if(r.success)
                    {
                        openNotification();
    
                    }else
                    {
                        openNotificationError();
                    }
                }).catch(r=>{
                    openNotificationError();
                }).finally(()=>setIsLoading(false));
                    
            }
        })
    }
    const getAssociationAffiliees=(u)=>{
        getData("getAssociationsaffiliees&id="+u).then(r=>{
            // setAssociationsSelected(r.data[0]);
            console.log(r.data[0]);
        })
    }
    const getAssociations=async() => {
        await getData("associations").then(r=>{
            setAssociations(r.data);

        })
    }
    useEffect(()=>{
        getAssociations();
        getData("propreProfil")
        .then(r=>{
            setValues({nom:r.data.nom,rccm:r.data.rccm,idnat:r.data.idnat});
            setProfil(r.data);
            getAssociationAffiliees(r.data.id);
        })
        .catch(e=>{
            
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
    const handleSubmitAssociation=(e)=>{
        e.preventDefault();
        let f=Object.fromEntries(new FormData(e.target));
        setIsLoading(true);
       postData("associationsaffiliees",f).then(r=>{
        if(r.success)
        {
            openNotification();
        }else
        {
            openNotificationError();
           
        }
       }).catch(err=>{
            openNotificationError();
           
       }).finally(()=>{
        setIsLoading(false);
       })
    }

    const selectAssociation=(a)=>{
        let ass=[...associationsSelected,a];
        setAssociationsSelected(ass);
        console.log(associations);
       console.log(a);
       console.log(associations.find(a=>{return a.id==a})).association;
    }

  return (
    <>
    {contextHolder}
    <LayoutDashboardMain showNavigation navigationBar="Information">
            <LayoutDashboard titre="IDENTITE " titreIcone={<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#1C274C"></path> <path d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z" fill="#1C274C"></path> <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z" fill="#1C274C"></path> </g></svg>}>
               
                    <div className={ " flex flex-col gap-4"}>
                        <div className="flex flex-row gap-3">
                                Type compte : {profil.typecompte==="E"?"Entreprise":"Personnel"}
                            </div>
                        <div className="flex flex-row gap-3">
                                Type Abonnement : {profil.typeabonnement}
                            </div>
                            <hr />
                        <div className="flex lg:flex-row flex-col-reverse gap-7 w-full">
                            <div className="flex flex-col gap-4 w-[220px] justify-center items-center bg-gray-200 rounded-md">
                                Logo / Photo de profil
                                <Button color="success" onClick={()=>{
                                    document.getElementById("logo").click(); 
                                }}><Upload /> Uploader</Button>
                                {
                                    (logo!=="") && 
                                    <div className=" pb-3 border-t flex flex-col gap-4 w-[220px] justify-center items-center bg-gray-200 rounded-md">
                                        <Image isZoomed width="200" height="200" src={logo} />
                                        <div className="flex gap-3 justify-center items-center">
                                            <Button isLoading={isLoadingLogo} color="primary" variant="light" onClick={saveLogo}>Enregistrer</Button>
                                            <Button color="primary" variant="light" onClick={()=>setLogo("")}>Annuler</Button>
                                        </div>
                                    </div>
                                }
                                {
                                    (profil?.logo!=="" && logo==="") && 
                                    <div className=" pb-3 border-t flex flex-col gap-4 w-[220px] justify-center items-center bg-gray-200 rounded-md">
                                        <Image isZoomed width="200" height="200" src={`${BACKEND_URL}${profil?.logo}`} />
                                    </div>
                                }
                            </div>
                            <form onSubmit={handleSubmit} className="flex-1">
                                <input onChange={selectLogo} id="logo" type="file" className="hidden" name="photo" />
                                <input  type="text" className="hidden" name="add" value="test" />
                                <div className="flex-1 gap-2 flex flex-col">
                                    <div className="flex flex-row gap-3">
                                            <Input name="nom" type="text" label="Nom" isRequired value={values.nom} onChange={(e)=>{
                                                setValues({...values, nom:e.target.value});
                                            }} />
                                        </div>
                                    <div className="flex flex-row gap-3">
                                            <Input name="rccm" type="text" label="RCCM" isRequired value={values.rccm} onChange={(e)=>{setValues({...values,rccm:e.target.value})}}  />
                                        </div>
                                    <div className="flex flex-row gap-3">
                                            <Input name="idnat" type="text" label="IDNAT" isRequired value={values.idnat} onChange={(e)=>{setValues({...values,idnat:e.target.value})}}  />
                                        </div>
                                    <div className="items-center text-center">
                                        <Button color="primary" type="submit">Mettre à jour</Button>
                                        </div>
                                </div>
                            </form>
                        </div>
                    </div>
               
            </LayoutDashboard>
            <LayoutDashboard titre="ASSOCIATIONS AFFILIEES " titreIcone={<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#1C274C"></path> <path d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z" fill="#1C274C"></path> <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z" fill="#1C274C"></path> </g></svg>}>
                    <div>
                        <form onSubmit={handleSubmitAssociation}>
                            <div className="flex flex-col justify-center items-center gap-4">
                                {/* <Select onChange={(e)=>{
                                   selectAssociation(e.target.value)
                                }} label="Selectionner l'association" className="max-w-[340px] h-12">
                                {
                                    associations?.map((a,i)=>{
                                        return( 
                                                <SelectItem key={a.id} value={a.id}>{a?.association}</SelectItem>
                                                
                                                )
                                            })
                                }
                                </Select> */}
                                <div>
                                    Cochez les associations auxquelles vous appartenez
                                </div>
                                <div className="flex flex-row gap-7 flex-wrap">
                                    {
                                        associations?.map((ass,i)=>{
                                            return(<AssociationComp key={i} id={ass.id} association={ass.association} />)
                                        })
                                    }
                                </div>
                            </div>
                            
                            {/* <div className="flex items-center justify-center mt-7">
                                 <Button isLoading={isLoading} color="primary" type="submit">Enregistrer</Button>       
                            </div> */}
                        </form>
                    </div>
            </LayoutDashboard>
            <LayoutDashboard titre="VOTRE IMAGE DU JOURNAL" titreIcone={<ImageIcon />}>
                    <div>
                        <div className="mb-3 flex justify-between">
                            <Button startContent={<BoxSelect />} onClick={()=>{
                                    document.getElementById("bg").click(); 
                                }}>Selectionner</Button>
                            <input  onChange={selectBg} type="file" name="bg" id="bg" className="hidden" />
                            <div className="flex gap-4">
                            <Button onPress={()=>saveBg()} isLoading={isLoadingBg} variant="flat" color="success">
                                <Save /> Enregistrer
                            </Button>
                            <Button color="primary" variant="light" onClick={()=>setLogo("")}>Annuler</Button>
                            </div>
                        </div>
                       <img src={bg} className="w-full h-[250px] border rounded-md" />
                    </div>
            </LayoutDashboard>
    </LayoutDashboardMain> 
    </>
  )
}
export default page
