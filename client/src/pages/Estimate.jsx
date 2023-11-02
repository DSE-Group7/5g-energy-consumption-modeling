import React, { useState, useContext, useEffect } from "react"
import { Box, Button, Drawer, Stack, Typography } from "@mui/material"
import axios from "axios"
const Estimate = () => {
  const [inputData, setInputData] = useState([])
  const [outputData, setOutputData] = useState(1)

  const fillWithRandomData = () => {
    axios.get("http://localhost:3002/api/random_fill").then((response) => {
      //   response.json()
      console.log(response.data)
      setInputData(response.data)
    })
  }

  const handlePredict = () => {
    axios
      .post("http://localhost:3002/api/predict_energy", {features:inputData})
      .then((response) => {
        console.log(response)
        console.log(response.data)
        setOutputData(response.data)
      })
      .catch((error) => {
        console.error("Request failed:", error)
      })
  }
  // Antenna, TXpower, Bandwidth, Load, Frequency, ESMode1, ESMode2, ESMode6,
    //   RUType, Mode, hour
  return (
    <Stack direction="column" spacing={2}>
      <Button
        variant="contained"
        onClick={() => {
          fillWithRandomData()
        }}
      >
        Fill with Random Data
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          handlePredict()
        }}
      >
        Submit Your Data
      </Button>
      {/* {Object.entries(inputData).map(([key, value]) => (
        <Typography key={key}>
          {key} : {value}
        </Typography>
      ))} */}
      
      <Typography>ENERGY : {outputData}</Typography>
    </Stack>
  )
}

export default Estimate
