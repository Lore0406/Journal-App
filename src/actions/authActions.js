import { googleProvider, auth, firebase } from "../firebase/firebaseConfig"
import { types } from "../types/types"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { finishLoading, startLoading } from "./loadingActions"

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
         })
   }
  
}

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
            console.log(err);
         })
   }
}

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

export const login = (uid, displayName) => {
   return {
      type: types.login,
      payload: {
         uid,
         displayName
      }
   }
}

export const startLogout = () =>{
   return async ( dispatch ) =>{
      await signOut( auth )
      dispatch( logout() )
   }
}

export const logout = () => ({
   type: types.logout

})
