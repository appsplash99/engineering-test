import React from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components"
import { useStaffAppState } from "staff-app/context/staffAppContext"
import { transformArrayToRollInputObj } from "staff-app/utils"
import { useNavigate } from "react-router-dom"

interface Props {
  saveRollinLocalStorage: (params?: object | undefined) => Promise<void>
  setShowAlert: (params: boolean) => void
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
  let navigate = useNavigate()
  const { saveRollinLocalStorage, setShowAlert } = props
  const {
    state: { isRollMode, updatedStudentRolls },
    dispatch,
  } = useStaffAppState()

  return (
    <S.Overlay isActive={isRollMode}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button
              color="inherit"
              onClick={() => {
                dispatch({ type: "CHANGE_ROLL_MODE", payload: false })
                dispatch({ type: "FILTER_STUDENTS_BY_ROLL_TYPE", payload: "all" })
              }}
            >
              Exit
            </Button>
            <Button
              color="inherit"
              style={{ marginLeft: Spacing.u2 }}
              onClick={() => {
                dispatch({ type: "CHANGE_ROLL_MODE", payload: false })
                dispatch({ type: "FILTER_STUDENTS_BY_ROLL_TYPE", payload: "all" })
                saveRollinLocalStorage(transformArrayToRollInputObj(updatedStudentRolls))
                setShowAlert(true)
                navigate("/staff/activity")
              }}
            >
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
