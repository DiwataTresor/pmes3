"use client"
import { useState, useEffect } from "react"
import Layout from "@/app/components/layouts/LayoutClient"
import { getSecteurBySlug } from "@/app/utils/data";
import { GlobalOutlined, HomeOutlined } from "@ant-design/icons"
import Link from "next/link"
import { Button } from "@nextui-org/react"
import { MailIcon } from "@/app/components/icons/MailIcon"
import Entreprise from "@/app/components/profil/Entreprise"
import Section from "@/app/components/section/Section"
import Section2 from "@/app/components/section/Section2"
import { usePathname } from "next/navigation";
import { getData } from "@/app/fcts/helper";
const Liste = () => {
    const pathname = usePathname();
    const liste = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    return (
        <div className="flex justify-center flex-wrap">
            {/* <div>{pathname.charAt(pathname.length-1)}</div> */}
            {
                liste.map((lettre) => (

                    <>
                        {
                            pathname.charAt(pathname.length - 1) == lettre ?
                                <div className="w-[30px] h-[30px] bg-blue-800 rounded-md text-white mx-1 my-2 text-sm flex items-center justify-center">
                                    {lettre.toUpperCase()}
                                </div> :
                                <Link href={`/secteurbtb/sorted/${lettre}`} className="">
                                    <div className="w-[30px] h-[30px] bg-blue-500 rounded-md text-white mx-1 my-2 text-sm flex items-center justify-center">
                                        {lettre.toUpperCase()}
                                    </div>
                                </Link>
                        }
                    </>
                ))
            }
        </div>
    )
}
const Detail = () => {
    return (
        <div>
            1
        </div>
    )
}
const page = ({ params }) => {
    const [profils, setProfils] = useState([])
    const pathname = usePathname();
    useEffect(() => {

        let letter = pathname.charAt(pathname.length - 1);
        getData(`profilsByLetter&letter=${letter}`).then(r => {
            setProfils(r.data);
        });
    }, []);

    return (
        <Layout
            hideHeader={true}
        >
            <Liste />
            <div className="px-[0%] mb-9 pb-9 bg-slate-100 h-full">
                <div className="flex flex-col justify-center mt-8">
                    <div className="flex flex-row gap-2 justify-center items-center">
                        <svg width="41px" height="41px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M12.5007 7.40986V21.9999H4.0807C2.9207 21.9999 1.9707 21.0699 1.9707 19.9299V5.08986C1.9707 2.46986 3.9307 1.27986 6.3207 2.44986L10.7507 4.63986C11.7107 5.10986 12.5007 6.35986 12.5007 7.40986Z" fill="#292D32"></path> <path d="M8.97 9.75H5.5C5.09 9.75 4.75 9.41 4.75 9C4.75 8.59 5.09 8.25 5.5 8.25H8.97C9.38 8.25 9.72 8.59 9.72 9C9.72 9.41 9.39 9.75 8.97 9.75Z" fill="#292D32"></path> <path d="M8.97 13.75H5.5C5.09 13.75 4.75 13.41 4.75 13C4.75 12.59 5.09 12.25 5.5 12.25H8.97C9.38 12.25 9.72 12.59 9.72 13C9.72 13.41 9.39 13.75 8.97 13.75Z" fill="#292D32"></path> <path opacity="0.6" d="M22 15.0499V19.4999C22 20.8799 20.88 21.9999 19.5 21.9999H12.5V10.4199L12.97 10.5199L17.01 11.4199L17.49 11.5299L19.53 11.9899C20.02 12.0899 20.47 12.2599 20.86 12.5099C20.86 12.5199 20.87 12.5199 20.87 12.5199C20.97 12.5899 21.07 12.6699 21.16 12.7599C21.62 13.2199 21.92 13.8899 21.99 14.8699C21.99 14.9299 22 14.9899 22 15.0499Z" fill="#292D32"></path> <path d="M12.5 10.4199V16.4199C12.96 17.0299 13.68 17.4199 14.5 17.4199C15.89 17.4199 17.01 16.2999 17.01 14.9199V11.4299L12.97 10.5299L12.5 10.4199Z" fill="#292D32"></path> <path d="M21.9898 14.8699C21.9198 13.8899 21.6198 13.2199 21.1598 12.7599C21.0698 12.6699 20.9698 12.5899 20.8698 12.5199C20.8698 12.5199 20.8598 12.5199 20.8598 12.5099C20.4698 12.2599 20.0198 12.0899 19.5298 11.9899L17.4898 11.5299L17.0098 11.4199V14.9199C17.0098 16.2899 18.1198 17.4199 19.5098 17.4199C20.8498 17.4199 21.9198 16.3699 21.9998 15.0599V15.0499C21.9998 14.9899 21.9898 14.9299 21.9898 14.8699Z" fill="#292D32"></path> </g></svg>
                        <span className="font-bold">
                            {profils[0]?.utilisateurNom === null ? <div className="mt-10">Aucune entreprise trouvée</div> :
                                <div>{profils.length} entreprise(s) trouvée(s)</div>
                                // secteurs?.length+" entreprise"+secteurs?.length>1 && "s  trouvée "+secteurs?.length>1 && "s"
                            }

                        </span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {/* {
                            profils.length<1 && <div>Aucune entreprise trouvée</div>
                        } */}
                        {
                            profils?.map(entreprise => {
                                return (
                                    <Entreprise detail={entreprise} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {
                profils?.length > 0 && <Liste />
            }

        </Layout>
    )
}
export default page