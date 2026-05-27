import {
  Box,
  Typography,
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  Container,
  Grid,
} from "@mui/material";

import { ArrowForward, ArrowBack } from "@mui/icons-material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import HikingOutlinedIcon from "@mui/icons-material/HikingOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  "https://tourm-react.netlify.app/assets/img/hero/hero_bg_1_1.jpg",
  "https://tourm-react.netlify.app/assets/img/hero/hero_bg_1_2.jpg",
  "https://tourm-react.netlify.app/assets/img/hero/hero_bg_1_3.jpg",
];

const categories = [
  {
    image:
      "https://tourm-react.netlify.app/assets/img/category/category_1_1.jpg",
    title: "Cruises",
  },
  {
    image:
      "https://tourm-react.netlify.app/assets/img/category/category_1_2.jpg",
    title: "Hiking",
  },
  {
    image:
      "https://tourm-react.netlify.app/assets/img/category/category_1_3.jpg",
    title: "Airbirds",
  },
  {
    image:
      "https://tourm-react.netlify.app/assets/img/category/category_1_4.jpg",
    title: "Wildlife",
  },
  {
    image:
      "https://tourm-react.netlify.app/assets/img/category/category_1_5.jpg",
    title: "Walking",
  },
  {
    image:
      "https://tourm-react.netlify.app/assets/img/category/category_1_3.jpg",
    title: "Adventure",
  },
  {
    image:
      "https://tourm-react.netlify.app/assets/img/category/category_1_1.jpg",
    title: "Cruises",
  },
  {
    image:
      "https://tourm-react.netlify.app/assets/img/category/category_1_2.jpg",
    title: "Hiking",
  },
  {
    image:
      "https://tourm-react.netlify.app/assets/img/category/category_1_3.jpg",
    title: "Airbirds",
  },
];

const destinations = [
  {
    image:
      "https://tourm-react.netlify.app/assets/img/destination/destination_1_1.jpg",
    title: "Maldives",
    listing: "15 Listing",
  },

  {
    image:
      "https://tourm-react.netlify.app/assets/img/destination/destination_1_2.jpg",
    title: "Thailand",
    listing: "22 Listing",
  },

  {
    image:
      "https://tourm-react.netlify.app/assets/img/destination/destination_1_3.jpg",
    title: "Indonesia",
    listing: "18 Listing",
  },

  {
    image:
      "https://tourm-react.netlify.app/assets/img/destination/destination_1_4.jpg",
    title: "Turkey",
    listing: "30 Listing",
  },

  {
    image:
      "https://tourm-react.netlify.app/assets/img/destination/destination_1_5.jpg",
    title: "Japan",
    listing: "12 Listing",
  },
];

export default function HomeHero() {
  return (
    <>
      	<Box sx={{ width: "100%", position: "relative" }}>
			<Swiper
			modules={[Autoplay, Pagination, Navigation]}
			loop
			speed={1000}
			autoplay={{
				delay: 4000,
				disableOnInteraction: false,
			}}
			pagination={{
				el: ".custom-pagination",
				clickable: true,
			}}
			navigation={{
				nextEl: ".custom-next",
				prevEl: ".custom-prev",
			}}
			className="tourmHeroSwiper"
			>
			{slides.map((img, index) => (
				<SwiperSlide key={index}>
				<Box
					sx={{
					width: "100%",
					height: "800px",
					backgroundImage: `url(${img})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					position: "relative",
					display: "flex",
					alignItems: "center",
					}}
				>
					{/* OVERLAY */}
					<Box
					sx={{
						position: "absolute",
						inset: 0,
						background: "rgba(0,0,0,0.45)",
					}}
					/>

					{/* CONTENT */}
					<Box
					sx={{
						position: "relative",
						zIndex: 5,
						color: "#fff",
						maxWidth: "700px",
						ml: { xs: 3, md: 18 },
						mt: -5,
					}}
					>
					<Typography
						sx={{
						fontSize: "50px",
						fontFamily: "Montez",
						mb: 1,
						}}
					>
						Get unforgettable pleasure with us
					</Typography>

					<Typography
						sx={{
						fontSize: { xs: "55px", md: "80px" },
						fontWeight: 700,
						lineHeight: 1.05,
						mb: 4,
						}}
					>
						Natural Wonder
						<br />
						of the world
					</Typography>

					<Stack direction="row" spacing={2}>
						<Button
						variant="contained"
						sx={{
							background: "#20c5f7",
							borderRadius: "50px",
							px: 4,
							py: 1.8,
							fontSize: "16px",
							textTransform: "none",
							boxShadow: "none",
							gap: "5px",
						}}
						>
						Explore Tours{" "}
						<img
							alt=""
							src="https://tourm-react.netlify.app/assets/img/icon/arrow-right.svg"
						/>
						</Button>

						<Button
						variant="outlined"
						sx={{
							color: "#fff",
							borderColor: "#fff",
							borderRadius: "50px",
							px: 4,
							py: 1.8,
							fontSize: "16px",
							textTransform: "none",
							gap: "5px",
						}}
						>
						Our Services{" "}
						<img
							alt=""
							src="https://tourm-react.netlify.app/assets/img/icon/arrow-right.svg"
						/>
						</Button>
					</Stack>
					</Box>
				</Box>
				</SwiperSlide>
			))}

			{/* RIGHT NAVIGATION */}
			<div className="slider-navigation">
				<div className="custom-prev">
				<img
					src="https://tourm-react.netlify.app/assets/img/icon/left-arrow.svg"
					alt=""
				/>
				</div>

				<div className="pagination-line">
				<div className="custom-pagination"></div>
				</div>

				<div className="custom-next">
				<img
					src="https://tourm-react.netlify.app/assets/img/icon/right-arrow.svg"
					alt=""
				/>
				</div>
			</div>
			</Swiper>

			{/* SEARCH FORM */}
			<Box className="hero-search-form">
			{/* DESTINATION */}
			<Box className="search-item">
				<FmdGoodOutlinedIcon className="search-icon" />

				<Box sx={{ flex: 1 }}>
				<Typography className="label-text">Destination</Typography>

				<FormControl fullWidth variant="standard">
					<Select
					defaultValue=""
					disableUnderline
					displayEmpty
					IconComponent={KeyboardArrowDownIcon}
					className="hero-select"
					>
					<MenuItem value="">Select Destination</MenuItem>
					<MenuItem value="bali">Bali</MenuItem>
					<MenuItem value="dubai">Dubai</MenuItem>
					<MenuItem value="maldives">Maldives</MenuItem>
					</Select>
				</FormControl>
				</Box>
			</Box>

			{/* TYPE */}
			<Box className="search-item">
				<HikingOutlinedIcon className="search-icon" />

				<Box sx={{ flex: 1 }}>
				<Typography className="label-text">Type</Typography>

				<FormControl fullWidth variant="standard">
					<Select
					defaultValue=""
					disableUnderline
					displayEmpty
					IconComponent={KeyboardArrowDownIcon}
					className="hero-select"
					>
					<MenuItem value="">Adventure</MenuItem>
					<MenuItem value="adventure">Adventure</MenuItem>
					<MenuItem value="beach">Beach</MenuItem>
					</Select>
				</FormControl>
				</Box>
			</Box>

			{/* DURATION */}
			<Box className="search-item">
				<AccessTimeOutlinedIcon className="search-icon" />

				<Box sx={{ flex: 1 }}>
				<Typography className="label-text">Duration</Typography>

				<FormControl fullWidth variant="standard">
					<Select
					defaultValue=""
					disableUnderline
					displayEmpty
					IconComponent={KeyboardArrowDownIcon}
					className="hero-select"
					>
					<MenuItem value="">Duration</MenuItem>
					<MenuItem value="3">3 Days</MenuItem>
					<MenuItem value="7">7 Days</MenuItem>
					</Select>
				</FormControl>
				</Box>
			</Box>

			{/* CATEGORY */}
			<Box className="search-item no-border">
				<MapOutlinedIcon className="search-icon" />

				<Box sx={{ flex: 1 }}>
				<Typography className="label-text">Tour Category</Typography>

				<FormControl fullWidth variant="standard">
					<Select
					defaultValue=""
					disableUnderline
					displayEmpty
					IconComponent={KeyboardArrowDownIcon}
					className="hero-select"
					>
					<MenuItem value="">Select Category</MenuItem>
					<MenuItem value="family">Family</MenuItem>
					<MenuItem value="honeymoon">Honeymoon</MenuItem>
					</Select>
				</FormControl>
				</Box>
			</Box>

			{/* BUTTON */}
			<Button className="search-btn">Search</Button>
			</Box>
      	</Box>

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
					speed={1200}
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
					{categories.map((item, index) => (
					<SwiperSlide key={index}>
						<Box className="category-card">
						{/* IMAGE */}
						<Box className="image-wrapper">
							<img src={item.image} alt={item.title} />
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

      	<Box sx={{ width: "100%", position: "relative", py: "50px" }}>
			<Box sx={{ margin: "0 auto" }}>
				<Box className="travel-section">
					<Container maxWidth="xl">
					{/* TOP */}
					<Box className="travel-top">
						<Box>
							<Typography
								sx={{
								fontSize: "50px",
								fontFamily: "Montez",
								mb: 1,
								color: "#113d48",
								}}
							>
								Top Destination
							</Typography>

							<Typography
								sx={{
								fontSize: "50px",
								color: "#113d48",
								fontWeight: "700",
								}}
							>
								Popular Destination
							</Typography>
						</Box>
						{/* CUSTOM BUTTONS */}
						<Box className="slider-buttons">
						<Box className="custom-prev">
							<ArrowBack />
						</Box>

						<Box className="custom-next">
							<ArrowForward />
						</Box>
						</Box>
					</Box>

					{/* SLIDER */}
					<Swiper
						modules={[Pagination, Navigation, Autoplay]}
						slidesPerView={4}
						spaceBetween={30}
						loop={true}
						centeredSlides={false}
						speed={1000}
						autoplay={{
						delay: 2500,
						disableOnInteraction: false,
						}}
						navigation={{
						prevEl: ".custom-prev",
						nextEl: ".custom-next",
						}}
						pagination={{
						clickable: true,
						}}
						breakpoints={{
						0: {
							slidesPerView: 1,
						},

						600: {
							slidesPerView: 2,
						},

						900: {
							slidesPerView: 3,
						},

						1200: {
							slidesPerView: 4,
						},
						}}
						className="travelSlider"
					>
						{destinations.map((item, index) => (
						<SwiperSlide key={index}>
							<Box className="travel-card">
							{/* IMAGE */}
							<Box
								component="img"
								src={item.image}
								alt={item.title}
								className="travel-image"
							/>

							{/* OVERLAY */}
							<Box className="travel-overlay" />

							{/* CONTENT */}
							<Box className="travel-content">
								<Typography className="travel-place">
								{item.title}
								</Typography>

								<Typography className="travel-tour">
								{item.listing}
								</Typography>

								<Button className="travel-btn">Explore More</Button>
							</Box>
							</Box>
						</SwiperSlide>
						))}
					</Swiper>
					</Container>
				</Box>
			</Box>
		</Box>

		<Box sx={{ width: "100%", position: "relative", py: "50px" }}>
			<Container maxWidth="xl">
				 <Grid className="grid-wraper">
					<Grid sx={{position:'relative'}} item md={6} sm={6} lg={6} md={6}>
						<Box
							component="img"
							src="https://tourm-react.netlify.app/assets/img/normal/about_1_1.jpg"
							alt="travel"
							sx={{
								borderRadius: "156px 156px 0px 156px",
							}}
						/>
						<Box
							component="img"
							src="https://tourm-react.netlify.app/assets/img/normal/about_1_2.jpg"
							alt="travel"
							sx={{
								borderRadius: "156px 156px 156px 0px",
								position:'absolute',
								right:'0',
								mb:4
							}}
						/>
						<Box
							component="img"
							src="https://tourm-react.netlify.app/assets/img/normal/about_1_3.jpg"
							alt="travel"
							sx={{
								borderRadius: "156px 0px 156px 156px",
								position:'absolute',
								bottom:'0',
								right:'0'
							}}
						/>
					</Grid>

					{/* SECOND COLUMN */}
					<Grid item md={6} sm={6} lg={6} >
						<Box>
							<Typography sx={{fontFamily:'Montez', color:'#113d48', fontSize:'50px'}}>
								Let’s Go Together
							</Typography>
							<Typography sx={{color:'#113d48', fontSize:'50px', fontWeight:'700', mb:3}}>
								Plan Your Trip With us
							</Typography>

							<Typography sx={{fontSize:'20px', color:'#6e7070', mb:3}}>
								There are many variations of passages of available but the majority have suffered alteration in some form,
								 by injected hum randomised words which don't look even slightly.
							</Typography>

							<Typography sx={{fontSize:'20px', color:'#6e7070', mb:3}}>
								There are many variations of passages of available but the majority have suffered alteration in some form,
								by injected hum randomised words which don't look even slightly.
							</Typography>

							<Typography sx={{color:'#113d48', fontWeight:'600', mb:3}} variant="h5">Exclusive Trip</Typography>
							<Typography sx={{fontSize:'20px', color:'#6e7070', mb:3}}>
								There are many variations of passages of available but the majority have suffered alteration in some form,
								by injected hum randomised words which don't look even slightly.
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Container>

			<Box sx={{bottom:'0', right:'7%'}} className="shape-mockup about-shape movingX d-none d-xxl-block">
				<Box
					component="img"
					src="https://tourm-react.netlify.app/assets/img/normal/about-slide-img.png"
					sx={{
								
						}}
				/>
			</Box>
		</Box>
    </>
  );
}
