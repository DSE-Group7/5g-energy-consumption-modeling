import * as React from "react"
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MailIcon from "@mui/icons-material/Mail"
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import QueryStatsIcon from "@mui/icons-material/QueryStats"

const drawerWidth = 240

function ResponsiveDrawer({setContent}) {

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={"Forecast"} disablePadding>
          <ListItemButton onClick={() => setContent("Forecast")}>
            <ListItemIcon sx={{ color: "#FFFFFF" }}>
              <QueryStatsIcon/>
            </ListItemIcon>
            <ListItemText sx={{ color: "#FFFFFF" }} primary={"Forecast"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Estimate"} disablePadding>
          <ListItemButton onClick={() => setContent("Estimate")}>
            <ListItemIcon sx={{ color: "#FFFFFF" }}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText sx={{ color: "#FFFFFF" }} primary={"Estimate"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#303030",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ECO Track 5G
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#303030",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default ResponsiveDrawer
