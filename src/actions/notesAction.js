import { db } from "../firebase/firebaseConfig"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { types } from "../types/types"
import { loadNotes } from "../helpers/loadNotes"

import Swal from 'sweetalert2'
import { fileUpload } from "../helpers/fileUpload"

export const startNewNote = () => {
   return async ( dispatch, getState ) =>{

      // sacar uid del usuario
      const uid = getState().auth.uid 
      
      // Inicializar una nueva "Note"
      const newNote = {
         title:'', 
         body:'', 
         date: new Date().getTime()
      }

      const doc = await addDoc(collection(db, `${uid}`, "journal", "notes"), {
         title:'', 
         body:'', 
         date: new Date().getTime()
      })
      // const doc = db.collection(`${ uid }/journal/notes`).add( newNote )
      
      dispatch( addNewNote(  doc.id, newNote ))
      dispatch( activeNote( doc.id, newNote) )
   }
}

export const activeNote = ( id, note) => ({
   type: types.notesActiveNote, 
   payload: {
      id, 
      ...note, 
   }
})

export const addNewNote = ( id, note ) => ({
   type: types.notesAddNote, 
   payload: {
      id, 
      ...note
   }
})

export const startLoadingNotes = (uid) => {
   return async (dispatch) => {
      const notes = await loadNotes(uid)
      dispatch( setNotes( notes ))
   }
}

export const setNotes = ( notes ) =>({
   type: types.notesLoadNotes, 
   payload: notes, 
})

export const startSaveNote = ( note ) => {
   return async ( dispatch, getState ) => {
      const uid = getState().auth.uid
      if ( !note.url ){
         delete note.url
      }

      // para no mutar note guardamos el estado en una const
      const noteToFirestore = { ...note }
      delete noteToFirestore.id
      // hay que hacer un spread de note al actualizar y no de firestore ya que sino no se actualiza la "note"
      await updateDoc(doc (db, `${uid}`, `journal/notes/${ note.id }`), { ...noteToFirestore})
      // hacemos un dispatch de refreshsaved note para ver reflejados los cambios en la interfaz grafica
      dispatch( refreshSavedNote( note.id, noteToFirestore ))
      // seetalert mensaje de success
      Swal.fire('Saved', noteToFirestore.title, 'success')
   }
}

export const refreshSavedNote = ( id, note ) => ({ 
   type: types.notesUpdateNote, 
   payload: {
      id, 
      note: {
         id, 
         ...note
      }
   }
})

export const startUploading = ( file ) => {
   return async ( dispatch, getState ) => {
      // desestructuramos notes sacando la nota activa
      const { active } = getState().notes
      Swal.fire({
         title:'Uploading...', 
         text: 'Please wait...',
         allowOutsideClick: false, 
         didOpen: () => {
            Swal.showLoading()
         }
      })

      // no se puede mutar el estado así que hacemos un spread del mismo para poder utilizar notes
      const activeN = { ...active }
      const fileUrl = await fileUpload( file )
      activeN.url = fileUrl
      dispatch( startSaveNote( activeN ) )
      dispatch( activeNote(activeN.id, activeN) )

      Swal.close()
   }

}

export const startDeletingNote = ( id ) =>{
   return async( dispatch, getState ) => {

      const uid = getState().auth.uid
      await deleteDoc( doc( db, `${uid}`, `journal/notes/${ id }` ) )
      dispatch( deleteNote(  id ) )


   }
}

export const deleteNote = ( id ) => ({
   type: types.notesDeleteNote, 
   payload: id
})

export const noteLogout = () => ({
   type: types.notesLogoutClear,
})

