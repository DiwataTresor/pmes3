"use client"
import Layout from "@/app/components/layouts/LayoutDashboard"
import MainLayout from "@/app/components/layouts/LayoutDashboardMain"
const LoadingPage=()=>{
    return(
        <MainLayout hideNavigationBar classname="flex flex-col justify-center items-center h-screen">
            <div className="my-auto text-white min-h-[400px] flex flex-row justify-center items-center">Traitement en cours...</div>
        </MainLayout>
    )
}
export default LoadingPage