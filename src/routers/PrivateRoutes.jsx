import { Navigate, Outlet, useLocation } from "react-router-dom"
import PropTypes from 'prop-types'

export const PrivateRoutes = ({
   isAuthenticated,
   children
}) => {
   // const location = useLocation()
   
   if (!isAuthenticated) {
      return <Navigate to="/auth/login" replace />;
   }
  
   return children ? children : <Outlet />;

}

PrivateRoutes.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
}

