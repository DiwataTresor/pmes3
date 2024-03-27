"use client"
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import logo from "./../../../assets/logo.png"
import styles from './footer.module.css'
import { bgPrimary, bgSecondary, colorSecondary, bgThird } from '@/app/style/global'
import { bgSecondaryColor } from '../../style/global';
import { Alert, Spin,notification } from 'antd'
import { Toaster, toast } from 'sonner'
import { getData, postData } from '@/app/fcts/helper'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { Button } from '@nextui-org/react'

const soulignement = "w-[70px] h-1 bg-blue-300 mb-10";
const titre = `text-[${bgSecondary}]`;



const Footer = () => {
  const [spinningNewsletters, setSpinningNewsletters] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [partenanires,setPartenaires] = useState([])
  const [contact,setContact] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const handleNewsletters = (e) => {
    e.preventDefault();
    setFeedback("");
    setSpinningNewsletters(true);
    let f = Object.fromEntries(new FormData(e.target));
    postData("inscriptionNewsletters", f).then(r => {
      console.log(r);
      r.success ?
        setFeedback(<Alert type='success' showIcon message="Inscription bien faite" />) :
        setFeedback(<Alert showIcon type='error' message={r.msg} />)
    }).catch(err => {
      console.log(err);
      setFeedback(<Alert showIcon type='error' message="Echec d'inscription, veuillez reessayer" />)
    }).finally(() => {
      setSpinningNewsletters(false)
    })
  }
  useEffect(() => {
    if(Cookies.get("cookiesValidated")=="Y")
    {
     
    }else
    {
      api.open({
        key:"1",
        message: "",
        closeIcon:false,
        description:<div className='text-justify'>
          Ce site utilise des Cookies et vous donne le contrôle sur ce que vous souhaitez activer. <br />
          En cliquant sur "Accepter tous les cookies", vous accepter le stockage de cookies sur votre navigateur enfin d'ameliorer votre experience
          <p className='flex items-center justify-center gap-4 mt-3'>
            <Button onPress={()=>{
              Cookies.set("cookiesValidated","Y");
              // notification.destroy("1");
              api.destroy("1")
            }} color='primary' variant='solid'>Tout accepter</Button>
            <Button color='default' variant='flat' onPress={()=>{api.destroy("1")}}>Tout refuser</Button>
          </p>
          </div>,
        duration:0,placement:"bottomLeft"
      })
    }
   
    getData("partenaires").then((data) => {
      setPartenaires(data.data);
    });
    getData("contact").then((data) => {
     setContact(data.data);
    })

  }, [])
  
  return (
    <>
      <Toaster />
      {contextHolder}
      <div className="pt-10 w-full overflow-x-hidden bg-blue-500">
        
        {/* <div className=' flex flex-col md:flex-col lg:flex-row justify-between px-10 md:px-60 lg:px-10 gap-10 '>
          <div className="border-l-0 border-white text-white pl-2 md:pl-6 lg-pl-6">
            <h2 className="text-xl md:text-3xl lg:text-3xl">Nos partenaires</h2>
            <div className="text-sm flex gap-3">
              {
                
              }
            </div>
          </div>
          <div>

            <Spin spinning={spinningNewsletters}>
              <form onSubmit={handleNewsletters}>
                <div className="border flex flex-row rounded-tl-lg rounded-br-lg flex-wrap overflow-hidden" style={{ borderColor: bgSecondary }}>
                  <input required name='mailAdress' type="email" className={`text-black w-[120px] md:w-[120px] rounded-none lg:w-[300px] outline-none flex-1 text-sm pl-4 ${colorSecondary}`} placeholder="Votre adresse Email" />
                  <button type="submit" className={`${bgSecondaryColor} h-[40px] text-white px-2`}>S'INSCRIRE</button>
                </div>
              </form>
            </Spin>
            <div className='mt-3'>
              {feedback}
            </div>
          </div>
        </div> */}
        <div className=' flex flex-col md:flex-col lg:flex-row justify-between px-10 md:px-60 lg:px-60 gap-10 '>
          <div className="border-l-2 border-white text-white pl-2 md:pl-6 lg-pl-6">
            <h2 className="text-xl md:text-3xl lg:text-3xl">Lettre d'information</h2>
            <p className="text-sm">Souscrivez-vous pour obtenir des mises à jour et des informations en temps utiles</p>
          </div>
          <div>

            <Spin spinning={spinningNewsletters}>
              <form onSubmit={handleNewsletters}>
                <div className="border flex flex-row rounded-tl-lg rounded-br-lg flex-wrap overflow-hidden" style={{ borderColor: bgSecondary }}>
                  <input required name='mailAdress' type="email" className={`text-black w-[120px] md:w-[120px] rounded-none lg:w-[300px] outline-none flex-1 text-sm pl-4 ${colorSecondary}`} placeholder="Votre adresse Email" />
                  <button type="submit" className={`${bgSecondaryColor} h-[40px] text-white px-2`}>S'INSCRIRE</button>
                </div>
              </form>
            </Spin>
            <div className='mt-3'>
              {feedback}
            </div>
          </div>
        </div>
        <div className="pt-5">

          <div className="px-[10px] pb-[25px] md:px-4 lg:px-[150px] flex lg:flex-row justify-between flex-col text-[12px] bg-blue-600" style={{ backgroundColor: "" }}>
            <div className={styles.colone + " max-w-[320px] mr-[40px] xs:w-4/4 flex flex-col gap-4  items-start"}>
              <Image src={"/logo_sans_fond.png"} width={200} height={80} alt='' />
              <p className="text-justify text-white text-[11px]">
                Une disposition incontournable, trouvez beaucoup plus des coordonées professionnelles et promotionnellres. Annonces, Actualités, Appel d'offre, Achat en ligne, Evènements, Agenda des pmes, ...
              </p>
              <div>
                <h2 className="font-bold mb-4 text-xl text-start items-start">Retrouvez-nous sur : </h2>
                <div className="flex flex-row gap-2">
                  <div className="border rounded-full items-center justify-center border-gray-100 px-2 py-2">
                    <a href={"https://"+contact?.facebook} target='_blank'>
                      <svg width="20px" height="20px" strokeWidth="1.3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M17 2h-3a5 5 0 00-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      </path>
                      </svg>
                    </a>
                  </div>
                  
                  <div className="border rounded-full items-center justify-center border-gray-100 px-2 py-2">
                  <a href={"https://"+contact?.linkedin} target='_blank'>
                    <svg width="20px" height="20px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M21 8v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8a5 5 0 015-5h8a5 5 0 015 5zM7 17v-7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11 17v-3.25M11 10v3.75m0 0c0-3.75 6-3.75 6 0V17M7 7.01l.01-.011" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                   </a>
                  </div>
                  <div className="border rounded-full items-center justify-center border-gray-100 px-2 py-2">
                    <a href={"https://"+contact?.x} target='_blank'>
                    <img src={"/logoX.png"} width={16} height={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.colone + " mr-[25px] xs:4/4"}>
              <h1 className={titre} style={{ color: bgSecondary, fontSize: 18, fontWeight: "bold" }}>Ressources</h1>
              <div className={soulignement} style={{ backgroundColor: bgSecondary }}>&nbsp;</div>
              <div className="mt-3 flex flex-col gap-2">
                <div><a href="/about">A Propos</a></div>
                <div><a href="/secteurbtb">Secteurs B2B</a></div>
                <div><a href="/actualite">Actualites</a></div>
                <div><a href="/infoutile">Infos utiles</a></div>
                <div><a href="/evenement">Evènements</a></div>
              </div>
            </div>
            <div className={styles.colone + " max-w-[300px] mr-[35px] xs:4/4"}>
              <h1 className={titre} style={{ color: bgSecondary, fontSize: 18, fontWeight: "bold" }}>Nous contacter</h1>
              <div className={soulignement} style={{ backgroundColor: bgSecondary }}>&nbsp;</div>
              <div className="mt-5">
                <div className="flex flex-col gap-3">
                  <p className="text-justify">
                    {/* Tombalbay Nr 44-48, Immeuble ACP, 3é étage, Local 49 10004453 Kinshasa Gombe, RD Congo */}
                    {contact?.adresse}
                  </p>
                  <p>
                    {contact?.e_mail}
                  </p>
                  <p>
                  {contact?.telephone} {contact?.telephone2 && ` - ${contact?.telephone2}`}
                  </p>
                </div>

              </div>
            </div>
            <div className={styles.colone + "  w-full lg:w-1/4 xs:4/4"}>
              <h1 className={titre} style={{ color: bgSecondary, fontSize: 18, fontWeight: "bold" }}>Liens utiles</h1>
              <div className={soulignement} style={{ backgroundColor: bgSecondary }}>&nbsp;</div>
              <div className="mt-5">
                <div><a target='_blank' href="http://presidence.cd">http://presidence.cd</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://pme.gouv.cd">http://pme.gouv.cd</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://industrie.gouv.cd">http://industrie.gouv.cd</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://fogec.cd">http://fogec.cd</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://copemeco.cd">http://copemeco.cd</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://fec-rdc.com">http://fec-rdc.com</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://ccikc.com">http://ccikc.com</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://economie.gouv">http://economie.gouv.cd</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://bcc.cd">http://bcc.cd</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://guichetunique.cd">http://guichetunique.cd</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://padmpme.cd">http://padmpme.cd</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://anadec.cd">http://anadec.cd</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://arsp.cd">http://arsp.cd</a></div>
                <div className='flex-wrap'><a className="flex-wrap" target='_blank' href="http://investindrc.cd">http://investindrc.cd</a></div>
              </div>
            </div>

          </div>
        </div>
        <div className="bg-blue-900 text-[10px] text-center text-white border-t-0 py-3 border-white">© 2023, INDEX RDC <sup>TM</sup> OS. Powered By AtonProxy <br /> <Link href="/conditions-utilisation" className='underline'>Conditions générales d'utilisation </Link> | <Link href="/politique-confidentialite" className='underline'>Politique de confidentialité</Link></div>
      </div>
    </>
  )
}

export default Footer
