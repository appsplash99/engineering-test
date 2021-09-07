import React from "react"
import { Grid } from "@material-ui/core"
import { Colors } from "shared/styles/colors"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { useStaffAppState } from "staff-app/context/staffAppContext"

export const Search = () => {
  const {
    dispatch,
    state: { searchString: value },
  } = useStaffAppState()

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE_SEARCH_STRING", payload: e.target.value })
  }

  const handleResetSearch = () => dispatch({ type: "RESET_SEARCH_STRING" })

  return (
    <div style={{ margin: "0.25rem auto" }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <TextField
            multiline
            rowsMax={1}
            size="medium"
            type="search"
            value={value}
            label="Search User"
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
            <Button size="small" variant="contained" onClick={handleResetSearch}>
              Clear
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  )
}
