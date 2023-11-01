import { Stack, Typography } from "@mui/material"
import React from "react"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import YouTubeIcon from "@mui/icons-material/YouTube"
import Box from "@mui/material/Box"

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#151515", // Set the background color to grey
      }}
    >
      <Stack>
        <Stack
          direction="row"
          spacing={20}
          paddingTop={10}
          justifyContent="center"
        >
          <Stack textAlign="left" paddingLeft={10} spacing={2}>
            <Typography color="#FFCF43" fontSize="20px">
              {" "}
              Quick Links
            </Typography>
            <Stack direction="row" spacing={10}>
              <Stack spacing={2}>
                <Typography color="white"> About Us</Typography>
                <Typography color="white"> Digital Banking</Typography>
                <Typography color="white"> Promotions </Typography>
                <Typography color="white"> Contact Us </Typography>
              </Stack>
              <Stack spacing={2}>
                <Typography color="white"> DashBoard</Typography>
                <Typography color="white"> Transaction</Typography>
                <Typography color="white"> Plans and Interest Rates</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing={2} textAlign="left">
            <Typography color="#FFCF43" fontSize="20px">
              Reach Us
            </Typography>
            <Stack direction="row" spacing={1}>
              <img
                src="assets/images/navbar_call.png"
                alt="mission"
                style={{ height: "20px", width: "20px" }}
              />
              <Typography color="white"> +248 123 456 789</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <img
                src="assets/images/navbar_mail.png"
                alt="mission"
                style={{ height: "20px", width: "20px" }}
              />
              <Typography color="white"> contact@nexustrustbank</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <img
                src="assets/images/navbar_location.png"
                alt="mission"
                style={{ height: "20px", width: "20px" }}
              />
              <Typography color="white" width={"240px"}>
                123 Ocean Avenue,Coral Bay, Seaside City, Marine Province, Zip
                Code: 56789
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          paddingTop={10}
          justifyContent="center"
        >
          <Typography color="white" fontFamily="Inter">
            Connect With Us
          </Typography>
          <FacebookIcon style={{ color: "white" }} />
          <TwitterIcon style={{ color: "white" }} />
          <InstagramIcon style={{ color: "white" }} />
          <LinkedInIcon style={{ color: "white" }} />
          <YouTubeIcon style={{ color: "white" }} />
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
