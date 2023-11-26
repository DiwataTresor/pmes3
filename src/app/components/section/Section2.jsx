import {Card, CardHeader, CardBody, CardFooter,Button,Switch, Image,Divider} from "@nextui-org/react"
const Section2=({children,titre,titreIcone,center,footer,footerCenter,cl})=>{
    return (
        <div className={`mb-3 ${cl}`}>
            <h1 className="text-white flex gap-3 text-xl mb-2 font-bold bg-blue-800 border-b-2 py-3 px-2 rounded-tl-md rounded-tr-md border-blue-300">
                {!titreIcone ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>:
                <span className="text-white">{titreIcone}</span>
                }
                <span className="text-white text-lg">{titre}</span>
            </h1>
            <div className="bg-white min-h-[100px] py-3 px-3  border rounded-bl-md rounded-br-md">
                {children}
            </div>
        </div>
    )
}

export default Section2