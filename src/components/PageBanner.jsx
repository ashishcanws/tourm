import { Box, Container, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";


export default function PageBanner({ title, crumbs = [{ label: "Home", to: "/" }] }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 280, md: 360 },
        backgroundImage:"url(https://tourm-react.netlify.app/assets/img/hero/hero_bg_1_2.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
        <Container sx={{ position: "relative", color: "#fff", textAlign: "center" }}>
          <Typography sx={{ fontFamily: "Montez", fontSize: "40px", mb: 1 }}>
            Discover the world
          </Typography>
          <Typography sx={{ fontSize: { xs: "38px", md: "60px" }, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 2, fontSize: "16px", alignItems:"center", justifyContent:"center" }}
          >
            {crumbs.map((c, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {c.to ? (
                  <Link to={c.to} style={{ color: "#fff", textDecoration: "none" }}>
                    {c.label}
                  </Link>
                ) : (
                  <Typography sx={{ color: "#20c5f7" }}>{c.label}</Typography>
                )}
                {i < crumbs.length - 1 && <KeyboardArrowRightIcon sx={{ fontSize: 18 }} />}
              </Box>
            ))}
            <KeyboardArrowRightIcon sx={{ fontSize: 18 }} />
            <Typography sx={{ color: "#20c5f7" }}>{title}</Typography>
          </Stack>
        </Container>
      </Box>
  );
}
