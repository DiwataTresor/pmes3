"use client"
import { useEffect, useState } from "react"
import Layout from "@/app/components/layouts/LayoutClient"
import { Avatar, Tabs, Tab, Chip, Divider, Skeleton, Card, Image, Button, Kbd } from "@nextui-org/react"
import { postData, getData, API_URL, BACKEND_URL, VisiteSiteOfUserFromLink } from "@/app/fcts/helper"
import moment from "moment"
import 'react-medium-image-zoom/dist/styles.css';
import Section from "@/app/components/section/Section"
import Section2 from "@/app/components/section/Section2"
import { nl2br } from "react-js-nl2br"
import { Calendar } from "lucide-react"



const page = ({ params }) => {
  const [profil, setProfil] = useState(null);
  const [actualite, setActualite] = useState(null)
  const getActualites = async (utilisateur) => {
    await getData("actualites&id=" + utilisateur).then(r => {
      setActualites(r.data);

    });
  }

  useEffect(() => {
    let slug = params.slug;
    getData("adminActualiteBySlug&slug=" + slug,)
      .then(r => {
        setActualite(r.data);
      });

  }, []);
  return (
    <Layout hideHeader={true}>
      <div className="w-full mt-4">
        <Section titre={"Actualité"}>
          <div className="flex flex-col gap-3">
            {actualite !== null ?
              <div className="flex flex-row gap-4">
                <Image isZoomed src={BACKEND_URL + actualite.img} width={"100%"} height={"400"} />
                <div className="">
                  <div className="font-bold mb-5 text-lg text-start border-b  text-black uppercase rounded-lg py-2">
                    {actualite == null ? <span className="font-extrabold uppercase">Actualité</span> : actualite.titre}
                  </div>
                  <div className=" items-end">
                    <div className="flex gap-3 text-sm items-end justify-end pr-16">
                      <Calendar size={15} /> 
                      {moment(actualite?.datePub).format("DD/MM/YYYY")}
                    </div>
                    <div className="mt-6">{nl2br(actualite?.contenu)}</div>
                  </div>
                </div> 
              </div>:
                <div className="space-y-3 w-[70%]">
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
              }
            </div>
        </Section>
      </div>
    </Layout >
  )
}
export default page