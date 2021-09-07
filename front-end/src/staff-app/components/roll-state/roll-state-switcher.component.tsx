import React, { useState } from "react"
import { Person } from "shared/models/person"
import { RolllStateType } from "shared/models/roll"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { useStaffAppState } from "staff-app/context/staffAppContext"

interface Props {
  size?: number
  student: Person
  initialState?: RolllStateType
  onStateChange?: (newState: RolllStateType) => void
}
export const RollStateSwitcher: React.FC<Props> = ({ student, initialState = "unmark", size = 40, onStateChange }) => {
  const { dispatch } = useStaffAppState()
  const [rollState, setRollState] = useState(initialState)

  /** ORIGINAL FUNCTION */
  // const nextState = () => {
  //   const states: RolllStateType[] = ["present", "late", "absent"]
  //   if (rollState === "unmark" || rollState === "absent") return states[0]
  //   const matchingIndex = states.findIndex((s) => s === rollState)
  //   return matchingIndex > -1 ? states[matchingIndex + 1] : states[0]
  // }

  const nextState = () => {
    /** TODO: BELOW LINE IS TO BE USED IN TASK 4 */
    // console.log({ stdId: student.id })
    //////////////////////////

    const states: RolllStateType[] = ["present", "late", "absent"]
    // console.log("DISPATCH HERE - FROM EACH STUDENT LIST ICON")

    if (rollState === "unmark" || rollState === "absent") {
      dispatch({ type: "ADD_OR_UPDATE_STUDENT_INTO_UPDATED_STUDENT_ROLLS", payload: { ...student, type: states[0] } })
      // console.log({ "FIRST IF": rollState })
      return states[0]
    }

    const matchingIndex = states.findIndex((s) => s === rollState)
    if (matchingIndex > -1) {
      // console.log({ "SECOND IF": rollState })
      dispatch({ type: "ADD_OR_UPDATE_STUDENT_INTO_UPDATED_STUDENT_ROLLS", payload: { ...student, type: states[matchingIndex + 1] } })
      return states[matchingIndex + 1]
    }

    // console.log({ "AFTER ALL IFs": rollState })
    return states[0]
  }

  const onClick = () => {
    const next = nextState()
    setRollState(next)
    if (onStateChange) {
      onStateChange(next)
    }
  }

  return <RollStateIcon size={size} type={rollState} onClick={onClick} />
}
