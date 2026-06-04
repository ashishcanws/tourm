// src/pages/admin/EditTour.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box, Button, Typography, Paper, Alert, CircularProgress,
  Breadcrumbs, Link, Grid, TextField, MenuItem, Divider,
  IconButton, Avatar, Chip, Skeleton
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { supabase } from "../../supabase";

const DIFFICULTIES = ["Easy", "Medium", "Difficult"];

export default function EditTour() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  // Existing tour fetch karo
  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("tours")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;

        setForm({
          title: data.title || "",
          slug: data.slug || "",
          location: data.location || "",
          price: data.price || "",
          days: data.days || "",
          max_group_size: data.max_group_size || "",
          difficulty: data.difficulty || "Easy",
          rating: data.rating || "4.5",
          description: data.description || "",
          highlights: data.highlights?.length ? data.highlights : [""],
          included: data.included?.length ? data.included : [""],
          excluded: data.excluded?.length ? data.excluded : [""],
        });

        if (data.image) setImagePreview(data.image);
      } catch (err) {
        setError("Tour load nahi hua: " + err.message);
      } finally {
        setPageLoading(false);
      }
    };
    load();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

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

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      setError("");

      let imageUrl = imagePreview; // purana image URL by default

      // Agar naya image select kiya ho
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${form.slug}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("tour-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("tour-images")
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      // Supabase update
      const { error: updateError } = await supabase
        .from("tours")
        .update({
          title: form.title,
          location: form.location,
          price: Number(form.price),
          days: Number(form.days),
          max_group_size: Number(form.max_group_size) || 20,
          difficulty: form.difficulty,
          rating: Number(form.rating),
          description: form.description,
          image: imageUrl,
          highlights: form.highlights.filter(Boolean),
          included: form.included.filter(Boolean),
          excluded: form.excluded.filter(Boolean),
        })
        .eq("slug", slug);

      if (updateError) throw updateError;

      navigate("/admin/tours");
    } catch (err) {
      setError(err.message || "Update nahi hua");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <Box p={3}>
        <Skeleton width={200} height={32} sx={{ mb: 2 }} />
        <Paper elevation={0} sx={{ p: 4, border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={56} sx={{ mb: 2 }} />
          ))}
        </Paper>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Breadcrumbs sx={{ mb: 1 }}>
        <Link underline="hover" color="inherit" sx={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/tours")}>
          Manage Tours
        </Link>
        <Typography color="text.primary">Edit Tour</Typography>
      </Breadcrumbs>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="#113d48">Edit Tour</Typography>
          <Typography color="text.secondary" fontSize={13}>{form?.title}</Typography>
        </Box>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/admin/tours")}>Back</Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Paper elevation={0} sx={{ p: 4, border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={700} color="#113d48">Basic Information</Typography>
            <Divider sx={{ mt: 1 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Tour Title *" name="title"
              value={form.title} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Slug" name="slug"
              value={form.slug} disabled
              helperText="Slug change nahi hota (routing break hogi)" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Location *" name="location"
              value={form.location} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField select fullWidth label="Difficulty" name="difficulty"
              value={form.difficulty} onChange={handleChange}>
              {DIFFICULTIES.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Price (USD) *" name="price"
              type="number" value={form.price} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Duration (Days)" name="days"
              type="number" value={form.days} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Max Group Size" name="max_group_size"
              type="number" value={form.max_group_size} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Rating" name="rating"
              type="number" value={form.rating} onChange={handleChange}
              inputProps={{ min: 1, max: 5, step: 0.1 }} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={700} color="#113d48" mt={1}>Description</Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <TextField fullWidth multiline rows={4} label="Tour Description"
              name="description" value={form.description} onChange={handleChange} />
          </Grid>

          {/* Image */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={700} color="#113d48" mt={1}>Cover Image</Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Box display="flex" alignItems="center" gap={3}>
              {imagePreview && (
                <Avatar src={imagePreview} variant="rounded" sx={{ width: 120, height: 80 }} />
              )}
              <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
                Image Change Karo
                <input type="file" accept="image/*" hidden onChange={handleImage} />
              </Button>
              {imageFile && <Chip label="Naya image select" color="success" size="small" />}
            </Box>
          </Grid>

          {/* Array Fields — same pattern as AddTour */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={700} color="#113d48" mt={1}>Tour Details</Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
          </Grid>

          {["highlights", "included", "excluded"].map((field) => (
            <Grid item xs={12} md={4} key={field}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography fontWeight={600} sx={{ textTransform: "capitalize" }}>{field}</Typography>
                <Button size="small" startIcon={<AddIcon />} onClick={() => addItem(field)}>Add</Button>
              </Box>
              {form[field].map((item, i) => (
                <Box key={i} display="flex" gap={1} mb={1}>
                  <TextField fullWidth size="small" value={item}
                    onChange={(e) => handleArrayChange(field, i, e.target.value)} />
                  <IconButton color="error" onClick={() => removeItem(field, i)}
                    disabled={form[field].length === 1}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          <Button variant="outlined" onClick={() => navigate("/admin/tours")}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={submitLoading ? null : <SaveIcon />}
            onClick={handleSubmit}
            disabled={submitLoading}
            sx={{ minWidth: 160, backgroundColor: "#113d48" }}
          >
            {submitLoading ? <CircularProgress size={22} color="inherit" /> : "Changes Save Karo"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}