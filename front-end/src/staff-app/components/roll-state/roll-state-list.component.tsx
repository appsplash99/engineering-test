import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { Spacing, FontWeight } from "shared/styles/styles"
import { ItemType } from "staff-app/context/staffAppContext.type"
import { useStaffAppState } from "staff-app/context/staffAppContext"

interface Props {
  onItemClick?: (type: ItemType) => void
  size?: number
}
export const RollStateList: React.FC<Props> = ({ size = 14, onItemClick }) => {
  const {
    state: { rollStateList, updatedStudentRolls },
  } = useStaffAppState()

  /** TODO: CONFIRM FOR TASK 3 */
  // const onClick = (type: ItemType) => {
  //   if (onItemClick) {
  //     onItemClick(type)
  //   }
  // }

  return (
    <S.ListContainer>
      {rollStateList.map((s, i) => {
        if (s.type === "all") {
          return (
            <S.ListItem key={i}>
              <FontAwesomeIcon
                icon="users"
                size="sm"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // onClick(s.type)
                  console.log(`FROM ROLL STATE LIST COMPONENT with type ${s.type}`)
                }}
              />
              {/* TODO: NEED TO REMOVE/rollStateList from below and context  */}
              <span>{rollStateList.find((stateObj) => stateObj.type === "all")?.count}</span>
            </S.ListItem>
          )
        }

        return (
          <S.ListItem key={i}>
            <RollStateIcon
              type={s.type}
              size={size}
              onClick={() => {
                // onClick(s.type)
                console.log(`FROM ROLL STATE LIST COMPONENT with type ${s.type}`)
              }}
            />
            <span>{updatedStudentRolls.filter((stateObj) => stateObj.type === s.type)?.length}</span>
          </S.ListItem>
        )
      })}
    </S.ListContainer>
  )
}

const S = {
  ListContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  ListItem: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u2};

    span {
      font-weight: ${FontWeight.strong};
      margin-left: ${Spacing.u2};
    }
  `,
}
