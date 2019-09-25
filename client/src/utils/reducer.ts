import { IUser, ICategory, IBudgetRow } from '../utils/interfaces'
import { filter } from 'lodash'
import moment from 'moment'

export type IAction =
  | { type: 'common-navToggle' }
  | { type: 'common-dateChange', year: number, month: number }

  | { type: 'account-loading' }
  | { type: 'account-loaded', user: IUser | undefined }
  
  | { type: 'categories-loading' }
  | { type: 'categories-loaded', categories: ICategory[] }
  | { type: 'categories-updated', category: ICategory }
  | { type: 'categories-created', category: ICategory }
  | { type: 'categories-budget-row-updated', categoryId: number, budgetRow: IBudgetRow }

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
    categories: [] as ICategory[],
    loaded: false,
  }
}

export type IState = typeof initialState;

const categoriesFilter = (categories: ICategory[], month: number, year: number) => {
  return filter(categories, (c) => {
    if (!c.archivedAt || !c.archivedAt.length) { return true }
    const archivedAt = moment(c.archivedAt).startOf('month')
    const currentDate = moment(`${month}-${year}`, 'MM-YYYY').startOf('month')
    if (archivedAt > currentDate) { return true }

    return false
  })
}

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
        categories: [],
        loaded: false,
      },
    }
    case 'categories-loaded': {
      const filteredCategories = categoriesFilter(action.categories, state.common.month!, state.common.year!)

      return { 
        ...state, 
        category: {
          categories: filteredCategories,
          loaded: true,
        },
      }
    }
    case 'categories-created': {
      const newCategory = { ...action.category, budgetRow: null, actualRows: [] }

      return {
        ...state,
        category: {
          ...state.category,
          categories: [...state.category.categories, newCategory]
        }
      }
    }
    case 'categories-updated': {
      const updatedCategories = state.category.categories.map((c) => c.id === action.category.id ? { ...action.category, actualRows: c.actualRows, budgetRow: c.budgetRow } : c)
      const filteredCategories = categoriesFilter(updatedCategories, state.common.month!, state.common.year!)

      return {
        ...state,
        category: {
          ...state.category,
          categories: filteredCategories
        }
      }
    }

    case 'categories-budget-row-updated': {
      const updatedCategories = state.category.categories.map((c) => c.id === action.categoryId ? { ...c, budgetRow: action.budgetRow } : c)

      return {
        ...state,
        category: {
          ...state.category,
          categories: updatedCategories
        }
      }
    }

    default: return state;
  }
}
