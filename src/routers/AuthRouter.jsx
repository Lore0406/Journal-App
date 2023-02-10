import { Routes, Route, Navigate } from "react-router-dom";

import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";

export const AuthRouter = () => {
   return (
      <div className="auth__main">

         <div  className="auth__box-container">
            <Routes>
               <Route exact="true" path="/auth/login" element={<LoginScreen />} />
               <Route exact="true" path="/auth/register" element={<RegisterScreen />} />

               {/* Ruta por defecto - te lleva al login */}
               <Route path="*" element={<LoginScreen />} />
            </Routes>

         </div>
         
      </div>
   );
};
