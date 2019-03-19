const debug = require('debug')('gruut-tracker:server');
const EventEmitter = require('events');

const parseHttpRequest = require('./parse-http');

class Server extends EventEmitter {
  constructor(opts = {}) {
    super();
    debug('new server %s', JSON.stringify(opts));
  }

  static onHttpRequest(req, res) {
    try {
      const params = parseHttpRequest(req);
      global.redisClient.zadd('peers_timestamp', params.timestamp, params.addr);
      global.redisClient.zrevrange('peers_timestamp', 0, -1, (err, sset) => {
        res.json(sset);
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Server;
