import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../../../index'

import truncate from '../truncate'
import userFactory from '../factories/user'
import categoryFactory from '../factories/category'
import budgetRowFactory from '../factories/budget_row'

process.env.NODE_ENV = 'test'

chai.use(chaiHttp)
chai.should()

describe("BudgetRows", () => {
  let user
  let category
  let budgetRow

  describe("GET /", () => {
    beforeEach(async () => {
      await truncate()
      user = await userFactory()
      category = await categoryFactory({ userId: user.id })
      budgetRow = await budgetRowFactory({ categoryId: category.id, month: 1, year: 2019, budgetCents: 100000 })
    })

    it('should create a SINGLE budgetRow on /api/v1/budget_rows POST', function(done) {
      chai.request(app)
        .post(`/api/v1/budget_rows`)
        .set('Authorization', 'bearer ' + user.jwtToken)
        .send({'month': 6, 'year': 2019, 'budgetCents': 200000, 'categoryId': category.id})
        .end(function(error, res){
          res.should.have.status(201)
          res.should.be.json
          res.body.should.be.a('object')
          const budgetRowObject = res.body.data
          budgetRowObject.budgetCents.should.equal(200000)
          done()
        })
    })

    it('should update a SINGLE budgetRow on /api/v1/budget_rows/<id> PUT', function(done) {
      chai.request(app)
        .put(`/api/v1/budget_rows/${budgetRow.id}`)
        .set('Authorization', 'bearer ' + user.jwtToken)
        .send({'budgetCents': 200000})
        .end(function(error, res){
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          const budgetRowObject = res.body.data
          budgetRowObject.budgetCents.should.equal(200000)
          done()
        })
    })
  })
})