import React, { FC, Fragment, useState } from "react"
import Modal from "./modal";
import { ICategory } from "../utils/interfaces";
import { useDispatch } from "../utils/state";

import * as API  from "../utils/api";

interface IProps {
  rootCategories: ICategory[];
  kind: string;
}

const AddCategoryModal: FC<IProps> = (props) => {
  const dispatch = useDispatch()

  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [parentId, setParentId] = useState(undefined as (number | undefined))

  const { rootCategories, kind } = props

  const save = () => {
    API.createCategory({ parentId: parentId, name: categoryName, kind })
      .then((category) => { 
        dispatch({ type: 'categories-created', category }) 
      })
      .finally(() => {
        setShowCategoryForm(false)
      })
  }

  const show = () => {
    setShowCategoryForm(true)
    setCategoryName('')
    setParentId(undefined)
  }

  return (
    <Fragment>
      <button className='btn btn-link text-primary' onClick={() => show()}>
        <i className="fa fa-plus"></i>
        &nbsp;
        Add Category
      </button>
      { showCategoryForm && (
        <Modal onClose={() => setShowCategoryForm(false)} onSubmit={() => save()} submitTitle="Save" title={`Create new Category.`}>
          <div className="form-group">
            <label>Parent</label>
            <select className="form-control" onChange={(e) => setParentId(e.target.value ? parseInt(e.target.value) : undefined)} defaultValue={parentId ? parentId.toString() : undefined}>
              <option value="">Select one or leave empty...</option>
              {rootCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
          </div>
        </Modal>
      )}
    </Fragment>
  )
}

export default AddCategoryModal