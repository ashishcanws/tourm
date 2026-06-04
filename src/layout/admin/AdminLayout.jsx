// src/layout/admin/AdminLayout.jsx
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography, IconButton,
  Avatar, Divider, Tooltip
} from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { supabase } from "../../supabase";

const DRAWER_WIDTH = 240;
const DRAWER_COLLAPSED = 70;

const navItems = [
  { label: "Manage Tours", icon: <TourOutlinedIcon />, path: "/admin/tours" },
  { label: "Bookings",     icon: <BookOnlineOutlinedIcon />, path: "/admin/bookings" },
  { label: "Users",        icon: <PeopleOutlinedIcon />, path: "/admin/users" },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = collapsed ? DRAWER_COLLAPSED : DRAWER_WIDTH;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>

      {/* ── Sidebar ── */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#113d48",
            color: "#fff",
            transition: "width 0.3s ease",
            overflowX: "hidden",
          },
        }}
      >
        {/* Logo + Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            px: collapsed ? 1 : 2,
            py: 2,
          }}
        >
          {!collapsed && (
            <Typography sx={{fontSize:"20px", fontWeight:"700"}}>
              Admin Panel
            </Typography>
          )}
          <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: "#fff" }}>
            {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Nav Items */}
        <List sx={{ mt: 1, flex: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Tooltip
                key={item.path}
                title={collapsed ? item.label : ""}
                placement="right"
              >
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      mx: 1,
                      borderRadius: 2,
                      justifyContent: collapsed ? "center" : "flex-start",
                      backgroundColor: isActive ? "rgba(32,197,247,0.15)" : "transparent",
                      borderLeft: isActive ? "3px solid #20c5f7" : "3px solid transparent",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? "#20c5f7" : "rgba(255,255,255,0.7)",
                        minWidth: collapsed ? 0 : 40,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: isActive ? 700 : 400,
                          color: isActive ? "#20c5f7" : "rgba(255,255,255,0.85)",
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            );
          })}
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Logout */}
        <Box title={collapsed ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              mx: 1,
              my: 1,
              borderRadius: 2,
              justifyContent: collapsed ? "center" : "flex-start",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
            }}
          >
            <ListItemIcon sx={{ color: "rgba(255,255,255,0.7)", minWidth: collapsed ? 0 : 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}
              />
            )}
          </ListItemButton>
        </Box>
      </Drawer>

      {/* ── Main Content ── */}
      <Box sx={{ flex: 1, overflow: "auto", padding:'50px' }}>
        <Outlet />
      </Box>
    </Box>
  );
}