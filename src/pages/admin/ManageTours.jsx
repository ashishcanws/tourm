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
      <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:4}}>
        <Box>
          <Typography variant="h4" sx={{ color: "#000", fontWeight: "700" }}>
            Manage Tours
          </Typography>
          <Typography color="text.secondary" sx={{ color: "#000", fontWeight: "500", fontSize: "18px" }} mt={0.5}>{tours.length} tours total</Typography>
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
        sx={{
          borderRadius: 3,
          border: "1px solid #eee",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#113d48" }}>
              <TableCell sx={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>
                Tour
              </TableCell>

              <TableCell sx={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>
                Location
              </TableCell>

              <TableCell sx={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>
                Price
              </TableCell>

              <TableCell sx={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>
                Duration
              </TableCell>

              <TableCell
                align="center"
                sx={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(6)].map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{
                    py: 6,
                    color: "text.secondary",
                  }}
                >
                  No tours found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((tour) => (
                <TableRow
                  key={tour.slug}
                  hover
                  sx={{
                    transition: "0.2s",
                    "&:hover": {
                      bgcolor: "#f8fbfc",
                    },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      <Avatar
                        src={tour.image}
                        variant="rounded"
                        sx={{
                          width: 60,
                          height: 42,
                          borderRadius: 2,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: "#000",
                          fontWeight: "600"
                        }}
                      >
                        {tour.title}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{
                    fontSize: "16px",
                    color: "#000",
                    fontWeight: "600"
                  }}>
                    {tour.location}
                  </TableCell>

                  <TableCell sx={{
                    fontSize: "16px",
                    color: "#14a6d8",
                    fontWeight: "600"
                  }}>
                    <Typography
                      fontWeight={700}
                      color="#14a6d8"
                    >
                      ${Number(tour.price || 0).toLocaleString("en-IN")}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{
                    fontSize: "16px",
                    color: "#000",
                    fontWeight: "600"
                  }}>
                    {tour.days} Days
                  </TableCell>



                  <TableCell align="center">
                    <Tooltip title="View Tour">
                      <IconButton
                        size="small"
                        onClick={() =>
                          window.open(
                            `/tours/${tour.slug}`,
                            "_blank"
                          )
                        }
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit Tour">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() =>
                          navigate(
                            `/admin/tours/edit/${tour.slug}`
                          )
                        }
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Tour">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() =>
                          setDeleteDialog({
                            open: true,
                            tour,
                          })
                        }
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() =>
          setDeleteDialog({
            open: false,
            tour: null,
          })
        }
      >
        <DialogTitle>
          Delete Tour
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete
            <b> "{deleteDialog.tour?.title}" </b>?
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setDeleteDialog({
                open: false,
                tour: null,
              })
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <CircularProgress size={20} />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}