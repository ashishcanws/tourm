import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";


import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const blogs = [
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    date: "15 May, 2026",
    title: "Top 10 Beautiful Places To Visit In Summer",
  },
  {
    image:
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    date: "20 May, 2026",
    title: "Amazing Travel Tips For First Time Travelers",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
    date: "25 May, 2026",
    title: "Discover The Best Adventure Tours Worldwide",
  },
];

export default function BlogSection() {
  return (
    <Box
      sx={{
        py: "70px",
        backgroundColor: "#e9f6f9",
      }}
    >
      <Container maxWidth="xl">
        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            sx={{
              fontSize: "50px",
              color: "#113d48",
              fontFamily: "Montez",
            }}
          >
            Latest Blog
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: "#113d48",
              fontWeight: 700,
              fontSize: {
                xs: "34px",
                md: "50px",
              },
              mb: 2,
            }}
          >
            News & Articles
          </Typography>

          <Typography
            sx={{
              color: "#6e7070",
              fontSize: "17px",
            }}
          >
            Explore our latest travel stories, tips, and destination guides.
          </Typography>
        </Box>

        {/* Blog Cards */}
        <Box className="three-grid" container spacing={4}>
          {blogs.map((item, index) => (
            <Box key={index}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid #e5e5e5",
                  transition: "0.4s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      height: "260px",
                      objectFit: "cover",
                      transition: "0.5s",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                </Box>

                {/* Content */}
                <CardContent sx={{ p: 3 }}>
                  {/* Date + Views */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#6e7070",
                        fontSize: "15px",
                      }}
                    >
                      <CalendarMonthOutlinedIcon fontSize="small" />
                      {item.date}
                    </Typography>

                    
                  </Box>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#113d48",
                      lineHeight: 1.4,
                      mb: 3,
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Button */}
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#113d48",
                      borderRadius: "50px",
                      px: 4,
                      py: 1.2,
                      textTransform: "none",
                      fontSize: "16px",
                      boxShadow: "none",

                      "&:hover": {
                        backgroundColor: "#0c2d35",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}