import React, { FC, Fragment, useState } from "react"
import Modal from "./modal";
import { ICategory } from "../utils/interfaces";
import { useDispatch } from "../utils/state";

import * as API  from "../utils/api";
import { centsToCurrency } from "../utils/formatters";

interface IProps {
  actual: number;
  category: ICategory;
}

const AddActualRowModal: FC<IProps> = (props) => {
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState(undefined as (number | undefined))

  const { category, actual } = props

  const save = () => {
    setShowModal(false)

    // API.createCategory({ parentId: parentId, name: categoryName, kind })
    //   .then((category) => { 
    //     dispatch({ type: 'categories-created', category }) 
    //   })
    //   .finally(() => {
    //     setShowCategoryForm(false)
    //   })
  }

  const show = () => {
    setAmount(undefined)
    setShowModal(true)
  }

  return (
    <Fragment>
      <div onClick={() => show()} role="button">
        { centsToCurrency(actual) }
        <i className="fa fa-plus text-sm edit-icon" title="Add Transaction"></i>
      </div>
      { showModal && (
        <Modal onClose={() => setShowModal(false)} onSubmit={() => save()} submitTitle="Save" title={`Add transaction to ${category.name}.`}>
          <div className="form-group">
            <label>Amount</label>
            <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : undefined)}/>
          </div>
        </Modal>
      )}
    </Fragment>
  )
}

export default AddActualRowModal