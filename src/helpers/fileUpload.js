export const fileUpload = async (file) => {
   // url-api de cloudinary - donde vamos a subir las imágenes
   const cloudUrl = 'https://api.cloudinary.com/v1_1/di2jjjfv9/upload'
   
   // añadimos las opciones de la url para hacer el upload 
   const formData = new FormData()
   formData.append('upload_preset', 'react-journal')
   formData.append('file', file)
   
   // console.log(formData.get('file'));  
   // console.log(formData.get('upload_preset'));
   
   try {
      const resp = await fetch ( cloudUrl, {
         method:'POST',
         body: formData
      })
      
      console.log("resp: ", resp);
      if ( resp.ok ) {
         const cloudResp = await resp.json()
         return cloudResp.secure_url
         
      }else {
         throw await resp.json()
      }

   } catch (error) {
      throw error
   }
}