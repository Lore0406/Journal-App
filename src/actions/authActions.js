import { googleProvider, auth } from "../firebase/firebaseConfig"
import { types } from "../types/types"
import { signInWithPopup } from "firebase/auth"

export const startLoginEmailPassword = ( email, password ) => {

   return (dispatch) => {

      setTimeout(() => {
         dispatch( login(123456, "EvilOso") )
      }, 3500)

   }
}

export const startGoogleLogin = () => {
   return (dispatch) => {
      // console.log("wot: ", googleProvider)
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
