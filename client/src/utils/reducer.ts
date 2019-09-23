import { IUser, ICategory } from '../utils/interfaces'
import { groupBy } from 'lodash' 

export type IAction =
  | { type: 'common-navToggle' }
  | { type: 'common-dateChange', year: number, month: number }

  | { type: 'account-loading' }
  | { type: 'account-loaded', user: IUser | undefined }
  
  | { type: 'categories-loading' }
  | { type: 'categories-loaded', categories: ICategory[] }

export const initialState = {
  account: {
    user: undefined as IUser | undefined,
    loaded: false,
  },
  common: {
    navToggle: false,
    month: undefined as number | undefined,
    year: undefined as number | undefined,
  },
  category: {
    incomes: [] as ICategory[],
    expenses: [] as ICategory[],
    loaded: false,
  }
}

export type IState = typeof initialState;

export function reducer(state: IState, action : IAction) {
  console.log('dispatch', action)
  switch (action.type) {
    case 'account-loading': return { 
      ...state, 
      account: {
        user: undefined, 
        loaded: false,
      },
    }
    case 'account-loaded': return { 
      ...state, 
      account: {
        user: action.user, 
        loaded: true,
      },
    }

    case 'common-navToggle': return { 
      ...state, 
      common: {
        ...state.common,
        navToggle: !state.common.navToggle,
      },
    }
    case 'common-dateChange': return {
      ...state, 
      common: {
        ...state.common,
        month: action.month,
        year: action.year
      },
    }

    case 'categories-loading': return { 
      ...state, 
      category: {
        incomes: [],
        expenses: [],
        loaded: false,
      },
    }
    case 'categories-loaded': {
      const groupedCategories = groupBy(action.categories, 'kind')

      return { 
        ...state, 
        category: {
          incomes: groupedCategories['income'] || [],
          expenses: groupedCategories['expense'] || [], 
          loaded: true,
        },
      }
    }

    default: return state;
  }
}
