// src/pages/user/Dashboard.jsx
import { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Card, Divider,
  Skeleton, Alert, Button, Chip
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
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

const STATUS_CONFIG = {
  pending: { color: "warning", label: "Pending" },
  confirmed: { color: "success", label: "Confirmed" },
  cancelled: { color: "error", label: "Cancelled" },
};

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
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
    fetchData();
  }, []);

  // Stats calculate
  const totalBookings = bookings.length;
  const totalSpent = bookings.reduce((sum, b) => sum + (b.total || 0), 0);
  const upcoming = bookings.filter((b) => b.status === "confirmed").length;
  const completed = bookings.filter((b) => b.travel_date < new Date().toISOString().split("T")[0]).length;

  const firstName = user?.user_metadata?.first_name || user?.email?.split("@")[0] || "User";

  const stats = [
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: <BookOnlineOutlinedIcon sx={{ fontSize: 32, color: "#20c5f7" }} />,
      bg: "#E9F6F9",
    },
    {
      label: "Total Spent",
      value: `$${totalSpent.toLocaleString()}`,
      icon: <AttachMoneyOutlinedIcon sx={{ fontSize: 32, color: "#20c5f7" }} />,
      bg: "#E9F6F9",
    },
    {
      label: "Confirmed Trips",
      value: upcoming,
      icon: <FlightTakeoffOutlinedIcon sx={{ fontSize: 32, color: "#20c5f7" }} />,
      bg: "#E9F6F9",
    },
    {
      label: "Completed Trips",
      value: completed,
      icon: <CheckCircleOutlinedIcon sx={{ fontSize: 32, color: "#20c5f7" }} />,
      bg: "#E9F6F9",
    },
  ];

  return (
    <Box p={3}>
      {/* Welcome */}
      <Box mb={4}>
        <Typography sx={{ color: "#000", fontWeight: "700", mb: "15px" }} variant="h4" fontWeight={700} color="#113d48">
          Welcome back, {firstName}! 👋
        </Typography>
        <Typography color="text.secondary" sx={{ color: "#000", fontWeight: "500", fontSize: "18px" }} mt={0.5}>
          View all your tours and bookings here
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {stats.map((s) => (
          <Grid item size={{ xs: 12, md: 3 }} sx={{ my: 4 }} key={s.label}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid #eee",
                backgroundColor: "#113d48",
                display: "flex",
                alignItems: "center",
                gap: 2.5,
                height: "100%",
                transition: "all 0.3s ease",

                "&:hover": {
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "18px",
                  bgcolor: "#E9F6F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "#113d48",
                }}
              >
                {s.icon}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  fontSize={13}

                  sx={{
                    textTransform: "capitalize",
                    letterSpacing: 0.5,
                    mb: 0.5,
                    color: "#fff",
                    fontSize: "25px",
                  }}
                >
                  {s.label}
                </Typography>

                {loading ? (
                  <Skeleton width={80} height={40} />
                ) : (
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    lineHeight={1}

                    sx={{
                      color: "#fff",

                    }}
                  >
                    {s.value}
                  </Typography>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Bookings */}
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "15px" }} >
          <Typography variant="h4" sx={{ color: "#113d48", fontWeight: "600" }}>
            Recent Bookings
          </Typography>
          <Button
            size="small"
            onClick={() => navigate("/user/my-bookings")}
            sx={{ color: "#20c5f7", textTransform: "none", fontSize: "18px", fontWeight: 600 }}
          >
            View All →
          </Button>
        </Box>

        {loading ? (
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={80} sx={{ mb: 1.5, borderRadius: 2 }} />
          ))
        ) : bookings.length === 0 ? (
          <Card
            elevation={0}
            sx={{ p: 5, textAlign: "center", border: "1px solid #eee", borderRadius: 3 }}
          >
            <Typography color="text.secondary" mb={2}>
              No bookings found yet
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/tours")}
              sx={{ backgroundColor: "#113d48", borderRadius: "50px", textTransform: "none" }}
            >
              Explore Tours
            </Button>
          </Card>
        ) : (
          bookings.slice(0, 5).map((b) => (
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
                  <TableRow
                    sx={{
                      backgroundColor: "#113d48",
                    }}
                  >
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
                      Amount
                    </TableCell>

                    <TableCell sx={{ color: "#fff", fontSize:"18px", fontWeight: 600 }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {bookings.slice(0, 5).map((b) => (
                    <TableRow
                      key={b.id}
                      hover
                      sx={{
                        "&:last-child td": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      <TableCell sx={{fontSize:"18px", color:"#777", fontWeight:"600"}}>{b.tour_title}</TableCell>

                      <TableCell sx={{fontSize:"18px", color:"#777", fontWeight:"600"}}>{b.travel_date}</TableCell>

                      <TableCell sx={{fontSize:"18px", color:"#777", fontWeight:"600"}}>
                        {b.guests} Guest{b.guests > 1 ? "s" : ""}
                      </TableCell>

                      <TableCell sx={{ fontWeight: 600, fontSize:"18px", color: "#14a6d8" }}>
                        ${Number(b.total || 0).toLocaleString("en-IN")}
                      </TableCell>

                      <TableCell>
                        <Chip sx={{fontSize:"16px", color:"#fff"}}
                          label={STATUS_CONFIG[b.status]?.label || "Pending"}
                          color={STATUS_CONFIG[b.status]?.color || "warning"}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ))
        )}
      </Box>
    </Box>
  );
}