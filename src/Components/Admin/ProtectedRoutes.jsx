import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if admin is logged in (adjust this based on your auth logic)
  const isAdminLoggedIn = localStorage.getItem('admin') || sessionStorage.getItem('admin');
  
  if (!isAdminLoggedIn) {
    return <Navigate to="/adminlogin" replace />;
  }
  
  return children;
};

export default ProtectedRoute;