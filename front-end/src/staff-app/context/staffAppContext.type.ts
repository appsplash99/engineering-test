export interface InitialState {
  isRollMode: boolean
  sort: {
    applied: boolean
    firstName: boolean
    ascending: boolean
  }
}

export interface IAppCxt {
  state: InitialState
  dispatch: React.Dispatch<any>
}
