import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
