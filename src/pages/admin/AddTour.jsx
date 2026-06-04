// src/pages/admin/AddTour.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, Typography, Paper, Alert, CircularProgress,
  Breadcrumbs, Link, Grid, TextField, MenuItem, Divider,
  IconButton, Avatar, Chip
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { supabase } from "../../supabase";

const DIFFICULTIES = ["Easy", "Medium", "Difficult"];

const emptyForm = {
  title: "", slug: "", location: "", price: "",
  days: "", max_group_size: "", difficulty: "Easy",
  rating: "4.5", description: "",
  highlights: [""], included: [""], excluded: [""],
};

export default function AddTour() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Basic field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // Title se auto slug
      ...(name === "title"
        ? {
            slug: value
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, ""),
          }
        : {}),
    }));
  };

  // Image select
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Array field change (highlights, included, excluded)
  const handleArrayChange = (field, index, value) => {
    setForm((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addItem = (field) =>
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));

  const removeItem = (field, index) =>
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));

  // Validation
  const validate = () => {
  if (!form.title.trim()) return "Title is required";
  if (!form.slug.trim()) return "Slug is required";
  if (!form.location.trim()) return "Location is required";
  if (!form.price || Number(form.price) <= 0) return "Invalid price";
  if (!form.days || Number(form.days) <= 0) return "Invalid duration";
  if (!imageFile) return "Cover image is required";

  return null;
};

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); return; }

    try {
      setLoading(true);
      setError("");

      // 1. Image upload Supabase Storage mein
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${form.slug}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("tour-images")          // ← Supabase Storage bucket naam
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // 2. Public URL lo
      const { data: urlData } = supabase.storage
        .from("tour-images")
        .getPublicUrl(fileName);

      const imageUrl = urlData.publicUrl;

      // 3. Tours table mein insert karo
      const { error: insertError } = await supabase.from("tours").insert([
        {
          title: form.title,
          slug: form.slug,
          location: form.location,
          price: Number(form.price),
          days: Number(form.days),
          max_group_size: Number(form.max_group_size) || 20,
          difficulty: form.difficulty,
          rating: Number(form.rating) || 4.5,
          description: form.description,
          image: imageUrl,
          highlights: form.highlights.filter(Boolean),
          included: form.included.filter(Boolean),
          excluded: form.excluded.filter(Boolean),
        },
      ]);

      if (insertError) throw insertError;

      navigate("/admin/tours");
    } catch (err) {
      setError(err.message || "Failed to create tour.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Breadcrumbs sx={{ mb: 1 }}>
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/tours")}
        >
          Manage Tours
        </Link>
        <Typography color="text.primary">Add New Tour</Typography>
      </Breadcrumbs>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700} color="#113d48">
          Add New Tour
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/admin/tours")}>
          Back
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Paper
        elevation={0}
        sx={{ p: 4, border: "1px solid", borderColor: "divider", borderRadius: 3 }}
      >
        <Grid container spacing={3}>

          {/* ── Basic Info ── */}
          <Grid item size={{xs:12}}>
            <Typography variant="h5" sx={{color:"#000", fontWeight:700}}>
              Basic Information
            </Typography>
            <Divider sx={{ mt: 1 }} />
          </Grid>

          <Grid item size={{xs:12, md:3}}>
            <TextField
              fullWidth label="Tour Title *" name="title"
              value={form.title} onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:3}}>
            <TextField
              fullWidth label="Slug *" name="slug"
              value={form.slug} onChange={handleChange}
              helperText="Automatically generated from the title."
            />
          </Grid>

          <Grid item size={{xs:12, md:3}}>
            <TextField
              fullWidth label="Location *" name="location"
              value={form.location} onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:3}}>
            <TextField
              select fullWidth label="Difficulty" name="difficulty"
              value={form.difficulty} onChange={handleChange}
            >
              {DIFFICULTIES.map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item size={{xs:12, md:3}}>
            <TextField
              fullWidth label="Price (USD) *" name="price"
              type="number" value={form.price} onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:3}}>
            <TextField
              fullWidth label="Duration (Days) *" name="days"
              type="number" value={form.days} onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:3}}>
            <TextField
              fullWidth label="Max Group Size" name="max_group_size"
              type="number" value={form.max_group_size} onChange={handleChange}
            />
          </Grid>

          <Grid item size={{xs:12, md:3}}>
            <TextField
              fullWidth label="Rating" name="rating"
              type="number" value={form.rating} onChange={handleChange}
              inputProps={{ min: 1, max: 5, step: 0.1 }}
            />
          </Grid>

          {/* ── Description ── */}
          <Grid item size={{xs:12, md:12}}>
            <Typography variant="h5" sx={{color:"#000", fontWeight:700}}>
              Description
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <TextField
              fullWidth multiline rows={4} label="Tour Description"
              name="description" value={form.description} onChange={handleChange}
            />
          </Grid>

          {/* ── Image ── */}
          <Grid item size={{xs:12, md:12}}>
            <Typography variant="h5" sx={{color:"#000", fontWeight:700}}>
              Cover Image *
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Box display="flex" alignItems="center" gap={3}>
              {imagePreview && (
                <Avatar
                  src={imagePreview}
                  variant="rounded"
                  sx={{ width: 120, height: 80 }}
                />
              )}
              <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
                {imagePreview ? "Change Image" : "Upload Image"}
                <input type="file" accept="image/*" hidden onChange={handleImage} />
              </Button>
              {imagePreview && <Chip label="Selected" color="success" size="small" />}
            </Box>
          </Grid>

          {/* ── Array Fields ── */}
          <Grid item size={{xs:12, md:12}}>
            <Typography variant="h5" sx={{color:"#000", fontWeight:700}}>
              Tour Details
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
          </Grid>

          {/* Highlights */}
          <Grid item size={{xs:12, md:4}}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontWeight={600}>Highlights</Typography>
              <Button size="small" startIcon={<AddIcon />} onClick={() => addItem("highlights")}>
                Add
              </Button>
            </Box>
            {form.highlights.map((item, i) => (
              <Box key={i} display="flex" gap={1} mb={1} sx={{position:"relative", mb:2}}>
                <TextField
                  fullWidth size="small" placeholder="e.g. Sunrise view"
                  value={item}
                  onChange={(e) => handleArrayChange("highlights", i, e.target.value)}
                />
                <IconButton sx={{position:"absolute", right:"0"}} color="error" onClick={() => removeItem("highlights", i)}
                  disabled={form.highlights.length === 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Grid>

          {/* Included */}
          <Grid item size={{xs:12, md:4}}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontWeight={600}>Included</Typography>
              <Button size="small" startIcon={<AddIcon />} onClick={() => addItem("included")}>
                Add
              </Button>
            </Box>
            {form.included.map((item, i) => (
              <Box key={i} display="flex" gap={1} mb={1} sx={{position:"relative", mb:2}}>
                <TextField
                  fullWidth size="small" placeholder="e.g. Hotel stay"
                  value={item}
                  onChange={(e) => handleArrayChange("included", i, e.target.value)}
                />
                <IconButton sx={{position:"absolute", right:"0"}} color="error" onClick={() => removeItem("included", i)}
                  disabled={form.included.length === 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Grid>

          {/* Excluded */}
          <Grid item size={{xs:12, md:4}}>
            <Box sx={{position:"relative"}} mb={1}>
              <Typography fontWeight={600}>Excluded</Typography>
              <Button size="small" startIcon={<AddIcon />} onClick={() => addItem("excluded")}>
                Add
              </Button>
            </Box>
            {form.excluded.map((item, i) => (
              <Box key={i} display="flex" gap={1} mb={1} sx={{position:"relative", mb:2}} mb={1}>
                <TextField
                  fullWidth size="small" placeholder="e.g. Flights"
                  value={item}
                  onChange={(e) => handleArrayChange("excluded", i, e.target.value)}
                />
                <IconButton sx={{position:"absolute", right:"0"}} color="error" onClick={() => removeItem("excluded", i)}
                  disabled={form.excluded.length === 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Grid>
        </Grid>

        {/* Submit */}
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"end", gap:2, mt:4}}>
          <Button variant="outlined" onClick={() => navigate("/admin/tours")}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={loading ? null : <SaveIcon />}
            onClick={handleSubmit}
            disabled={loading}
            sx={{ minWidth: 140, backgroundColor: "#113d48" }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : "Create Tour"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}