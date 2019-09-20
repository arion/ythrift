import React, { FC } from "react"

const MonthSelector: FC<{}> = (props) => {
  return (
      <div className="month-picker picker-element">
      <div className="row">
        <div className="col button-col">
          <button className="btn btn-primary">
            <i className="fa fa-chevron-circle-left"></i>
          </button>
        </div>
        <div className="col date-col">
          September 2019
        </div>
        <div className="col button-col">
          <button className="btn btn-primary">
            <i className="fa fa-chevron-circle-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MonthSelector