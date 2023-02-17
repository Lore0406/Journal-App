import { Navigate, Outlet } from "react-router-dom"
import PropTypes from 'prop-types'

export const PublicRoutes = ({
   isAuthenticated,
   children
}) => {
   if (isAuthenticated) {
      return <Navigate to="/" replace />
   }
  
   return children ? children : <Outlet />
}

PublicRoutes.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
}

