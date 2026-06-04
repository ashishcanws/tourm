// src/pages/guest/TourListing.jsx
import { useState, useMemo } from "react";
import {
  Box, Container, Typography, Grid, TextField,
  MenuItem, Stack, Skeleton, Alert
} from "@mui/material";
import PageBanner from "../../components/PageBanner";
import TourCard from "../../components/TourCard";
import { useTours } from "../../hooks/useTours";

// Skeleton card jab loading ho
function TourCardSkeleton() {
  return (
    <Box sx={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #eee" }}>
      <Skeleton variant="rectangular" height={260} />
      <Box sx={{ p: 2 }}>
        <Skeleton width="80%" height={28} />
        <Skeleton width="50%" height={22} sx={{ mt: 1 }} />
        <Skeleton width="40%" height={22} sx={{ mt: 1 }} />
      </Box>
    </Box>
  );
}

export default function TourListing() {
  const { tours, loading, error } = useTours();
  const [sort, setSort] = useState("recommended");
  const [search, setSearch] = useState("");

  const list = useMemo(() => {
    let arr = tours.filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.location.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "price-asc") arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr = [...arr].sort((a, b) => b.price - a.price);
    if (sort === "rating") arr = [...arr].sort((a, b) => b.rating - a.rating);
    return arr;
  }, [sort, search, tours]);

  return (
    <>
      <PageBanner title="Tour Listing" />
      <Box sx={{ py: "80px", backgroundColor: "#fff" }}>
        <Container maxWidth="xl">

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Tours load nahi hue: {error}
            </Alert>
          )}

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
            sx={{ mb: 4 }}
          >
            <Typography sx={{ color: "#113d48", fontWeight: 700, fontSize: 22 }}>
              {loading ? "Loading..." : `Showing ${list.length} of ${tours.length} tours`}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                size="small"
                placeholder="Search tours..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px", minWidth: 260 } }}
              />
              <TextField
                size="small"
                select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px", minWidth: 200 } }}
              >
                <MenuItem value="recommended">Recommended</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="rating">Top Rated</MenuItem>
              </TextField>
            </Stack>
          </Stack>

          <Grid container spacing={3}>
            {loading
              ? [...Array(8)].map((_, i) => (
                  <Grid item size={{ xs: 12, md: 3 }} key={i}>
                    <TourCardSkeleton />
                  </Grid>
                ))
              : list.map((t) => (
                  <Grid item size={{ xs: 12, md: 3 }} key={t.slug}>
                    <TourCard tour={t} />
                  </Grid>
                ))}
          </Grid>

          {!loading && list.length === 0 && (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Typography sx={{ color: "#6e7070", fontSize: 20 }}>
                No tours found. Try changing your search criteria.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}