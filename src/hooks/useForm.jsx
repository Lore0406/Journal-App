import { useState } from 'react'

export const useForm = ( initialState = {} ) => {
   const [ values, setValues ] = useState( initialState )

   // reseteamos los valores al estado inicial 
   const reset = () =>{
      setValues( initialState )
   }
   
   // desestructuramos event -- target "event.target"
   const handleInputChange = ({ target }) =>{
      setValues({
         ...values,
         // target.name .. value son los valores que se sacan del input 
         [ target.name ]: target.value
      })
   }

   return { values, handleInputChange, reset }
 
}
