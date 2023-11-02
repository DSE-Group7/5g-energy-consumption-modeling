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

const columns1 = ["ESMode1", "ESMode2", "ESMode6", "TXpower"]
const columns2 = ["Antennas", "Frequency", "load", "Bandwidth"]

const Estimate = () => {
  const [selectedCells, setSelectedCells] = useState(["Cell0"])

  const addCell = (cell) => {
    if (selectedCells.length < 4) {
      setSelectedCells((prevSelectedCells) => [...prevSelectedCells, cell])
    }
  }

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
      backgroundColor="#505050"
      direction="column"
      spacing={2}
      padding={2}
      alignItems="center"
      sx={{ width: `100vw`, marginTop: "240px" }}
    >
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <Stack direction={"column"} spacing={0}>
            <Typography>Base Station</Typography>
            <TextInput width="200px" value={inputData["BS"]} />
          </Stack>
          <Stack direction={"column"} spacing={0}>
            <Typography>Hour</Typography>
            <TextInput width="200px" value={inputData["hour"]} />
          </Stack>
          <Stack direction={"column"} spacing={0}>
            <Typography>Mode</Typography>
            <TextInput width="200px" value={inputData["Mode"]} />
          </Stack>
          <Stack direction={"column"} spacing={0}>
            <Typography>RUType</Typography>
            <TextInput width="200px" value={inputData["RUType"]} />
          </Stack>
        </Stack>
        {selectedCells.map((cell) => (
          <div key={cell}>
            <Typography variant="h5">{cell}</Typography>
            <Stack direction={"row"} spacing={2} key={cell}>
              {columns1.map((column) => (
                <div key={column}>
                  <Typography>{column}</Typography>
                  <TextInput
                    width="200px"
                    value={inputData[`${column}_${cell}`]}
                  />
                </div>
              ))}
            </Stack>
            <Stack direction={"row"} spacing={2} key={`${cell}1`}>
              {columns2.map((column) => (
                <div key={column}>
                  <Typography>{column}</Typography>
                  <TextInput
                    width="200px"
                    value={inputData[`${column}_${cell}`]}
                  />
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

        <Button
          variant="contained"
          onClick={() => addCell(`Cell${selectedCells.length}`)}
          disabled={selectedCells.length >= 4}
        >
          Add Cell
        </Button>
      </Stack>
      <Typography>ENERGY : {outputData}</Typography>
    </Stack>
  )
}

export default Estimate
