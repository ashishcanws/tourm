import { useState, useMemo } from "react";
import { Box, Container, Typography, Grid, TextField, MenuItem, Stack } from "@mui/material";
import PageBanner from "../../components/PageBanner";
import TourCard from "../../components/TourCard";
import { tours } from "../../data/tours";

export default function TourListing() {
  const [sort, setSort] = useState("recommended");
  const [search, setSearch] = useState("");

  const list = useMemo(() => {
    let arr = tours.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "price-asc") arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr = [...arr].sort((a, b) => b.price - a.price);
    if (sort === "rating") arr = [...arr].sort((a, b) => b.rating - a.rating);
    return arr;
  }, [sort, search]);

  return (
    <>
      <PageBanner title="Tour Listing" />
      <Box sx={{ py: "80px", backgroundColor: "#fff" }}>
        <Container maxWidth="xl">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
            sx={{ mb: 4 }}
          >
            <Typography sx={{ color: "#113d48", fontWeight: 700, fontSize: 22 }}>
              Showing {list.length} of {tours.length} tours
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
            {list.map((t) => (
              <Grid item size={{ xs: 12, md: 3 }} key={t.slug}>
                <TourCard tour={t} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
