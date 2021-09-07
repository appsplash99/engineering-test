import { RolllStateType } from "shared/models/roll"

type ItemType = RolllStateType | "all"
interface StateList {
  type: ItemType
  count: number
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
}

export interface IAppCxt {
  state: InitialState
  dispatch: React.Dispatch<any>
}
