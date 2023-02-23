import { useSelector } from "react-redux"
import { JournalEntry } from "./JournalEntry"

export const JournalEntries = () => {

  // seleccionar las notas del state
  const { notes } = useSelector( state => state.notes )

  return (
    <div className="journal__entries">

      {
         notes.map( (note, index)  => (
            <JournalEntry 
              key={ note.id}
              { ...note }
            />
         )) 
      }

    </div>
  )
}