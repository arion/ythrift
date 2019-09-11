import React from 'react'

const LandingPage: React.FC = () => {
  return (
    <div>
      <header className="page-header">
        <div className="container-fluid">
          <h2 className="no-margin-bottom">Gain Total Control of Your Money.</h2>
        </div>
      </header>
      <section>
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3>yThrift - another budget planning tool.</h3>
            </div>
            <div className="card-body">
              <p>What really makes <b>yThrift</b> different is that we can teach you how to manage your money and get ahead—for good. </p>
              <p>
                What if your bills rolled in and instead of piling up, you just paid them? No sweat. 
                What if you didn’t even realize it was payday because you had money in the bank and weren’t desperate for that check to arrive? 
              </p>
              <p>
                <b>Forget everything you think you know about budgeting and prepare to experience total control.</b>
              </p>
              <a href="/auth/google" className="btn btn-lg btn-primary">
                <i className="fa fa-sign-in-alt"></i>
                &nbsp;
                Sign In with Google
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
