const parseHttpRequest = require('./parse-http');
const common = require('../common');

class Server {
  static onHttpRequest(req, res) {
    try {
      const params = parseHttpRequest(req);
      global.redisClient.zadd(common.DB_KEY, params.timestamp, params.addr);

      const index = (params.numwant || common.MAX_ANNOUNCE_PEERS) - 1;
      global.redisClient.zrevrange(common.DB_KEY, 0, index, (err, sset) => {
        if (err) throw err;

        res.json(sset);
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Server;
