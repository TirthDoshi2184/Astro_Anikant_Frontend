import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";

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

function App() {
  return (
    <>

      <AstrologyNavbar />
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
        <Route path="/adminpanel" element={<AdminSidePanel />} />

      </Routes>
      <Footer />

    </>
  )
}

export default App
