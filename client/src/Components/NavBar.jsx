import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import LoginPopup from "../popups/Login"
import ContactUsPopup from "../popups/ContactUs"
import PromotionPopup from "../popups/Promotions"
import DigitalBankingPopup from "../popups/DigitalBanking"
import AboutUsPopup from "../popups/AboutUs"
import GreyBox from "./GreyBox"
import { Paper } from "@mui/material"
const pages = ["About Us", "Digital Banking", "Promotions", "Contact Us"]

function NavBar() {
  const customFontStyle = {
    fontFamily: "Inter",
    fontWeight: 500, // You can adjust font weight as needed
    fontSize: "12px",
  }

  const [open, setOpen] = React.useState(false)
  const { user, userType, login, logout } = useContext(AuthContext)
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElProfileMenu, setAnchorElProfileMenu] = React.useState(null)
  const [openPopups, setOpenPopups] = React.useState({})
  const [isOverlayVisible, setOverlayVisible] = React.useState(false)

  const handleOpenProfileMenu = (event) => {
    setAnchorElProfileMenu(event.currentTarget)
    setOverlayVisible(true)
  }

  const handleProfileSettings = (event) => {
    setAnchorElProfileMenu(event.currentTarget)
    setOverlayVisible(false)
  }

  const handleCloseProfileMenu = () => {
    setAnchorElProfileMenu(null)
    setOverlayVisible(false)
  }

  const handleLogout = () => {
    logout()
    setAnchorElProfileMenu(null)
  }

  const handleOpenPopup = (page) => {
    setOpenPopups({ ...openPopups, [page]: true })
  }

  const handleClosePopup = (page) => {
    setOpenPopups({ ...openPopups, [page]: false })
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const loginPopupOpen = () => {
    setOpen(true)
  }

  const registerPopupOpen = () => {
    console.log("Register popup opened")
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "black",
        width: "100%",
        margin: 0, // Remove margin
        padding: 0, // Set the background color to black
        boxShadow: "none", // Remove the shadow
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    className="Typography--heading"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box>
            <Typography
              style={{ ...customFontStyle, fontSize: "20px", fontWeight: 800 }}
            >
              <span style={{ color: "white" }}>Nexus</span>
              <span style={{ color: "#FFCF43" }}> Trust </span>
              <span style={{ color: "white" }}>Bank</span>
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center", // Center the content horizontally
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleOpenPopup(page)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  padding: "10px 20px",
                }}
                style={customFontStyle}
              >
                {page}
              </Button>
            ))}
          </Box>

          {user !== null ? (
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              {/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={login}
                color="inherit"
              >
                <PowerSettingsNewIcon />
              </IconButton> */}
              <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenProfileMenu}
                  color="inherit"
                >
                  <AccountCircleOutlinedIcon />
                </IconButton>
              </Box>
              {/* <Box sx={{ marginRight: "20px" }} /> */}
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={loginPopupOpen}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  padding: "10px 20px",
                }}
                style={customFontStyle}
              >
                Login
              </Button>
              <Box sx={{ marginRight: "10px" }} />{" "}
              {/* Add a margin between buttons */}
              <Button
                onClick={registerPopupOpen}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  padding: "10px 20px",
                }}
                style={customFontStyle}
              >
                Register
              </Button>
            </Box>
          )}
          <LoginPopup open={open} onClose={handleClose} />
          <ContactUsPopup
            open={openPopups["Contact Us"]}
            onClose={handleClosePopup}
            name={"Contact Us"}
          />
          <PromotionPopup
            open={openPopups["Promotions"]}
            onClose={handleClosePopup}
            name={"Promotions"}
          />
          <DigitalBankingPopup
            open={openPopups["Digital Banking"]}
            onClose={handleClosePopup}
            name={"Digital Banking"}
          />
          <AboutUsPopup
            open={openPopups["About Us"]}
            onClose={handleClosePopup}
            name={"About Us"}
          />
          <Menu
            id="profile-menu"
            anchorEl={anchorElProfileMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElProfileMenu)}
            onClose={handleCloseProfileMenu}
            PaperProps={{
              style: {
                backgroundColor: "#151515",
                boxShadow: "none", // Remove box-shadow
                border: "none",
              },
            }}
          >
            <Paper style={{ backgroundColor: "#151515", boxShadow: "none" }}>
              {user !== null && (
                // <GreyBox>
                <div>
                  <MenuItem
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#353535 !important",
                      },
                    }}
                    onClick={handleProfileSettings}
                  >
                    Profile Settings
                  </MenuItem>
                  <MenuItem
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#353535 !important",
                      },
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </MenuItem>
                </div>
                // </GreyBox>
              )}
            </Paper>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
