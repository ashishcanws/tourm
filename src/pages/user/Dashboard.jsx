import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";

import {
  Box,
  Card,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TourIcon from "@mui/icons-material/Tour";
import PaymentsIcon from "@mui/icons-material/Payments";
import PeopleIcon from "@mui/icons-material/People";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalTours: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: bookings } = await supabase
        .from("bookings")
        .select("*");

      const { data: tours } = await supabase
        .from("tours")
        .select("*");

      const { data: users } = await supabase
        .from("profiles")
        .select("*");

      const pendingBookings =
        bookings?.filter(
          (item) =>
            item.booking_status?.toLowerCase() === "pending"
        ).length || 0;

      const confirmedBookings =
        bookings?.filter(
          (item) =>
            item.booking_status?.toLowerCase() === "confirmed"
        ).length || 0;

      const totalRevenue =
        bookings?.filter(
          (item) =>
            item.booking_status?.toLowerCase() === "confirmed"
        )
          .reduce(
            (sum, item) => sum + Number(item.total || 0),
            0
          ) || 0;

      setStats({
        totalBookings: bookings?.length || 0,
        pendingBookings,
        confirmedBookings,
        totalTours: tours?.length || 0,
        totalUsers: users?.length || 0,
        totalRevenue,
      });

      setRecentBookings(
        bookings
          ?.sort(
            (a, b) =>
              new Date(b.created_at) -
              new Date(a.created_at)
          )
          .slice(0, 5) || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const DashboardCard = ({
    title,
    value,
    icon,
  }) => (
    <Card
      sx={{
        p: 3,
        height: "100%",
        borderRadius: "20px",
        background:
          "linear-gradient(135deg,#113d48,#1b5967)",
        color: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,.12)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 25,
              opacity: 1,
              fontWeight:700,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: 34,
              fontWeight: 700,
              mt: 1,
            }}
          >
            {value}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "16px",
            bgcolor: "rgba(255,255,255,.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      </Box>
    </Card>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        sx={{
          fontSize: "36px",
          fontWeight: 700,
          color: "#113d48",
        }}
      >
        Dashboard
      </Typography>

      <Typography
        sx={{
          color: "#777",
          mt: 1,
          mb: 4,
        }}
      >
        Welcome Back Admin 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid item size={{xs:12, md:4}}>
          <DashboardCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<BookOnlineIcon fontSize="large" />}
          />
        </Grid>

        <Grid item size={{xs:12, md:4}}>
          <DashboardCard
            title="Pending Bookings"
            value={stats.pendingBookings}
            icon={<PendingActionsIcon fontSize="large" />}
          />
        </Grid>

        <Grid item size={{xs:12, md:4}}>
          <DashboardCard
            title="Confirmed Bookings"
            value={stats.confirmedBookings}
            icon={<CheckCircleIcon fontSize="large" />}
          />
        </Grid>

        <Grid item size={{xs:12, md:4}}>
          <DashboardCard
            title="Total Tours"
            value={stats.totalTours}
            icon={<TourIcon fontSize="large" />}
          />
        </Grid>

        <Grid item size={{xs:12, md:4}}>
          <DashboardCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<PeopleIcon fontSize="large" />}
          />
        </Grid>

        <Grid item size={{xs:12, md:4}}>
          <DashboardCard
            title="Revenue"
            value={`$${stats.totalRevenue}`}
            icon={<PaymentsIcon fontSize="large" />}
          />
        </Grid>
      </Grid>

      <Card
        sx={{
          mt: 5,
          p: 3,
          borderRadius: "20px",
          border: "1px solid #eee",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            mb: 3,
          }}
        >
          Recent Bookings
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontSize:"18px"}}>
                  <b>Tour</b>
                </TableCell>

                <TableCell sx={{fontSize:"18px"}}>
                  <b>Guests</b>
                </TableCell>

                <TableCell sx={{fontSize:"18px"}}>
                  <b>Travel Date</b>
                </TableCell>

                <TableCell sx={{fontSize:"18px"}}>
                  <b>Amount</b>
                </TableCell>

                <TableCell sx={{fontSize:"18px"}}>
                  <b>Status</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell sx={{fontSize:"16px"}}>
                    {booking.tour_title}
                  </TableCell>

                  <TableCell sx={{fontSize:"16px"}}>
                    {booking.guests}
                  </TableCell>

                  <TableCell sx={{fontSize:"16px"}}>
                    {booking.travel_date}
                  </TableCell>

                  <TableCell sx={{fontSize:"16px"}}>
                    ${booking.total}
                  </TableCell>

                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 2,
                        py: 0.5,
                        fontSize:"16px",
                        borderRadius: "20px",
                        fontWeight: 600,
                        bgcolor:
                          booking.booking_status?.toLowerCase() ===
                          "confirmed"
                            ? "#e8f5e9"
                            : booking.booking_status?.toLowerCase() ===
                              "cancelled"
                            ? "#ffebee"
                            : "#fff8e1",
                        color:
                          booking.booking_status?.toLowerCase() ===
                          "confirmed"
                            ? "#2e7d32"
                            : booking.booking_status?.toLowerCase() ===
                              "cancelled"
                            ? "#d32f2f"
                            : "#ed6c02",
                      }}
                    >
                      {booking.booking_status}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default Dashboard;