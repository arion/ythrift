import React, { FC, useEffect } from "react"
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom"
import cn from 'classnames'
import queryString from 'query-string'

import { loadCurrentUser } from '../utils/api'
import { useGlobalState, useDispatch } from '../utils/state'

const ContentInner: FC<RouteComponentProps<{}>> = (props) => {
  const { navToggle, month, year } = useGlobalState('common')
  const account = useGlobalState('account')
  const dispatch = useDispatch()

  useEffect(() => {
    if (account.loaded) { return }
    dispatch({ type: 'account-loading' })
    loadCurrentUser()
      .then((user) => dispatch({ type: 'account-loaded', user }))
      .catch(() => dispatch({ type: 'account-loaded', user: undefined }))
  }, [account.loaded, account.user, dispatch])

  if (account.loaded && !account.user && props.location.pathname  !== '/') { return <Redirect to="/" /> }
  
  const query = queryString.parse(props.location.search) as { year: string, month: string }
  if (!month && !year) {
    if (query.month && query.year) {
      dispatch({ type: 'common-dateChange', year: parseInt(query.year), month: parseInt(query.month) })
      return (<div></div>)
    } else {
      const currentMonth = new Date().getMonth() + 1
      const currentYear = new Date().getFullYear()
      return <Redirect to={`/dashboard?month=${currentMonth}&year=${currentYear}`} /> 
    }
  }

  return (
    <div className={cn('content-inner', { 'active': navToggle })}>
      {props.children}
    </div>
  )
}

export default withRouter(ContentInner)