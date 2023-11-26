import { inter, lora, poiret, pignon, poppins, michroma } from "../style/fonts";
import {CalendarOutlined} from "@ant-design/icons"
import {Divider} from "antd"
import {Chip} from "@nextui-org/react"
const Card=({dt,img,titre,description,lieu})=>{
    return(
        <div className="bg-white w-full h-[350px] px-4 py-3 mb-[30px] flex flex-row gap-6">
            <div className="bg-white rounded-md shadow-md mb-[20px] w-[40%] h-[300px] relative mt-8" style={{backgroundImage:`url(${img})`, backgroundSize:"cover"}}>
                <h1 className="w-[120px] rounded-md text-white font-bold -mt-[30px] ml-[20px] absolute bg-red-600 h-[100px] flex flex-col gap-3 items-center justify-center" style={poppins.style}>
                    <CalendarOutlined />
                    <div className="text-center text-sm">{"Du 10/11/2023"}</div>
                    <div className="text-center text-sm">{"Au 23/11/2023"}</div>
                </h1>
                <h3 className="text-black flex  mx-[0%] h-[70px]  px-2 bg-white bg-opacity-50 bottom-[0%] absolute w-[100%] justify-center items-center text-md text-center">{titre}</h3>
            </div>

            <div className="relative w-[60%] flex-1 h-[320px]">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex items-end justify-end">
                        <Chip color="primary" size="sm">Publié le 08/10/2023</Chip>
                    </div>
                    <div className="text-md pt-[50px]">{description?.substr(0,200)}</div>
                    <Divider />
                    <div className="flex flex-row  justify-between">
                        <div className="flex flex-row gap-2 justify-start items-start text-md">
                            <svg width="25px" height="25px" strokeWidth="1.4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fb6a09"><path d="M12 19a7 7 0 100-14 7 7 0 000 14zM12 19v2M5 12H3M12 5V3M19 12h2" stroke="#fb6a09" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <span>
                                LIEU : 
                            </span>
                            {lieu}
                        </div>
                        <div>
                            <span className="bg-slate-300 bg-opacity-75 rounded-full px-4 py-2 flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" strokeWidth="1.4" viewBox="0 0 24 24" color="#0d0c0d"><path stroke="#0d0c0d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" d="M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path><path stroke="#0d0c0d" strokeWidth="1.4" d="m15.5 6.5-7 4M8.5 13.5l7 4"></path></svg>                                
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card