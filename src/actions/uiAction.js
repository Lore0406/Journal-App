import { types } from "../types/types"

export const setErrorAction = ( err ) => ({
   type: types.uiSetError, 
   payload: err,
})

export const removeErrorAction = ( err ) => ({
   type: types.uiRemoveError,
})