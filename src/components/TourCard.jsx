import { Box, Card, Typography, Rating, Button } from "@mui/material";
import { Link } from "react-router-dom";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function TourCard({ tour }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid #e5e5e5",
        transition: "0.4s",
        "&:hover": { transform: "translateY(-8px)", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" },
      }}
    >
      <Box sx={{ overflow: "hidden" }}>
        <Box
          component="img"
          src={tour.image}
          alt={tour.title}
          sx={{ width: "100%", height: 240, objectFit: "cover", transition: "0.5s", "&:hover": { transform: "scale(1.08)" } }}
        />
      </Box>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#6e7070", fontSize: 14, mb: 1 }}>
          <FmdGoodOutlinedIcon fontSize="small" />
          <span>{tour.location}</span>
        </Box>
        <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "#113d48", mb: 1 }}>
          {tour.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Rating value={tour.rating} precision={0.5} readOnly size="small" />
          <Typography sx={{ fontSize: 14, color: "#6e7070" }}>({tour.rating})</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#6e7070" }}>
            <AccessTimeOutlinedIcon fontSize="small" />
            <Typography sx={{ fontSize: 15 }}>{tour.days} Days</Typography>
          </Box>
          <Typography sx={{ color: "#14a6d8", fontWeight: 700, fontSize: 22 }}>
            ${tour.price}
          </Typography>
        </Box>
        <Button
          component={Link}
          to={`/tours/${tour.slug}`}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#113d48",
            borderRadius: "50px",
            py: 1.2,
            textTransform: "none",
            fontSize: 16,
            boxShadow: "none",
            "&:hover": { backgroundColor: "#0c2d35", boxShadow: "none" },
          }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
}
