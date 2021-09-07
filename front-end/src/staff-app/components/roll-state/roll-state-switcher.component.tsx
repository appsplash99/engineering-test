import React from "react"
import { Person } from "shared/models/person"
import { RolllStateType } from "shared/models/roll"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { useStaffAppState } from "staff-app/context/staffAppContext"

interface Props {
  size?: number
  student: Person
}
export const RollStateSwitcher: React.FC<Props> = ({ student, size = 40 }) => {
  const {
    state: { updatedStudentRolls },
    dispatch,
  } = useStaffAppState()

  const rollState = updatedStudentRolls.find((stuObj) => stuObj?.id === student?.id)?.type

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

    if (rollState === "unmark" || rollState === "absent") {
      return states[0]
    }

    const matchingIndex = states.findIndex((s) => s === rollState)
    if (matchingIndex > -1) {
      return states[matchingIndex + 1]
    }

    return states[0]
  }

  const onClick = () => dispatch({ type: "ADD_OR_UPDATE_STUDENT_INTO_UPDATED_STUDENT_ROLLS", payload: { ...student, type: nextState() } })

  return <RollStateIcon size={size} type={rollState} onClick={onClick} />
}
