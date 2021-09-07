import { UpdatedStudent } from "staff-app/context/staffAppContext.type"

export type IActionType =
  | { type: "CHANGE_ROLL_MODE"; payload: boolean }
  | { type: "TOGGLE_SORT" }
  | { type: "SORT_BY_FIRSTNAME_OR_LASTNAME" }
  | { type: "SORT_BY_ASCENDING_OR_DESCENDING" }
  | { type: "CHANGE_SEARCH_STRING"; payload: string }
  | { type: "RESET_SEARCH_STRING" }
  /** TODO: MIGHT NEED TO REMOVE BELOW LINE */
  | { type: "SET_ALL_STUDENTS_COUNT"; payload: number }
  /** TODO: MIGHT NEED TO REMOVE ABOVE LINE */
  | { type: "ADD_OR_UPDATE_STUDENT_INTO_UPDATED_STUDENT_ROLLS"; payload: UpdatedStudent }
