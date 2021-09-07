import { InitialState, UpdatedStudent } from "staff-app/context/staffAppContext.type"

export const getFilteredStudents = (updatedStudents: UpdatedStudent[], state: InitialState) => {
  return state.filterType === "all" ? updatedStudents : updatedStudents.filter((stuObj) => stuObj.type === state.filterType)
}
