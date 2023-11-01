import React from "react"
import { Stack, TextField } from "@mui/material"
import LineChartComponent from "./LineChart"
import Graph from "./Barchart"
import TextInput from "../Components/TextInput"
import api from "../apiconfig"
import axios from "axios"
const MainPageBody = () => {
  const [value, setValue] = React.useState("Search")

  const handleEnter = (value) => {
    axios
      .get(
        "https://didactic-funicular-65r46xgqvv6cg46-3002.app.github.dev/api/search",
        { query: value }
      ) // Pass the entered value as data
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error("Request failed:", error)
      })
  }

  return (
    <Stack direction="column" spacing={2}>
      <TextInput value={value} setValue={setValue} onEnter={handleEnter} />
      <LineChartComponent />
      <Graph />
    </Stack>
  )
}

export default MainPageBody