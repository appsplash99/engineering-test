import { Person } from "shared/models/person"
import { RolllStateType } from "shared/models/roll"

export type ItemType = RolllStateType | "all"

interface StateList {
  type: ItemType
  count: number
}

export interface UpdatedStudent extends Person {
  type: RolllStateType | "all"
}

export interface InitialState {
  isRollMode: boolean
  sort: {
    applied: boolean
    firstName: boolean
    ascending: boolean
  }
  searchString: string
  rollStateList: StateList[]
  updatedStudentRolls: UpdatedStudent[]
}

export interface IAppCxt {
  state: InitialState
  dispatch: React.Dispatch<any>
}
