import { InitialState } from "../context/staffAppContext.type"
import { IActionType } from "./staffAppActions"

export const staffAppReducer = (prevState: InitialState, action: IActionType) => {
  switch (action.type) {
    case "CHANGE_ROLL_MODE":
      return { ...prevState, isRollMode: action.payload }

    default:
      console.log("THIS ACTION IS NOT PRESENT IN STAFF-APP-REDUCER")
      return prevState
  }
}
