import React from "react"
import { Button, Stack, TextField, Typography } from "@mui/material"
import LineChartComponent from "./LineChart"
import Graph from "./Barchart"
import TextInput from "../Components/TextInput"
import api from "../apiconfig"
import axios from "axios"

const Forecast = () => {
  const [steps, setSteps] = React.useState()
  const [baseStation, setBaseStation] = React.useState()
  const [frequencyList,setFrequencyList] = React.useState([])

  const handleStepsEnter = (steps) => {
    axios
      .post(
        "http://localhost:3002/api/forecast",
        { steps: steps }

      ) 
      .then((response) => {
        console.log(response)
        console.log(response.data)
        setFrequencyList(response.data)
        console.log("Freaquency List at Main",frequencyList)
      })
      .catch((error) => {
        console.error("Request failed:", error)
      })
  }
    const handleBaseStationEnter = (steps,basestation) => {
      axios
        .post("http://localhost:3002/api/search", {
          steps: steps,
          basestation: basestation,
        })
        .then((response) => {
          console.log(response)
          console.log(response.data)
          setFrequencyList(response.data)
          console.log("Freaquency List at Main", frequencyList)
        })
        .catch((error) => {
          console.error("Request failed:", error)
        })
    }

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h5">No: of Steps</Typography>
        <TextInput
          value={steps}
          setValue={setSteps}
          onEnter={handleStepsEnter}
        />
        <Typography variant="h5">Base Station</Typography>
        <TextInput
          value={baseStation}
          setValue={setBaseStation}
          onEnter={() =>handleBaseStationEnter(steps,baseStation)}
        />
      </Stack>
      <LineChartComponent frequencyList={frequencyList} />
      {/* <Graph /> */}
    </Stack>
  )
}

export default Forecast
