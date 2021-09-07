import { Person } from "shared/models/person"
import { RolllStateType } from "shared/models/roll"
import { UpdatedStudent } from "staff-app/context/staffAppContext.type"

export type IActionType =
  | { type: "CHANGE_ROLL_MODE"; payload: boolean }
  | { type: "TOGGLE_SORT" }
  | { type: "SORT_BY_FIRSTNAME_OR_LASTNAME" }
  | { type: "SORT_BY_ASCENDING_OR_DESCENDING" }
  | { type: "CHANGE_SEARCH_STRING"; payload: string }
  | { type: "RESET_SEARCH_STRING" }
  | { type: "ADD_OR_UPDATE_STUDENT_INTO_UPDATED_STUDENT_ROLLS"; payload: UpdatedStudent }
  | { type: "FILTER_STUDENTS_BY_ROLL_TYPE"; payload: RolllStateType | "all" }
  | { type: "ADD_ALL_STUDENTS_WITH_ROLL_TYPE_AS_UNMARK_INTO_UPDATED_STUDENT_ROLLS"; payload: Person[] }
