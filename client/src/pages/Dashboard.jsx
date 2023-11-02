import React, { useEffect } from "react"
import { Box, Drawer, Stack, Typography } from "@mui/material"
import Graph from "./Barchart"
import LineChartComponent from "./LineChart"
import ResponsiveDrawer from "./Drawer"
import MainPageBody from "./Forecast"
import Forecast from "./Forecast"
import Estimate from "./Estimate"
const Dashboard = () => {
  const [content, setContent] = React.useState("Forecast")

  useEffect(() => { 
    console.log("Content", content)
  }
  ,[content])

  return (
    <Box
      sx={{
        backgroundColor: "#505050",
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
      <ResponsiveDrawer content={content} setContent={setContent} />
      {content === "Forecast" && <Forecast />}
      {content === "Estimate" && <Estimate />}

      {/* {content === "Estimate" && <MainPageBody />} */}
    </Box>
  )
}

export default Dashboard
