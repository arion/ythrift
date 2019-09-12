import React, { FC } from "react"

const PageHeader: FC<{}> = (props) => {
  return (
    <header className="page-header">
      <div className="container-fluid">
        <h2 className="no-margin-bottom">{props.children}</h2>
      </div>
    </header>
  )
}

export default PageHeader