import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/users/Login.tsx";
import Register from "./components/users/Register.tsx";
import Home from "./components/users/Home.tsx";
import Layout from "./components/users/Layout.tsx";
import Shop from "./components/users/Shop.tsx";
import LayoutLogin from "./components/users/LayoutLogin.tsx";
import LayoutAdmin from "./components/admin/LayoutAdmin.tsx";
import LoginAdmin from "./components/admin/employee/LoginAdmin.tsx";
import Dashboard from "./components/admin/Dashboard.tsx";
import Cats from "./components/admin/cats/Cats.tsx";
import Breeds from "./components/admin/breed/Breeds.tsx";
import AddCats from "./components/admin/cats/AddCats.tsx";
import AddBreeds from "./components/admin/breed/AddBreeds.tsx";
import Checkout from "./components/users/Checkout.tsx";
import LayoutBanner from "./components/users/LayoutBanner.tsx";
import Admin from "./components/admin/employee/Admin.tsx";
import User from "./components/admin/user/User.tsx";
import RegisterAdmin from "./components/admin/employee/RegisterAdmin.tsx";
import AddRoles from "./components/admin/employee/AddRoles.tsx";
import CatDetail from "./components/users/CatDetail.tsx";
import Profile from "./components/users/Profile.tsx";
import About from "./components/users/About.tsx";
import Contact from "./components/users/Contact.tsx";
import UserDetail from "./components/admin/user/UserDetail.tsx";
import BreedDetail from "./components/admin/breed/BreedDetail.tsx";
import CatsDetail from "./components/admin/cats/CatsDetail.tsx";
import AdminDetail from "./components/admin/employee/AdminDetail.tsx";
import Orders from "./components/admin/order/Orders.tsx";
import Billing from "./components/users/Billing.tsx";
import Carts from "./components/admin/cart/Carts.tsx";
import Payment from "./components/users/Payment.tsx";
import Orderlist from "./components/users/Orderlist.tsx";
import OrderDetail from "./components/users/OrderDetail.tsx";
import CartDetail from "./components/admin/cart/CartDetail.tsx";
import Calendar from "./components/admin/Calendar.tsx";
import OrdersDetail from "./components/admin/order/OrdersDetail.tsx";
import UpdateAdmin from "./components/admin/employee/UpdateAdmin.tsx";
import UpdateCats from "./components/admin/cats/UpdateCats.tsx";
import UpdateBreed from "./components/admin/breed/UpdateBreed.tsx";
import Cancel from "./components/users/Cancel.tsx";

function App() {
  // const token = Store();

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route element={<LayoutBanner />}>
            <Route path="/account" element={<LayoutLogin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/detail" element={<CatDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/billing" element={<Billing />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orderHistory" element={<Orderlist />} />
            <Route path="/orderHistory/detail" element={<OrderDetail />} />
            <Route path="/cancel" element={<Cancel />} />
          </Route>
        </Route>

        <Route path="/admin" element={<LoginAdmin />} />
        <Route element={<LayoutAdmin />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/userAdmin" element={<Admin />} />
          <Route path="/addrole" element={<AddRoles />} />
          <Route path="/registerAdmin" element={<RegisterAdmin />} />
          <Route path="/admin/:userid" element={<AdminDetail />} />
          <Route path="/updateAdmin/:userid" element={<UpdateAdmin />} />
          <Route path="/users" element={<User />} />
          <Route path="/users/:userid" element={<UserDetail />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/addcats" element={<AddCats />} />
          <Route path="/cats/:catid" element={<CatsDetail />} />
          <Route path="/updateCats/:catid" element={<UpdateCats />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/addbreeds" element={<AddBreeds />} />
          <Route path="/breeds/:breedid" element={<BreedDetail />} />
          <Route path="/updateBreeds/:breedid" element={<UpdateBreed />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrdersDetail />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/carts/:cartid" element={<CartDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
