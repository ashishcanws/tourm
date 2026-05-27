import React from "react";
import {Box, Grid, Typography, TextField, Button, IconButton, Link,} from "@mui/material";

import { Facebook, Twitter, LinkedIn, Instagram, WhatsApp, Call, Email, LocationOn, Send, KeyboardArrowRight,} from "@mui/icons-material";

const galleryImages = [
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
];

const Footer = () => {
  return (
    <>
      {/* TOP FOOTER */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          pt: 10,
          borderTop: "1px solid #e5e5e5",
        }}
      >
        {/* CONTAINER */}
        <Box
          sx={{
            maxWidth: "1440px",
            width: "100%",
            margin: "0 auto",
            px: 2,
          }}
        >
          {/* NEWSLETTER */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              pb: 8,
              borderBottom: "1px solid #ddd",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* LEFT */}
            <Box sx={{ flex: "1 1 50%", minWidth: "300px" }}>
              <Typography
                sx={{
                  fontSize: { xs: "36px", md: "52px" },
                  fontWeight: 700,
                  color: "#123845",
                  lineHeight: 1.2,
                }}
              >
                Get Updated The Latest Newsletter
              </Typography>
            </Box>

            {/* RIGHT */}
            <Box
              sx={{
                flex: "1 1 50%",
                minWidth: "300px",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <TextField
                placeholder="Enter Email"
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    backgroundColor: "#fff",
                    height: "64px",
                  },
                }}
              />

              	<Button
                	variant="contained"
                	endIcon={<Send />}
					sx={{
					whiteSpace: "nowrap",
					borderRadius: "50px",
					width: "300px",
					backgroundColor: "#083b4c",
					height: "64px",
					textTransform: "none",
					fontSize: "18px",
					fontWeight: 600,
					boxShadow: "none",
					px: 3,
					"&:hover": {
						backgroundColor: "#0b4b60",
						boxShadow: "none",
					},
					}}
				>
                Subscribe
              </Button>
            </Box>
          </Box>

          {/* MAIN FOOTER */}
          <Box className="footer-grid">
            {/* COLUMN 1 */}
            <Box className="footer-col">
              	<Box sx={{ mb: 3 }}>
					<Typography
					sx={{
						fontSize: "42px",
						fontWeight: 700,
						color: "#123845",
					}}
					>
					Tourm
					</Typography>

					<Typography
					sx={{
						color: "#666",
						mt: 3,
						lineHeight: 1.9,
						fontSize: "16px",
					}}
					>
					Rapidiously myocardinate cross-platform intellectual capital
					model. Appropriately create interactive infrastructures
					</Typography>
              	</Box>

              	<Box sx={{ display: "flex", gap: 1.5 }}>
					{[
					<Facebook />,
					<Twitter />,
					<LinkedIn />,
					<WhatsApp />,
					<Instagram />,
					].map((icon, index) => (
					<IconButton
						key={index}
						sx={{
						width: 42,
						height: 42,
						backgroundColor: "#eaf6fa",
						color: "#14a6d8",
						}}
					>
						{icon}
					</IconButton>
					))}
              	</Box>
            </Box>

            {/* COLUMN 2 */}
            <Box className="footer-col">
				<Typography
					sx={{
					fontSize: "30px",
					fontWeight: 700,
					color: "#123845",
					mb: 3,
					}}
				>
					Quick Links
				</Typography>

				{[
					"Home",
					"About us",
					"Our Service",
					"Terms of Service",
					"Tour Booking Now",
					].map((item, index) => (
					<Box
					key={index}
					sx={{
						display: "flex",
						alignItems: "center",
						mb: 2,
					}}
					>
					<KeyboardArrowRight sx={{ color: "#777" }} />

					<Link
						href="#"
						underline="none"
						sx={{
						color: "#777",
						fontSize: "18px",
						}}
					>
						{item}
					</Link>
					</Box>
              	))}
            </Box>

            {/* COLUMN 3 */}
            <Box className="footer-col">
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#123845",
                  mb: 3,
                }}
              >
                Address
              </Typography>

              <Box sx={{ display: "flex", mb: 4 }}>
                <Call sx={{ mr: 2, color: "#14a6d8" }} />

                <Box>
                  <Typography>+01 234 567 890</Typography>
                  <Typography>+09 876 543 210</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", mb: 4 }}>
                <Email sx={{ mr: 2, color: "#14a6d8" }} />

                <Box>
                  <Typography>mailinfo00@tourm.com</Typography>
                  <Typography>support24@tourm.com</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex" }}>
                <LocationOn sx={{ mr: 2, color: "#14a6d8" }} />

                <Typography>
                  789 Inner Lane, Holy park,
                  <br />
                  California, USA
                </Typography>
              </Box>
            </Box>

            {/* COLUMN 4 */}
            <Box className="footer-col">
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#123845",
                  mb: 3,
                }}
              >
                Instagram Post
              </Typography>

              <Box className="insta-grid">
                {galleryImages.map((img, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={`${img}?w=200`}
                    alt="gallery"
                    sx={{
                      width: "100%",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* COPYRIGHT SECTION */}
        <Box
          sx={{
            backgroundImage:
              "url('https://tourm-react.netlify.app/assets/img/bg/copyright_bg_1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            py: 3,
          }}
        >
          <Box
            sx={{
              maxWidth: "1440px",
              width: "100%",
              margin: "0 auto",
              px: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                Copyright 2025 Tourm. All Rights Reserved.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  We Accept
                </Typography>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {["MasterCard", "Visa", "PayPal", "Apple Pay"].map(
                    (item, index) => (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          px: 2,
                          py: 1,
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#222",
                        }}
                      >
                        {item}
                      </Box>
                    )
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
