"use client"
import {useState,useEffect} from "react"
import {useRouter,usePathname,useSearchParams} from "next/navigation"
import Layout from "@/app/components/layouts/LayoutClient"
import {Card,CardBody,Divider} from "@nextui-org/react"
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
                <Card className="w-full ">
                    <CardBody>
                        <div className="flex gap-4"><SearchIcon /> Recherche : <span className="text-xl font-bold">« {urlParams.q} »</span></div>
                    </CardBody>
                </Card>
                <Card className="w-full ">
                    <CardBody className="bg-slate-100">
                        <div>
                            <div className="flex gap-4 mb-4">
                                Resultat : {searchDone ? resultat?.length+" Trouvé(s)":''}
                            </div>
                            <Divider />

                            <div>
                                <Spin spinning={spinning}>
                                    {
                                        resultat?.map((r,i)=>{
                                            return(
                                                <Entreprise key={i} detail={r} />
                                            )
                                        })
                                    }
                                </Spin>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </Layout>
    )
}
export default page