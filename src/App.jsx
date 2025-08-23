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

function App() {
  const location = useLocation();

  // paths where navbar/footer should be hidden
  const hideLayoutPaths = [
    "/adminpanel",
    "/admindashboard",
    "/adminsidenav",
    "/adminusers",
    "/adminproducts",
    "/adminusers/:id",
    "/adminupdateuser/:id"
  ];

  // check if current path matches any of the patterns
  const hideLayout = hideLayoutPaths.some(path =>
    matchPath({ path, end: true }, location.pathname)
  );

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
        <Route path='/adminusers/:id' element={<AdminSingleUser />} />
        <Route path='/adminproducts' element={<AdminProductsView />} />
        <Route path='/adminupdateuser/:id' element={<AdminUpdateUser />} />

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
