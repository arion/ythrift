import React, { FC } from "react"

import { monthToString } from '../utils/formatters'
import { useDispatch, useGlobalState } from '../utils/state'

const MonthSelector: FC<{}> = (props) => {
  const dispatch = useDispatch()
  const { month, year } = useGlobalState('common')

  if (!month || !year) { return (<div></div>) }

  const prevMonth = () => {
    if (month === 1) {
      dispatch({ type: 'common-dateChange', year: year - 1, month: 12 })
    } else {
      dispatch({ type: 'common-dateChange', year: year, month: month - 1 })
    }
  }

  const nextMonth = () => {
    if (month === 12) {
      dispatch({ type: 'common-dateChange', year: year + 1, month: 1 })
    } else {
      dispatch({ type: 'common-dateChange', year: year, month: month + 1 })
    }
  }

  return (
      <div className="month-picker picker-element">
      <div className="row">
        <div className="col button-col">
          <button className="btn btn-primary" onClick={prevMonth}>
            <i className="fa fa-chevron-circle-left"></i>
          </button>
        </div>
        <div className="col date-col">
          {monthToString(month)} {year}
        </div>
        <div className="col button-col">
          <button className="btn btn-primary" onClick={nextMonth}>
            <i className="fa fa-chevron-circle-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MonthSelector