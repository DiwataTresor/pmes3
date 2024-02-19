import { API_URL, getData } from "../fcts/helper"

export const oldUrl="http://projetsite.oxerode.com/"
export const telephone="(+243) 999917959 / 852222265"
export const email="info@indexrdc.com"
export const adresse="Avenue Colonel Ebeya Nr 3, Immeuble Ave Maria, 5é étage, Local 510 1003071 Kinshasa/Gombe - RDC"
// export const oldUrl="http://192.168.0.103/root/sw/"
export const contactDetail=()=>{
    let resultat=null;
    getData("contact").then(r=>{
    resultat=r?.data
   });
   return resultat;
}
