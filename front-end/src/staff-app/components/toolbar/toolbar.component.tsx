import React from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { Sort } from "../sort/sort"

export type ToolbarAction = "roll" | "sort"

interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
}
export const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick } = props
  return (
    <S.ToolbarContainer>
      {/* SORT */}
      {/* TODO: REMOVE BELOW LINE */}
      <div onClick={() => onItemClick("sort")}>First Name</div>
      <Sort />

      {/* SEARCH */}
      <div>Search</div>

      {/* START ROLL BUTTON */}
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
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
