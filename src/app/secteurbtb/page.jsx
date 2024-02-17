"use client";
import { useState, useEffect } from "react";
import { Parallax } from "react-scroll-parallax";
import {
  ParallaxProvider,
  ParallaxBanner,
  ParallaxBannerLayer,
} from "react-scroll-parallax";

import { myContainer, titrePrincipal } from "@/app/style/global";
import { getSecteurs } from "@/app/utils/data"
import { Button, Badge, Image, Avatar } from "@nextui-org/react"
import Link from "next/link"
import { Divider, Popover } from "antd"
import Layout from "@/app/components/layouts/LayoutClient"
import LayoutDashboard from "@/app/components/layouts/LayoutDashboard"
import { Plus } from "@/app/components/icons/Plus"
import { AppstoreOutlined } from "@ant-design/icons"
import Section from "@/app/components/section/Section2"
import Section2 from "@/app/components/section/Section"
import { LucideSortDesc } from "lucide-react";
import { BACKEND_URL, getData } from "../fcts/helper";


export default function Component() {
  const [secteurs, setSecteurs] = useState([]);

  useEffect(() => {
    getSecteurs().then(r => setSecteurs(r.data));
  }, [])
  const Svg = () => {
    return (
      <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 7L4 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path opacity="0.7" d="M15 12L4 12" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path opacity="0.4" d="M9 17H4" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
    )
  }
  return (
    <div>
      <div className="hidden lg:block">
        <Layout
          header={<ParallaxProvider>
            <ParallaxBanner style={{ aspectRatio: "5 / 1" }}>
              <ParallaxBannerLayer
                speed={-20}
                // image="https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80"

              />
              <ParallaxBannerLayer speed={-4}>
                <div
                  className={
                    myContainer +
                    " flex flex-col items-center justify-center text-white pt-[190px]"
                  }
                >
                  <h1 className={`text-[30px] text-indigo-500`}>Nos secteurs B2B</h1>
                  {/* <h1 className="text-[14px] border border-white rounded-full px-3 py-1 mt-6">{"Accueil >> secteurs B2B"}</h1> */}

                </div>
              </ParallaxBannerLayer>
            </ParallaxBanner>
          </ParallaxProvider>}
        >
          <div className="my-2">&nbsp;</div>
          <p className="mb-5 justify-center items-center flex">
            <Link href={"/secteurbtb/sorted/a"} className="flex gap-3 hover:bg-blue-600 rounded-full px-3 py-3 w-fit bg-blue-400 text-white"><LucideSortDesc /> Profils par ordre alphabetique</Link>
          </p>
          <Section
            titre={"Tous les secteurs B2B"}
          // titreIcone={<AppstoreOutlined style={{ fontSize: 30 }} />}
          >
            <div className="grid grid-cols-4 gap-4 mt-8">
              {
                secteurs?.sort((a, b) => { a.secteur > b.secteur })?.map((s, i) => {
                  return (
                    <div className="" key={i}>
                      <Popover content={s.secteur}>
                      <Link href={`/secteurbtb/${s.slug}`}>
                        {/* <Badge content={s.secteurNb} color={s.secteurNb > 0 ? "success" : "danger"} placement="top-right" className="text-white">
                          <Button variant="flat" color="primary" startContent={<Svg />} className="w-full">
                            {s.secteur}
                          </Button>
                        </Badge> */}
                        <div className="h-[80px] py-4 border hover:border-blue-200 bg-white rounded-md hover:bg-blue-200 hover:text-white flex flex-col justify-between items-start ">
                          <div className="flex justify-between items-center w-full px-3">
                            <div className="text-gray-800 font-bold text-[15px] text-center line-clamp-1">{s.secteur}</div>
                            <div>
                              <Avatar src={BACKEND_URL + s.img} size="md" />
                            </div>
                          </div>
                          <div className=" text-[11px] pl-3 text-start">{s.secteurNb} profil(s)</div>
                        </div>
                      </Link>
                      </Popover>
                    </div>
                  )
                })
              }
            </div>
          </Section>
        </Layout>
      </div>
      <div className="block lg:hidden pt-10">
        <Layout
          header={<ParallaxProvider>
            <ParallaxBanner style={{ aspectRatio: "1 / 1" }}>
              <ParallaxBannerLayer
                speed={-20}
                // image="https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80"

              />
              <ParallaxBannerLayer speed={-4}>
                <div
                  className={
                    " flex flex-col items-center pt-[150px] justify-center text-white"
                  }
                >
                  <h1 className={`text-[30px] mt-[50px]`}>Nos secteurs B2B</h1>
                  <h1 className="text-[14px] border border-white rounded-full px-3 py-1 mt-6">{"Accueil >> secteurs B2B"}</h1>

                </div>
              </ParallaxBannerLayer>
            </ParallaxBanner>
          </ParallaxProvider>}
        >
          <div className="my-2">&nbsp;</div>
          <p>Par ordre alphabetique</p>
          <Section
            titre={"Tous les secteurs B2B"}
            titreIcone={<AppstoreOutlined style={{ fontSize: 30 }} />}
          >
            <div className="flex gap-3 mt-8 flex-wrap">
              {
                secteurs?.sort((a, b) => { a.secteur > b.secteur })?.map((s, i) => {
                  return (
                    <div className="mb-5 flex-1" key={i}>
                      <Link href={`/secteurbtb/${s.slug}`}>
                        <Badge content={s.secteurNb} color={s.secteurNb > 0 ? "success" : "danger"} placement="top-right" className="text-white">
                          <Button variant="flat" color="primary" startContent={<Svg />} className="w-full">
                            {s.secteur}
                          </Button>
                        </Badge>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </Section>
        </Layout>
      </div>
    </div>

  );
}
