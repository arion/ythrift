import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../../../index'

import truncate from '../truncate'
import userFactory from '../factories/user'
import categoryFactory from '../factories/category'

process.env.NODE_ENV = 'test'

chai.use(chaiHttp)
chai.should()

describe("Categories", () => {
  let user
  let category

  describe("GET /", () => {
    beforeEach(async () => {
      await truncate()
      user = await userFactory()
      category = await categoryFactory({ userId: user.id })
    })

    it("should get all categories record", (done) => {
      chai.request(app)
        .get('/api/v1/categories')
        .set('Authorization', 'bearer ' + user.jwtToken)
        .end((err, res) => {
          console.log(res)
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          const categoryObject = res.body.data[0]
          categoryObject.name.should.be.eql(category.name)
          categoryObject.userId.should.be.eql(user.id)
          done()
        })
    })

    it('should create a SINGLE category on /api/v1/categories POST', function(done) {
      chai.request(app)
        .post(`/api/v1/categories`)
        .set('Authorization', 'bearer ' + user.jwtToken)
        .send({'name': 'New Name'})
        .end(function(error, res){
          res.should.have.status(201)
          res.should.be.json
          res.body.should.be.a('object')
          const categoryObject = res.body.data
          categoryObject.name.should.equal('New Name')
          categoryObject.userId.should.be.eql(user.id)
          done()
        })
    })

    it('should update a SINGLE category on /api/v1/categories/<id> PUT', function(done) {
      chai.request(app)
        .put(`/api/v1/categories/${category.id}`)
        .set('Authorization', 'bearer ' + user.jwtToken)
        .send({'name': 'New Name'})
        .end(function(error, res){
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          const categoryObject = res.body.data
          categoryObject.name.should.equal('New Name')
          done()
        })
    })
  })
});