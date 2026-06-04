// src/layout/user/Sidebar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box, Avatar, Typography, List,
  ListItemButton, ListItemText, ListItemIcon, Divider,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { supabase } from "../../supabase";
import { useState, useEffect } from "react";

const menuItems = [
  { title: "Dashboard",       path: "/user/dashboard",        icon: <DashboardOutlinedIcon /> },
  { title: "My Bookings",     path: "/user/my-bookings",      icon: <BookOnlineOutlinedIcon /> },
  { title: "Profile",         path: "/user/profile",          icon: <PersonOutlinedIcon /> },
  { title: "Change Password", path: "/user/change-password",  icon: <LockOutlinedIcon /> },
];

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const firstName = user?.user_metadata?.first_name || "";
  const lastName  = user?.user_metadata?.last_name  || "";
  const initials  = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
  const fullName  = firstName || lastName
    ? `${firstName} ${lastName}`.trim()
    : user?.email?.split("@")[0] || "User";

  return (
    <Box
      sx={{
        width: 270,
        minHeight: "100vh",
        bgcolor: "#113d48",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* ── User Info ── */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Avatar
          sx={{
            width: 80, height: 80,
            mx: "auto", mb: 2,
            bgcolor: "#20c5f7",
            fontSize: 28, fontWeight: 700,
            color: "#113d48",
          }}
        >
          {initials || "U"}
        </Avatar>

        <Typography fontWeight={700} fontSize={16} noWrap>
          {fullName}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5, fontSize: 13 }} noWrap>
          {user?.email || ""}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />

      {/* ── Menu ── */}
      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2, mb: 0.5, py: 1.2, px: 2,
                backgroundColor: isActive ? "rgba(32,197,247,0.15)" : "transparent",
                borderLeft: isActive ? "3px solid #20c5f7" : "3px solid transparent",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "#20c5f7" : "rgba(255,255,255,0.7)",
                  minWidth: 38,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? "#20c5f7" : "rgba(255,255,255,0.85)",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* ── Logout ── */}
      <Box sx={{ p: 1.5 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mb: 1.5 }} />
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2, py: 1.2, px: 2,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
          }}
        >
          <ListItemIcon sx={{ color: "rgba(255,255,255,0.7)", minWidth: 38 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Sidebar;