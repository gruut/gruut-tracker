const parseHttpRequest = require('./parse-http');
const common = require('../common');

class Server {
  static onHttpRequest(req, res) {
    try {
      const params = parseHttpRequest(req);

      const ldsInfo = {
        addr: params.addr,
        id: params.id,
      };

      global.redisClient.zadd(common.DB_KEY, params.timestamp, JSON.stringify(ldsInfo));

      const index = (params.numwant || common.MAX_ANNOUNCE_PEERS) - 1;
      global.redisClient.zrevrange(common.DB_KEY, 0, index, (err, sset) => {
        if (err) throw err;

        res.json(sset.map(s => JSON.parse(s).addr));
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Server;
