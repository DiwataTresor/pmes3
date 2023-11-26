import React from "react";
import {bgPrimaryColor, bgSecondary, bgSecondaryColor, titreMenu} from "@/app/style/global"
import {menus} from "@/app/utils/data"

// function Menu() {
//   const menu="text-[12px] mb-4 hover:w-full hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 hover:via-blue-50 transition ease-in-out duration-300 text-gray-800 px-2 py-1"
  
//   const titre="mb-4 text-center block p-2 -mx-2 rounded-lg bg-gradient-to-br from-indigo-50 to-pink-50 via-blue-50 transition ease-in-out duration-300 text-gray-800 font-semibold ";
//   const descriptionSmenu="text-gray-500 font-normal text-[13px]";

//   return (
//     <>
//       <nav className={`bg-white`}>
//         <ul class="flex justify-center font-semibold flex-row md:flex-row items-start md:items-start text-white">
//         { 
//          menus.map((m,i)=>
//          {
//           return(
            
//           <li class="px-3 py-2 relative group ">
            
//             <button
//               class="hover:opacity-50 cursor-default text-center justify-center items-center flex flex-col"
//               aria-haspopup="true"
//             >
//               {
//                 m.icon?
//                   m.icon:
//                   <svg
//                     width="24px"
//                     height="24px"
//                     stroke-width="1.5"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     color="#fb6a09"
//                   >
//                     <path
//                       d="M12 11.5v5M12 7.51l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
//                       stroke="#fb6a09"
//                       stroke-width="1.5"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     ></path>
//                   </svg>
//               }
              
//               <span className="font-bold text-large text-[10px] text-blue-950 md:text-[13px]">{m.titre}</span>
//             </button>
//             <div
//               style={{ display: "block" }}
//               class="absolute ml-7 lg:-left-48 top-6 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[360px] md:min-w-[560px] sm:max-w-[200px] w-[80%] transform"
//             >
//               <div class={`relative top-8 p-3 bg-white rounded-md shadow-xl ${m.smenu[0]?.smenu?"w-full ":"w-[70%]"}`}>
//                 {/* <div class=" w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 -translate-x-4 transition-transform group-hover:translate-x-[105px] duration-500 ease-in-out rounded-sm"></div> */}
//                 <div class="relative z-10">
//                   {
//                     m.stitre?.trim()!=="" &&
//                       <div class="mb-2 text-center block p-2 mx-4 rounded-lg bg-gradient-to-br from-indigo-50 to-pink-50 via-blue-50 transition ease-in-out duration-300 text-gray-800 font-semibold ">
//                         {m.stitre}
//                       </div>
//                   }
//                   {
//                     m.smenu.map((sm,i)=>{
//                       return(
                          
//                           sm.smenu?
//                           <>
//                             <div class="mb-4 text-center block p-2 mx-4 rounded-lg bg-gradient-to-br from-indigo-50 to-pink-50 via-blue-50 transition ease-in-out duration-300 text-gray-800 font-semibold ">
//                             {sm.titre}
//                             </div>
//                             <div class={`grid  grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1  gap-6`}>
//                             {
//                               sm.smenu.map((smm,i)=> {
//                                 return (
//                                   <div>
//                                   {
//                                     !sm.lien ? 
//                                     <p
//                                       class="uppercase tracking-wider text-gray-500 font-medium text-[13px] border-b"
//                                       onClick={() => alert("yyhh")}
//                                     >
//                                     {smm.titre}
//                                     </p>:
//                                     <>
//                                       <a
//                                         href="#"
//                                         class="text-[13px] block p-2 mx-4 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 hover:via-blue-50 transition ease-in-out duration-300 text-gray-800 font-semibold hover:text-indigo-600"
//                                       >
//                                         <div className="flex flex-row gap-2">
//                                           <svg
//                                             width="24px"
//                                             height="24px"
//                                             stroke-width="1.5"
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             color="#fb6a09"
//                                           >
//                                             <path
//                                               d="M9 6l6 6-6 6"
//                                               stroke="#fb6a09"
//                                               stroke-width="1.5"
//                                               stroke-linecap="round"
//                                               stroke-linejoin="round"
//                                             ></path>
//                                           </svg>
//                                           {smm.titre}
//                                         </div>
//                                         <p class="text-gray-500 font-normal text-[13px] pl-8">
//                                           {smm.titre}
//                                         </p>
//                                       </a>
//                                     </>
//                                   }
//                                   <ul class="mt-3 text-[12px]">
//                                     {smm?.smenu?.map((smmm,i)=>{
//                                       return(
//                                       <li>
//                                       <a
//                                         href="#"
//                                         class="text-[12px] block p-2 mx-2 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 hover:via-blue-50 transition ease-in-out duration-300 text-gray-800 font-semibold hover:text-indigo-600"
//                                       >
//                                         <div className="flex flex-row gap-2">
//                                           <svg
//                                             width="24px"
//                                             height="24px"
//                                             stroke-width="1.5"
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             color="#fb6a09"
//                                           >
//                                             <path
//                                               d="M9 6l6 6-6 6"
//                                               stroke="#fb6a09"
//                                               stroke-width="1.5"
//                                               stroke-linecap="round"
//                                               stroke-linejoin="round"
//                                             ></path>
//                                           </svg>
//                                           {smmm.titre}
//                                         </div>
//                                         <p class="text-gray-500 font-normal text-[13px] pl-8">
//                                           {smmm.description}
//                                         </p>
//                                       </a>
//                                     </li>
//                                       )
//                                     })}
                                    
//                                   </ul>
//                                 </div>
//                                 )
//                               })
//                             }
//                             </div>
//                           </>:
//                           <>
                            
//                             <div class={`grid  grid-cols-2 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1  gap-6`}>
//                                 <div>
//                                     {
//                                       sm.smenu && 
//                                       <p
//                                         class="uppercase tracking-wider text-gray-500 font-medium text-[12px] border-b"
//                                         onClick={() => alert("yyhh")}
//                                       >
//                                       {sm.titre} 
//                                       </p>
//                                     }
//                                   <ul class="mt-3 text-[15px]">
//                                     <li>
//                                       <a
//                                         href="#"
//                                         class="block p-2 mx-2 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 hover:via-blue-50 transition ease-in-out duration-300 text-gray-800 font-semibold hover:text-indigo-600"
//                                       >
//                                         <div className="flex flex-row gap-2">
//                                           <svg
//                                             width="24px"
//                                             height="24px"
//                                             stroke-width="1.5"
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             color="#fb6a09"
//                                           >
//                                             <path
//                                               d="M9 6l6 6-6 6"
//                                               stroke="#fb6a09"
//                                               stroke-width="1.5"
//                                               stroke-linecap="round"
//                                               stroke-linejoin="round"
//                                             ></path>
//                                           </svg>
//                                           {sm.titre}
//                                         </div>
//                                         <p class="text-gray-500 font-normal text-[13px] pl-8">
//                                           {sm.description}
//                                         </p>
//                                       </a>
//                                     </li>
//                                   </ul>
//                                 </div>
//                             </div>
//                           </>
//                       )
//                     })
//                   }
//                 </div>
//               </div>
//             </div>
//           </li>
//           )
          
//           })
//         }
//         </ul>
//       </nav>
//     </>
//   );
// }
const Menu=()=>{
  return(
    <>
    </>
  )
}

export default Menu;
