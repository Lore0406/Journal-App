import { db } from "../firebase/firebaseConfig"
import { collection, getDocs } from "firebase/firestore";

export const loadNotes = async( uid ) => {
   // await db.collection(`${uid}`, "journal", "notes").get()
   const noteSnap = await getDocs(collection(db, `${uid}`, "journal", "notes"))
   const notes = []
   
   noteSnap.forEach( childSnap =>{
      // console.log(childSnap.data(), 'id:', childSnap.id)

      notes.push({
         id: childSnap.id, 
         ...childSnap.data()
      })
   })

   return notes
  
}
