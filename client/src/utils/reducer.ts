import { IUser } from '../utils/interfaces'

interface IState {
  currentUser: IUser | undefined,
  currentUserLoaded: boolean,
}

interface IAction {
  type: String,
  user?: IUser | undefined,
}

export const initialState : IState = {
  currentUserLoaded: false,
  currentUser: undefined
}

export function reducer(state: IState, action : IAction) {
  switch (action.type) {
    case 'currentUser-Loaded':
      return { ...state, currentUser: action.user, currentUserLoaded: true }
    default:
      throw new Error()
  }
}
