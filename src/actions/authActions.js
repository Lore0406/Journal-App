import Swal from 'sweetalert2'
import { googleProvider, auth } from "../firebase/firebaseConfig"
import { types } from "../types/types"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { finishLoading, startLoading } from "./loadingActions"
import { noteLogout } from './notesAction'

// acción logging con mail y password 
export const startLoginEmailPassword = ( email, password ) => {
   return ( dispatch ) => {

      dispatch( startLoading() )
   
      signInWithEmailAndPassword( auth, email, password )
         .then( ({ user }) => {
            dispatch(
               login( user.uid, user.displayName )
            )
           
            dispatch( finishLoading() )
         })
         .catch(err => {
            console.log(err);
            dispatch( finishLoading() )
            Swal.fire('Error', err.message, 'error')
         })
   }
  
}

// acción registrarse con mail y password 
export const startRegisterWithEmailPasswordName = ( email, password, name ) =>{ 
   return ( dispatch ) => {
      createUserWithEmailAndPassword(auth, email, password)
         .then( async ({ user }) => {
            
            await updateProfile(user, { displayName: name })
            
            dispatch(
               login(user.uid, user.displayName)
            )
         })
         .catch(err => {
            console.log(err)
            // utilizamos Sweet alert para sacar los mesajes de error de firebase 
            Swal.fire('Error', err.message, 'error')
         })
   }
}

// Acción de login con botón de Google
export const startGoogleLogin = () => {
   return (dispatch) => {
      signInWithPopup( auth, googleProvider )
         .then( ({ user }) => {
            dispatch(
               login(user.uid, user.displayName)
            )
         })
   }
}

// acción de login 
export const login = (uid, displayName) => {
   return {
      type: types.login,
      payload: {
         uid,
         displayName
      }
   }
}

// accion de logout
export const startLogout = () =>{
   return async ( dispatch ) =>{
      await signOut( auth )
      dispatch( logout() )

      // hay que disparra la accion que purga las notas 
      dispatch ( noteLogout() )
   }
}

// accion de logout
export const logout = () => ({
   type: types.logout
})
