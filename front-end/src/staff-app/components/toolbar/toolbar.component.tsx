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
  const handleStartRollMode = () => dispatch({ type: "CHANGE_ROLL_MODE", payload: true })

  return (
    <S.ToolbarContainer>
      <Sort />
      <Search />
      <S.Button onClick={handleStartRollMode}>Start Roll</S.Button>
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
    gap: ${Spacing.u2};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
