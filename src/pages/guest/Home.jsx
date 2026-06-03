import {Box, Typography, Button, Stack, Select, MenuItem, FormControl, Container, Grid, Rating, IconButton,} from "@mui/material";
import { useState } from "react";

import { ArrowForward, ArrowBack } from "@mui/icons-material";


import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import HikingOutlinedIcon from "@mui/icons-material/HikingOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import ZoomInIcon from "@mui/icons-material/ZoomIn";


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// components 
import Team from "../../components/Team";
import Testimonial from '../../components/Testimonial';
import Blog from '../../components/Blog';
import Categoryes from './../../components/Categoryes';


const slides = [
  "https://tourm-react.netlify.app/assets/img/hero/hero_bg_1_1.jpg",
  "https://tourm-react.netlify.app/assets/img/hero/hero_bg_1_2.jpg",
  "https://tourm-react.netlify.app/assets/img/hero/hero_bg_1_3.jpg",
];

// const categories = [
//   {
//     image:
//       "https://tourm-react.netlify.app/assets/img/category/category_1_1.jpg",
//     title: "Cruises",
//   },
//   {
//     image:
//       "https://tourm-react.netlify.app/assets/img/category/category_1_2.jpg",
//     title: "Hiking",
//   },
//   {
//     image:
//       "https://tourm-react.netlify.app/assets/img/category/category_1_3.jpg",
//     title: "Airbirds",
//   },
//   {
//     image:
//       "https://tourm-react.netlify.app/assets/img/category/category_1_4.jpg",
//     title: "Wildlife",
//   },
//   {
//     image:
//       "https://tourm-react.netlify.app/assets/img/category/category_1_5.jpg",
//     title: "Walking",
//   },
//   {
//     image:
//       "https://tourm-react.netlify.app/assets/img/category/category_1_3.jpg",
//     title: "Adventure",
//   },
//   {
//     image:
//       "https://tourm-react.netlify.app/assets/img/category/category_1_1.jpg",
//     title: "Cruises",
//   },
//   {
//     image:
//       "https://tourm-react.netlify.app/assets/img/category/category_1_2.jpg",
//     title: "Hiking",
//   },
//   {
//     image:
//       "https://tourm-react.netlify.app/assets/img/category/category_1_3.jpg",
//     title: "Airbirds",
//   },
// ];

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

const tours=[
	{
		image:"https://tourm-react.netlify.app/assets/img/tour/tour_box_1.jpg",
		title:"Greece Tour Package",
		price:"980",
		days:"4 Days",
		rating:3.5,
	},
	{
		image:"https://tourm-react.netlify.app/assets/img/tour/tour_box_2.jpg",
		title:"Italy Tour Package",
		price:"880",
		days:"4 Days",
		rating:4.5,
	},
	{
		image:"https://tourm-react.netlify.app/assets/img/tour/tour_box_3.jpg",
		title:"Dubai Tour Package",
		price:"780",
		days:"4 Days",
		rating:2.5,
	},

	{
		image:"https://tourm-react.netlify.app/assets/img/tour/tour_box_4.jpg",
		title:"Switzerland Tour",
		price:"780",
		days:"4 Days",
		rating: 1.5,
	},

	{
		image:"https://tourm-react.netlify.app/assets/img/tour/tour_box_3.jpg",
		title:"Dubai Tour Package",
		price:"780",
		days:"4 Days",
		rating:5,
	},
	
];

const imgStyle = {
  width: "auto",
  height: "220px",
  objectFit: "cover",
  borderRadius: "30px",
};


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

		{/* <Box>
			<button onClick={toggleDirection}>
				{rtl ? "Switch to LTR" : "Switch to RTL"}
			</button>
		</Box> */}

      	<Box>
			<Categoryes />
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

		<Box sx={{ width: "100%", position: "relative", pt: "50px", pb:"100px" }}>
			<Container maxWidth="xl">
				 <Grid className="grid-wraper">
					<Grid sx={{position:'relative'}} item md={6} sm={6} lg={6}>
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

			<Box sx={{bottom:'7%', right:'7%'}} className="shape-mockup about-shape movingX d-none d-xxl-block">
				<Box
					component="img"
					src="https://tourm-react.netlify.app/assets/img/normal/about-slide-img.png"
					sx={{
								
						}}
				/>
			</Box>

			<Box className="shape-img">
				<Box
					component="img"
					src="https://tourm-react.netlify.app/assets/img/shape/shape_6.png"
					sx={{
						position:'absolute',
						bottom:'0',
						right:'0'
					}}
				/>
			</Box>
			<Box className="shape-img">
				<Box
					component="img"
					src="https://tourm-react.netlify.app/assets/img/shape/shape_6.png"

					sx={{
						position:'absolute',
						bottom:'0',
					}}
				/>
			</Box>
		</Box>
					{/* <Box>
			 <TravelFloatingIcons />
		</Box> */}
		<Box 
			sx={{
				py: "100px",
				backgroundImage: `url("https://tourm-react.netlify.app/assets/img/bg/tour_bg_1.jpg")`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		> 
			<Container maxWidth="xl">
				<Box sx={{textAlign:'center'}}>
					<Typography sx={{fontSize:'50px', color:'#113d48', fontFamily:'Montez'}}>
						Best Place For You
					</Typography>
					<Typography variant="h4" sx={{color:'#113d48', fontSize:'50px', fontWeight:'700', mb:2}}>
						Most Popular Tour
					</Typography>
					<Typography sx={{color:'#6e7070', fontSize:'17px'}}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br></br> tempor incididunt ut labore et dolore magna aliqua.
					</Typography>
				</Box>

				<Box sx={{mt:'40px'}} className="tour-area">
					<Swiper
						modules={[Autoplay]}
						slidesPerView={"4"}
						loop={true}
						speed={1200}
						spaceBetween={25}
						autoplay={{
						delay: 2500,
						disableOnInteraction: true,
						}}
					
						className="swiper swiper-initialized swiper-horizontal "
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
							slidesPerView: 4,
						},
						}}
					>
						{tours.map((item, index) => (
						<SwiperSlide key={index}>
							<Box sx={{background:'#fff', padding:'15px', borderRadius:'10px', border:'1px solid #dedede'}} className="tour-card">
								{/* IMAGE */}
								<Box className="tour_img">
									{/* <img src={item.image} alt={item.title} /> */}
									<Box
										component="img"
										src={item.image}
										sx={{
											borderRadius:'10px',
											width:'100%',
											height:'300px',
											objectFit:'cover',
										}}
									/>
								</Box>

								{/* TEXT */}

								<Box sx={{}} className="tour-content">
									<Typography sx={{marginTop:'15px', color:'#113d48', fontSize:'20px', fontWeight:'600'}} className="tour-title">
										{item.title}
									</Typography>

									<Typography sx={{display:'flex', alignItems:'center', gap:'5px', mt:'10px'}} className="rating">
										<Rating sx={{fontSize:'25px'}} name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly /> 
										<Typography sx={{fontSize:'17px', fontWeight:'600'}} variant="span">
											({item.rating} Rating)
										</Typography>
									</Typography>

									<Typography sx={{mt:'10px'}} className="card-price">
										<Typography sx={{fontSize:'20px', fontWeight:'600'}} variant="span">${item.price}</Typography>
										<Typography sx={{color:'#6e7070', fontSize:'17px'}} variant="span">/Person</Typography>
									</Typography>
								</Box>

								<Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', mt:'10px'}} className="tour-box">
									<Typography
										sx={{
											fontSize: "18px",
											fontWeight: 600,
											display: "flex",
											alignItems: "center",
											gap: 1,
										}}
										>
										<AccessTimeOutlinedIcon />
										{item.days}
									</Typography>
									<Button
										variant="contained"
										sx={{
											background: "#fff",
											borderRadius: "50px",
											px: 3,
											py: 1,
											fontSize: "16px",
											textTransform: "none",
											boxShadow: "none",
											color:'#113d48',
											gap: "5px",
											border:'1px solid #dedede',
											fontWeight:'600',

											"&:hover": {
												backgroundColor: "#1976d2", // hover color
												boxShadow: "none",
												color:'#fff',
											},
											}}
										>
										Explore Tours{" "}
										
									</Button>
								</Box>
								
							</Box>
						</SwiperSlide>
						))}
					</Swiper>
				</Box>
				
			</Container>
		</Box>
		
		<Box sx={{py: "70px"}}>
			<Box sx={{textAlign:'center'}}>
				<Typography sx={{fontSize:'50px', color:'#113d48', fontFamily:'Montez'}}>
					Make Your Tour More Pleasure
				</Typography>
				<Typography variant="h4" sx={{color:'#113d48', fontSize:'50px', fontWeight:'700', mb:2}}>
					Recent Gallery
				</Typography>
			</Box>

			<Container maxWidth="xl" sx={{marginTop:'40px'}}>
				<Grid container spacing={3} justifyContent="center">
					{/* 1st */}
					<Grid item xs={12} md={6} lg={2}>
						<Box sx={{ mt: "90px" }}>
						<img
							src="https://tourm-react.netlify.app/assets/img/gallery/gallery_1_1.jpg"
							alt=""
							style={imgStyle}
						/>
						</Box>
					</Grid>

					{/* 2nd */}
					<Grid item xs={12} md={6} lg={2}>
						<Box sx={{display:'grid'}}>
						<img
							src="https://tourm-react.netlify.app/assets/img/gallery/gallery_1_2.jpg"
							alt=""
							style={{ ...imgStyle, marginBottom: "24px" }}
						/>

						<img
							src="https://tourm-react.netlify.app/assets/img/gallery/gallery_1_3.jpg"
							alt=""
							style={imgStyle}
						/>
						</Box>
					</Grid>

					{/* Center */}
					<Grid item xs={12} md={6} lg={2}>
						<img
						src="https://tourm-react.netlify.app/assets/img/gallery/gallery_1_4.jpg"
						alt=""
						style={{
							width: "100%",
							height: "465px",
							objectFit: "cover",
							borderRadius: "30px",
						}}
						/>
					</Grid>

					{/* 4th */}
					<Grid item xs={12} md={6} lg={2}>
						<Box sx={{display:'grid'}}>
						<img
							src="https://tourm-react.netlify.app/assets/img/gallery/gallery_1_5.jpg"
							alt=""
							style={{ ...imgStyle, marginBottom: "24px" }}
						/>

						<img
							src="https://tourm-react.netlify.app/assets/img/gallery/gallery_1_6.jpg"
							alt=""
							style={imgStyle}
						/>
						</Box>
					</Grid>

					{/* Last */}
					<Grid item xs={12} md={6} lg={2}>
						<Box sx={{ mt: "90px" }}>
						<img
							src="https://tourm-react.netlify.app/assets/img/gallery/gallery_1_7.jpg"
							alt=""
							style={imgStyle}
						/>
						</Box>
					</Grid>
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

			<Box className="shape-img">
				<Box
					component="img"
					src="https://tourm-react.netlify.app/assets/img/shape/shape_6.png"

					sx={{
						position:'absolute',
						bottom:'0'
					}}
				/>
			</Box>
			<Box className="shape-img">
				<Box
					component="img"
					src="https://tourm-react.netlify.app/assets/img/shape/shape_6.png"

					sx={{
						position:'absolute',
						bottom:'0',
						right:'0'
					}}
				/>
			</Box>
		</Box>

		<Box 
			sx={{
				py: "70px",
				backgroundImage: `url("https://tourm-react.netlify.app/assets/img/bg/tour_bg_1.jpg")`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		> 
			<Container maxWidth="xl">
				<Box sx={{mt:'0px'}} className="tour-area">
					<Team />
				</Box>
			</Container>
		</Box>

		<Box>
			<Testimonial />
		</Box>

		<Box>
			<Blog />
		</Box>
    </>
  );
}
