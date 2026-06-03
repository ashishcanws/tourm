import React from "react";
import {AppBar, Toolbar, Box, Typography, Button, Container, MenuItem, Select, Menu,} from "@mui/material";
import { useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const Header = () => {

const [language, setLanguage] = useState("en");

const handleLanguageChange = (event) => {
  const lang = event.target.value;
  setLanguage(lang);

  const googleSelect = document.querySelector(".goog-te-combo");

  if (googleSelect) {
    googleSelect.value = lang;
    googleSelect.dispatchEvent(new Event("change"));
  }

  document.documentElement.dir =
    lang === "ar" ? "rtl" : "ltr";
};

  return (
    <>
      {/* TOP HEADER */}
      <Box
        sx={{
          borderBottom: "1px solid #E5E5E5",
          background: "#fff",
          width: "100%",
        }}
      >
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
            {/* LEFT */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
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

                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "#000",
                    fontWeight: 500,
                  }}
                >
                  45 New Eskaton Road, Austria
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AccessTimeOutlinedIcon sx={{ fontSize: 18, color: "#000" }} />

                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "#000",
                    fontWeight: 500,
                  }}
                >
                  Sun to Friday: 8.00 am - 7.00 pm
                </Typography>
              </Box>
            </Box>

            {/* RIGHT */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Select
                value={language}
                onChange={handleLanguageChange}
                defaultValue="Language"
                variant="outlined"
                size="small"
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  height: "38px",
                  borderRadius: "30px",
                  minWidth: "140px",

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D9D9D9",
                  },

                  "& .MuiSelect-select": {
                    py: 1,
                    fontSize:"15px",
                  },
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
                sx={{
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                FAQ
              </Typography>

              <Typography
                sx={{
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Support
              </Typography>

              <Typography
                sx={{
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Sign In / Register
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* MAIN HEADER */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "#fff",
          color: "#000",
          width: "100%",
        }}
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
          {/* LOGO */}
          <Box
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
            }}
          >
            <Box
              component="img"
              src="https://tourm-react.netlify.app/assets/img/logo.svg"
              alt="logo"
              sx={{
                width: "160px",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* MENU */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              flex: 1,
              justifyContent: "center",
            }}
          >
            {/* HOME */}
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
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                Home
              </Typography>

              <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />

              {/* DROPDOWN */}
              <Box
                className="dropdown"
                sx={{
                  position: "absolute",
                  top: "60px",
                  left: 0,
                  width: "220px",
                  background: "#fff",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  opacity: 0,
                  visibility: "hidden",
                  transition: "0.3s",
                  zIndex: 99,
                }}
              >
                {["Home One", "Home Two", "Home Three"].map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      px: 3,
                      py: 2,
                      cursor: "pointer",
                      borderBottom: "1px solid #f1f1f1",

                      "&:hover": {
                        background: "#f7f7f7",
                      },
                    }}
                  >
                    {item}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* OTHER MENUS */}
            {[
              "About Us",
              "Destination",
              "Service",
              "Activities",
              "Pages",
              "Blog",
              "Contact Us",
            ].map((item, index) => (
              	<Box
					key={index}
					sx={{
					display: "flex",
					alignItems: "center",
					gap: 0.5,
					cursor: "pointer",
					}}
              	>
					<Typography
						sx={{
							fontSize: "18px",
							fontWeight: 500,
						}}
					>
						{item}
					</Typography>

					{[
						"Destination",
						"Service",
						"Activities",
						"Pages",
						"Blog",
					].includes(item) && (
						<KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
					)}
              	</Box>
            ))}
          </Box>

          {/* BUTTON */}
          <Box sx={{ pr: 4 }}>
            <Button
              variant="contained"
              endIcon={<ArrowOutwardIcon />}
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
                  background: "#0D4453",
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
}

export default Header;
