import React, { createContext, useContext } from "react"

const staffAppContext = createContext({})

export const StaffAppProvider: React.FC = ({ children }) => {
  return <staffAppContext.Provider value={{}}>{children}</staffAppContext.Provider>
}

export const useStaffAppState = useContext(staffAppContext)
