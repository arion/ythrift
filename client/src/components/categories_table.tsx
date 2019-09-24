import React, { FC, Fragment } from "react"
import { filter, sortBy } from 'lodash'

import { ICategory } from "../utils/interfaces";
import CategoryRow from '../components/category_row'

interface IProps {
  categories: ICategory[];
  kind: string;
}

const CategoriesTable: FC<IProps> = (props) => {
  const { categories } = props

  const rootCategories = filter(categories, { parentId: null })

  return (
    <Fragment>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="category-column">Category</th>
            <th className="budget-column">Budget</th>
            <th className="actual-column">Actual</th>
            <th className="variance-column">Variance</th>
          </tr>
        </thead>
        <tbody>
          { sortBy(rootCategories, 'name').map((rootCategory) => {
            const childrenCategories = filter(categories, { parentId: rootCategory.id })
            return (
              <Fragment key={rootCategory.id}>
                <CategoryRow key={rootCategory.id} category={rootCategory} isRoot={true} haveChildren={childrenCategories.length > 0} />
                {sortBy(childrenCategories, 'name').map((category) => (
                  <CategoryRow key={category.id} category={category} isRoot={false} haveChildren={false} />
                ))}
              </Fragment>
            )
          }) }
        </tbody>
      </table>
      <div className="text-center">
        <button className='btn btn-link text-primary'>
          Add new Category
          &nbsp;
          <i className="fa fa-plus"></i>
        </button>
      </div>
    </Fragment>
  )
}

export default CategoriesTable