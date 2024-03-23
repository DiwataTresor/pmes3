import {Card, CardHeader, CardBody, CardFooter,Button,Switch, Image} from "@nextui-org/react"
import {Divider} from "antd"
import {inter, lora, sourceCodePro400, sourceCodePro700,poiret,pignon,michroma,poppins,nunito } from "./../../../app/style/fonts"
import { ArrowRightFromLineIcon } from "lucide-react"
const Section2=({children,titre,titreIcone,center,footer,footerCenter,cl,displayIcon})=>{
    return (
        <div className={`mb-3 ${cl}`}>
            <div className="flex flex-col text-xl mb-1 font-bold   py-0 px-2  border-blue-300">
                <h1 className="w-full py-3 px-2 text-blue-800 items-center justify-center border-l-0 border-indigo-500 flex gap-3">
                    {!titreIcone ?
                    // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    //     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    // </svg>:
                    <>{displayIcon!=false &&  <div className="w-[50px] bg-blue-600 rounded-full h-2 mr-2">&nbsp;</div>} </>:
                    <span className="text-inherit">{titreIcone}</span>
                    }
                    <span className="text-3xl font-semibold"><span className={sourceCodePro400.className}>{titre}</span></span>
                    {/* <div className="w-[50px] bg-blue-600 rounded-full h-4">&nbsp;</div> */}
                </h1>
                <div className="min-h-[100px] py-3 px-3  rounded-bl-md rounded-br-md">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Section2