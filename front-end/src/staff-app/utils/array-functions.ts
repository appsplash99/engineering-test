import { Person } from "shared/models/person"
import { UpdatedStudent } from "staff-app/context/staffAppContext.type"

export const isStudentInUpdatedStudentRolls = (updatedStudentRolls: UpdatedStudent[], student: Person) => {
  return updatedStudentRolls.some((item) => item?.id === student?.id)
}
