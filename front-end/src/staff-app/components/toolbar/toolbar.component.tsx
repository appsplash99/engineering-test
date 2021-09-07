import React from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { Sort } from "../sort/sort"
import { Search } from "../search/search"
import { useStaffAppState } from "staff-app/context/staffAppContext"

export const Toolbar: React.FC = () => {
  const { dispatch } = useStaffAppState()

  return (
    <S.ToolbarContainer>
      <Sort />
      <Search />
      {/* START ROLL BUTTON */}
      <S.Button onClick={() => dispatch({ type: "CHANGE_ROLL_MODE", payload: true })}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
