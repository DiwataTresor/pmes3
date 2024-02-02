import './globals.css'
import { Suspense } from "react"
import { Inter, Poppins, Poiret_One, Nunito,Source_Code_Pro, Source_Sans_3 } from 'next/font/google'
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"

import { isMobile } from "@/app/fcts/helper"
import { FloatButton } from 'antd'
import { ToTopOutlined } from '@ant-design/icons'


const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: "300" })
const poiret = Poiret_One({ subsets: ['latin'], weight: "400" })
const nunito = Nunito({ subsets: ['latin'], weight: "400" })
const sourcecode=Source_Sans_3({subsets: ['latin'], weight: "400" })

export const metadata = {
  title: {
    default:"Index RDC",
    template:"%s - Index RDC"
  },
  description: 'Annuaire des PMES en RDC',
  icons: {
    icon: '/logo.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" sizes="any" />
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
      </head>

      <body className={sourcecode.className}>
        <div className='w-screen overflow-hidden'>
          <Header />
          <div className="w-full overflow-hidden min-h-[250px] bg-slate-100">
            <Suspense fallback={<div className='flex items-center jsutify-center h-full w-full'>chargement en cours...</div>}>
              {children}
            </Suspense>
          </div>
          <Footer />
          {/* <FloatButton.BackTop  /> */}
        </div>
      </body>

    </html>
  )
}
