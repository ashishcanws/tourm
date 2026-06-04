// src/pages/guest/TourDetails.jsx
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box, Container, Typography, Grid, Rating, Button,
  Card, Divider, List, ListItem, ListItemIcon,
  ListItemText, Skeleton, Alert
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PageBanner from "../../components/PageBanner";
import { useTour } from "../../hooks/useTours";

export default function TourDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { tour, loading, error } = useTour(slug);

  if (loading) {
    return (
      <>
        <PageBanner title="Tour Details" />
        <Box sx={{ py: "80px" }}>
          <Container maxWidth="xl">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Skeleton variant="rectangular" height={500} sx={{ borderRadius: "20px" }} />
                <Skeleton width="60%" height={50} sx={{ mt: 3 }} />
                <Skeleton width="90%" sx={{ mt: 1 }} />
                <Skeleton width="80%" sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Skeleton variant="rectangular" height={400} sx={{ borderRadius: "20px" }} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }

  if (error || !tour) {
    return (
      <>
        <PageBanner title="Tour Details" />
        <Box sx={{ py: "80px" }}>
          <Container maxWidth="xl">
            <Alert severity="error">Tour nahi mila. {error}</Alert>
          </Container>
        </Box>
      </>
    );
  }

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
            {/* LEFT SIDE */}
            <Grid item xs={12} md={8}>
              <Box
                component="img"
                src={tour.image}
                alt={tour.title}
                sx={{
                  width: "100%",
                  height: { xs: 300, md: 500 },
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
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

                {/* Description */}
                <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#113d48", mb: 2 }}>
                  Tour Overview
                </Typography>
                <Typography sx={{ color: "#6e7070", lineHeight: 1.9 }}>
                  {tour.description ||
                    `Experience an unforgettable ${tour.days}-day journey through ${tour.location}.`}
                </Typography>

                {/* Highlights */}
                {tour.highlights?.length > 0 && (
                  <>
                    <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#113d48", mt: 5, mb: 2 }}>
                      Highlights
                    </Typography>
                    <Grid container>
                      {tour.highlights.map((item) => (
                        <Grid item xs={12} sm={6} key={item}>
                          <ListItem disableGutters>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckCircleOutlineIcon sx={{ color: "#14a6d8" }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{ sx: { color: "#113d48" } }}
                            />
                          </ListItem>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}

                {/* Included */}
                {tour.included?.length > 0 && (
                  <>
                    <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#113d48", mt: 5, mb: 2 }}>
                      What's Included
                    </Typography>
                    <Grid container>
                      {tour.included.map((item) => (
                        <Grid item xs={12} sm={6} key={item}>
                          <ListItem disableGutters>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckCircleOutlineIcon sx={{ color: "#14a6d8" }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{ sx: { color: "#113d48" } }}
                            />
                          </ListItem>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </Box>
            </Grid>

            {/* RIGHT SIDE - Sticky Card */}
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
                    <ListItemText primary={`Max Group: ${tour.max_group_size || 20} people`} />
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