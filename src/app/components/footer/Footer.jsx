"use client"
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import logo from "./../../../assets/logo.png"
import styles from './footer.module.css'
import { bgPrimary, bgSecondary, colorSecondary, bgThird } from '@/app/style/global'
import { bgSecondaryColor } from '../../style/global';
import { Alert, Spin } from 'antd'
import { Toaster, toast } from 'sonner'
import { postData } from '@/app/fcts/helper'

const soulignement = "w-[70px] h-1 bg-blue-300 mb-10";
const titre = `text-[${bgSecondary}]`;



const Footer = () => {
  const [spinningNewsletters, setSpinningNewsletters] = useState(false);
  const [feedback, setFeedback] = useState("");
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
  return (
    <>
      <Toaster />
      <div className="pt-10 w-full overflow-x-hidden bg-slate-800">
        <div className=' flex flex-col md:flex-col lg:flex-row justify-between px-10 md:px-60 lg:px-60 gap-10 '>
          <div className="border-l-2 border-blue-400 text-blue-400 pl-2 md:pl-6 lg-pl-6">
            <h2 className="text-xl md:text-3xl lg:text-3xl">Newsletters</h2>
            <p className="text-sm">Souscrivez-vous pour obtenir des mises à jour et des informations en temps utiles</p>
          </div>
          <div>

            <Spin spinning={spinningNewsletters}>
              <form onSubmit={handleNewsletters}>
                <div className="border flex flex-row rounded-tl-lg rounded-br-lg flex-wrap overflow-hidden" style={{ borderColor: bgSecondary }}>
                  <input required name='mailAdress' type="email" className={`text-black w-[120px] md:w-[120px] lg:w-[300px] outline-none flex-1 text-sm pl-4 ${colorSecondary}`} placeholder="Votre adresse Email" />
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

          <div className="px-[10px] pb-[25px] md:px-4 lg:px-[150px] flex flex-row text-[12px]" style={{ backgroundColor: bgPrimary }}>
            <div className={styles.colone + " max-w-[320px] mr-[40px] xs:w-4/4 flex flex-col gap-4  items-start"}>
              <Image src={logo} width={200} height={80} alt='' />
              <p className="text-justify text-white text-[11px]">
                Une disposition incontournable, trouvez beaucoup plus des coordonées professionnelles et promotionnellres. Annonces, Actualités, Appel d'offre, Achat en ligne, Evènements, Agenda des pmes, ...
              </p>
              <div>
                <h2 className="font-bold mb-4 text-xl text-start items-start">Retrouvez-nous sur : </h2>
                <div className="flex flex-row gap-2">
                  <div className="border rounded-md items-center justify-center border-gray-100 px-2 py-1">
                    <svg width="20px" height="20px" strokeWidth="1.3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M17 2h-3a5 5 0 00-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    </path>
                    </svg>
                  </div>
                  <div className="border rounded-md items-center justify-center border-gray-100 px-2 py-1">
                    <svg width="20px" height="20px" strokeWidth="1.4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M14 12l-3.5 2v-4l3.5 2z" fill="#fff" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 12.707v-1.415c0-2.895 0-4.343.905-5.274.906-.932 2.332-.972 5.183-1.053C9.438 4.927 10.818 4.9 12 4.9c1.181 0 2.561.027 3.912.065 2.851.081 4.277.121 5.182 1.053.906.931.906 2.38.906 5.274v1.415c0 2.896 0 4.343-.905 5.275-.906.931-2.331.972-5.183 1.052-1.35.039-2.73.066-3.912.066-1.181 0-2.561-.027-3.912-.066-2.851-.08-4.277-.12-5.183-1.052C2 17.05 2 15.602 2 12.708z" stroke="#fff" strokeWidth="1.4"></path></svg>
                  </div>
                  <div className="border rounded-md items-center justify-center border-gray-100 px-2 py-1">
                    <svg width="20px" height="20px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M21 8v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8a5 5 0 015-5h8a5 5 0 015 5zM7 17v-7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11 17v-3.25M11 10v3.75m0 0c0-3.75 6-3.75 6 0V17M7 7.01l.01-.011" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </div>
                  <div className="border rounded-md items-center justify-center border-gray-100 px-2 py-1">
                    <svg width="20px" height="20px" strokeWidth="1.4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.colone + " mr-[25px] xs:4/4"}>
              <h1 className={titre} style={{ color: bgSecondary, fontSize: 18, fontWeight: "bold" }}>Ressources</h1>
              <div className={soulignement} style={{ backgroundColor: bgSecondary }}>&nbsp;</div>
              <div className="mt-3 flex flex-col gap-2">
                <div><a href="#">Accueil</a></div>
                <div><a href="#">Réalisations</a></div>
                <div><a href="#">Témoignages</a></div>
                <div><a href="#">Villes commerciales</a></div>
                <div><a href="#">Documentations</a></div>
              </div>
            </div>
            <div className={styles.colone + " max-w-[300px] mr-[35px] xs:4/4"}>
              <h1 className={titre} style={{ color: bgSecondary, fontSize: 18, fontWeight: "bold" }}>Nous contacter</h1>
              <div className={soulignement} style={{ backgroundColor: bgSecondary }}>&nbsp;</div>
              <div className="mt-5">
                <div className="flex flex-col gap-3">
                  <p className="text-justify">
                    Tombalbay Nr 44-48, Immeuble ACP, 3é étage, Local 49 10004453 Kinshasa Gombe, RD Congo
                  </p>
                  <p>
                    contact@pmes.cd
                  </p>
                  <p>
                    +243 899917959
                  </p>
                </div>

              </div>
            </div>
            <div className={styles.colone + "  w-full lg:w-1/4 xs:4/4"}>
              <h1 className={titre} style={{ color: bgSecondary, fontSize: 18, fontWeight: "bold" }}>Liens utiles</h1>
              <div className={soulignement} style={{ backgroundColor: bgSecondary }}>&nbsp;</div>
              <div className="mt-5">
                <div><a href="#">http://exemple.org</a></div>
                <div className='flex-wrap'><a className="flex-wrap" href="#">http://pmes.gouv.cd</a></div>
              </div>
            </div>

          </div>
        </div>
        <div className="bg-blue-900 text-[10px] text-center text-white border-t-0 py-3 border-white">© 2023, INDEX RDC <sup>TM</sup> OS. Powered By AtonProxy <br /> Conditions générales d'utilisation | Politique de confidentialité</div>
      </div>
    </>
  )
}

export default Footer