import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Grid, Rating, Button, Card, Divider, List, ListItem, ListItemIcon, ListItemText,} from "@mui/material";

import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PageBanner from "../../components/PageBanner";
import { tours } from "../../data/tours";

export default function TourDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const tour = tours.find((t) => t.slug === slug) || tours[0];

  const includes = [
    "Airport pickup & drop-off",
    "4-star hotel accommodation",
    "Daily breakfast & dinner",
    "Professional tour guide",
    "All entrance fees",
    "Travel insurance",
  ];

  return (
    <>
      <PageBanner
        title={tour.title}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Tours", to: "/tours" },
        ]}
      />
      <Box sx={{ py: "80px", backgroundColor: "#fff" }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box
                component="img"
                src={tour.image}
                alt={tour.title}
                sx={{ width: "100%", height: { xs: 300, md: 500 }, objectFit: "cover", borderRadius: "20px" }}
              />

              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#6e7070", mb: 1 }}>
                  <FmdGoodOutlinedIcon fontSize="small" />
                  <Typography>{tour.location}</Typography>
                </Box>
                <Typography sx={{ fontSize: { xs: 30, md: 42 }, fontWeight: 700, color: "#113d48" }}>
                  {tour.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <Rating value={tour.rating} precision={0.5} readOnly />
                  <Typography sx={{ color: "#6e7070" }}>({tour.rating} / 5)</Typography>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#113d48", mb: 2 }}>
                  Tour Overview
                </Typography>
                <Typography sx={{ color: "#6e7070", lineHeight: 1.9, mb: 2 }}>
                  Experience an unforgettable {tour.days}-day journey through {tour.location}.
                  Our expertly crafted itinerary blends iconic landmarks, cultural immersion, and
                  leisure time, ensuring you get the most out of every moment. From sunrise vistas
                  to candle-lit dinners, this tour is designed to delight.
                </Typography>
                <Typography sx={{ color: "#6e7070", lineHeight: 1.9 }}>
                  Travel with seasoned local guides, stay in carefully selected accommodations,
                  and enjoy seamless logistics throughout your trip.
                </Typography>

                <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#113d48", mt: 5, mb: 2 }}>
                  What's Included
                </Typography>
                <Grid container>
                  {includes.map((item) => (
                    <Grid item xs={12} sm={6} key={item}>
                      <ListItem disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ sx: { color: "#113d48" } }}
                        />
                      </ListItem>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "20px",
                  backgroundColor: "#E9F6F9",
                  position: "sticky",
                  top: 20,
                }}
              >
                <Typography sx={{ color: "#6e7070" }}>Starting From</Typography>
                <Typography sx={{ fontSize: 40, fontWeight: 700, color: "#113d48" }}>
                  ${tour.price}
                  <Typography component="span" sx={{ fontSize: 16, color: "#6e7070", ml: 1 }}>
                    / person
                  </Typography>
                </Typography>

                <Divider sx={{ my: 3 }} />

                <List dense>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <AccessTimeOutlinedIcon sx={{ color: "#14a6d8" }} />
                    </ListItemIcon>
                    <ListItemText primary={`Duration: ${tour.days} Days`} />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <GroupsOutlinedIcon sx={{ color: "#14a6d8" }} />
                    </ListItemIcon>
                    <ListItemText primary="Max Group Size: 20" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <FmdGoodOutlinedIcon sx={{ color: "#14a6d8" }} />
                    </ListItemIcon>
                    <ListItemText primary={tour.location} />
                  </ListItem>
                </List>

                <Button
                  onClick={() => navigate(`/booking/${tour.slug}`)}
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    backgroundColor: "#113d48",
                    borderRadius: "50px",
                    py: 1.5,
                    textTransform: "none",
                    fontSize: 16,
                    boxShadow: "none",
                    "&:hover": { backgroundColor: "#0c2d35", boxShadow: "none" },
                  }}
                >
                  Book This Tour
                </Button>
                <Button
                  component={RouterLink}
                  to="/contact"
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 2,
                    color: "#113d48",
                    borderColor: "#113d48",
                    borderRadius: "50px",
                    py: 1.5,
                    textTransform: "none",
                    fontSize: 16,
                  }}
                >
                  Ask a Question
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
