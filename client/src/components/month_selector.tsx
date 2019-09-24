import React, { FC } from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"

import { monthToString } from '../utils/formatters'
import { useDispatch, useGlobalState } from '../utils/state'

const MonthSelector: FC<RouteComponentProps<{}>> = (props) => {
  const dispatch = useDispatch()
  const { month, year } = useGlobalState('common')

  if (!month || !year) { return (<div></div>) }

  const changeDate = (year: number, month: number) => {
    dispatch({ type: 'common-dateChange', year: year, month: month })
    
    props.history.push({
      pathname: props.location.pathname,
      search: `?month=${month}&year=${year}`
    })
  }

  const prevMonth = () => (month === 1) ? changeDate(year - 1, 12) : changeDate(year, month - 1)
  const nextMonth = () => (month === 12) ? changeDate(year + 1, 1) : changeDate(year, month + 1)

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

export default withRouter(MonthSelector)