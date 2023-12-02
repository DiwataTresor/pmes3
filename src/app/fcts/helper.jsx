"use client"

import Cookies from "js-cookie";

// export const BACKEND_URL="http://192.168.0.102/root/backend-annuaire-pmes/";
export const BACKEND_URL="http://localhost/root/backend-annuaire-pmes/";
// export const BACKEND_URL="https://bac.indexrdc.com/";
export const API_URL=BACKEND_URL+"api.php";
export const isMobile=()=>{
  try
  {
    if (window.innerWidth < 768) {
        // Rediriger vers la version mobile
        //window.location.href = "/chemin-vers-version-mobile";
      }
    }catch(e) {

    }
}
export const capitalize=(str)=>{
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const getData=async(qry,id=null)=>{
  const profil=Cookies.get("profil")?JSON.parse(Cookies.get("profil")) : {};
  let resultat={};
  await fetch(`${API_URL}?qry=${qry}&id=${profil?.id}`).then(r=>r.json()).then(r=>{
    resultat=r;
  }).catch(r=>{
    resultat={"success":false,"msg":r}
  });
  return resultat;
}
export const postData=async(qry,data,id=null)=>{
  const profil=Cookies.get("profil")?JSON.parse(Cookies.get("profil")) : {};
  let resultat={};
  let form=new FormData();
  form.append("add",qry);
  form.append("data",JSON.stringify(data));
  form.append("id",profil?.id || null);

  await fetch(`${API_URL}`,{method:"POST",body:form}).then(r=>r.json()).then(r=>{
    resultat=r;
  }).catch(r=>{
    resultat={"success":false,"msg":r}
  });
  return resultat;
}
export const updateData=async(qry,data,id=null)=>{
  const profil=Cookies.get("profil")?JSON.parse(Cookies.get("profil")) : {};
  let resultat={};
  let form=new FormData();
  form.append("update",qry);
  form.append("data",JSON.stringify(data));
  form.append("id",profil?.id);
  await fetch(`${API_URL}`,{method:"POST",body:form}).then(r=>r.json()).then(r=>{
    resultat=r;
  }).catch(r=>{
    resultat={"success":false,"msg":r}
  });
  return resultat;
}
export const deleteData=async(qry,data,id=null)=>{
  const profil=Cookies.get("profil")?JSON.parse(Cookies.get("profil")) : {};
  let resultat={};
  let form=new FormData();
  form.append("delete",qry);
  form.append("data",JSON.stringify(data));
  form.append("id",id);
  await fetch(`${API_URL}`,{method:"POST",body:form}).then(r=>r.json()).then(r=>{
    resultat=r;
  }).catch(r=>{
    resultat={"success":false,"msg":r}
  });
  return resultat;
}
export const VisiteSiteOfUserFromLink=async(id,site)=>{
  if(site?.trim()!==null || site?.trim()!=="")
  {
    await postData("visiteSiteOfUser",{"profil":id}).then(r=>{
    
    }).catch(err=>{
      
    });
    window.location.href="http://"+site;
  }
}

