// src/pages/user/Profile.jsx
import { useState, useEffect } from "react";
import {
  Box, Typography, Card, TextField, Button,
  Alert, CircularProgress, Avatar, Divider, Grid
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { supabase } from "../../supabase";

export default function Profile() {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError]     = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        setForm({
          first_name: user?.user_metadata?.first_name || "",
          last_name:  user?.user_metadata?.last_name  || "",
          phone:      user?.user_metadata?.phone       || "",
          email:      user?.email || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: form.first_name,
          last_name:  form.last_name,
          phone:      form.phone,
        },
      });

      if (error) throw error;
      setSuccess("Profile Updated Successfully!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const firstName = form.first_name;
  const lastName  = form.last_name;
  const initials  = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

  if (loading) {
    return (
      <Box p={3}>
        <Typography variant="h4" sx={{ color: "#000", fontWeight: "700", mb: "15px" }} >Profile</Typography>
        <Card elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid #eee" }}>
          {[...Array(4)].map((_, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Box sx={{ width: 100, height: 16, bgcolor: "#eee", borderRadius: 1, mb: 1 }} />
              <Box sx={{ width: "100%", height: 56, bgcolor: "#f5f5f5", borderRadius: 1 }} />
            </Box>
          ))}
        </Card>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box sx={{mb:"20px"}}>
        <Typography variant="h4" sx={{ color: "#000", fontWeight: "700", mb: "15px" }} >Profile</Typography>
        <Typography color="text.secondary" sx={{ color: "#000", fontWeight: "500", fontSize: "18px" }} mt={0.5}>
          Update Your Personal Information
        </Typography>
      </Box>

      {error   && <Alert severity="error"   sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      <Card
        elevation={0}
        sx={{ p: 4, borderRadius: 3, border: "1px solid #eee" }}
      >
        {/* Avatar Section */}
        <Box sx={{display:"flex", alignItems:"center", gap:"20px", mb:4}}>
          <Avatar
            sx={{
              width: 90, height: 90,
              bgcolor: "#113d48",
              fontSize: 32, fontWeight: 700,
              color: "#20c5f7",
            }}
          >
            {initials || "U"}
          </Avatar>
          <Box>
            <Typography sx={{fontSize:"25px", fontWeight:"700", color:"#113d48", mb:1}}>
              {firstName} {lastName}
            </Typography>
            <Typography color="text.secondary" fontSize={14}>
              {form.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Form */}
        <Grid container spacing={3}>
          <Grid item size={{xs:12, md:6}}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={form.email}
              disabled
              helperText="Email cannot be changed."
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
          </Grid>

          <Grid item size={{xs:12, md:6}}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box sx={{mt:4}} display="flex" justifyContent="flex-end" mt={4}>
          <Button
            variant="contained"
            startIcon={saving ? null : <SaveIcon />}
            onClick={handleSave}
            disabled={saving}
            sx={{
              backgroundColor: "#113d48",
              borderRadius: "50px",
              px: 4, py: 1.2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: 15,
              minWidth: 160,
              "&:hover": { backgroundColor: "#0c2d35" },
            }}
          >
            {saving ? <CircularProgress size={22} color="inherit" /> : "Save Profile"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}