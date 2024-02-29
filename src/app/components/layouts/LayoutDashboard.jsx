import {Card, CardHeader, CardBody, CardFooter,Button,Switch, Image,Divider} from "@nextui-org/react"
const LayoutDashboard=({children,titre,titreIcone,center,footer,footerCenter,headerBg})=>{
    return (
        <>
        <div className="mb-3 bg-white">
            <div className={`flex gap-3 border-b py-3 pl-3 border-white shadow-sm ${headerBg?headerBg:"bg-blue-500"} text-white font-bold`}>
                {titreIcone || <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="text-white" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" /></svg>}
                {titre}
            </div>
            <div className={"bg-white shadow-sm p-3 "+footer && " border-b"}>
                {
                    center?
                    <div className="flex flex-col items-center px-3 py-4">
                        {children}
                    </div>:
                    <div className="px-3 py-4">
                        {children}
                    </div>
                }
            </div>
            {
                footer && 
                <div>
                    <div className={footerCenter && " w-full"}>{footer}</div>
                </div>
            }
        </div>
        {/* <div className="">&nbsp;</div> */}
        </>
    )
}

export default LayoutDashboard