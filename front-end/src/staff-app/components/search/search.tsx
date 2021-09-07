import React, { useState } from "react"
import { Grid } from "@material-ui/core"
import { Colors } from "shared/styles/colors"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

export const Search = () => {
  const [value, setValue] = useState("")

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => prev + e.target.value)
  }

  return (
    <div>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <TextField
            multiline
            rowsMax={1}
            size="small"
            type="search"
            value={value}
            label="Search"
            variant="filled"
            fullWidth={false}
            id="outlined-search"
            onChange={handleOnChange}
            placeholder="John, carlos, etc..."
            InputProps={{ style: { backgroundColor: `${Colors.neutral.lighter}` } }}
          />
        </Grid>
        <Grid item>
          {value.length > 0 && (
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setValue("")
              }}
            >
              Clear
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  )
}
