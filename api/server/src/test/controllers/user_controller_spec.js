import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../index';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("GET /", () => {
      it("should get all users record", (done) => {
           chai.request(app)
               .get('/api/v1/users')
               .end((err, res) => {
                   console.log(res)
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   done();
                });
       });

      it("should get a single user record", (done) => {
           const id = 1;
           chai.request(app)
               .get(`/api/v1/users/${id}`)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
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
  });
});