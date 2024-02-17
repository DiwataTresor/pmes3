import {Card, CardHeader, CardBody, CardFooter,Button,Switch, Image,Divider} from "@nextui-org/react"
const Section=({children,titre,titreCl,titreIcone,center,footer,footerCenter,cl,bg})=>{
    return (
        <div className={`mb-3 ${cl}`}>
            <h1 className={` shadow-md text-indigo-900 flex gap-3 text-xl mb-1 font-bold  border-b-1 py-3 px-2 rounded-tl-md rounded-tr-md border-blue-800 items-center ${titreCl}`} style={{backgroundSize:"cover",backgroundImage:"url()"}}>
            {/* <h1 className={`${bg?"bg-gray-100":"bg-white"} shadow-md text-indigo-900 flex gap-3 text-xl mb-1 font-bold  border-b-2 py-3 px-2 rounded-tl-md rounded-tr-md border-blue-800 items-center`} style={{backgroundSize:"cover",backgroundImage:"url()"}}> */}
            {/* <h1 className={`"bg-gray-100":"bg-white"} shadow-md text-indigo-900 flex gap-3 text-xl mb-2 font-bold  border-b-2 py-3 px-2 rounded-tl-md rounded-tr-md border-blue-800`}> */}
                {titreIcone ||
                // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                //     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                // </svg>
                <div className="w-[50px] bg-blue-600 rounded-full h-4">&nbsp;</div>
                }
                <span className="text-indigo-900 text-lg">{titre}</span>
                {/* <div className="w-[50px] bg-blue-600 rounded-full h-4">&nbsp;</div> */}
            </h1>

            <div className={`${bg?bg:"bg-white"} min-h-[100px] py-3 px-3  border rounded-bl-md rounded-br-md`}>
                {children}
            </div>
        </div>
    )
}

export default Section