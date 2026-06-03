import { Box, Container, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import PageBanner from "../../components/PageBanner";
import { destinations } from "../../data/tours";

export default function Destinations() {
  return (
    <>
      <PageBanner title="Destinations" />
      <Box sx={{ py: "80px", backgroundColor: "#fff" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography sx={{ fontFamily: "Montez", fontSize: "50px", color: "#113d48" }}>
              Explore the world
            </Typography>
            <Typography sx={{ fontSize: { xs: "34px", md: "50px" }, fontWeight: 700, color: "#113d48" }}>
              Popular Destinations
            </Typography>
            <Typography sx={{ color: "#6e7070", fontSize: 17, mt: 1 }}>
              Hand-picked travel destinations for your next unforgettable adventure.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {destinations.map((d) => (
              <Grid item size={{ xs: 12, md: 4, lg:3 }} key={d.slug}>
                <Box
                  component={Link}
                  to={`/tours?destination=${d.slug}`}
                  sx={{
                    display: "block",
                    position: "relative",
                    borderRadius: "20px",
                    overflow: "hidden",
                    textDecoration: "none",
                    "&:hover img": { transform: "scale(1.08)" },
                  }}
                >
                  <Box
                    component="img"
                    src={d.image}
                    alt={d.title}
                    sx={{
                      width: "100%",
                      height: 320,
                      objectFit: "cover",
                      transition: "0.5s",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)",
                    }}
                  />
                  <Box sx={{ position: "absolute", bottom: 20, left: 20, color: "#fff" }}>
                    <Typography sx={{ fontSize: 24, fontWeight: 700 }}>{d.title}</Typography>
                    <Typography sx={{ fontSize: 14, color: "#20c5f7" }}>
                      {d.listing} Listings
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
