import { useLocation, Routes, Route, matchPath } from "react-router-dom";

import ProtectedRoute from "./Components/Admin/ProtectedRoutes"; // or './utils/ProtectedRoute'
import AstrologyHomepage from './pages/Home'
import AstrologyLogin from './pages/Login';
import AstrologyNavbar from './Components/Navbar';
import Product from './pages/Product';
import Orders from './pages/Orders';
import Donation from './pages/Donation';
import Book_Visit from './pages/Book_Visit';
import View_Profile from './pages/View_Profile';
import Aboutus from './pages/Aboutus';
import Cart from './pages/Cart';
import Footer from './Components/Footer';
import ProductDetailPage from './pages/ProductDetail';
import AdminSidePanel from './Components/Admin/AdminSidePanel';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminSideNav from "./Components/Admin/AdminSideNav";
import AdminUsersView from "./Components/Admin/AdminUsersView";
import AdminProductsView from "./Components/Admin/AdminProductsView";
import { AdminSingleUser } from "./Components/Admin/AdminSingleUser";
import { AdminUpdateUser } from "./Components/Admin/AdminUpdateUser";
import AdminProductDetail from "./Components/Admin/AdminProductDetail";
import AdminLogin from "./Components/Admin/AdminLogin";
import { AdminOrders } from "./Components/Admin/AdminOrders";
import { AdminSingleOrder } from "./Components/Admin/AdminSingleOrder";
import { AdminVisits } from "./Components/Admin/AdminVisits";
import { AdminSingleVisit } from "./Components/Admin/AdminSingleVisit";
import Previous_Order_Page from "./pages/Previous_Order_Page";
import { AdminProductRequest } from "./Components/Admin/AdminProductRequest";
import { ForgotUserEmail } from "./pages/ForgotUserEmail";
import EmailResetPassword from "./pages/EmailResetPassword";
import { Payment } from "./pages/Payment";
import WishlistPage from "./pages/WishlistPage";
import PrivacyPolicyPage from "./pages/Privacy_Policy";
import TermsConditionsPage from "./pages/Terms_and_Condition";
import { useEffect } from "react";
import AdminReviews from "./Components/Admin/AdminReview";
import AdminFeedback from "./Components/Admin/AdminFeedback";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}


function App() {
  const location = useLocation();

  // Paths where navbar/footer should be hidden
  const hideLayoutPaths = [
    "/adminpanel",
    "/admindashboard", 
    "/adminsidenav",
    "/adminusers",
    "/adminproducts",
    "/adminusers/:id",
    "/adminupdateuser/:id",
    "/adminsingleproductview/:id",
    "/adminlogin",
    "/adminorders",
    "/adminorders/:id",
    "/adminvisits",
    "/adminvisits/:id",
    "/adminproductrequest",
    "/login",
    "/forgotuseremail",
    "/paymentdemo",
    "/adminReview",
    "/adminfeedback"
  ];

  // Check if current path matches any of the patterns
  const hideLayout = hideLayoutPaths.some(path => {
    const match = matchPath({ path, end: false }, location.pathname);
    return match !== null;
  });

  return (
    <>
    <ScrollToTop />
      {/* Add navbar here, inside the Router context */}
      {!hideLayout && <AstrologyNavbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AstrologyHomepage />} />
        <Route path="/login" element={<AstrologyLogin />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/order" element={<Previous_Order_Page/>}/>
        <Route path="/orders/:userId" element={<Orders />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/booking" element={<Book_Visit />} />
        <Route path="/profile" element={<View_Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/paymentdemo" element={<Payment />} />

        <Route path="/forgotuseremail" element={<ForgotUserEmail/>}/>
        <Route path="/emailresetpassword/:token" element={<EmailResetPassword/>}/>

        <Route path="/productdetail/:id" element={<ProductDetailPage />} />
        <Route path="/wishlist/" element={<WishlistPage />} />
        <Route path='/privacy-policy' element={<PrivacyPolicyPage/>} />
        <Route path='/terms-conditions' element={<TermsConditionsPage/>} />

        
        {/* Admin Routes */}
      {/* Admin Routes */}
<Route path="/adminlogin" element={<AdminLogin />} />
<Route path="/adminpanel" element={<ProtectedRoute><AdminSidePanel /></ProtectedRoute>} />
<Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
<Route path="/adminsidenav" element={<ProtectedRoute><AdminSideNav /></ProtectedRoute>} />
<Route path="/adminusers" element={<ProtectedRoute><AdminUsersView /></ProtectedRoute>} />
<Route path="/adminusers/:id" element={<ProtectedRoute><AdminSingleUser /></ProtectedRoute>} />
<Route path="/adminproducts" element={<ProtectedRoute><AdminProductsView /></ProtectedRoute>} />
<Route path="/adminupdateuser/:id" element={<ProtectedRoute><AdminUpdateUser /></ProtectedRoute>} />
<Route path="/adminsingleproductview/:id" element={<ProtectedRoute><AdminProductDetail /></ProtectedRoute>} />
<Route path="/adminorders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
<Route path="/adminorders/:id" element={<ProtectedRoute><AdminSingleOrder /></ProtectedRoute>} />
<Route path="/adminvisits" element={<ProtectedRoute><AdminVisits /></ProtectedRoute>} />
<Route path="/adminvisits/:id" element={<ProtectedRoute><AdminSingleVisit /></ProtectedRoute>} />
<Route path="/adminproductrequest" element={<ProtectedRoute><AdminProductRequest /></ProtectedRoute>} />
<Route path="/adminReview" element={<ProtectedRoute><AdminReviews /></ProtectedRoute>} />
<Route path="/adminfeedback" element={<ProtectedRoute><AdminFeedback /></ProtectedRoute>} />
        
        {/* 404 Route - should be last */}
        <Route path="*" element={<div className="p-8 text-center">Page Not Found - 404</div>} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;