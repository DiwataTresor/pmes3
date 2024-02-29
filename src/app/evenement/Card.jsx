import { inter, lora, poiret, pignon, poppins, michroma } from "../style/fonts";
import { CalendarOutlined } from "@ant-design/icons"
import { Divider } from "antd"
import { Chip } from "@nextui-org/react"
import { Image } from "@nextui-org/react";
import { BACKEND_URL } from "../fcts/helper";
import { CalendarPlusIcon, LocateFixedIcon, MapIcon, MapPinIcon, Zap } from "lucide-react";
import moment from "moment";
import Link from "next/link";

const Card = ({ id,dt, dtFin, img, titre, description, lieu, dtStartUnformated, dtEndUnformated }) => {
    // const contenu=description?.substr(0,90) + description?.length>90 && "...";
    const contenu=description?.substr(0,90);
    return (
        <div>
            <div className="hidden shadow-sm bg-white   overflow-hidden lg:block rounded-md h-[500px] mb-[30px] flex flex-col lg:flex-row gap-6 w-[400px]">
                <img width={380} height={250} isZoomed src={img} alt={titre} className="max-h-[250px] rounded-none w-full img" />
                <div className="mb-3 pl-3 flex mt-4 items-center justify-between bg-white">
                    <div className="w-[100px] flex flex-col gap-3 justify-center items-center">
                        <div className="text-center  bg-indigo-500 font-bold  flex flex-col gap-1 justify-center items-center px-3 py-2 text-white">
                            {/* <CalendarPlusIcon size={15} /> */}
                            <div className="text-3xl ">{moment(dtStartUnformated).format("DD")}</div>
                            <div>{moment(dtStartUnformated).format("MM/YYYY")}</div>
                        </div>
                        <p className="text-center font-bold flex gap-3 justify-center items-center text-xl">

                            <div>AU</div>
                        </p>
                        <div className="text-center  bg-indigo-500 font-bold  flex flex-col gap-1 justify-center items-center px-3 py-2 text-white">
                            {/* <CalendarPlusIcon size={15} /> */}
                            <div className="text-3xl ">{moment(dtEndUnformated).format("DD")}</div>
                            <div>{moment(dtEndUnformated).format("MM/YYYY")}</div>
                        </div>
                    </div>
                    <div className="min-h-[230px] rounded-md border-0 w-full mx-2 mb-4 flex flex-col justify-between">
                        <div className="font-extrabold flex-1 text-lg text-center  flex justify-center items-center uppercase ">

                            {titre}
                        </div>
                        <div  dangerouslySetInnerHTML={{__html:contenu}} className="flex-1 py-2 line-clamp-3 text-sm text-justify " />
                        
                        <div className="flex justify-center items-center">
                            <Link href={`/evenement/${id}`} className="text-sm"><span className="border rounded-md px-3 py-1">Detail</span></Link>
                        </div>
                        <div className="text-center flex-1 mt-3 flex gap-3 justify-center items-center italic py-2">
                            <MapPinIcon size={15} />
                            {lieu}
                        </div>
                    </div>
                    {/* <div className="flex-1 bg-black pr-3 h-full flex-col justify-between">
                        <div className="font-extrabold flex-1 text-lg text-center  flex justify-center items-center uppercase ">
                           
                            {titre}
                        </div>
                        <div className="flex-1 py-2  line-clamp-3 text-sm border-b text-justify">
                            {description}
                        </div>
                        <div className="text-center flex-1 mt-3 flex gap-3 justify-center items-center italic py-2">
                            <MapPinIcon size={15} />
                            {lieu}
                        </div>
                    </div> */}
                </div>



            </div>
            {/* Mobile */}
            <div className="lg:hidden overflow-hidden bg-white rounded-md h-[610px] px-2 py-3 mb-[30px] flex flex-col lg:flex-row gap-6 w-[380px]">
                <Image width={350} height={150} isZoomed src={img} alt={titre} className="max-h-[250px] rounded-md w-full img" />
                <h1 className="font-extrabold text-base text-center mb-1 mt-1 flex justify-center items-center gap-4">
                    <Zap />
                    {titre}
                </h1>
                <p className="max-h-[140px] h-[140px] text-wrap text-sm">
                    {description}
                </p>
                <p className="text-center text-orange-500 bg-gray-50 rounded-full font-bold  flex gap-3 justify-center items-center mt-4 text-sm border-t-0 py-2">
                    <CalendarPlusIcon size={15} />
                    <div>{`Du ${dt} au ${dtFin}`}</div>
                </p>
                <p className="text-center mt-3 flex gap-3 justify-center items-center text-blue-600">
                    {/* <LocateFixedIcon /> */}

                    <MapPinIcon size={15} />
                    {lieu}
                </p>
            </div>
        </div>
        // <div>
        //     <div className="hidden lg:block bg-white w-full h-[350px] px-4 py-3 mb-[30px] flex flex-col lg:flex-row gap-6">
        //         <div className="bg-white rounded-md shadow-md mb-[20px] w-[40%] h-[300px] relative mt-8" style={{backgroundImage:`url(${img})`, backgroundSize:"cover"}}>
        //             <h1 className="w-[120px] rounded-md text-white font-bold -mt-[30px] ml-[20px] absolute bg-red-600 h-[100px] flex flex-col gap-3 items-center justify-center" style={poppins.style}>
        //                 <CalendarOutlined />
        //                 <div className="text-center text-sm">{"Du 10/11/2023"}</div>
        //                 <div className="text-center text-sm">{"Au 23/11/2023"}</div>
        //             </h1>
        //             <h3 className="text-black flex  mx-[0%] h-[70px]  px-2 bg-white bg-opacity-50 bottom-[0%] absolute w-[100%] justify-center items-center text-md text-center">{titre}</h3>
        //         </div>

        //         <div className="relative w-[100%] lg:w-[60%] flex-1 h-[320px]">
        //             <div className="flex flex-col justify-between h-full">
        //                 <div className="flex items-end justify-end">
        //                     <Chip color="primary" size="sm">Publié le 08/10/2023</Chip>
        //                 </div>
        //                 <div className="text-md pt-[50px]">{description?.substr(0,200)}</div>
        //                 <Divider />
        //                 <div className="flex flex-row  justify-between">
        //                     <div className="flex flex-row gap-2 justify-start items-start text-md">
        //                         <svg width="25px" height="25px" strokeWidth="1.4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fb6a09"><path d="M12 19a7 7 0 100-14 7 7 0 000 14zM12 19v2M5 12H3M12 5V3M19 12h2" stroke="#fb6a09" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        //                         <span>
        //                             LIEU : 
        //                         </span>
        //                         {lieu}
        //                     </div>
        //                     <div>
        //                         <span className="bg-slate-300 bg-opacity-75 rounded-full px-4 py-2 flex justify-center items-center">
        //                             <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" strokeWidth="1.4" viewBox="0 0 24 24" color="#0d0c0d"><path stroke="#0d0c0d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" d="M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path><path stroke="#0d0c0d" strokeWidth="1.4" d="m15.5 6.5-7 4M8.5 13.5l7 4"></path></svg>                                
        //                         </span>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="">
        //         <div className="block lg:hidden bg-white w-full h-[450px] px-4 py-3 mb-[30px] flex flex-col lg:flex-row gap-6">
        //             <div className="flex items-end justify-end">
        //                 <Chip color="primary" size="sm">Publié le 08/10/2023</Chip>
        //             </div>
        //             <div className="bg-white rounded-md shadow-md mb-[20px] w-full m-w-[400px] h-[500px] relative mt-8" style={{backgroundImage:`url(${img})`, backgroundSize:"cover"}}>
        //                 <h1 className="w-[120px] rounded-md text-white font-bold -mt-[30px] ml-[20px] absolute bg-red-600 h-[100px] flex flex-col gap-3 items-center justify-center" style={poppins.style}>
        //                     <CalendarOutlined />
        //                     <div className="text-center text-sm">{"Du 10/11/2023"}</div>
        //                     <div className="text-center text-sm">{"Au 23/11/2023"}</div>
        //                 </h1>
        //                 <h3 className="text-black flex  mx-[0%] h-[70px]  px-2 bg-white bg-opacity-50 bottom-[0%] absolute w-[100%] justify-center items-center text-md text-center">{titre}</h3>
        //             </div>
        //             <div>
        //                 {description?.substr(0,100)}
        //             </div>
        //             <Divider>Lieu : {lieu}</Divider>
        //         </div>
        //     </div>
        // </div>
    )
}
export default Card