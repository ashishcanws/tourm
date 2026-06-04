import React, { useState } from "react";
import {
  AppBar, Toolbar, Box, Typography, Button,
  Container, MenuItem, Select,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

// ── Nav config — edit here to add/remove items ──────────────────────────────
const NAV_ITEMS = [
  {
    label: "Home",
    path: "/",
    dropdown: [
      { label: "Home One",   path: "/" },
      { label: "Home Two",   path: "/" },
      { label: "Home Three", path: "/" },
    ],
  },
  { label: "About Us",    path: "/about" },
  {
    label: "Destination",
    path: "/destinations",
    dropdown: [
      { label: "All Destinations", path: "/destinations" },
    ],
  },
  {
    label: "Service",
    path: "/tours",
    dropdown: [
      { label: "Tour Listing", path: "/tours" },
      { label: "Tour Details", path: "/tours" },
    ],
  },
  {
    label: "Activities",
    path: "/tours",
    dropdown: [
      { label: "All Tours", path: "/tours" },
    ],
  },
  {
    label: "Pages",
    path: "#",
    dropdown: [
      { label: "Login",    path: "/login" },
      { label: "Sign Up",  path: "/sign" },
      { label: "Booking",  path: "/booking" },
      { label: "Dashboard",       path: "/user/dashboard" },
      { label: "My Bookings",     path: "/user/my-bookings" },
      { label: "Profile",         path: "/user/profile" },
      { label: "Change Password", path: "/user/change-password" },
    ],
  },
  {
    label: "Blog",
    path: "#",
    dropdown: [
      { label: "Latest Posts", path: "#" },
    ],
  },
  { label: "Contact Us", path: "/contact" },
];

// ── NavItem component ────────────────────────────────────────────────────────
const NavItem = ({ item }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      cursor: "pointer",
      position: "relative",

      "&:hover .dropdown": {
        opacity: 1,
        visibility: "visible",
        top: "45px",
      },
    }}
  >
    <Typography
      component={Link}
      to={item.path}
      sx={{
        fontSize: "18px",
        fontWeight: 500,
        color: "#000",
        textDecoration: "none",
        "&:hover": { color: "#0D4453" },
      }}
    >
      {item.label}
    </Typography>

    {item.dropdown && <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />}

    {/* Dropdown */}
    {item.dropdown && (
      <Box
        className="dropdown"
        sx={{
          position: "absolute",
          top: "60px",
          left: 0,
          minWidth: "220px",
          background: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
          opacity: 0,
          visibility: "hidden",
          transition: "0.3s",
          zIndex: 99,
        }}
      >
        {item.dropdown.map((sub, i) => (
          <Box
            key={i}
            component={Link}
            to={sub.path}
            sx={{
              display: "block",
              px: 3,
              py: 1.8,
              fontSize: "15px",
              color: "#333",
              textDecoration: "none",
              borderBottom: "1px solid #f1f1f1",
              "&:hover": { background: "#f7f7f7", color: "#0D4453" },
            }}
          >
            {sub.label}
          </Box>
        ))}
      </Box>
    )}
  </Box>
);

// ── Header ───────────────────────────────────────────────────────────────────
const Header = () => {
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    setLanguage(lang);

    const googleSelect = document.querySelector(".goog-te-combo");
    if (googleSelect) {
      googleSelect.value = lang;
      googleSelect.dispatchEvent(new Event("change"));
    }

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <>
      {/* ── TOP BAR ── */}
      <Box sx={{ borderBottom: "1px solid #E5E5E5", background: "#fff", width: "100%" }}>
        <Container maxWidth={false}>
          <Box
            sx={{
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 4,
            }}
          >
            {/* Left info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  borderRight: "1px solid #D9D9D9",
                  pr: 4,
                }}
              >
                <LocationOnOutlinedIcon sx={{ fontSize: 18, color: "#000" }} />
                <Typography sx={{ fontSize: "15px", color: "#000", fontWeight: 500 }}>
                  45 New Eskaton Road, Austria
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccessTimeOutlinedIcon sx={{ fontSize: 18, color: "#000" }} />
                <Typography sx={{ fontSize: "15px", color: "#000", fontWeight: 500 }}>
                  Sun to Friday: 8.00 am - 7.00 pm
                </Typography>
              </Box>
            </Box>

            {/* Right controls */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Select
                value={language}
                onChange={handleLanguageChange}
                variant="outlined"
                size="small"
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  height: "38px",
                  borderRadius: "30px",
                  minWidth: "140px",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#D9D9D9" },
                  "& .MuiSelect-select": { py: 1, fontSize: "15px" },
                }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hi">Hindi</MenuItem>
                <MenuItem value="ar">Arabic</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="de">German</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
              </Select>

              <Typography
                component={Link}
                to="#faq"
                sx={{ fontSize: "15px", color: "#000", textDecoration: "none", cursor: "pointer" }}
              >
                FAQ
              </Typography>

              <Typography
                component={Link}
                to="/contact"
                sx={{ fontSize: "15px", color: "#000", textDecoration: "none", cursor: "pointer" }}
              >
                Support
              </Typography>

              <Typography
                component={Link}
                to="/login"
                sx={{ fontSize: "15px", color: "#000", textDecoration: "none", cursor: "pointer" }}
              >
                Sign In / Register
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── MAIN HEADER ── */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ background: "#fff", color: "#000", width: "100%" }}
      >
        <Toolbar
          disableGutters
          sx={{
            height: "95px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            px: 0,
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              width: "370px",
              height: "95px",
              backgroundImage:
                "url('https://tourm-react.netlify.app/assets/img/logo_bg_mask.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              px: 5,
              flexShrink: 0,
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src="https://tourm-react.netlify.app/assets/img/logo.svg"
              alt="logo"
              sx={{ width: "160px", objectFit: "contain" }}
            />
          </Box>

          {/* Nav */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              flex: 1,
              justifyContent: "center",
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <NavItem key={i} item={item} />
            ))}
          </Box>

          {/* CTA Button */}
          <Box sx={{ pr: 4 }}>
            <Button
              variant="contained"
              endIcon={<ArrowOutwardIcon />}
              component={Link}
              to="/booking"
              sx={{
                width: "180px",
                height: "56px",
                borderRadius: "40px",
                background: "#0D4453",
                textTransform: "none",
                fontSize: "20px",
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": {
                  background: "#1a6b82",
                  boxShadow: "none",
                },
              }}
            >
              Book Now
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;