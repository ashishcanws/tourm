// src/pages/admin/ManageTours.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton,
  Avatar, TextField, InputAdornment, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Alert, CircularProgress, Skeleton, Chip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTours } from "../../hooks/useTours";
import { supabase } from "../../supabase";

export default function ManageTours() {
  const navigate = useNavigate();
  const { tours, loading, error, refetch } = useTours();
  const [search, setSearch] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, tour: null });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const filtered = tours.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const { error } = await supabase
        .from("tours")
        .delete()
        .eq("slug", deleteDialog.tour.slug);

      if (error) throw error;

      setSuccessMsg(`"${deleteDialog.tour.title}" delete ho gaya!`);
      setDeleteDialog({ open: false, tour: null });
      refetch(); // list refresh
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="#113d48">
            Manage Tours
          </Typography>
          <Typography color="text.secondary">{tours.length} tours total</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/tours/add")}
          sx={{ borderRadius: 2, backgroundColor: "#113d48" }}
        >
          Add New Tour
        </Button>
      </Box>

      {/* Alerts */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {deleteError && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setDeleteError("")}>{deleteError}</Alert>}
      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

      {/* Search */}
      <TextField
        placeholder="Search by title or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ mb: 2, width: 320 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><b>Tour</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Duration</b></TableCell>
              <TableCell><b>Rating</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading
              ? [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(6)].map((_, j) => (
                      <TableCell key={j}><Skeleton /></TableCell>
                    ))}
                  </TableRow>
                ))
              : filtered.length === 0
              ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 5, color: "text.secondary" }}>
                      No tours found.
                    </TableCell>
                  </TableRow>
                )
              : filtered.map((tour) => (
                  <TableRow key={tour.slug} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          src={tour.image}
                          variant="rounded"
                          sx={{ width: 56, height: 40 }}
                        />
                        <Typography fontWeight={600} fontSize={14}>
                          {tour.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{tour.location}</TableCell>
                    <TableCell><b>${tour.price}</b></TableCell>
                    <TableCell>{tour.days} days</TableCell>
                    <TableCell>
                      <Chip label={`⭐ ${tour.rating}`} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Site pe dekho">
                        <IconButton
                          size="small"
                          onClick={() => window.open(`/tours/${tour.slug}`, "_blank")}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/admin/tours/edit/${tour.slug}`)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteDialog({ open: true, tour })}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, tour: null })}>
        <DialogTitle>Tour Delete Karo</DialogTitle>
        <DialogContent>
          <Typography>
            Kya aap sure ho? <b>"{deleteDialog.tour?.title}"</b> permanently delete ho jaayega.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, tour: null })}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? <CircularProgress size={20} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}