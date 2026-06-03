import { useState } from "react";
import { Box, Container, Typography, Grid, TextField, Button, Card } from "@mui/material";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PageBanner from "../../components/PageBanner";

const infos = [
  { icon: <CallOutlinedIcon sx={{ fontSize: 32, color: "#14a6d8" }} />, title: "Phone", lines: ["+01 234 567 890", "+09 876 543 210"] },
  { icon: <EmailOutlinedIcon sx={{ fontSize: 32, color: "#14a6d8" }} />, title: "Email", lines: ["mailinfo00@tourm.com", "support24@tourm.com"] },
  { icon: <LocationOnOutlinedIcon sx={{ fontSize: 32, color: "#14a6d8" }} />, title: "Address", lines: ["789 Inner Lane, Holy Park", "California, USA"] },
];

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageBanner title="Contact Us" />

      <Box sx={{ py: "80px", backgroundColor: "#fff" }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {infos.map((info) => (
              <Grid item size={{ xs: 12, md: 4 }} key={info.title}>
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: "20px",
                    border: "1px solid #e5e5e5",
                    textAlign: "center",
                    transition: "0.4s",
                    "&:hover": { transform: "translateY(-8px)", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" },
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      backgroundColor: "#E9F6F9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#113d48", mb: 1 }}>
                    {info.title}
                  </Typography>
                  {info.lines.map((l) => (
                    <Typography key={l} sx={{ color: "#6e7070" }}>
                      {l}
                    </Typography>
                  ))}
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                component="iframe"
                title="map"
                src="https://www.google.com/maps?q=California&output=embed"
                sx={{
                  width: "100%",
                  height: { xs: 350, md: "100%" },
                  minHeight: 450,
                  border: 0,
                  borderRadius: "20px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontFamily: "Montez", fontSize: 40, color: "#113d48" }}>
                Get in touch
              </Typography>
              <Typography sx={{ fontSize: { xs: 30, md: 42 }, fontWeight: 700, color: "#113d48", mb: 3 }}>
                Send Us a Message
              </Typography>

              {submitted ? (
                <Card elevation={0} sx={{ p: 4, borderRadius: "20px", backgroundColor: "#E9F6F9" }}>
                  <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#113d48", mb: 1 }}>
                    Message sent!
                  </Typography>
                  <Typography sx={{ color: "#6e7070" }}>
                    We'll get back to you within one business day.
                  </Typography>
                </Card>
              ) : (
                <Box
                  component="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <TextField required fullWidth label="Your Name" />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <TextField required fullWidth type="email" label="Your Email" />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 12 }}>
                      <TextField required fullWidth label="Subject" />
                    </Grid>
                    <Grid item size={{ xs: 12, md: 12 }}>
                      <TextField required fullWidth multiline rows={5} label="Your Message" />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      backgroundColor: "#113d48",
                      borderRadius: "50px",
                      px: 6,
                      py: 1.5,
                      textTransform: "none",
                      fontSize: 16,
                      boxShadow: "none",
                      "&:hover": { backgroundColor: "#0c2d35", boxShadow: "none" },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
