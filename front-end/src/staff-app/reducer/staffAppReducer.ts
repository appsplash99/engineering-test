import { InitialState } from "../context/staffAppContext.type"
import { IActionType } from "./staffAppActions"
import { isStudentInUpdatedStudentRolls } from "staff-app/utils"

export const staffAppReducer = (prevState: InitialState, action: IActionType) => {
  switch (action.type) {
    case "CHANGE_ROLL_MODE":
      return { ...prevState, isRollMode: action.payload }

    case "TOGGLE_SORT":
      return {
        ...prevState,
        sort: { ...prevState.sort, applied: !prevState.sort.applied },
      }

    case "SORT_BY_FIRSTNAME_OR_LASTNAME":
      return {
        ...prevState,
        sort: { ...prevState.sort, firstName: !prevState.sort.firstName },
      }

    case "SORT_BY_ASCENDING_OR_DESCENDING":
      return {
        ...prevState,
        sort: { ...prevState.sort, ascending: !prevState.sort.ascending },
      }

    case "CHANGE_SEARCH_STRING":
      return {
        ...prevState,
        searchString: action.payload,
      }

    case "RESET_SEARCH_STRING":
      return { ...prevState, searchString: "" }

    case "ADD_OR_UPDATE_STUDENT_INTO_UPDATED_STUDENT_ROLLS":
      const newStudent = action.payload
      console.log({ newStudent })
      const existingStudentRolls = prevState.updatedStudentRolls

      const latestChanges = isStudentInUpdatedStudentRolls(existingStudentRolls, newStudent)
        ? existingStudentRolls.map((studentObj, i) => (studentObj.id === newStudent.id ? { ...newStudent } : { ...studentObj }))
        : existingStudentRolls.concat(action.payload)
      return {
        ...prevState,
        updatedStudentRolls: latestChanges,
      }

    case "ADD_ALL_STUDENTS_WITH_ROLL_TYPE_AS_UNMARK_INTO_UPDATED_STUDENT_ROLLS":
      return {
        ...prevState,
        updatedStudentRolls: prevState.updatedStudentRolls.concat(action.payload.map((stuObj) => ({ ...stuObj, type: "unmark" }))),
      }

    case "FILTER_STUDENTS_BY_ROLL_TYPE":
      return {
        ...prevState,
        filterType: action.payload,
      }

    default:
      console.log("THIS ACTION IS NOT PRESENT IN STAFF-APP-REDUCER")
      return prevState
  }
}
