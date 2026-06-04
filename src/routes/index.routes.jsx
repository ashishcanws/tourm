// src/routes/index.routes.jsx — final version
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// Layouts
import Layout from "../layout/guest";
import UserLayout from "../layout/user";
import AuthLayout from "../layout/authlayout/AuthLayout.jsx";
import AdminLayout from "../layout/admin/AdminLayout.jsx";

// Guest Pages
import Home from "../pages/guest/Home";
import AboutUs from "../pages/guest/AboutUs";
import ContactUs from "../pages/guest/ContactUs";
import Destinations from "../pages/guest/Destinations";
import TourListing from "../pages/guest/TourListing";
import TourDetails from "../pages/guest/TourDetails";
import Booking from "../pages/guest/Booking";

// Auth Pages
import Login from "../pages/guest/Login";
import Signup from "../pages/guest/Signup";

// User Pages
import Dashboard from "../pages/user/Dashboard";
import MyBookings from "../pages/user/MyBookings";
import Profile from "../pages/user/Profile";
import ChangePassword from "../pages/user/ChangePassword";

// Admin Pages
import ManageTours from "../pages/admin/ManageTours";
import AddTour from "../pages/admin/AddTour";
import EditTour from "../pages/admin/EditTour";
import Bookings from "../pages/admin/Bookings";
import Users from "../pages/admin/Users";

import Protected from "../components/Protected";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ── Guest Layout (Header + Footer) ── */}
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="tours" element={<TourListing />} />
        <Route path="tours/:slug" element={<TourDetails />} />
        <Route path="booking" element={<Booking />} />
        <Route path="booking/:slug" element={<Booking />} />
      </Route>

      {/* ── Auth (No Header/Footer) ── */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Signup />} />
      </Route>

      {/* ── User Dashboard ── */}
      <Route path="/user" element={<Protected><UserLayout /></Protected>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>

      {/* ── Admin Panel ── */}
      <Route path="/admin" element={<Protected><AdminLayout /></Protected>}>
        <Route path="tours" element={<ManageTours />} />
        <Route path="tours/add" element={<AddTour />} />
        <Route path="tours/edit/:slug" element={<EditTour />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="users" element={<Users />} />
      </Route>
    </>
  )
);

export default routes;