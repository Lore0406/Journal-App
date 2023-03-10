import { JournalEntries } from "./JournalEntries"
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from "../../actions/authActions"
import { startNewNote } from "../../actions/notesAction"

export const Sidebar = () => {

   const dispatch = useDispatch()

   // usamos el state con useSelector -> desestructurando 
   // el estado de  auth para sacar el name
   const { name } = useSelector( state => state.auth )

   // hacemos un dispatch del logout 
   const handleLogout = () =>{
      dispatch( startLogout() )
   }

   // Añadir nueva entrada 
   const handleNewEntry = () => {
      dispatch( startNewNote() )
   }


  return (
    <aside className="journal__sidebar">

      <div className="journal__sidebar-navbar">

         <h3 className="mt-5">
            <i className="far fa-moon"></i>
            <span className="ml-3">{ name }</span>
         </h3>

         <button 
            className="btn"
            onClick={ handleLogout }
         >
            Logout
         </button>

      </div>

      <div 
         className="journal__new-entry"
         onClick={ handleNewEntry }
      >
         <i className="far fa-calendar-plus fa-5x"></i>
         <p className="mt-5">New Entry</p>
      </div>

      <JournalEntries />

    </aside>
  )
}