import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { supabase } from "../../supabase";
import { useState, useEffect } from "react";


const Sidebar = () => {
  const [user, setUser] = useState(null);

  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/user/dashboard",
    },
    {
      title: "My Bookings",
      path: "/user/my-bookings",
    },
    {
      title: "Wishlist",
      path: "/user/wishlist",
    },
    {
      title: "Profile",
      path: "/user/profile",
    },
    {
      title: "Settings",
      path: "/user/settings",
    },
  ];

  useEffect(() => {
    const getUser = async () =>{
        const{
          data:{user},
        } = await supabase.auth.getUser();

        setUser(user);
    };
     getUser();
  }, []);

  return (
    <Box
      sx={{
        width: 280,
        minHeight: "100vh",
        bgcolor: "#113d48",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* User Info */}
      <Box
        sx={{
          p: 3,
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 2,
          }}
        />

        <Typography fontWeight={700}>
          {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
          }}
        >
          {user?.email || ""}
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,.15)" }} />

      {/* Menu */}
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              bgcolor:
                location.pathname === item.path
                  ? "rgba(255,255,255,.15)"
                  : "transparent",

              "&:hover": {
                bgcolor: "rgba(255,255,255,.15)",
              },
            }}
          >
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>

      {/* Logout Bottom */}
      <Box sx={{ mt: "auto", p: 2 }}>
        <Divider sx={{ bgcolor: "rgba(255,255,255,.15)", mb: 2 }} />

        <ListItemButton
          sx={{
            borderRadius: 2,

            "&:hover": {
              bgcolor: "rgba(255,255,255,.15)",
            },
          }}
        >
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}

export default Sidebar;