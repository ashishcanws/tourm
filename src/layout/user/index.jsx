import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function UserLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          p: 4,
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  ); 
}

export default UserLayout;