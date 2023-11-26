import { inter, lora, poiret, pignon, poppins, michroma } from "../style/fonts";
const TitrePage=({titre})=>{
    return(
      // <div className=" h-content py-3 text-center flex flex-col justify-center bg-slate-300">
      <div className=" h-content py-3 text-center flex flex-col justify-center">
        <h1 className="text-3xl font-bold" style={poppins.style}>{titre}</h1>
      </div>
    )
}
export default TitrePage