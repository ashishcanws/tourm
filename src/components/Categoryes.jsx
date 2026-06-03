import React, { useEffect, useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    Avatar,
    Typography,
    IconButton,
    Stack,
    Grid,
    Container,
} from "@mui/material";

import { supabase } from "../supabase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// const categories = [
//     {
//         image: "https://tourm-react.netlify.app/assets/img/category/category_1_1.jpg",
//         title: "Cruises",
//     },
//     {
//         image: "https://tourm-react.netlify.app/assets/img/category/category_1_2.jpg",
//         title: "Hiking",
//     },
//     {
//         image: "https://tourm-react.netlify.app/assets/img/category/category_1_3.jpg",
//         title: "Airbirds",
//     },
//     {
//         image: "https://tourm-react.netlify.app/assets/img/category/category_1_4.jpg",
//         title: "Wildlife",
//     },
//     {
//         image: "https://tourm-react.netlify.app/assets/img/category/category_1_5.jpg",
//         title: "Walking",
//     },
//     {
//         image: "https://tourm-react.netlify.app/assets/img/category/category_1_3.jpg",
//         title: "Adventure",
//     },
//     {
//         image: "https://tourm-react.netlify.app/assets/img/category/category_1_1.jpg",
//         title: "Cruises",
//     },
//     {
//         image: "https://tourm-react.netlify.app/assets/img/category/category_1_2.jpg",
//         title: "Hiking",
//     },
//     {
//         image: "https://tourm-react.netlify.app/assets/img/category/category_1_3.jpg",
//         title: "Airbirds",
//     },
// ];

const Categoryes = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('*');

        if (error) {
            console.log(error);
        } else {
            setCategories(data);
        }
    };

    return (
        <>
            <Box sx={{ width: "100%", position: "relative", py: "50px" }}>
                <Box sx={{ margin: "0 auto" }}>
                    <Box className="category-sections">
                        <Container maxWidth="">
                            {/* HEADING */}
                            <Box sx={{ margin: "0 auto", mb: "50px", textAlign: "center" }}>
                                <Typography
                                    sx={{
                                        fontSize: "50px",
                                        fontFamily: "Montez",
                                        mb: 1,
                                        color: "#113d48",
                                    }}
                                >
                                    Get unforgettable pleasure with us
                                </Typography>

                                <Typography
                                    sx={{ fontSize: "50px", color: "#113d48", fontWeight: "700" }}
                                >
                                    Tour Categories
                                </Typography>
                            </Box>
                            {/* SLIDER */}
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                slidesPerView={"auto"}
                                loop={true}
                                speed={1500}
                                spaceBetween={25}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                className="swiper swiper-initialized swiper-horizontal th-slider has-shadow categorySlider swiper-backface-hidden"
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },

                                    576: {
                                        slidesPerView: 2,
                                    },

                                    768: {
                                        slidesPerView: 3,
                                    },

                                    1200: {
                                        slidesPerView: 5,
                                    },
                                }}
                            >
                                {categories.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <Box className="category-card">
                                            {/* IMAGE */}
                                            <Box className="image-wrapper">
                                                <img src={item.image_url} alt={item.title} />
                                            </Box>

                                            {/* TEXT */}
                                            <Typography className="category-title">
                                                {item.title}
                                            </Typography>

                                            <Typography className="see-more">See More</Typography>
                                        </Box>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Container>
                    </Box>
                </Box>
            </Box>
        </>

    )
}

export default Categoryes