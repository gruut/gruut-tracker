const parseHttpRequest = require('./parse-http');

class Server {
  static onHttpRequest(req, res) {
    try {
      const params = parseHttpRequest(req);
      global.redisClient.zadd('peers_timestamp', params.timestamp, params.addr);

      const index = params.numwant - 1;
      global.redisClient.zrevrange('peers_timestamp', 0, index, (err, sset) => {
        if (err) throw err;

        res.json(sset);
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Server;
