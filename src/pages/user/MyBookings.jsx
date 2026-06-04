// src/pages/user/MyBookings.jsx
import { useState, useEffect } from "react";
import {
  Box, Typography, Card, Grid, Chip, Divider,
  Skeleton, Alert, Button
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

const STATUS_CONFIG = {
  pending: { color: "warning", label: "Pending" },
  confirmed: { color: "success", label: "Confirmed" },
  cancelled: { color: "error", label: "Cancelled" },
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { navigate("/login"); return; }

        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  if (loading) {
    return (
      <Box p={3}>
        <Skeleton width={200} height={40} sx={{ mb: 3 }} />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={180}
            sx={{ mb: 2, borderRadius: 3 }} />
        ))}
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box sx={{mb:"20px"}}>
        <Typography variant="h4" sx={{ color: "#000", fontWeight: "700", mb: "15px" }} >
          My Bookings
        </Typography>
        <Typography color="text.secondary" sx={{ color: "#000", fontWeight: "500", fontSize: "18px" }} mt={0.5}>
          View all your bookings in one place.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {bookings.length === 0 ? (
        <Card
          elevation={0}
          sx={{ p: 6, textAlign: "center", border: "1px solid #eee", borderRadius: 3 }}
        >
          <Typography sx={{ color: "#6e7070", fontSize: 20, mb: 2 }}>
            You haven't made any bookings yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/tours")}
            sx={{
              backgroundColor: "#113d48", borderRadius: "50px",
              textTransform: "none", px: 4,
            }}
          >
            Explore Tours
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
         
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #eee",
                overflow: "hidden",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#113d48" }}>
                    <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 600 }}>
                      Tour Name
                    </TableCell>

                    <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 600 }}>
                      Travel Date
                    </TableCell>

                    <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 600 }}>
                      Guests
                    </TableCell>

                    <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 600 }}>
                      Special Request
                    </TableCell>

                    <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 600 }}>
                      Total Amount
                    </TableCell>

                    <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 600 }}>
                      Status
                    </TableCell>

                    <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 600 }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {bookings.map((b) => (
                    <TableRow key={b.id} hover>
                      <TableCell sx={{fontSize:"18px", fontWeight: 600 }}>
                        {b.tour_title}
                      </TableCell>

                      <TableCell sx={{fontSize:"18px", fontWeight: 600}}>
                        {b.travel_date}
                      </TableCell>

                      <TableCell sx={{fontSize:"18px", fontWeight: 600}}>
                        {b.guests}
                      </TableCell>

                      <TableCell sx={{fontSize:"18px", fontWeight: 600}}>
                        {b.special_request || "-"}
                      </TableCell>

                      <TableCell
                        sx={{
                          fontWeight: 700,
                          fontSize:"18px",
                          color: "#14a6d8",
                        }}
                      >
                        ${Number(b.total || 0).toLocaleString("en-IN")}
                      </TableCell>

                      <TableCell>
                        <Chip sx={{fontSize:"16px", fontWeight:"700"}}
                          label={STATUS_CONFIG[b.status]?.label || "Pending"}
                          color={STATUS_CONFIG[b.status]?.color || "warning"}
                          size="small"
                        />
                      </TableCell>

                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => navigate(`/tours/${b.tour_slug}`)}
                          sx={{
                            borderColor: "#113d48",
                            color: "#113d48",
                            fontSize:"16px",
                            fontWeight:"700",
                            textTransform: "none",
                            borderRadius: "20px",
                            "&:hover": {
                              backgroundColor: "#113d48",
                              color: "#fff",
                            },
                          }}
                        >
                          View Tour
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
         
        </Grid>
      )}
    </Box>
  );
}