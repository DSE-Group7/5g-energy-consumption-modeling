import React from 'react'
import { TextField } from '@mui/material'

const TextInput = ({value,onEnter,setValue}) => {

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        onEnter(event.target.value) // Pass the value to the parent component or handle it accordingly
      }
    }
  return (
    <TextField
      width="300px"
      sx={{
        borderRadius: "50px",
        backgroundColor: "white",
        "& fieldset": { border: "none" },
        "& input": {
          paddingTop: "6px",
          paddingBottom: "6px",
        },
      }}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}

export default TextInput