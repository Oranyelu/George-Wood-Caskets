import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2">You are logged in as: {user.email}</p>
        <p className="mt-2 text-sm text-gray-500">UID: {user.uid}</p>
        <p className="mt-4">You do not have admin privileges.</p>
        <p className="mt-2 text-sm">Please check your Supabase &quot;profiles&quot; table.</p>
        <div className="mt-4 p-4 bg-gray-100 rounded text-xs text-left">
          <p><strong>Debug Info:</strong></p>
          <p>Admin Status: {isAdmin ? "True" : "False"}</p>
          <p>Check the console (F12) for more details.</p>
        </div>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 bg-primary text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  adminOnly: PropTypes.bool,
};
