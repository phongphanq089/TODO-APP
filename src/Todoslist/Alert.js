import React from "react";
import { useEffect } from "react";

function Alert ({type,msg,removeAlert,list}) {
   useEffect(() =>{
      const Timeout  = setTimeout(() => {
         removeAlert();
      },3000)
      return () => clearTimeout(Timeout)
   },[])
     return(
        <div className= {`alert alert-${type} ` }>{msg}</div>
     )
}
export default Alert