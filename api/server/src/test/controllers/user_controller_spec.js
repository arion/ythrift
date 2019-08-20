import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../index';

import truncate from '../truncate';
import userFactory from '../factories/user';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  let user;

  describe("GET /", () => {
    beforeEach(async () => {
      await truncate()
      user = await userFactory();
    })

    it("should get all users record", (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          console.log(res)
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          const userObject = res.body.data[0]
          userObject.username.should.be.eql(user.username);
          done();
        });
    });

    it("should get a single user record", (done) => {
      chai.request(app)
        .get(`/api/v1/users/${user.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          const userObject = res.body.data
          userObject.username.should.be.eql(user.username);
          done();
        });
    });

    it("should not get a single user record", (done) => {
      const id = 5;
      chai.request(app)
        .get(`/api/v1/users/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('should create a SINGLE user on /api/v1/users POST', function(done) {
      chai.request(app)
        .post(`/api/v1/users`)
        .send({'username': 'New Name', email: 'test@test.com', provider: 'google', token: 'fake'})
        .end(function(error, res){
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.data.username.should.equal('New Name');
          done();
        });
    });

    it('should update a SINGLE user on /api/v1/users/<id> PUT', function(done) {
      chai.request(app)
        .put(`/api/v1/users/${user.id}`)
        .send({'username': 'New Name'})
        .end(function(error, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.data.username.should.equal('New Name');
          done();
        });
    });

    it('should delete a SINGLE user on /api/v1/users/<id> DELETE', function(done) {
      chai.request(app)
        .delete(`/api/v1/users/${user.id}`)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          chai.request(app)
            .get(`/api/v1/users/${user.id}`)
            .end((err, res) => {
              res.should.have.status(404);
              done();
            });
        });
    });
  });
});