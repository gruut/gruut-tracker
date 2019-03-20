process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const moment = require('moment');
const {
  describe,
  it,
} = require('mocha');

const common = require('../../lib/common');
const server = require('../../app');

const {
  expect,
} = chai;

chai.use(chaiHttp);

const key1 = moment().unix();
const key2 = moment().subtract(30, 'minutes').unix();

const value1 = '127.0.0.1:8000';
const value2 = '127.0.0.1:8100';
const myPort = 8200;

global.redisClient.zadd(common.DB_KEY, key1, value1, key2, value2);

describe('Announce itself to tracker and get peers list', () => {
  it('expects to add the peer information into peers list', (done) => {
    chai.request(server)
      .get(`/announce?port=${myPort}`)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).to.be.equal(200);
        expect(res.body.length).to.be.equal(3);
        expect(res.body[0]).to.be.equal('127.0.0.1:8200');

        done();
      });
  });
});
