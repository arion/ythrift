import React, { FC, Fragment } from "react"
import { filter, sortBy } from 'lodash'

import { ICategory } from "../utils/interfaces";
import CategoryRow from '../components/category_row'

interface IProps {
  categories: ICategory[];
}

const CategoriesTable: FC<IProps> = (props) => {
  const { categories } = props

  const rootCategories = filter(categories, { parentId: null })

  return (
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
      { sortBy(rootCategories, 'name').map((rootCategory) => (
        <Fragment key={rootCategory.id}>
          <CategoryRow key={rootCategory.id} category={rootCategory} isRoot={true} />
          {sortBy(filter(categories, { parentId: rootCategory.id }), 'name').map((category) => (
            <CategoryRow key={category.id} category={category} isRoot={false} />
          ))}
        </Fragment>
      )) }
    </tbody>
  </table>
  )
}

export default CategoriesTable