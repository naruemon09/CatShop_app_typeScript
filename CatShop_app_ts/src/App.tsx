import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/users/Login.tsx";
import Register from "./components/users/Register.tsx";
import Home from "./components/users/Home.tsx";
import Layout from "./components/users/Layout.tsx";
import Shop from "./components/users/Shop.tsx";
import LayoutLogin from "./components/users/LayoutLogin.tsx";
import LayoutAdmin from "./components/admin/LayoutAdmin.tsx";
import LoginAdmin from "./components/admin/LoginAdmin.tsx";
import Dashboard from "./components/admin/Dashboard.tsx";
import Cats from "./components/admin/Cats.tsx";
import Breeds from "./components/admin/Breeds.tsx";
import AddCats from "./components/admin/AddCats.tsx";
import AddBreeds from "./components/admin/AddBreeds.tsx";
import Cart from "./components/users/Cart.tsx";
import Checkout from "./components/users/Checkout.tsx";
import LayoutBanner from "./components/users/LayoutBanner.tsx";
import Admin from "./components/admin/Admin.tsx";
import User from "./components/admin/User.tsx";
import RegisterAdmin from "./components/admin/RegisterAdmin.tsx";
import AddRoles from "./components/admin/AddRoles.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<LayoutBanner />}>
            <Route path="/account" element={<LayoutLogin />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Route>

        <Route path="/admin" element={<LoginAdmin />} />
        <Route element={<LayoutAdmin />}>
          <Route path="/userAdmin" element={<Admin />} />
          <Route path="/addrole" element={<AddRoles />} />
          <Route path="/registerAdmin" element={<RegisterAdmin />} />
          <Route path="/users" element={<User />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/addcats" element={<AddCats />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/addbreeds" element={<AddBreeds />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
