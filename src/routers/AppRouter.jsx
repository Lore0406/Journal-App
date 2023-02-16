import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
   BrowserRouter as Router,
   Routes,
   Route,
} from "react-router-dom"
import { login } from "../actions/authActions";

import { JournalScreen } from "../components/journal/JournalScreen";
import { auth } from "../firebase/firebaseConfig";
import { AuthRouter } from "./AuthRouter";


export const AppRouter = () => {

   const dispatch = useDispatch()

   const [checking, setChecking] = useState(true)
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   useEffect( () => {
      onAuthStateChanged(auth,  ( user ) =>{

         if ( user?.uid ) {
            dispatch( login ( user.uid, user.displayName ))
            setIsLoggedIn( true )
         }else {
            setIsLoggedIn( false )
         }
         setChecking(false)
      })
     
   }, [ dispatch, setChecking, setIsLoggedIn ])

   if ( checking ) {
      return (
         <h1>Loggin in...</h1>
      )
   }
   
   return (
      <>
         <Router>
            <Routes>
               <Route exact="true" path="/" element={<JournalScreen />} />

               {/* Ruta por defecto - manda al componente AuthRouter */}
               <Route path="*" element={<AuthRouter />} />
            </Routes>
         </Router>
      </>
   )
}
