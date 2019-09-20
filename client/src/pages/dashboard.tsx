import React, { FC } from 'react'

import MonthSelector from '../components/month_selector'

const DashboardPage: FC = () => {
  return (
    <div>
      <div className="datepicker-header container-fluid">
        <MonthSelector />
      </div>
      <section className="dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">Income</div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Budget</th>
                          <th>Actual</th>
                          <th>Variance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th className="edit-cell">
                            Sellary GF
                            <i className="fa fa-pen text-sm"></i>
                          </th>
                          <td>$1000.00</td>
                          <td>$984.00</td>
                          <td>$1000</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-center">
                      <button className='btn btn-link text-primary'>
                        Add new Category
                        &nbsp;
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">Expenses</div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Budget</th>
                          <th>Actual</th>
                          <th>Variance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Sellary GF</th>
                          <td>$1000.00</td>
                          <td>$984.00</td>
                          <td>$1000</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-center">
                      <button className='btn btn-link text-primary'>
                        Add new Category
                        &nbsp;
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <p className="lead">Current Balance</p>
                  <div className="text-center display-4">$800.00</div>
                  <hr/>
                  <p className="lead">Beginning of month</p>
                  <div className="row">
                    <div className="col">
                      <div>Planned</div>
                      <div>$0.00</div>
                    </div>
                    <div className="col">
                      <div>Actual</div>
                      <div>$0.00</div>
                    </div>
                  </div>
                  <hr/>
                  <p className="lead">Total Budgeted</p>
                  <div className="row">
                    <div className="col">
                      <div>Income</div>
                      <div>$1000</div>
                    </div>
                    <div className="col">
                      <div>Expenses</div>
                      <div>$1000</div>
                    </div>
                  </div>
                  <hr/>
                  <p className="lead">Total Actual</p>
                  <div className="row">
                    <div className="col">
                      <div>Income</div>
                      <div>-$1000</div>
                    </div>
                    <div className="col">
                      <div>Expenses</div>
                      <div>-$1000</div>
                    </div>
                  </div>
                  <hr/>
                  <p className="lead">End of month</p>
                  <div className="row">
                    <div className="col">
                      <div>Planned</div>
                      <div>$0.00</div>
                    </div>
                    <div className="col">
                      <div>Actual</div>
                      <div>$0.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage