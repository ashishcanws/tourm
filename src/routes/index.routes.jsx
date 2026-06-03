import { createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";
import Home from "../pages/guest/Home";
import AboutUs from "../pages/guest/AboutUs";
import Protected from "../components/Protected";
import Dashboard from "../pages/user/Dashboard";
import MyBookings from "../pages/user/MyBookings";


import Layout from "../layout/guest";
import UserLayout from "../layout/user";
import AuthLayout from '../layout/authlayout/AuthLayout.jsx';

import Destinations from "../pages/guest/Destinations";
import TourListing from "../pages/guest/TourListing";
import TourDetails from "../pages/guest/TourDetails";
import Booking from "../pages/guest/Booking";
import ContactUs from "../pages/guest/ContactUs";

import Login from "../pages/guest/Login";
import Signup from './../pages/guest/Signup';


const routes = createBrowserRouter(
    createRoutesFromElements(
        <>
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

            {/* WITHOUT HEADER/FOOTER */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/sign" element={<Signup />} />
            </Route>

            <Route path="/user" element={<Protected><UserLayout /></Protected>}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="my-bookings" element={<MyBookings />} />
            </Route>
        </>
    )
)

export default routes