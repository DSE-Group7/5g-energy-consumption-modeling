import React from "react"
import { Stack, TextField } from "@mui/material"
import LineChartComponent from "./LineChart"
import Graph from "./Barchart"
import TextInput from "../Components/TextInput"
import api from "../apiconfig"
import axios from "axios"
const MainPageBody = () => {
  const [value, setValue] = React.useState("Search")
  const [frequencyList,setFrequencyList] = React.useState([])

  const handleEnter = (value) => {
    axios
      .post(
        "https://didactic-funicular-65r46xgqvv6cg46-3002.preview.app.github.dev/api/search",
        // {steps:value}
        { steps: value }
        // { maxRedirects: 0 },
        // { headers: { "Access-Control-Allow-Origin": "*" } }
      ) // Pass the entered value as data
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

  return (
    <Stack direction="column" spacing={2}>
      <TextInput value={value} setValue={setValue} onEnter={handleEnter} />
      <LineChartComponent frequencyList={frequencyList} />
      <Graph />
    </Stack>
  )
}

export default MainPageBody
