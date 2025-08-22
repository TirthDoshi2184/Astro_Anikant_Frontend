import { useLocation, Routes, Route } from "react-router-dom";

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
import AdminSidePanel from './Components/Admin/AdminSidePanel';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminSideNav from "./Components/Admin/AdminSideNav";
import AdminUsersView from "./Components/Admin/AdminUsersView";
import AdminProductsView from "./Components/Admin/AdminProductsView";

function App() {
  const location = useLocation();

  // paths where navbar/footer should be hidden
  const hideLayoutPaths = ["/adminpanel", "/admindashboard","/adminsidenav","/adminusers","/adminproducts"];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <>
      {!hideLayout && <AstrologyNavbar />}

      <Routes>
        <Route path="/" element={<AstrologyHomepage />} />
        <Route path="/login" element={<AstrologyLogin />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/booking" element={<Book_Visit />} />
        <Route path="/profile" element={<View_Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/adminpanel' element={<AdminSidePanel />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path='/adminsidenav' element={<AdminSideNav />} />
        <Route path='/adminusers' element={<AdminUsersView />} />
        <Route path='/adminproducts' element={<AdminProductsView />} />


      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
