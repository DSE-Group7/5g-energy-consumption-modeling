import React from "react"
import { Box, Drawer, Stack, Typography } from "@mui/material"
import Graph from "./Barchart"
import LineChartComponent from "./LineChart"
import ResponsiveDrawer from "./Drawer"
import MainPageBody from "./MainPageBody"
const Dashboard = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#151515",
        color: "#FFFFFF",
        width: "100vw", // Set width to full viewport width
        height: "100vh", // Set height to full viewport height
        position: "absolute", // Position the box absolutely
        top: 0, // Position at the top of the viewport
        left: 0, // Position at the left of the viewport
        display: "flex",
        justifyContent: "center", // Center content horizontally
        alignItems: "center", // Center content vertically
      }}
    >
      <ResponsiveDrawer />
      <MainPageBody />
    </Box>
  )
}

export default Dashboard
