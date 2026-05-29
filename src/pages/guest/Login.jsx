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
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
      }}
    >
      <Card sx={{ width: 500, p: 3, borderRadius: 3, boxShadow: 5 }}>

        <CardContent>

          {/* LOGO */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img
              src="https://tourm-react.netlify.app/assets/img/logo.svg"
              alt="logo"
              style={{
                height: 60,
                filter: "brightness(0) invert(0)", // white color effect
              }}
            />
          </Box>

          {/* HEADING */}
          <Typography
            variant="h5"
            mb={3}

            sx={{ fontWeight: "700", marginBottom: "20px", textAlign: "center" }}
          >
            Sign in to your account
          </Typography>

          {/* EMAIL */}
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
          />

          {/* PASSWORD */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* FORGOT PASSWORD */}
          <Box textAlign="right" mt={1}>
            <Link href="#" underline="hover" fontSize="14px">
              Forgot password?
            </Link>
          </Box>

          {/* LOGIN BUTTON */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1, borderRadius: 2, mb: 2, background: '#1ca8cb', fontSize: '18px' }}
          >
            Sign In
          </Button>

          {/* SIGNUP */}
          <Typography textAlign="center" mt={2} fontSize="14px">
            Don’t have an account?{" "}
            <Link href="#" underline="hover">
              Sign up
            </Link>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;