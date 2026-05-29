import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Link,
  Grid,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("https://tourm-react.netlify.app/assets/img/bg/tour_bg_1.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        py: 4,
      }}
    >
      <Card
        sx={{
          width: 600,
          p: 3,
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <CardContent>
          {/* LOGO */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img
              src="https://tourm-react.netlify.app/assets/img/logo.svg"
              alt="logo"
              style={{
                height: 60,
                filter: "brightness(0) invert(0)",
              }}
            />
          </Box>

          {/* HEADING */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 3,
            }}
          >
            Create your account
          </Typography>

          <Box className="two-grid" container spacing={2}>
            {/* FIRST NAME */}
            <Box sx={{marginBottom:'15px'}}>
              <TextField
                fullWidth
                label="First Name"
                type="text"
              />
            </Box>

            {/* LAST NAME */}
            <Box sx={{marginBottom:'15px'}}>
              <TextField
                fullWidth
                label="Last Name"
                type="text"
              />
            </Box>

            {/* EMAIL */}
            <Box sx={{marginBottom:'15px'}}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
              />
            </Box>

            {/* PHONE */}
            <Box sx={{marginBottom:'15px'}}>
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
              />
            </Box>

            {/* PASSWORD */}
            <Box sx={{marginBottom:'15px'}}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* CONFIRM PASSWORD */}
            <Box sx={{marginBottom:'0px'}}>
              <TextField
                fullWidth
                label="Confirm Password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>

          {/* SIGNUP BUTTON */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1,
              borderRadius: 2,
              background: "#1ca8cb",
              fontSize: "18px",
              mb:2,
            }}
          >
            Sign Up
          </Button>

          {/* LOGIN LINK */}
          <Typography
            textAlign="center"
            mt={2}
            fontSize="14px"
          >
            Already have an account?{" "}
            <Link href="/login" underline="hover">
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;