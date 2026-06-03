import { Box, Card, CardContent, Avatar, Typography, IconButton, Stack, Grid, Container,} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const teamData = [
  {
    name: "Guy Hawkins",
    role: "Tourist Guide",
    image: "https://tourm-react.netlify.app/assets/img/team/team_1_1.jpg",
  },
  {
    name: "Jenny Wilson",
    role: "Travel Agent",
    image: "https://tourm-react.netlify.app/assets/img/team/team_1_2.jpg",
  },
  {
    name: "Robert Fox",
    role: "Tour Manager",
    image: "https://tourm-react.netlify.app/assets/img/team/team_1_3.jpg",
  },
  {
    name: "Kristin Watson",
    role: "Adventure Guide",
    image: "https://tourm-react.netlify.app/assets/img/team/team_1_4.jpg",
  },
];

export default function TeamSection() {
  return (
    <Box>
        <Box sx={{textAlign:'center'}}>
            <Typography sx={{fontSize:'50px', color:'#113d48', fontFamily:'Montez'}}>
                Meet with Guide
            </Typography>
            <Typography variant="h4" sx={{color:'#113d48', fontSize:'50px', fontWeight:'700', mb:2}}>
                Tour Guide
            </Typography>
        </Box>
      <Container maxWidth="xl">
        <Box sx={{gap:'20px', mt:'40px'}} container spacing={4} className="grid-for">
          {teamData.map((team, index) => (
            <Box  key={index}>
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  overflow: "hidden",
                  zIndex: 2,
                  transition: "all 0.4s ease",
                  "--space": "40px",
                  "&:hover .team-img img": {
                    transform: "scale(1.08)",
                  },
                }}
              >
                {/* Team Image */}
                <Box
                  className="team-img"
                  sx={{
                    maxWidth: "calc(100% - var(--space) * 2)",
                    margin: "0 auto",
                    border: "3px solid #fff",
                    overflow: "hidden",
                    position: "relative",
                    borderRadius: "50%",
                    zIndex: 3,
                    bgcolor: "#fff",
                  }}
                >
                  <Avatar
                    src={team.image}
                    alt={team.name}
                    variant="circular"
                    sx={{
                      width: "100%",
                      height: "100%",
                      aspectRatio: "1/1",
                      transition: "all 1.3s ease",
                    }}
                    imgProps={{
                      style: {
                        objectFit: "cover",
                      },
                    }}
                  />
                </Box>

                {/* Content */}
                <Card
                  elevation={0}
                  sx={{
                    position: "relative",
                    pt: "120px",
                    px: 2,
                    pb: 2,
                    mt: "-90px",
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    zIndex: 2,
                  }}
                >
                  <CardContent
                    sx={{
                      borderRadius: "16px",
                      backgroundColor: "#E9F6F9",
                      p: "24px 20px",
                      transition: "all 0.4s ease",
                      overflow: "hidden",
                      "&:last-child": {
                        pb: "24px",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                      }}
                    >
                      {team.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        mb: 2,
                      }}
                    >
                      {team.role}
                    </Typography>

                    {/* Social Icons */}
                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={1}

                      sx={{justifyContent:"center"}}
                    >
                      {[
                        { icon: <FacebookIcon fontSize="small" />, link: "#" },
                        { icon: <TwitterIcon fontSize="small" />, link: "#" },
                        { icon: <InstagramIcon fontSize="small" />, link: "#" },
                        { icon: <LinkedInIcon fontSize="small" />, link: "#" },
                      ].map((item, i) => (
                        <IconButton
                          key={i}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            width: 32,
                            height: 32,
                            border: "1px solid #0d6efd",
                            color: "#0d6efd",
                            backgroundColor: "transparent",
                            transition: "all 0.4s ease",
                            "&:hover": {
                              backgroundColor: "#0d6efd",
                              color: "#fff",
                            },
                          }}
                        >
                          {item.icon}
                        </IconButton>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}