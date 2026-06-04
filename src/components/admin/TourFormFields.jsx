// src/components/admin/TourFormFields.jsx
import {
  Grid, TextField, MenuItem, Button, Box, Typography,
  IconButton, Chip, Divider, Avatar
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DIFFICULTIES = ["Easy", "Medium", "Difficult"];

const ArrayFieldSection = ({ label, field, items, onChange, onAdd, onRemove, placeholder }) => (
  <Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
      <Typography variant="subtitle2" fontWeight={600}>{label}</Typography>
      <Button size="small" startIcon={<AddIcon />} onClick={() => onAdd(field)}>
        Add
      </Button>
    </Box>
    {items.map((item, i) => (
      <Box key={i} display="flex" gap={1} mb={1}>
        <TextField
          fullWidth size="small"
          placeholder={placeholder}
          value={item}
          onChange={(e) => onChange(field, i, e.target.value)}
        />
        <IconButton color="error" onClick={() => onRemove(field, i)} disabled={items.length === 1}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    ))}
  </Box>
);

export default function TourFormFields({ fields, errors, imagePreview, handlers }) {
  const { handleChange, handleImageChange, handleArrayChange, addArrayItem, removeArrayItem } = handlers;

  return (
    <Grid container spacing={3}>
      {/* ── Basic Info ── */}
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight={700} color="primary">Basic Information</Typography>
        <Divider sx={{ mt: 1 }} />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth label="Tour Title *" name="title"
          value={fields.title} onChange={handleChange}
          error={!!errors.title} helperText={errors.title}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth label="Slug *" name="slug"
          value={fields.slug} onChange={handleChange}
          error={!!errors.slug} helperText={errors.slug || "Auto-generated from title"}
          InputProps={{ startAdornment: <Typography color="text.secondary" mr={0.5}>/tours/</Typography> }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth label="Destination *" name="destination"
          value={fields.destination} onChange={handleChange}
          error={!!errors.destination} helperText={errors.destination}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          select fullWidth label="Difficulty" name="difficulty"
          value={fields.difficulty} onChange={handleChange}
        >
          {DIFFICULTIES.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
        </TextField>
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth label="Price (USD) *" name="price" type="number"
          value={fields.price} onChange={handleChange}
          error={!!errors.price} helperText={errors.price}
          InputProps={{ startAdornment: <Typography color="text.secondary" mr={0.5}>$</Typography> }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth label="Duration (days) *" name="duration" type="number"
          value={fields.duration} onChange={handleChange}
          error={!!errors.duration} helperText={errors.duration}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth label="Max Group Size *" name="maxGroupSize" type="number"
          value={fields.maxGroupSize} onChange={handleChange}
          error={!!errors.maxGroupSize} helperText={errors.maxGroupSize}
        />
      </Grid>

      {/* ── Description ── */}
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight={700} color="primary" mt={1}>Description</Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
        <TextField
          fullWidth multiline rows={5} label="Tour Description *" name="description"
          value={fields.description} onChange={handleChange}
          error={!!errors.description} helperText={errors.description || `${fields.description.length} chars (min 50)`}
        />
      </Grid>

      {/* ── Image Upload ── */}
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight={700} color="primary" mt={1}>Cover Image</Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
        <Box display="flex" alignItems="center" gap={3}>
          {imagePreview && (
            <Avatar src={imagePreview} variant="rounded" sx={{ width: 120, height: 80 }} />
          )}
          <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
            {imagePreview ? "Change Image" : "Upload Image"}
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>
          {imagePreview && (
            <Chip label="Image selected" color="success" size="small" />
          )}
        </Box>
      </Grid>

      {/* ── Array Fields ── */}
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight={700} color="primary" mt={1}>Tour Details</Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
      </Grid>

      <Grid item xs={12} md={4}>
        <ArrayFieldSection
          label="Highlights" field="highlights"
          items={fields.highlights}
          onChange={handleArrayChange} onAdd={addArrayItem} onRemove={removeArrayItem}
          placeholder="e.g. Sunrise at summit"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <ArrayFieldSection
          label="Included" field="included"
          items={fields.included}
          onChange={handleArrayChange} onAdd={addArrayItem} onRemove={removeArrayItem}
          placeholder="e.g. Airport transfers"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <ArrayFieldSection
          label="Excluded" field="excluded"
          items={fields.excluded}
          onChange={handleArrayChange} onAdd={addArrayItem} onRemove={removeArrayItem}
          placeholder="e.g. Travel insurance"
        />
      </Grid>

      {/* ── Start Dates ── */}
      <Grid item xs={12}>
        <ArrayFieldSection
          label="Available Start Dates" field="startDates"
          items={fields.startDates}
          onChange={handleArrayChange} onAdd={addArrayItem} onRemove={removeArrayItem}
          placeholder="YYYY-MM-DD"
        />
      </Grid>
    </Grid>
  );
}