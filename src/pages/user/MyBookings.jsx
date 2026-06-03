import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import {
  Box,
  Card,
  Grid,
  Divider,
  Typography,
} from "@mui/material";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setBookings(data || []);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        <Box sx={{ fontSize: "35px", color: "#000", fontWeight: "700" }}>
          My Bookings
        </Box>
      </Typography>

      <Grid container sx={{ mt: 4 }} spacing={3}>
        {bookings.map((booking) => {
          const status = booking.booking_status?.toLowerCase();

          return (
            <Grid item size={{xs:12, md:4}} key={booking.id}>
              <Card
                sx={{
                  p: 3,
                  border: "1px solid #dedede",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "25px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  {booking.tour_title}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#777",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box component="span">
                    <b>Guests:</b>
                  </Box>

                  <Box
                    component="span"
                    sx={{ color: "#000", fontWeight: "700", fontSize:"16px" }}
                  >
                    {booking.guests}
                  </Box>
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#777",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box component="span">
                    <b>Date:</b>
                  </Box>

                  <Box
                    component="span"
                    sx={{ color: "#000", fontWeight: "700", fontSize:"16px" }}
                  >
                    {booking.travel_date}
                  </Box>
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#777",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box component="span">
                    <b>Total:</b>
                  </Box>

                  <Box
                    component="span"
                    sx={{ color: "#000", fontWeight: "700", fontSize:"16px" }}
                  >
                    ${booking.total}
                  </Box>
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#777",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box component="span">
                    <b>Booking Status:</b>
                  </Box>

                  <Box
                    component="span"
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: "20px",
                      fontSize:"16px",
                      fontWeight: 700,
                      textTransform: "capitalize",
                      bgcolor:
                        status === "confirmed"
                          ? "#e8f5e9"
                          : status === "cancelled"
                          ? "#ffebee"
                          : "#fff8e1",
                      color:
                        status === "confirmed"
                          ? "#2e7d32"
                          : status === "cancelled"
                          ? "#d32f2f"
                          : "#ed6c02",
                    }}
                  >
                    {booking.booking_status}
                  </Box>
                </Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}