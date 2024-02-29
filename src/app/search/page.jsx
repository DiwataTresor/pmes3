"use client"
import {useState,useEffect} from "react"
import {useRouter,usePathname,useSearchParams} from "next/navigation"
import Layout from "@/app/components/layouts/LayoutClient"
import {Card,CardBody,Divider, Skeleton, skeleton} from "@nextui-org/react"
import {SearchIcon} from "@/app/components/icons/SearchIcon"
import {Spin} from "antd"
import {postData} from "@/app/fcts/helper"
import Entreprise from "@/app/components/profil/Entreprise"
const page=()=>{
    const [resultat,setResultat]=useState([]);
    const [searchDone,setSearchDone]=useState(false);
    const [spinning,setSpinning]=useState(false);
    
    const [queryString,setQueryString]=useState('');
    const [urlParams,setUrlParams]=useState({q:"",lieu:"",secteur:""});
    const router=useRouter();
    const params=useSearchParams();
    
       

    const search=async()=>{
        setSearchDone(false);
        let q=params.get("q")?params.get("q"):"";
        let lieu=params.get("lieu")?params.get("lieu"):"";
        let secteur=params.get("secteur")?params.get("secteur"):"";
        await postData("search",{q:q,lieu:lieu,secteur:secteur})
        .then(r=>{
            setSearchDone(true);
            setResultat(r.data);
            setSpinning(false);
            setSearchDone(true);
        }).catch(err=>{
            alert("non");
            setSearchDone(true);
        }).finally(()=>{
            setSearchDone(true)
        })
    }
    useEffect(()=>{
       setUrlParams({
        q:params.get("q"),
        lieu:params.get("lieu")!==''?params.get("lieu"):"",
        secteur:params.get("secteur")!==''?params.get("secteur"):""
       });
      search()

    },[]);

    return(
        <Layout hideHeader>
            <div className="flex flex-col gap-2 justify-center items-center mt-5  px-2">
                <Card className="w-full">
                    <CardBody>
                        <div className="flex gap-4"><SearchIcon /> Recherche : <span className="text-xl font-bold">« {params.get("q")} »</span></div>
                    </CardBody>
                </Card>
                <Card className="w-full mb-4">
                    <CardBody className="bg-slate-100">
                        <div>
                            <div className="flex gap-4 mb-4">
                                Resultat : {searchDone ? resultat?.length+" Trouvé(s)":''}
                            </div>
                            {/* <Divider /> */}
                            {
                                searchDone?
                                    <div>
                                        <Spin spinning={spinning}>
                                            {
                                                resultat?.map((r,i)=>{
                                                    return(
                                                        <div className="border-b mb-3">
                                                            <Entreprise key={i} detail={r} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Spin>
                                    </div>:
                                    <Card className="w-full space-y-5 p-4" radius="lg">
                                        <Skeleton className="rounded-lg">
                                        <div className="h-24 rounded-lg bg-default-300"></div>
                                        </Skeleton>
                                        <div className="space-y-3">
                                        <Skeleton className="w-3/5 rounded-lg">
                                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                        <Skeleton className="w-4/5 rounded-lg">
                                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                        <Skeleton className="w-2/5 rounded-lg">  
                                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                        </Skeleton>
                                        </div>
                                    </Card>
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
        </Layout>
    )
}
export default page