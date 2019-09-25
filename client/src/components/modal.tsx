import React, { FC, Fragment } from "react"
import { createPortal } from 'react-dom'
import cn from 'classnames'

interface IProps {
  title: string;
  submitTitle: string;
  onSubmit: () => void;
  onClose: () => void;
}

const Modal: FC<IProps> = (props) => {
  const close = () => {
    props.onClose()
  }

  const submit = () => {
    props.onSubmit()
    close()
  }

  return createPortal(
    <Fragment>
      <div className={cn('modal', 'fade', 'show')} role="dialog" style={{display: 'block'}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
              <button type="button" className="close"aria-label="Close" onClick={() => close()}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {props.children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => submit()}>{props.submitTitle}</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => close()}>Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>)
    </Fragment>
  , document.body)
}

export default Modal