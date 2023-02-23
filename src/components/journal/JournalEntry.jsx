import moment from 'moment'
import { useDispatch } from 'react-redux'
import { activeNote }from '../../actions/notesAction'

// recibe una desestructuración de notes!!! Si no todo sale en array
export const JournalEntry = ( {id, date, title, body, url} ) => {

   // usando libreria moment para formatear la fecha 
   const noteDate = moment(date)

   const dispatch = useDispatch()
   const handleEntryClick = () => {
      dispatch( activeNote( id, {
         date, title, body, url 
      } ) )
   }
  

   return (
      <div 
         className="journal__entry pointer animate__animated animate__fadeInRight animate__fast"
         onClick={ handleEntryClick }
      >
         {
            url &&
            <div
               className="journal__entry-picture"
               style={{
                  backgroundSize: "cover",
                  backgroundImage: `url( ${ url } )`,
                  backgroundRepeat: "no-repeat",
               }}
            >
            </div>
         }

         <div className="journal__entry-body">
            <p className="journal__entry-title mt-1">{ title }</p>
            <p className="journal__entry-content">{ body }</p>
         </div>

         <div className="journal__entry-date">
            <span>{ noteDate.format('dddd') }</span>
            <h4>{ noteDate.format('Do') }</h4>
         </div>
      </div>
   )
}
