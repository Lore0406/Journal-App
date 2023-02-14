// import { legacy_createStore as createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '../reducers/authReducer'

export const store = configureStore({
   reducer: {
      auth: authReducer
   }
})

// const reducers = combineReducers({
//    auth: authReducer
// })

// export const store = createStore( reducers )

