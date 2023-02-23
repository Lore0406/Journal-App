import { NotesAppBar } from "./NotesAppBar"
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "../../hooks/useForm"
import { useEffect, useRef } from "react"
import { activeNote, startDeletingNote } from "../../actions/notesAction"

export const NoteScreen = () => {

  const dispatch = useDispatch()
  const { active: note } = useSelector(state => state.notes)
  const { values, handleInputChange, reset } = useForm(note)
  const { body, title, id } = values

  // useRef permite almacenar una variable mutable que no renderizara 
  // el componente si cambia
  const activeId = useRef( note.id )

 // usamos useEffect apuntando con useRef al id de la nota
 // para hacer que se renderice cada vez que clicamos en una 
 // nota ya que useForm no actualiza el estado
  useEffect( () => {
    if( activeId.current !== note.id ){
      reset( note )
      activeId.current = note.id
    }
    
  }, [ note, reset ])

  useEffect( () => {
    dispatch( activeNote( values.id, { ...values } ))
  }, [ values, dispatch ])
  
  const handleDelete = () => {
    dispatch( startDeletingNote( id ) )
  }

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Note title"
          name="title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={ handleInputChange }
        />

        <textarea
          placeholder="What happened today?"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={ handleInputChange }
        >
        </textarea>

        {
          (note.url) &&
          <div className="notes__image">
            <img
              src={ note.url }
              alt="uploaded_image"
            />
          </div>
        }
      </div>

      <button
        className="btn btn-danger "
        onClick={ handleDelete }
      >
        Delete
      </button>
    </div>
  )
}
