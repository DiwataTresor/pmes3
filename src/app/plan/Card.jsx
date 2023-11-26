import { inter, lora, poiret, pignon, poppins, michroma } from "../style/fonts";
import {CalendarOutlined} from "@ant-design/icons"
import CheckIcon from '@mui/icons-material/Check';
const Card=({type,cout,periode,detail})=>{
    return(
        <div className="w-[100%] h-[550px] px-4 py-3 mb-[30px] flex flex-row">
            <div className="bg-white rounded-md overflow-hidden shadow-md mb-[20px] w-full h-[550px] relative mt-8">
                <div className="bg-blue-500 text-white text-center py-3 h-[70px] text-xl">{type}</div>
                <h1 className="shadow-md w-[90px] rounded-full text-white font-bold -mt-[30px] ml-[40%] absolute bg-red-600 h-[90px] flex flex-col items-center justify-center gap-1" style={poppins.style}>
                    <span>$</span>
                    <p>{cout}</p>
                </h1>
                <h1 className="text-black flex  mx-[0%] h-[70px] mt-[50px]  px-2 bg-white bg-opacity-50  justify-center items-center">{periode}</h1>
                <p>
                {
                    detail.map((d,i)=>{
                        return (
                            <p className="px-2 mb-2 text-[14px] text-center"><CheckIcon color="success" /> {d}</p>
                        )
                    })
                }
                </p>
                <p className="items-center justify-center flex pt-4">
                    <button className="rounded-full bg-blue-500 px-3 text-white py-2 mt-4">S'abonner</button>
                </p>
            </div>
        </div>
    )
}
export default Card