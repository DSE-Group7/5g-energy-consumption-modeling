import React from "react"
import { Button } from "@mui/material"

const YellowButton = ({ text,onClick }) => {
  return (
    <Button
    onClick={onClick}
      variant="contained"
      style={{
        fontFamily: "Inter",
        textTransform: "none",
        fontWeight: 600,
        backgroundColor: "#FFCF43",
        color: "black",
        borderRadius: "20px",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 20px", // Add padding to increase the button size
      }}
      sx={{
        "&:hover": {
          backgroundColor: "yellow",
        },
      }}
    >
      {text}
    </Button>
  )
}

export default YellowButton
