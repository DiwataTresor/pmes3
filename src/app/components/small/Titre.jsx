import React from 'react'
import Image from "next/image"
import { bgPrimary,bgSecondary } from '@/app/style/global'



const Titre = ({text}) => {
  return (
    <div className="mycontainer">
        <div style={{borderColor:bgSecondary}} className="border-l-[30px]  pl-10 py-2 bg-gray-100 text-blue-400 mb-5 text-start text-2xl">{text}</div>
    </div>
  )
}

export default Titre