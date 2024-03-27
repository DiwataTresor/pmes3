"use client";
import { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import {
  ParallaxProvider,
  ParallaxBanner,
  ParallaxBannerLayer,
} from "react-scroll-parallax";
import Image from "next/image"
import { bgPrimaryColor, myContainer,titrePrincipal } from "@/app/style/global";
import { telephone,email,adresse } from "@/app/utils/helper";
import fond2 from "@/assets/fond2.jpg"
import {colorPrimary,borderSecondary,colorSecondary} from "@/app/style/global"
import Marquee from "react-fast-marquee"
import logo from "@/assets/logo.png"
import Typewriter from 'typewriter-effect';
// import ScrollAnimation from 'react-animate-on-scroll';
import { Input,Divider,Table,Space,Tag } from 'antd';
import Layout from "@/app/components/layouts/LayoutClient"
import {Tabs,Tab} from "@nextui-org/react"
import Section from "@/app/components/section/Section"
import Section2 from "@/app/components/section/Section2"
import { BACKEND_URL, getData } from "../fcts/helper";
import { BookMarked, Bookmark, CalendarCheck, Info, LinkIcon, PaperclipIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { nl2br } from "react-js-nl2br";


export default function page() {
  const [infos,setInfos]=useState([]);
  const [data,setData]=useState([]);
  const [documents,setDocuments]=useState([]);
  const [documentsAll,setDocumentsAll]=useState([]);

  useEffect(() => {
   getData("infoutile").then((r) => {
    setInfos(r?.data);
    let newD=[];
    r.data?.filter(info=>(info?.fichier==null))?.forEach(i=>{
      newD.push( {
        key: i?.id,
        objet: i?.titre,
        datepub: `Publié le ${moment(i?.dateCreation).format("DD/MM/YYYY")}`,
        concerne: i?.concerne,
       
      })
    });
    
    let newDocumentsData=[];
    r.data?.filter(info=>(info?.fichier!==null))?.forEach(i=>{
      newDocumentsData.push( {
        key: i?.id,
        objet: i?.titre,
        datepub: `Publié le ${moment(i?.dateCreation).format("DD/MM/YYYY")}`,
        concerne: i?.concerne,
        fichier:i?.fichier  
      })
    });
    
    let newDocumentsDataAll=[];
    r.data?.forEach(i=>{
      newDocumentsDataAll.push( {
        key: i?.id,
        objet: i?.titre,
        datepub: `Publié le ${moment(i?.dateCreation).format("DD/MM/YYYY")}`,
        concerne: i?.concerne,
        fichier:i?.fichier  
      })
    });
    setData(newD);
    setDocuments(newDocumentsData);
    setDocumentsAll(newDocumentsDataAll);
   })
  }, [])

  useEffect(() => {
    console.log(infos);
  },[infos])
  
  // TABLE
  const columns = [
    {
      title: 'Objet',
      dataIndex: 'objet',
      key: 'name',
      className: 'flex-1',
      render: (text) => <a className="font-bold flex gap-2 items-center "><Bookmark strokeWidth={1} /> {text}</a>,
    },
    {
      title: 'Concerne',
      dataIndex: 'concerne',
      key: 'age',
      className: 'bg-slate-200',
      render:(d)=>(
        <div className="font-semibold">
          {d}
        </div>
      )
    },
    {
      title: 'Date publication',
      dataIndex: 'datepub',
      key: 'address',
      render:(d,record)=>(
        <span className="text-sm italic flex gap-2 items-center"><CalendarCheck strokeWidth={1} color="orange" size={16} /> {d}</span>
      )
    },
    
    
  ];
  const columnsDocument = [
    {
      title: 'Objet',
      dataIndex: 'objet',
      key: 'name',
      className:"flex-1",
      render: (text) => <a className="font-bold flex gap-2 items-center flex-1"><Bookmark strokeWidth={1} /> {text}</a>,
    },
    {
      title: 'Concerne',
      dataIndex: 'concerne',
      key: 'age',
      className: 'bg-slate-100',
      render:(d)=>(
        <div className="font-normal">
          {d}
        </div>
      )
    },
    {
      title: 'Date publication',
      dataIndex: 'datepub',
      key: 'address',
      render:(d)=>(
        <span className="text-sm italic flex gap-2 items-center"><CalendarCheck strokeWidth={1} color="orange" size={16} /> {d}</span>
      )
    },
    {
      title: 'Option',
      dataIndex: 'datepub',
      key: 'address',
      render:(d,record)=>(
        <a target="_blank" href={BACKEND_URL+record.fichier}><span className="text-sm italic flex gap-2 items-center"><LinkIcon strokeWidth={1} color="blue" size={16} /> Telecharger </span></a>
      )
    },
    
    
  ];
  const columnsAll = [
    {
      title: 'Objet',
      dataIndex: 'objet',
      key: 'name',
      className:"flex-1 w-[600px]",
      render: (text) => <a className="font-bold flex gap-2 items-center flex-1"><Bookmark strokeWidth={1} /> {text}</a>,
    },
    {
      title: 'Concerne',
      dataIndex: 'concerne',
      key: 'age',
      className: 'bg-slate-100',
      render:(d)=>(
        <div className="font-normal">
          {d}
        </div>
      )
    },
    {
      title: 'Date publication',
      dataIndex: 'datepub',
      key: 'address',
      render:(d)=>(
        <span className="text-sm italic flex gap-2 items-center"><CalendarCheck strokeWidth={1} color="orange" size={16} /> {d}</span>
      )
    },
    {
      title: 'Option',
      dataIndex: 'datepub',
      key: 'address',
      render:(d,record)=>(
        record?.fichier!==null && <div><Link className="flex items-start justify-start underline gap-3 text-sm" href={BACKEND_URL+record?.fichier} target="_blank"><PaperclipIcon size={17} /> Télécharger</Link></div>
        // <a target="_blank" href={BACKEND_URL+record.fichier}><span className="text-sm italic flex gap-2 items-center"><LinkIcon strokeWidth={1} color="blue" size={16} /> Telecharger </span></a>
      )
    },
    
    
  ];


  // TABLE
  return (
    <Layout header={
        <ParallaxProvider>
            <ParallaxBanner style={{ aspectRatio: "7 / 1" }}>
                <ParallaxBannerLayer
                    speed={-20}
                    image="https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    
                />
                <ParallaxBannerLayer speed={-4}>
                    <div
                    className={
                        myContainer +
                        " flex flex-col items-center justify-center text-white pt-[40px]"
                    }
                    >
                        <h1 className={`text-[30px] `}>Infos et documents utiles</h1>
                        <h1 className="text-[14px] border border-white rounded-full px-3 py-1 mt-6">{"Accueil >> plans"}</h1>
                    
                    </div>
                </ParallaxBannerLayer>
            </ParallaxBanner>
        </ParallaxProvider>
    }>

      <Section2 cl="mt-2" titre="Decouvez des informations utiles">
          <div className="flex flex-wrap gap-4 justify-between pt-0 w-full bg-white py-3">
            <div className="items-center justify-center content-center w-full py-4">
              {/* <Divider /> */}
              <Tabs key={1} radius={"full"} color="danger" aria-label="Tabs radius" className="itens-center justify-center flex">
                <Tab key="photos" title="infos utiles">
                    <div className="w-full ">
                      {
                        infos?.length<1?
                        <div className="text-lg text-center w-full mt-5">Aucune information trouvée pour l'instant</div>:
                        
                        <div className="mt-3">
                          
                          {/* {
                            infos?.filter(info=>(info?.fichier==null))?.map((info,index)=>{
                            return (
                              <tr>
                                  <td><Info size={18} />{info?.titre}</td>
                                  <td className="font-thin text-start mt-3 text-medium">Concerne : {nl2br(info?.concerne)}</td>
                                  <td className="text-sm italic border-b-0 mb-4 text-gray-700 text-center">Publié le {moment(info?.dateCreation).format("DD/MM/YYYY HH:mm:SS")}</td>
                                  <td className="font-thin text-medium line-clamp-6 text-justify">{nl2br(info?.description)}</td>
                                  <td><Link href={`/infoutile/${info.id}`} className="text-sm text-center items-center justify-center flex rounded-sm py-2 px-2">Tout lire</Link></td>
                              </tr>
                              )
                            })
                          } */}
                          <Table columns={columns} dataSource={data} className="w-full font-normal" pagination={{
                            position:"bottomRight"
                          }} />
                          
                        </div>
                      }
                    </div>
                </Tab>
                <Tab key="music" title="Documents">
                  <div className="w-full ">
                      {
                        infos?.length<1?
                        <div className="text-lg text-center w-full mt-5">Aucune information trouvée pour l'instant</div>:
                        
                        <div className="mt-3">
                          <Table columns={columnsDocument} dataSource={documents} className="w-full font-normal" sticky={true} />
                        </div>
                      }
                    </div>
                </Tab>
                <Tab key="all" title="Tous les infos">
                  <div className="w-full ">
                      {
                        infos?.length<1?
                        <div className="text-lg text-center w-full mt-5">Aucune information trouvée pour l'instant</div>:
                        
                        <div className="mt-3">
                          {/* {
                            infos?.map((info,index)=>{
                            return (
                              <div key={index} className="border-b-0  mb-5 shadow-sm px-3 overflow-hidden">
                                <div className="text-center border-b-0 py-3 flex justify-between">
                                  <div className="text-blue-600 flex gap-3 items-center underline flex-1"><Info size={18} />{info?.titre}</div>
                                  <div className="font-thin text-end text-medium">Concerne : {info?.concerne}</div>
                                </div>
                                <div className="px-3 border-0 rounded-md py-3">
                                  <p className="text-sm italic border-b-0 mb-4 text-gray-700 text-center">Publié le {moment(info?.dateCreation).format("DD/MM/YYYY HH:mm:SS")}</p>
                                  {info?.fichier!==null && <div><Link className="flex items-start justify-start text-medium underline gap-3" href={BACKEND_URL+info?.fichier} target="_blank"><PaperclipIcon size={17} /> Télécharger</Link></div>}
                                  <div className="font-thin text-medium line-clamp-6 text-justify" dangerouslySetInnerHTML={{__html:info?.description}} />
                                </div>
                              </div>)
                            })
                          } */}
                          <Table columns={columnsAll} dataSource={documentsAll} className="w-full font-normal" sticky={true}  />
                        </div>
                      }
                    </div>
                </Tab>
              </Tabs>
            </div>
            
          </div>
      </Section2>
    </Layout>
  );
}
