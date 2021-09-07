export type IActionType =
  | { type: "CHANGE_ROLL_MODE"; payload: boolean }
  | { type: "TOGGLE_SORT" }
  | { type: "SORT_BY_FIRSTNAME_OR_LASTNAME" }
  | { type: "SORT_BY_ASCENDING_OR_DESCENDING" }
  | { type: "CHANGE_SEARCH_STRING"; payload: string }
  | { type: "RESET_SEARCH_STRING" }
  | { type: "SET_ALL_STUDENTS_COUNT"; payload: number }
