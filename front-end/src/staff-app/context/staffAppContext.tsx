import React, { createContext, useContext, useReducer } from "react"
import { staffAppReducer } from "staff-app/reducer/staffAppReducer"
import { IAppCxt, InitialState } from "./staffAppContext.type"

const initialState: InitialState = {
  isRollMode: false,
  sort: {
    applied: false,
    firstName: false,
    ascending: false,
  },
  searchString: "",
  rollStateList: [
    { type: "all", count: 0 },
    { type: "present", count: 0 },
    { type: "late", count: 0 },
    { type: "absent", count: 0 },
  ],
}

const staffAppContext = createContext<IAppCxt>({
  state: initialState,
  dispatch: () => null,
})

export const StaffAppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(staffAppReducer, initialState)

  return <staffAppContext.Provider value={{ state, dispatch }}>{children}</staffAppContext.Provider>
}

export const useStaffAppState = () => useContext(staffAppContext)
