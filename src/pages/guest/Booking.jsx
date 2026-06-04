import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  Divider,
  MenuItem,
  Skeleton,
} from "@mui/material";
import PageBanner from "../../components/PageBanner";
// import { tours } from "../../data/tours";
import { supabase } from "../../supabase";

import { useTour } from "../../hooks/useTours";

export default function Booking() {
  const { slug } = useParams();
  const { tour, loading } = useTour(slug);   // ← Supabase se

  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", travelDate: today, specialRequest: "",
  });

  // Loading state
  if (loading) return (
    <>
      <PageBanner title="Book Your Tour" />
      <Box sx={{ py: "80px" }}>
        <Container maxWidth="xl">
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: "20px" }} />
        </Container>
      </Box>
    </>
  );


  const total = tour.price * guests;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          user_id: user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          travel_date: formData.travelDate,
          guests,
          tour_title: tour.title,
          tour_slug: tour.slug,
          total,
          special_request: formData.specialRequest,
        },
      ]);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setSubmitted(true);

    // Form reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      travelDate: "",
      specialRequest: "",
    });

    setGuests(2);

    // Page refresh after 1.5 sec
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1500);
  };

  return (
    <>
      <PageBanner
        title="Book Your Tour"
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Tours", to: "/tours" },
        ]}
      />
      <Box sx={{ py: "80px", backgroundColor: "#fff" }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item size={{xs:12, md:8}}>
              <Typography sx={{ fontSize: 32, fontWeight: 700, color: "#113d48", mb: 3 }}>
                Traveler Information
              </Typography>

              {submitted ? (
                <Card elevation={0} sx={{ p: 5, borderRadius: "20px", backgroundColor: "#E9F6F9", textAlign: "center" }}>
                  <Typography sx={{ fontFamily: "Montez", fontSize: 40, color: "#113d48" }}>
                    Thank you!
                  </Typography>
                  <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#113d48", mb: 2 }}>
                    Your booking has been received
                  </Typography>
                  <Typography sx={{ color: "#6e7070" }}>
                    We'll send a confirmation email shortly with your itinerary and next steps.
                  </Typography>
                </Card>
              ) : (
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: "24px",
                    border: "1px solid #EAEAEA",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
                  }}
                >
                  <Box component="form" onSubmit={handleSubmit}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ width: { xs: "100%", md: "48.5%" } }}>
                        <TextField
                          required
                          fullWidth
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          label="First Name"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                              backgroundColor: "#FAFAFA",
                            },
                          }}
                        />
                      </Box>

                      <Box sx={{ width: { xs: "100%", md: "48.5%" } }}>
                        <TextField
                          required
                          fullWidth
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          label="Last Name"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                              backgroundColor: "#FAFAFA",
                            },
                          }}
                        />
                      </Box>

                      <Box sx={{ width: { xs: "100%", md: "48.5%" } }}>
                        <TextField
                          required
                          fullWidth
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          label="Email"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                              backgroundColor: "#FAFAFA",
                            },
                          }}
                        />
                      </Box>

                      <Box sx={{ width: { xs: "100%", md: "48.5%" } }}>
                        <TextField
                          required
                          fullWidth
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          label="Phone"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                              backgroundColor: "#FAFAFA",
                            },
                          }}
                        />
                      </Box>

                      <Box sx={{ width: { xs: "100%", md: "48.5%" } }}>
                        <TextField
                          required
                          fullWidth
                          type="date"
                          name="travelDate"
                          value={formData.travelDate}
                          onChange={handleChange}
                          label="Travel Date"
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            min: new Date().toISOString().split("T")[0],
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                              backgroundColor: "#FAFAFA",
                            },
                          }}
                        />
                      </Box>

                      <Box sx={{ width: { xs: "100%", md: "48.5%" } }}>
                        <TextField
                          required
                          fullWidth
                          select
                          label="Number of Guests"
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                              backgroundColor: "#FAFAFA",
                            },
                          }}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <MenuItem key={n} value={n}>
                              {n} {n === 1 ? "Guest" : "Guests"}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>

                      <Box sx={{ width: "100%" }}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          name="specialRequest"
                          value={formData.specialRequest}
                          onChange={handleChange}
                          label="Special Requests (optional)"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                              backgroundColor: "#FAFAFA",
                            },
                          }}
                        />
                      </Box>
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 4,
                        height: 58,
                        backgroundColor: "#113d48",
                        borderRadius: "50px",
                        textTransform: "none",
                        fontSize: 18,
                        fontWeight: 600,
                        boxShadow: "none",

                        "&:hover": {
                          backgroundColor: "#0c2d35",
                          boxShadow: "0 10px 30px rgba(17,61,72,.2)",
                        },
                      }}
                    >
                      Confirm Booking
                    </Button>
                  </Box>
                </Card>
              )}
            </Grid>

            <Grid item size={{xs:12, md:4}}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  backgroundColor: "#E9F6F9",
                  position: "sticky",
                  top: 20,
                }}
              >
                <Box
                  component="img"
                  src={tour.image}
                  alt={tour.title}
                  sx={{ width: "100%", height: 180, objectFit: "cover", borderRadius: "16px", mb: 2 }}
                />
                <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#113d48" }}>
                  {tour.title}
                </Typography>
                <Typography sx={{ color: "#6e7070", mb: 2 }}>{tour.location}</Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography sx={{ color: "#6e7070" }}>Price</Typography>
                  <Typography sx={{ color: "#113d48", fontWeight: 600 }}>${tour.price}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography sx={{ color: "#6e7070" }}>Guests</Typography>
                  <Typography sx={{ color: "#113d48", fontWeight: 600 }}>{guests}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography sx={{ color: "#6e7070" }}>Duration</Typography>
                  <Typography sx={{ color: "#113d48", fontWeight: 600 }}>{tour.days} Days</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#113d48" }}>Total</Typography>
                  <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#14a6d8" }}>${total}</Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
