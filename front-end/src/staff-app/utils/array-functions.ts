import { Person } from "shared/models/person"
import { RolllStateType } from "shared/models/roll"
import { UpdatedStudent } from "staff-app/context/staffAppContext.type"

export const isStudentInUpdatedStudentRolls = (updatedStudentRolls: UpdatedStudent[], student: Person) => {
  return updatedStudentRolls.some((item) => item?.id === student?.id)
}

export const transformArrayToRollInputObj = (updatedStudentRolls: UpdatedStudent[]): { student_id: number; roll_state: RolllStateType }[] => {
  return updatedStudentRolls.map((stuObj) => ({ student_id: stuObj.id, roll_state: stuObj.type }))
}
