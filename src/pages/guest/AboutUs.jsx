import { Box, Container, Typography, Grid, Stack } from "@mui/material";
import PageBanner from "../../components/PageBanner";
import Team from "../../components/Team";
import Testimonial from "../../components/Testimonial";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

const stats = [
  { value: "12K+", label: "Happy Travelers" },
  { value: "240+", label: "Tour Packages" },
  { value: "65+", label: "Destinations" },
  { value: "15+", label: "Years of Service" },
];

const features = [
  { icon: <VerifiedOutlinedIcon sx={{ fontSize: 42, color: "#14a6d8" }} />, title: "Trusted Service", desc: "Years of consistent excellence and verified reviews from real travelers." },
  { icon: <PublicOutlinedIcon sx={{ fontSize: 42, color: "#14a6d8" }} />, title: "Global Coverage", desc: "Curated experiences across 65+ destinations on every continent." },
  { icon: <SupportAgentOutlinedIcon sx={{ fontSize: 42, color: "#14a6d8" }} />, title: "24/7 Support", desc: "Real human support before, during, and after your journey." },
];

export default function AboutUs() {
  return (
    <>
      <PageBanner title="About Us" />

      <Box sx={{ py: "80px", backgroundColor: "#fff" }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item size={{ xs: 12, md: 4 }}>
              <Box
                component="img"
                src="https://tourm-react.netlify.app/assets/img/destination/destination_1_4.jpg"
                alt="about"
                sx={{ width: "100%", borderRadius: "20px", height: { xs: 300, md: 500 }, objectFit: "cover" }}
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 8 }}>
              <Typography sx={{ fontFamily: "Montez", fontSize: 40, color: "#113d48" }}>
                About Tourm
              </Typography>
              <Typography sx={{ fontSize: { xs: 32, md: 46 }, fontWeight: 700, color: "#113d48", lineHeight: 1.1, mb: 3 }}>
                We Create Memories That Last a Lifetime
              </Typography>
              <Typography sx={{ color: "#6e7070", lineHeight: 1.9, mb: 2 }}>
                Tourm is a travel company built by passionate explorers. For over 15 years we've
                helped travelers from around the world discover hidden gems, iconic landmarks, and
                authentic local culture in over 65 countries.
              </Typography>
              <Typography sx={{ color: "#6e7070", lineHeight: 1.9 }}>
                Our team handcrafts every itinerary, partners with the best local guides, and
                supports you 24/7 — so every trip feels effortless and unforgettable.
              </Typography>
              <Typography sx={{ color: "#6e7070", lineHeight: 1.9, mb: 2 }}>
                Tourm is a travel company built by passionate explorers. For over 15 years we've
                helped travelers from around the world discover hidden gems, iconic landmarks, and
                authentic local culture in over 65 countries.
              </Typography>
              <Typography sx={{ color: "#6e7070", lineHeight: 1.9 }}>
                Our team handcrafts every itinerary, partners with the best local guides, and
                supports you 24/7 — so every trip feels effortless and unforgettable.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: "80px", backgroundColor: "#E9F6F9" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography sx={{ fontFamily: "Montez", fontSize: 50, color: "#113d48" }}>
              Why choose us
            </Typography>
            <Typography sx={{ fontSize: { xs: 34, md: 50 }, fontWeight: 700, color: "#113d48" }}>
              Travel Made Effortless
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((f) => (
              <Grid item size={{xs:12, md:4}} key={f.title}>
                <Stack
                  spacing={2}
                  sx={{
                    p: 4,
                    borderRadius: "20px",
                    border: "1px solid #e5e5e5",
                    background:"#fff",
                    transition: "0.4s",
                    height: "100%",
                    "&:hover": { transform: "translateY(-8px)", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" },
                  }}
                >
                  {f.icon}
                  <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#113d48" }}>
                    {f.title}
                  </Typography>
                  <Typography sx={{ color: "#6e7070", lineHeight: 1.8 }}>{f.desc}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{py: "70px", position:'relative'}} className="counter-area space">
			<Container maxWidth="xl" className="shape-mockup-wrap">

				<Box container spacing={3} className="grid-for">

					{/* Item 1 */}
					<Box className="counter-card-wrap">
						<Box className="counter-card">

							<Box className="counter-shape">
								<span></span>
							</Box>

							<Box className="media-body">
								<Typography className="box-number">
								<span>12</span>
								</Typography>

								<Typography className="counter-title">
								Years Experience
								</Typography>
							</Box>

						</Box>
					</Box>

					{/* Item 2 */}
					<Box className="counter-card-wrap">
						<Box className="counter-card">

							<Box className="counter-shape">
								<span></span>
							</Box>

							<Box className="media-body">
								<Typography className="box-number">
								<span>97</span>%
								</Typography>

								<Typography className="counter-title">
								Retention Rate
								</Typography>
							</Box>

						</Box>
					</Box>

					{/* Item 3 */}
					<Box className="counter-card-wrap">
						<Box className="counter-card">

							<Box className="counter-shape">
								<span></span>
							</Box>

							<Box className="media-body">
								<Typography className="box-number">
								<span>8</span>k
								</Typography>

								<Typography className="counter-title">
								Tour Completed
								</Typography>
							</Box>

						</Box>
					</Box>

					{/* Item 4 */}
					<Box className="counter-card-wrap">
						<Box className="counter-card">

							<Box className="counter-shape">
								<span></span>
							</Box>

							<Box className="media-body">
								<Typography className="box-number">
								<span>19</span>k
								</Typography>

								<Typography className="counter-title">
								Happy Travellers
								</Typography>
							</Box>

						</Box>
					</Box>

				</Box>

			</Container>

			
		</Box>

      

      <Box sx={{ py: "80px", backgroundColor: "#E9F6F9" }}>
        <Team />
      </Box>

      <Testimonial />
    </>
  );
}
