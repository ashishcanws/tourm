import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

function Layout() {
  return (
    <>
      <Outlet />
      <Sidebar />
    </>
  )
}

export default Layout