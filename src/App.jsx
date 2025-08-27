import { useLocation, Routes, Route, matchPath } from "react-router-dom";

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
    "/adminvisits/:id"
  ];

  // Check if current path matches any of the patterns
  const hideLayout = hideLayoutPaths.some(path => {
    const match = matchPath({ path, end: false }, location.pathname);
    return match !== null;
  });

  return (
    <>
      {/* Add navbar here, inside the Router context */}
      {!hideLayout && <AstrologyNavbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AstrologyHomepage />} />
        <Route path="/login" element={<AstrologyLogin />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/order" element={<Previous_Order_Page/>}/>
        <Route path="/orders/:id" element={<Orders />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/booking" element={<Book_Visit />} />
        <Route path="/profile" element={<View_Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productdetail/:id" element={<ProductDetailPage />} />
        
        {/* Admin Routes */}
        <Route path="/adminpanel" element={<AdminSidePanel />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminsidenav" element={<AdminSideNav />} />
        <Route path="/adminusers" element={<AdminUsersView />} />
        <Route path="/adminusers/:id" element={<AdminSingleUser />} />
        <Route path="/adminproducts" element={<AdminProductsView />} />
        <Route path="/adminupdateuser/:id" element={<AdminUpdateUser />} />
        <Route path="/adminsingleproductview/:id" element={<AdminProductDetail />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminorders" element={<AdminOrders />} />
        <Route path="/adminorders/:id" element={<AdminSingleOrder />} />
        <Route path="/adminvisits" element={<AdminVisits />} />
        <Route path="/adminvisits/:id" element={<AdminSingleVisit />} />
        
        {/* 404 Route - should be last */}
        <Route path="*" element={<div className="p-8 text-center">Page Not Found - 404</div>} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;