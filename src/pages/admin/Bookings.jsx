// src/pages/admin/Bookings.jsx
import { useState, useEffect } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Skeleton, Alert,
  TextField, InputAdornment, MenuItem, Select, FormControl
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { supabase } from "../../supabase";

const STATUS_COLORS = {
  pending: "warning",
  confirmed: "success",
  cancelled: "error",
};

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    }
  };

  const filtered = bookings.filter(
    (b) =>
      b.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.tour_title?.toLowerCase().includes(search.toLowerCase()) ||
      b.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center"}} mb={3}>
        <Box sx={{mb:3}}>
          <Typography variant="h4" sx={{ color: "#000", fontWeight: "700" }}>All Bookings</Typography>
          <Typography color="text.secondary" sx={{ color: "#000", fontWeight: "500", fontSize: "18px" }} mt={0.5}>{bookings.length} total bookings</Typography>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        placeholder="Search by name, email, tour..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ mb: 2, width: 320 }}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        }}
      />

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
              <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 700 }}>
                Guest
              </TableCell>

              <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 700 }}>
                Tour
              </TableCell>

              <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 700 }}>
                Travel Date
              </TableCell>

              <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 700 }}>
                Guests
              </TableCell>

              <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 700 }}>
                Total Amount
              </TableCell>

              <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 700 }}>
                Status
              </TableCell>

              <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 700 }}>
                Booked On
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(7)].map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  sx={{
                    py: 6,
                    color: "text.secondary",
                  }}
                >
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((b) => (
                <TableRow
                  key={b.id}
                  hover
                  sx={{
                    transition: "0.2s",
                    "&:hover": {
                      bgcolor: "#f8fbfc",
                    },
                  }}
                >
                  {/* Guest */}
                  <TableCell>
                    <Box>
                      <Typography sx={{font:"16px", fontWeight:"600"}}>
                        {b.first_name} {b.last_name}
                      </Typography>
                     
                    </Box>
                  </TableCell>

                  {/* Tour */}
                  <TableCell>
                    <Typography sx={{font:"16px", fontWeight:"600"}} fontWeight={500}>
                      {b.tour_title}
                    </Typography>
                  </TableCell>

                  {/* Travel Date */}
                  <TableCell sx={{font:"16px", fontWeight:"600"}}>
                    {new Date(
                      b.travel_date
                    ).toLocaleDateString("en-IN")}
                  </TableCell>

                  {/* Guests */}
                  <TableCell sx={{font:"16px", fontWeight:"600"}}>
                    {b.guests}
                  </TableCell>

                  {/* Amount */}
                  <TableCell>
                    <Typography
                      sx={{font:"16px", fontWeight:"600", color:"#14a6d8"}}>
                      ₹{Number(b.total || 0).toLocaleString("en-IN")}
                    </Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <FormControl
                      size="small"
                      sx={{
                        minWidth: 140,
                      }}
                    >
                      <Select
                        value={b.status || "pending"}
                        onChange={(e) =>
                          handleStatusChange(
                            b.id,
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="pending">
                          Pending
                        </MenuItem>

                        <MenuItem value="confirmed">
                          Confirmed
                        </MenuItem>

                        <MenuItem value="cancelled">
                          Cancelled
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>

                  {/* Created Date */}
                  <TableCell sx={{font:"16px", fontWeight:"600"}} >
                    {new Date(
                      b.created_at
                    ).toLocaleDateString("en-IN")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}