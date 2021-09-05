export interface InitialState {
  isRollMode: boolean
}

export interface IAppCxt {
  state: InitialState
  dispatch: React.Dispatch<any>
}
