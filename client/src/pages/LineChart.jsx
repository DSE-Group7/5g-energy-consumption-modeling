import React,{useEffect} from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const LineChartComponent = ({frequencyList}) => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

  const data1 = [
    { Energy: 23.4, name: "2023-01-06 00:00:00" },
    { Energy: 23.34, name: "2023-01-06 01:00:00" },
    { Energy: 23.24, name: "2023-01-06 02:00:00" },
    { Energy: 23.14, name: "2023-01-06 03:00:00" },
  ]

  useEffect(() => {
    console.log("Data1 at LineChart",data1)
  },[])
  
  useEffect(() => {
    console.log("Freaquency List at LineChart",frequencyList)
  },[frequencyList])

  return (
    <LineChart
      width={730}
      height={250}
      data={frequencyList}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="#FFFFFF" />
      <YAxis stroke="#FFFFFF" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Energy" stroke="#82ca9d" />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  )
}

export default LineChartComponent
