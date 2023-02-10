import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom"

import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";


export const AppRouter = () => {
   return (
      <>
         <Router>
            <Routes>
               <Route exact="true" path="/" element={<JournalScreen />} />

               {/* Ruta por defecto - manda al componente AuthRouter */}
               <Route path="*" element={<AuthRouter />} />
            </Routes>
         </Router>
      </>
   )
}
