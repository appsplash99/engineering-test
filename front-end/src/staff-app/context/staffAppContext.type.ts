export interface InitialState {
  isRollMode: boolean
  sort: {
    applied: boolean
    firstName: boolean
    ascending: boolean
  }
  searchString: string
}

export interface IAppCxt {
  state: InitialState
  dispatch: React.Dispatch<any>
}
