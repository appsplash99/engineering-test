import { InitialState } from "../context/staffAppContext.type"
import { IActionType } from "./staffAppActions"

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

    default:
      console.log("THIS ACTION IS NOT PRESENT IN STAFF-APP-REDUCER")
      return prevState
  }
}
