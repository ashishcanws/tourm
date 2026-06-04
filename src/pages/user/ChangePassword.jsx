// src/pages/user/ChangePassword.jsx
import { useState } from "react";
import {
  Box, Typography, Card, TextField, Button,
  Alert, CircularProgress, InputAdornment, IconButton, Divider
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { supabase } from "../../supabase";

export default function ChangePassword() {
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow]     = useState({ new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError]     = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.newPassword || !form.confirmPassword) {
      setError("Please fill in both fields."); return;
    }
    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters long."); return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match."); return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const { error } = await supabase.auth.updateUser({
        password: form.newPassword,
      });

      if (error) throw error;

      setSuccess("Password changed successfully!");
      setForm({ newPassword: "", confirmPassword: "" });
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Box sx={{mb:3}}>
        <Typography variant="h4" sx={{ color: "#000", fontWeight: "700", mb: "15px" }} >
          Change Password
        </Typography>
        <Typography color="text.secondary" sx={{ color: "#000", fontWeight: "500", fontSize: "18px" }} mt={0.5}>
          Update Your Password
        </Typography>
      </Box>

      <Card
        elevation={0}
        sx={{
          p: 4, borderRadius: 3,
          border: "1px solid #eee",
          maxWidth: 520,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 64, height: 64,
            borderRadius: 3,
            bgcolor: "#E9F6F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 32, color: "#20c5f7" }} />
        </Box>

        {error   && <Alert severity="error"   sx={{ mb: 3 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

        <Divider sx={{ mb: 3 }} />

        {/* New Password */}
        <TextField
          fullWidth
          label="New Password"
          name="newPassword"
          type={show.new ? "text" : "password"}
          value={form.newPassword}
          onChange={handleChange}
          sx={{ mb: 2.5, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow((p) => ({ ...p, new: !p.new }))}>
                  {show.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password */}
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type={show.confirm ? "text" : "password"}
          value={form.confirmPassword}
          onChange={handleChange}
          sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow((p) => ({ ...p, confirm: !p.confirm }))}>
                  {show.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            backgroundColor: "#113d48",
            borderRadius: "50px",
            py: 1.5,
            textTransform: "none",
            fontWeight: 600,
            fontSize: 16,
            "&:hover": { backgroundColor: "#0c2d35" },
          }}
        >
          {loading
            ? <CircularProgress size={22} color="inherit" />
            : "Change Your Password"
          }
        </Button>
      </Card>
    </Box>
  );
}