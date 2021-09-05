import React from "react"
import styled from "styled-components"
import { FontSize, Spacing } from "shared/styles/styles"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

export const Sort: React.FC = () => {
  const [showSortTypes, setShowSortTypes] = React.useState(false)
  const [state, setState] = React.useState({
    firstName: true,
    ascending: false,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
  return (
    <S.SortContainer>
      <FormControlLabel control={<Switch checked={showSortTypes} onChange={() => setShowSortTypes(!showSortTypes)} name="firstName" />} label="Sort Users" labelPlacement="start" />
      {showSortTypes && (
        <FormGroup row>
          <FormControlLabel
            control={<Switch size="small" checked={state.firstName} onChange={handleChange} name="firstName" />}
            label={state.firstName ? "First Name" : "Last Name"}
          />
          <FormControlLabel
            control={<Switch size="small" checked={state.ascending} onChange={handleChange} name="ascending" />}
            label={state.ascending ? "Ascending" : "Descending"}
          />
        </FormGroup>
      )}
    </S.SortContainer>
  )
}

const S = {
  SortContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: ${FontSize.u2};
    padding: ${Spacing.u2} ${Spacing.u5} ${Spacing.u2} ${Spacing.u2};
    gap: ${Spacing.u1};
  `,
}
