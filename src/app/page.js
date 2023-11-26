"use client"
import Image from 'next/image'
import _Home from "@/app/home/_Home";
import {NextUIProvider} from "@nextui-org/react";
import { ParallaxProvider } from 'react-scroll-parallax';

export default function Home() {
  return (
   
    <NextUIProvider>
      <main className="min-h-[450px]">
        <_Home />
      </main>
    </NextUIProvider>
    
  )
}
