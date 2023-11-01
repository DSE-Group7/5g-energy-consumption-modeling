import React from "react"
import { Paper, Typography } from "@mui/material"

const GreyBox = ({children,allignment = "center", padding = "16px"}) => {
  const boxStyle = {
    backgroundColor: "#151515", // Set the background color to grey
    padding: padding, // You can adjust the padding as needed
    textAlign: allignment,
    color: "white", // Set the text color to white
    fontWeight: "bold", // Set the font weight to bold
    borderRadius: "20px",
  }

  return (
    <Paper style={boxStyle}>
      {children} 
    </Paper>
  )
}

export default GreyBox
