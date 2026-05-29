import {
  Box,
  Container,
  Typography,
  Avatar,
  Rating,
  Card,
  CardContent,
} from "@mui/material";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
    {
        name: "Guy Hawkins",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        description:
        "Amazing experience! Everything was perfectly organized and the tour guide was extremely friendly and helpful.",
    },
    {
        name: "Jenny Wilson",
        rating: 4.5,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        description:
        "I loved every moment of the trip. Beautiful destinations and excellent service throughout the journey.",
    },
    {
        name: "Robert Fox",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/51.jpg",
        description:
      "Highly recommended! The hotels, food, and sightseeing were beyond my expectations.",
    },
    {
        name: "Kristin Watson",
        rating: 4.5,
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        description:
        "A wonderful and memorable travel experience. I would definitely book again with this company.",
    },
];

export default function TestimonialSection() {
  return (
    <Box
      sx={{
        py: "70px",
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            sx={{
              fontSize: "50px",
              color: "#113d48",
              fontFamily: "Montez",
            }}
          >
            Testimonials
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: "#113d48",
              fontSize: {
                xs: "34px",
                md: "50px",
              },
              fontWeight: 700,
              mb: 2,
            }}
          >
            What Our Clients Say
          </Typography>

          <Typography
            sx={{
              color: "#6e7070",
              fontSize: "17px",
            }}
          >
            Discover what travelers say about their unforgettable
            experiences with our tour services.
          </Typography>
        </Box>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={2}
          spaceBetween={25}
          loop={true}
          speed={1200}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 2,
            },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  border: "1px solid #e5e5e5",
                  p: 3,
                  height: "100%",
                  transition: "0.4s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {/* Quote Icon */}
                    <Box
                        sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        backgroundColor: "#E9F6F9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        }}
                    >
                    <FormatQuoteIcon
                      sx={{
                        color: "#113d48",
                        fontSize: 35,
                      }}
                    />
                  </Box>

                  {/* Description */}
                  <Typography
                    sx={{
                      color: "#6e7070",
                      fontSize: "16px",
                      lineHeight: 1.8,
                      mb: 3,
                    }}
                  >
                    {item.description}
                  </Typography>

                  {/* User Info */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 65,
                        height: 65,
                      }}
                    />

                    <Box>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "#113d48",
                        }}
                      >
                        {item.name}
                      </Typography>

                      <Rating
                        value={item.rating}
                        precision={0.5}
                        readOnly
                        sx={{
                          mt: 0.5,
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}