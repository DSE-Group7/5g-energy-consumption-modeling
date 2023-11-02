import React, { useState, useContext, useEffect } from "react"
import {
  Box,
  Button,
  Drawer,
  Grid,
  Stack,
  Typography,
  TextField,
} from "@mui/material"
import axios from "axios"
import TextInput from "../Components/TextInput"

const cells = ["Cell0", "Cell1", "Cell2", "Cell3"]

const columns1 = ["Esmode1", "Esmode2", "Esmode6", "TXPower"]

const columns2 = ["Antennas", "Frequency", "load", "Bandwidth"]

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
      .post("http://localhost:3002/api/predict_energy", { features: inputData })
      .then((response) => {
        console.log(response)
        console.log(response.data)
        setOutputData(response.data)
      })
      .catch((error) => {
        console.error("Request failed:", error)
      })
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      //   backgroundColor="#000000"
      alignItems="center"
      sx={{ height: "80vh" }}
    >
      <Stack direction={"column"} spacing={2}>
        {cells.map((cell) => (
          <div key={cell}>
            <Stack direction={"row"} spacing={2} key={cell}>
              {columns1.map((column) => (
                <div key={column}>
                  <Typography>{column}</Typography>
                  <TextInput width="200px" />
                </div>
              ))}
            </Stack>
            <Stack direction={"row"} spacing={2} key={`${cell}1`}>
              {columns2.map((column) => (
                <div key={column}>
                  <Typography>{column}</Typography>
                  <TextInput width="200px" />
                </div>
              ))}
            </Stack>
          </div>
        ))}
      </Stack>
      <Stack direction={"row"} spacing={2}>
        <Button
          style={{ width: "200px" }}
          variant="contained"
          onClick={() => {
            fillWithRandomData()
          }}
        >
          Fill with Random Data
        </Button>
        <Button
          style={{ width: "200px" }}
          variant="contained"
          onClick={() => {
            handlePredict()
          }}
        >
          Submit Your Data
        </Button>
      </Stack>
      <Typography>ENERGY : {outputData}</Typography>
    </Stack>
  )
}

export default Estimate
