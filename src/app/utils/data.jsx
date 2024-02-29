import {getData} from "./../fcts/helper"
export const typeAbonnement={
  "B":"Pack Free",
  "F":"Pack Free",
  "P":"Pack Pro",
  "K":"Pack Konzo",
  "X":"Pack Premium"
};
export const getSecteurs=async()=>{
  
  let res=[];
  await getData("secteurs").then(r=>{
   
    res={"success":true,"data":r.data}
  }).catch(r=>{
   
    res={
      "success":false
    };
  })
  return res;
}
export const getSecteurBySlug=async(slug)=>{
  
  let res=[];
  await getData(`secteurBySlug&slug=${slug}`).then(r=>{
   
    res={"success":true,"data":r.data}
  }).catch(r=>{
   
    res={
      "success":false
    };
  })
  return res;
}
export const getProvinces=async()=>{
  
  let res=[];
  await getData("provinces").then(r=>{
   
    res={"success":true,"data":r.data}
  }).catch(r=>{
   
    res={
      "success":false
    };
  })
  return res;
}
export const getVilles=async()=>{
  
  let res=[];
  await getData("villes").then(r=>{
   
    res={"success":true,"data":r.data}
  }).catch(r=>{
   
    res={
      "success":false
    };
  })
  return res;
}