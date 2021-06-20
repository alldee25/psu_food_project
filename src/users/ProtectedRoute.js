import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function ProtectedRoute({isAuth: isAuth, component: Component, ...rest}) {
    return (
           <div style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignContent:'center'}}>
               <h1>
                 404  
               </h1>
           </div>
    )
}
