import React, { FC, Fragment } from "react"
import { filter, sortBy } from 'lodash'

import { ICategory } from "../utils/interfaces";
import CategoryRow from '../components/category_row'
import AddCategoryModal from '../components/add_category_modal'

interface IProps {
  categories: ICategory[];
  kind: string;
}

const CategoriesTable: FC<IProps> = (props) => {

  const { categories, kind } = props

  const rootCategories = sortBy(filter(categories, { parentId: null }), 'name')

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
          { rootCategories.map((rootCategory) => {
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
        <AddCategoryModal rootCategories={rootCategories} kind={kind}></AddCategoryModal >
      </div>
    </Fragment>
  )
}

export default CategoriesTable