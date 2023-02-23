import { useSelector } from "react-redux"
import { NoteScreen } from "../notes/NoteScreen"
import { NothingSelected } from "./NothingSelected"
// import { NothingSelected } from "./NothingSelected"
import { Sidebar } from "./Sidebar"

export const JournalScreen = () => {

  // useselctor - desestructuramos state.notes -> estado del  "active"
  const { active } = useSelector( state => state.notes )

  return (
    <div className="journal__main-content animate__animated animate__fadeInLeft animate__faster">
      
      <Sidebar />

      <main>

        {
        // si active is true muestra Notescreen sino NothingSelected
          ( active )
            ?<NoteScreen />
            :<NothingSelected /> 
        }

      </main>

    </div>
  )
}