import { useDispatch, useSelector } from "react-redux"
import { startSaveNote, startUploading } from "../../actions/notesAction"

export const NotesAppBar = () => {

  const dispatch = useDispatch()
  const { active}  = useSelector( state => state.notes)

  const handleSaveNote = () => {
    dispatch (  startSaveNote ( active ) )
  }

  const handlePictureUpload = () => {
    // hacer click en un input escondido para selccionar el fichero
    document.querySelector('#file-selector').click()
  }
  
  const handleFileChange = ( e ) => {
    const file = e.target.files[0]
    if ( file ){
      dispatch ( startUploading( file ) )
    }
  }

  return (
    <div className="notes_appbar">
      <span> 04 de Junio 2017</span>

      <input
        id='file-selector'
        type='file'
        name='file'
        className="notesAppBar-hideInput"
        onChange={ handleFileChange }
      />

      <div>
         <button 
          className="btn"
          onClick={ handlePictureUpload } 
         >
            Picture
         </button>

         <button 
          className="btn"
          onClick={ handleSaveNote }
         >
            Save
         </button>
      </div>

    </div>
  )
}