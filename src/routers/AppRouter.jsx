import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { login } from "../actions/authActions";
import { JournalScreen } from "../components/journal/JournalScreen";
import { auth } from "../firebase/firebaseConfig";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { useDispatch } from "react-redux";

import {
   BrowserRouter as Router,
   Routes,
   Route,
} from "react-router-dom"
import { startLoadingNotes } from "../actions/notesAction";

export const AppRouter = () => {

   const dispatch = useDispatch()

   const [checking, setChecking] = useState(true)
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   useEffect( () => {
      onAuthStateChanged(auth, async( user ) =>{

         if ( user?.uid ) {
            dispatch( login ( user.uid, user.displayName ))
            setIsLoggedIn( true )

            // cargar notas 
            dispatch( startLoadingNotes ( user.uid ) )

         }else {
            setIsLoggedIn( false )
         }
         setChecking(false)
      })
     
   }, [ dispatch, setChecking, setIsLoggedIn ])

   if ( checking ) {
      return (
         <h1>Loading, please wait...</h1>
      )
   }
   
   return (
      <>
         <Router>
            <Routes>
               {/* Rutas privadas - usuario registrado */}
               <Route element={<PrivateRoutes isAuthenticated={ isLoggedIn } />}> 
                  <Route exact="true" path="/" element={<JournalScreen />} />
               </Route>

               {/* Ruta por defecto - manda al componente AuthRouter */}
               {/* Ruta pública - redirige al usuario registrado*/}
               <Route element={<PublicRoutes isAuthenticated={ isLoggedIn } />}>
                  <Route path="*" element={<AuthRouter />} />
               </Route>
            </Routes>
         </Router>
      </>
   )
}
