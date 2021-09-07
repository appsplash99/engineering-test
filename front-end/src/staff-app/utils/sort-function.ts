import { Person } from "shared/models/person"
import { InitialState } from "../context/staffAppContext.type"

export const getSortedStudents = (studentsData: Person[], appState: InitialState) => {
  const { sort: sortState } = appState

  let sortedStudents: Person[]
  let key: "first_name" | "last_name"
  let nameOne
  let nameTwo

  if (sortState.applied) {
    /** SORT BY FIRST_NAME OR LAST_NAME */
    key = sortState.firstName ? "first_name" : "last_name"

    sortedStudents = studentsData.sort((a, b) => {
      if (sortState.ascending) {
        // console.log("CHECKED ASCENDING")
        /**EITHER SORT BY ASCENDING */
        nameOne = a[key]
        nameTwo = b[key]
      } else {
        // console.log("CHECKED DESCENDING")
        /**OR SORT BY DESCENDING */
        nameOne = b[key]
        nameTwo = a[key]
      }
      if (nameOne < nameTwo) {
        return -1
      }
      if (nameOne > nameTwo) {
        return 1
      }
      // names must be equal
      return 0
    })

    return sortedStudents
  }

  return studentsData
}
