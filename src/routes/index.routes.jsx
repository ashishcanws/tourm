import { createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";
import Home from "../pages/guest/Home";
import About from "../pages/guest/About";
import Protected from "../components/Protected";
import Dashboard from "../pages/user/Dashboard";
import Layout from "../layout/guest";
import UserLayout from "../layout/user";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route path='' element={<Home />} />
                <Route path='about' element={<About />}>
                    <Route path='contact' element={<Dashboard />} />
                    <Route path='contact' element={<About />} />
                    <Route path='contact' element={<About />} />
                    <Route path='contact' element={<About />} />
                </Route>
            </Route>



            <Route path="/user" element={<UserLayout />}>
                <Route path='dashboard' element={<Protected><Dashboard /></Protected>} />
            </Route>
        </>
    )
)

export default routes